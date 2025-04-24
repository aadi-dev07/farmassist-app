
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, User } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

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

  const handleSend = () => {
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

    // Simulate AI response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        tomato: "Tomatoes need full sun and well-draining soil. Water consistently and provide support as they grow. Watch for signs of early blight or leaf spot.",
        water: "Most plants need 1-2 inches of water per week. It's better to water deeply and infrequently than shallowly and often. Morning watering is ideal to reduce disease risk.",
        fertilizer: "Choose fertilizers based on your plants' needs. Generally, nitrogen promotes leaf growth, phosphorus supports root and flower development, and potassium improves overall plant health.",
        pest: "Integrated Pest Management (IPM) is best: start with prevention, then use physical barriers, beneficial insects, and as a last resort, organic or chemical pesticides appropriate for your specific pest.",
      };

      const userQuery = input.toLowerCase();
      let responseText = "I don't have specific information about that, but I'd be happy to help you with questions about planting times, pest control, watering schedules, or disease management.";

      // Check for keywords in the user's message
      Object.keys(botResponses).forEach(keyword => {
        if (userQuery.includes(keyword)) {
          responseText = botResponses[keyword];
        }
      });

      const botMessage: Message = {
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1000);
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
                      <div className="flex items-center mb-1">
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 mr-1" />
                        ) : (
                          <MessageSquare className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs font-medium">
                          {message.sender === 'user' ? 'You' : 'FarmAssist AI'}
                        </span>
                      </div>
                      <p>{message.text}</p>
                      <p className="text-xs opacity-70 text-right mt-1">
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
