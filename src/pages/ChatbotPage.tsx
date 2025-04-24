
import React from 'react';
import Navbar from '@/components/Navbar';
import AIChatbot from '@/components/AIChatbot';
import Footer from '@/components/Footer';

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-8 pb-16">
        <AIChatbot />
      </div>
      <Footer />
    </div>
  );
};

export default ChatbotPage;
