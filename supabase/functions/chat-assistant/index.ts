
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
    
    // First try direct content generation instead of chat
    try {
      console.log("Attempting direct content generation with gemini-1.0-pro")
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.0-pro"
      })
      
      const result = await model.generateContent(
        [
          {
            role: "user",
            parts: [
              { text: "You are FarmAssist, an AI-powered agricultural assistant designed to support farmers and gardening enthusiasts. Your primary functions include plant disease diagnosis, farming advice, community engagement, and real-time alerts. The user asks: " + message }
            ]
          }
        ]
      )
      
      console.log("Received direct generation response")
      const response = await result.response
      const text = response.text()
      console.log("Response text sample:", text.substring(0, 100) + "...")

      return new Response(
        JSON.stringify({ response: text }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    } catch (directGenError) {
      console.error("Direct generation error:", directGenError.message, directGenError.stack)
      console.log("Falling back to chat model...")
      
      try {
        // Try the chat model as a fallback
        const chatModel = genAI.getGenerativeModel({ 
          model: "gemini-pro",  // Try the original model name
          systemInstruction: `You are FarmAssist, an AI-powered agricultural assistant designed to support farmers and gardening enthusiasts. Your primary functions include plant disease diagnosis, farming advice, community engagement, and real-time alerts.`
        })
        
        console.log("Starting simple chat with gemini-pro model")
        
        const result = await chatModel.generateContent(
          [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ]
        )
        
        const response = await result.response
        const text = response.text()
        console.log("Chat response text sample:", text.substring(0, 100) + "...")
  
        return new Response(
          JSON.stringify({ response: text }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          },
        )
      } catch (chatError) {
        console.error("Chat model error:", chatError.message, chatError.stack)
        
        // Final fallback using the generative model without special parameters
        try {
          console.log("Attempting basic fallback with gemini-1.0-pro-latest")
          const fallbackModel = genAI.getGenerativeModel({ 
            model: "gemini-1.0-pro-latest",
          })
          
          const prompt = `Answer as FarmAssist, an AI agricultural assistant. Be helpful and provide farming advice. Question: ${message}`
          
          const fallbackResult = await fallbackModel.generateContent(prompt)
          const fallbackText = await fallbackResult.response.text()
          console.log("Basic fallback response sample:", fallbackText.substring(0, 100) + "...")
          
          return new Response(
            JSON.stringify({ response: fallbackText }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            },
          )
        } catch (finalError) {
          console.error("All attempts failed. Final error:", finalError.message)
          throw finalError // Pass to the outer catch block
        }
      }
    }
  } catch (error) {
    console.error('Critical error:', error.message, error.stack)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "An error occurred while processing your request. Please try again later."
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    )
  }
})
