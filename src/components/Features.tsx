
import React from 'react';
import { 
  Sprout, 
  MessageSquare, 
  Bell, 
  Users, 
  Search,
  Cloud
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "AI-Powered Disease Detection",
      description: "Upload images of your plant leaves to instantly identify diseases and receive treatment recommendations using our state-of-the-art AI model."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "24/7 Farming Assistant",
      description: "Get instant answers to your farming questions through our AI chatbot. Ask about planting techniques, soil composition, pest control, and more."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Disease Outbreak Alerts",
      description: "Receive timely notifications about disease outbreaks in your area, along with weather forecasts and preventative measures to protect your crops."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Community",
      description: "Connect with experienced farmers and agricultural experts to exchange knowledge, seek advice, and share your farming experiences."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Comprehensive Plant Database",
      description: "Access detailed information on hundreds of plant species, including growth requirements, common diseases, and cultivation techniques."
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Weather Integration",
      description: "Make informed decisions with integrated weather forecasts and get recommendations tailored to your local climate conditions."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-farm-green-100">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Advanced Features for <span className="text-farm-green-600">Modern Farming</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Our tools combine AI technology with agricultural expertise to help you grow healthier plants and increase yields.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
              onLoad={(e) => {
                (e.target as HTMLElement).classList.add('animate-slide-in');
              }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
