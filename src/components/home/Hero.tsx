// src/components/home/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="py-16 bg-(--color-light)">
      <div className="container flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-(--color-dark)">
            Sustained Aachen: Amplifying Individual Actions for Collective Impact
          </h1>
          <p className="text-lg mb-8 text-(--color-gray)">
            A community-driven platform that connects, celebrates, and scales regenerative initiatives through transparent funding and impact tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/marketplace">
              <Button variant="primary">Explore Projects</Button>
            </Link>
            <Link to="/submit-project">
              <Button variant="secondary">Submit Project</Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img 
            src="/aachen-sustainability.svg" 
            alt="Aachen Sustainability Illustration" 
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;