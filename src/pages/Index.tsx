
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DiseaseDetection from '@/components/DiseaseDetection';
import AIChatbot from '@/components/AIChatbot';
import Alerts from '@/components/Alerts';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Simple animation for features
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <DiseaseDetection />
      <AIChatbot />
      <Alerts />
      <Community />
      <Footer />
    </div>
  );
};

export default Index;
