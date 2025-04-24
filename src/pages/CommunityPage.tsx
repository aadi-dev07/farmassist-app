
import React from 'react';
import Navbar from '@/components/Navbar';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-8 pb-16">
        <Community />
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
