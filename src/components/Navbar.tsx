import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-farm-green-600" />
          <span className="text-xl font-heading font-semibold text-farm-green-600">FarmAssist</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-farm-green-600">
            Home
          </Link>
          <Link to="/detection" className="text-sm font-medium transition-colors hover:text-farm-green-600">
            Disease Detection
          </Link>
          <Link to="/chatbot" className="text-sm font-medium transition-colors hover:text-farm-green-600">
            AI Assistant
          </Link>
          <Link to="/alerts" className="text-sm font-medium transition-colors hover:text-farm-green-600">
            Alerts
          </Link>
          <Link to="/community" className="text-sm font-medium transition-colors hover:text-farm-green-600">
            Community
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="default" className="bg-farm-green-600 hover:bg-farm-green-700">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="block md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background md:hidden animate-fade-in">
          <div className="container flex flex-col gap-4 p-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 py-2 text-lg font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/detection" 
              className="flex items-center gap-2 py-2 text-lg font-medium"
              onClick={toggleMenu}
            >
              Disease Detection
            </Link>
            <Link 
              to="/chatbot" 
              className="flex items-center gap-2 py-2 text-lg font-medium"
              onClick={toggleMenu}
            >
              AI Assistant
            </Link>
            <Link 
              to="/alerts" 
              className="flex items-center gap-2 py-2 text-lg font-medium"
              onClick={toggleMenu}
            >
              Alerts
            </Link>
            <Link 
              to="/community" 
              className="flex items-center gap-2 py-2 text-lg font-medium"
              onClick={toggleMenu}
            >
              Community
            </Link>
            {isSignedIn ? (
              <div className="mt-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="default" className="w-full bg-farm-green-600 hover:bg-farm-green-700">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
