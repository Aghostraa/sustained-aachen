// src/components/home/Events.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-(--color-gray) max-w-2xl mx-auto">Connect with the community and learn new skills</p>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="flex-1 min-w-[300px] max-w-[350px] flex bg-(--color-light) rounded-xs shadow-xs overflow-hidden">
            <div className="bg-(--color-primary) text-white w-20 flex flex-col items-center justify-center">
              <div className="text-sm font-semibold">MAR</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-bold mb-2">Local Farmers Market</h3>
              <p className="text-sm text-(--color-gray) mb-2"><i className="fas fa-clock mr-2"></i> 09:00-14:00</p>
              <p className="text-sm text-(--color-gray) mb-2"><i className="fas fa-map-marker-alt mr-2"></i> Markt, Aachen</p>
              <p className="text-sm text-(--color-gray)">By: Ernährungsrat Aachen</p>
            </div>
            <Link to="/events" className="self-center px-4 py-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white text-sm rounded-xs mx-4 transition-colors">
              Register
            </Link>
          </div>
          
          <div className="flex-1 min-w-[300px] max-w-[350px] flex bg-(--color-light) rounded-xs shadow-xs overflow-hidden">
            <div className="bg-(--color-primary) text-white w-20 flex flex-col items-center justify-center">
              <div className="text-sm font-semibold">MAR</div>
              <div className="text-2xl font-bold">18</div>
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-bold mb-2">Urban Gardening Workshop</h3>
              <p className="text-sm text-(--color-gray) mb-2"><i className="fas fa-clock mr-2"></i> 15:00-17:30</p>
              <p className="text-sm text-(--color-gray) mb-2"><i className="fas fa-map-marker-alt mr-2"></i> Kennedy Park</p>
              <p className="text-sm text-(--color-gray)">By: PAN e.V.</p>
            </div>
            <Link to="/events" className="self-center px-4 py-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white text-sm rounded-xs mx-4 transition-colors">
              Register
            </Link>
          </div>
          
          <div className="flex-1 min-w-[300px] max-w-[350px] flex bg-(--color-light) rounded-xs shadow-xs overflow-hidden">
            <div className="bg-(--color-primary) text-white w-20 flex flex-col items-center justify-center">
              <div className="text-sm font-semibold">MAR</div>
              <div className="text-2xl font-bold">25</div>
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-bold mb-2">Sustainability Hackathon</h3>
              <p className="text-sm text-(--color-gray) mb-2"><i className="fas fa-clock mr-2"></i> 10:00-18:00</p>
              <p className="text-sm text-(--color-gray) mb-2"><i className="fas fa-map-marker-alt mr-2"></i> Digital Hub, Jülicher Straße</p>
              <p className="text-sm text-(--color-gray)">By: Energybirds e.V.</p>
            </div>
            <Link to="/events" className="self-center px-4 py-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white text-sm rounded-xs mx-4 transition-colors">
              Register
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/events" className="inline-block font-semibold rounded-xs bg-white hover:bg-(--color-primary-light) text-(--color-primary) border-2 border-(--color-primary) py-2 px-6 transition-all">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;