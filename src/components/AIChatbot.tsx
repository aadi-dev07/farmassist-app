
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, User, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm FarmAssist, your AI agricultural assistant. I'm here to help you with plant care, disease diagnosis, and sustainable farming practices. What questions do you have?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const lastUserMessageRef = useRef<string | null>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);

    // Store user message for potential retries
    lastUserMessageRef.current = input;

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
      console.log('Sending message to chat-assistant function:', input);
      const { data, error: functionError } = await supabase.functions.invoke('chat-assistant', {
        body: { message: input }
      });

      console.log('Response received:', data, 'Error:', functionError);

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(`Function error: ${functionError.message || 'Unknown error'}`);
      }

      if (!data || !data.response) {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response from AI assistant');
      }

      const botMessage: Message = {
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
      setRetryCount(0); // Reset retry count on success
      scrollToBottom();
    } catch (error) {
      console.error('Error details:', error);
      setError('Failed to get response from AI assistant. Please try again.');
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant. Please try again.",
        variant: "destructive"
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

  const handleRetry = async () => {
    setError(null);
    // Increment retry count
    setRetryCount(prev => prev + 1);
    
    if (lastUserMessageRef.current) {
      setInput(lastUserMessageRef.current);
      // Use a small timeout to ensure the UI updates before sending
      setTimeout(() => {
        handleSend();
      }, 100);
    } else {
      // Find the last user message and resend it
      const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
      if (lastUserMessage) {
        setInput(lastUserMessage.text);
        // Use a small timeout to ensure the UI updates before sending
        setTimeout(() => {
          handleSend();
        }, 100);
      }
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
          {error && (
            <Alert variant="destructive" className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                className="ml-2 flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Retry {retryCount > 0 ? `(${retryCount})` : ''}
              </Button>
            </Alert>
          )}
          
          <Card className="border-2">
            <CardHeader className="bg-farm-green-200 border-b">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-farm-green-600" />
                FarmAssist AI Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                ref={chatContainerRef}
                className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4"
              >
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
                      <p className="whitespace-pre-line">{message.text}</p>
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
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t p-4 flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about farming, gardening, or plant care..."
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
