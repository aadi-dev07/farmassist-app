
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
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY')!)
    console.log("Initialized Google Generative AI client")
    
    // Try using gemini-1.0-pro model instead
    // The error suggests that gemini-pro might not be available or has issues
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.0-pro",  // Updated model name
      systemInstruction: `You are FarmAssist, an AI-powered agricultural assistant designed to support farmers and gardening enthusiasts. Your primary functions include:​

Plant Disease Diagnosis: Analyze images of plant leaves to identify potential diseases and suggest treatments.

Farming Advice: Provide guidance on plant care, fertilizers, weather impacts, and sustainable practices.

Community Engagement: Facilitate connections between users, experts, and fellow farmers for shared knowledge.

Real-Time Alerts: Inform users about local disease outbreaks and weather changes.`
    })
    console.log("Created model with system instruction")

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hi, I need help with farming and gardening.",
        },
        {
          role: "model",
          parts: "Hello! I'm FarmAssist, your AI agricultural assistant. I'm here to help you with plant care, disease diagnosis, and sustainable farming practices. What specific farming or gardening questions do you have?",
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })
    console.log("Started chat with history")

    console.log("Sending message to Gemini API:", message)
    try {
      const result = await chat.sendMessage(message)
      console.log("Received response from Gemini API")
      const response = await result.response
      const text = response.text()
      console.log("Response text sample:", text.substring(0, 100) + "...")

      return new Response(
        JSON.stringify({ response: text }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    } catch (sendError) {
      console.error("Error sending message:", sendError.message, sendError.stack)
      
      // If the specific model fails, try a fallback model
      console.log("Attempting with fallback model gemini-1.0-pro-latest")
      const fallbackModel = genAI.getGenerativeModel({ 
        model: "gemini-1.0-pro-latest",
        systemInstruction: `You are FarmAssist, an AI-powered agricultural assistant designed to support farmers and gardening enthusiasts. Your primary functions include plant care advice, disease diagnosis, and sustainable farming practices.`
      })
      
      const fallbackResult = await fallbackModel.generateContent(message)
      const fallbackText = await fallbackResult.response.text()
      console.log("Fallback response sample:", fallbackText.substring(0, 100) + "...")
      
      return new Response(
        JSON.stringify({ response: fallbackText }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
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
