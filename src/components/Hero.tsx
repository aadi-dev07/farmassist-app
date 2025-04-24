
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Sprout, MessageSquare, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden hero-section">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-farm-green-100 px-3 py-1 text-sm text-farm-green-600">
              Grow Together
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
              AI-Powered Solutions for <span className="text-farm-green-600">Smarter Farming</span>
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              FarmAssist helps you detect plant diseases, receive expert advice, and connect with a community of farmers to grow healthier crops.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-farm-green-600 hover:bg-farm-green-700">
                Get Started
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="flex flex-col gap-4">
                <div className="group rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="feature-icon">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">Disease Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify plant diseases from images
                  </p>
                </div>
                <div className="group rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="feature-icon">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Get farming advice through our chatbot
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <div className="group rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="feature-icon">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">Real-time Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay informed on disease outbreaks
                  </p>
                </div>
                <div className="group rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="feature-icon">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with farming experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
