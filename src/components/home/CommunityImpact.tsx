// src/components/home/CommunityImpact.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const CommunityImpact: React.FC = () => {
  return (
    <section className="bg-(--color-light) py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Progress</h2>
          <p className="text-(--color-gray) max-w-2xl mx-auto">Together, we're making Aachen more sustainable every day</p>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center mb-12">
          <div className="flex-1 min-w-[200px] max-w-[250px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="text-3xl font-bold text-(--color-primary) mb-2">15.8k</div>
            <div className="text-(--color-gray)">Tons CO₂ Prevented</div>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="text-3xl font-bold text-(--color-primary) mb-2">42%</div>
            <div className="text-(--color-gray)">Waste Reduction</div>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="text-3xl font-bold text-(--color-primary) mb-2">64</div>
            <div className="text-(--color-gray)">Active Projects</div>
          </div>
          
          <div className="flex-1 min-w-[200px] max-w-[250px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="text-3xl font-bold text-(--color-primary) mb-2">3.2k</div>
            <div className="text-(--color-gray)">Community Members</div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="flex-1 min-h-[300px] bg-(--color-gray-light) flex items-center justify-center">
            <img src="/community-garden.jpg" alt="Community Garden Project" className="w-full h-full object-cover" />
          </div>
          <div className="flex-[1.5] p-8">
            <h3 className="text-2xl font-bold mb-4">Success Story: Urban Gardens Initiative</h3>
            <p className="mb-6">Starting with just 2 locations in 2023, Aachen's Urban Gardens Initiative has expanded to 14 community gardens across all districts, producing over 2 tons of organic vegetables annually and creating green spaces accessible to 15,000+ residents.</p>
            <Link to="/impact" className="text-(--color-primary) font-semibold flex items-center gap-2">
              Read more success stories <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;