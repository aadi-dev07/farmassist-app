
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const N8N_WEBHOOK_URL = 'https://agentmart.app.n8n.cloud/webhook-test/farmsist';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your FarmAssist AI. Ask me anything about farming, gardening, plant care, or disease management.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the most recent message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log("Sending message to n8n:", input);
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response from FarmAssist AI: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from n8n:", data);
      
      // Check if we got a valid response or the fallback message
      let botResponse = "";
      
      if (data && data.response) {
        botResponse = data.response;
      } else if (data && typeof data === 'object') {
        // Try to find any relevant text in the response object
        botResponse = JSON.stringify(data);
      } else {
        botResponse = "I apologize, but I'm having trouble connecting to the farming knowledge base. Please try again later.";
      }

      // If we still have the fallback message, it means the n8n webhook might not be 
      // returning the expected format
      if (botResponse === "I apologize, but I'm having trouble understanding. Could you rephrase your question about farming?") {
        console.warn("Received fallback message from n8n webhook");
      }

      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error in FarmAssist AI chat:', error);
      toast("Unable to get a response. Please try again.", {
        description: "There was an error connecting to FarmAssist AI."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <section id="chatbot" className="py-16 md:py-24 bg-farm-green-100">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI Farming <span className="text-farm-green-600">Assistant</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Get instant answers to your farming questions from our AI-powered chatbot.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardHeader className="bg-farm-green-200 border-b">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-farm-green-600" />
                FarmAssist AI Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-farm-green-600 text-white'
                          : 'bg-farm-green-100 border border-farm-green-200'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-2">
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                        <span className="text-xs font-semibold">
                          {message.sender === 'user' ? 'You' : 'FarmAssist AI'}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <p className="text-xs opacity-70 text-right mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-farm-green-100 border border-farm-green-200">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-farm-green-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-farm-green-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-farm-green-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t p-4 flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something about farming..."
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-farm-green-600 hover:bg-farm-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-farm-green-600">Sample Questions</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• How do I care for tomato plants?</li>
                <li>• What's the best way to water my garden?</li>
                <li>• How often should I use fertilizer?</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-farm-green-600">Ask About</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Pest control strategies</li>
                <li>• Soil health and composition</li>
                <li>• Seasonal planting advice</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-farm-green-600">Get Help With</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Disease identification</li>
                <li>• Crop rotation planning</li>
                <li>• Organic farming techniques</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatbot;
