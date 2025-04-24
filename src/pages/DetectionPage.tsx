
import React from 'react';
import Navbar from '@/components/Navbar';
import DiseaseDetection from '@/components/DiseaseDetection';
import Footer from '@/components/Footer';

const DetectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-8 pb-16">
        <DiseaseDetection />
      </div>
      <Footer />
    </div>
  );
};

export default DetectionPage;
