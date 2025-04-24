
import React from 'react';
import Navbar from '@/components/Navbar';
import Alerts from '@/components/Alerts';
import Footer from '@/components/Footer';

const AlertsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-8 pb-16">
        <Alerts />
      </div>
      <Footer />
    </div>
  );
};

export default AlertsPage;
