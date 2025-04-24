
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log("Received message:", message)
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.error("Invalid message received:", message)
      return new Response(
        JSON.stringify({ 
          error: "Invalid message format", 
          details: "Message must be a non-empty string" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        },
      )
    }

    // Initialize the Google Generative AI client
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable")
      return new Response(
        JSON.stringify({ 
          error: "Configuration error", 
          details: "API key not configured"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        },
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    console.log("Initialized Google Generative AI client")
    
    // Create model instance
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    console.log("Created model instance with gemini-pro")
    
    // The agricultural system prompt
    const systemPrompt = `You are FarmAssist, an AI-powered agricultural assistant designed to support farmers and gardening enthusiasts. Your primary functions include plant disease diagnosis, farming advice, community engagement, and real-time alerts.`
    
    // Create a chat session
    try {
      console.log("Starting chat session")
      const chat = model.startChat({
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
      });
      
      console.log("Sending message to chat session")
      const result = await chat.sendMessage(
        `${systemPrompt}\n\nUser message: ${message}`
      );
      
      const response = await result.response;
      const text = response.text();
      console.log("Received response from model, length:", text.length);
      
      return new Response(
        JSON.stringify({ response: text }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error("Chat session error:", error.message)
      
      // Try direct content generation as fallback
      try {
        console.log("Attempting direct content generation as fallback")
        const prompt = `${systemPrompt}\n\nAs FarmAssist, please respond to the following question or request from a user: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Fallback response received, length:", text.length);
        
        return new Response(
          JSON.stringify({ response: text }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        )
      } catch (fallbackError) {
        console.error("Fallback attempt failed:", fallbackError.message)
        throw fallbackError;
      }
    }
  } catch (error) {
    console.error('Critical error:', error.message, error.stack)
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while processing your request",
        details: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    )
  }
})
