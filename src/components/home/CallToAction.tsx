// src/components/home/CallToAction.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-(--color-primary) text-white py-16 text-center">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">Join the Sustained Community</h2>
        <p className="max-w-2xl mx-auto mb-8">Be part of Aachen's journey to become a more sustainable, resilient, and connected city.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="inline-block font-semibold rounded-xs bg-white text-(--color-primary) hover:bg-(--color-light) py-2 px-6 transition-all">
            Sign Up
          </Link>
          <Link to="/marketplace" className="inline-block font-semibold rounded-xs bg-transparent hover:bg-white/10 text-white border-2 border-white py-2 px-6 transition-all">
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;