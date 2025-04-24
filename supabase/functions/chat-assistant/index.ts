
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
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY')!)
    
    // Make sure we're using the correct model name - Gemini Pro is available, not Pro 1.5
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      systemInstruction: `You are FarmAssist, an AI-powered agricultural assistant designed to support farmers and gardening enthusiasts. Your primary functions include:​

Plant Disease Diagnosis: Analyze images of plant leaves to identify potential diseases and suggest treatments.

Farming Advice: Provide guidance on plant care, fertilizers, weather impacts, and sustainable practices.

Community Engagement: Facilitate connections between users, experts, and fellow farmers for shared knowledge.

Real-Time Alerts: Inform users about local disease outbreaks and weather changes.`
    })

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

    console.log("Sending message to Gemini API:", message)
    const result = await chat.sendMessage(message)
    console.log("Received response from Gemini API")
    const response = await result.response
    const text = response.text()
    console.log("Response text:", text.substring(0, 100) + "...")

    return new Response(
      JSON.stringify({ response: text }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error:', error.message, error.stack)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      },
    )
  }
})
