// src/components/home/IndividualImpact.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const IndividualImpact: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Actions Matter</h2>
          <p className="text-(--color-gray) max-w-2xl mx-auto">See how your individual contributions create meaningful change</p>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="flex-1 min-w-[280px] max-w-[350px] bg-white rounded-xs shadow-xs p-8 text-center hover:-translate-y-1 hover:shadow-sm transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-(--color-primary-light) text-(--color-primary) flex items-center justify-center text-2xl">
              <i className="fas fa-bicycle"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Sustainable Transport</h3>
            <p className="mb-4">Cycling to work reduces CO₂ emissions by ~1kg per 5km compared to driving.</p>
            <div className="h-2 bg-(--color-gray-light) rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-(--color-primary) rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-(--color-gray)">65% of Aachen commuters use sustainable transportation</p>
          </div>
          
          <div className="flex-1 min-w-[280px] max-w-[350px] bg-white rounded-xs shadow-xs p-8 text-center hover:-translate-y-1 hover:shadow-sm transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-(--color-secondary-light) text-(--color-secondary) flex items-center justify-center text-2xl">
              <i className="fas fa-apple-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Local Food Choices</h3>
            <p className="mb-4">Eating locally-sourced food can reduce your carbon footprint by up to 5%.</p>
            <div className="h-2 bg-(--color-gray-light) rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-(--color-primary) rounded-full" style={{ width: '43%' }}></div>
            </div>
            <p className="text-sm text-(--color-gray)">43% of food in Aachen restaurants is locally sourced</p>
          </div>
          
          <div className="flex-1 min-w-[280px] max-w-[350px] bg-white rounded-xs shadow-xs p-8 text-center hover:-translate-y-1 hover:shadow-sm transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
              <i className="fas fa-tint"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Water Conservation</h3>
            <p className="mb-4">Installing water-saving fixtures saves up to 30 liters per person daily.</p>
            <div className="h-2 bg-(--color-gray-light) rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-(--color-primary) rounded-full" style={{ width: '28%' }}></div>
            </div>
            <p className="text-sm text-(--color-gray)">28% reduction in household water usage since 2020</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/dashboard" className="inline-block font-semibold rounded-xs bg-white hover:bg-(--color-primary-light) text-(--color-primary) border-2 border-(--color-primary) py-2 px-6 transition-all">
            View Your Impact Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndividualImpact;