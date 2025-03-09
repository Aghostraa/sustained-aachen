// src/components/home/Governance.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Governance: React.FC = () => {
  return (
    <section className="bg-(--color-light) py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Governance</h2>
          <p className="text-(--color-gray) max-w-2xl mx-auto">Your voice shapes our collective impact</p>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center mb-12">
          <div className="flex-1 min-w-[300px] max-w-[350px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 text-(--color-primary) flex items-center justify-center text-2xl">
              <i className="fas fa-vote-yea"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Participatory Decision-Making</h3>
            <p className="text-(--color-gray-dark)">Community members propose, discuss, and vote on initiatives using quadratic voting to ensure equitable representation.</p>
          </div>
          
          <div className="flex-1 min-w-[300px] max-w-[350px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 text-(--color-primary) flex items-center justify-center text-2xl">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Verification Council</h3>
            <p className="text-(--color-gray-dark)">A rotating group of diverse stakeholders verifies project outcomes and evaluates real-world impact.</p>
          </div>
          
          <div className="flex-1 min-w-[300px] max-w-[350px] bg-white rounded-xs shadow-xs p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 text-(--color-primary) flex items-center justify-center text-2xl">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Transparent Metrics</h3>
            <p className="text-(--color-gray-dark)">All funding allocations, decision processes, and impact measurements are publicly accessible.</p>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Active Proposals</h3>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xs shadow-xs p-6 relative">
              <div className="absolute top-6 right-6 py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Voting Open</div>
              <h4 className="text-xl font-bold mb-2 pr-28">District Balancing for Q2 Matching Pool</h4>
              <p className="mb-6">Proposal to allocate 30% of the matching pool to underrepresented districts.</p>
              <div className="flex flex-wrap justify-between text-sm text-(--color-gray) mb-4">
                <span>22 votes</span>
                <span>Closes in 3 days</span>
              </div>
              <Link to="/governance" className="inline-block bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-4 py-2 rounded-xs text-sm transition-colors">
                View & Vote
              </Link>
            </div>
            
            <div className="bg-white rounded-xs shadow-xs p-6 relative">
              <div className="absolute top-6 right-6 py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Voting Open</div>
              <h4 className="text-xl font-bold mb-2 pr-28">Adding "Climate Education" Category</h4>
              <p className="mb-6">Create a dedicated project category for initiatives focused on climate education.</p>
              <div className="flex flex-wrap justify-between text-sm text-(--color-gray) mb-4">
                <span>47 votes</span>
                <span>Closes in 5 days</span>
              </div>
              <Link to="/governance" className="inline-block bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-4 py-2 rounded-xs text-sm transition-colors">
                View & Vote
              </Link>
            </div>
            
            <div className="bg-white rounded-xs shadow-xs p-6 relative">
              <div className="absolute top-6 right-6 py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">Discussion</div>
              <h4 className="text-xl font-bold mb-2 pr-28">Impact Verification Framework</h4>
              <p className="mb-6">Developing standardized metrics for evaluating project outcomes.</p>
              <div className="flex flex-wrap justify-between text-sm text-(--color-gray) mb-4">
                <span>15 comments</span>
                <span>Discussion phase: 8 days left</span>
              </div>
              <Link to="/governance" className="inline-block bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-4 py-2 rounded-xs text-sm transition-colors">
                Join Discussion
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/governance" className="inline-block font-semibold rounded-xs bg-white hover:bg-(--color-primary-light) text-(--color-primary) border-2 border-(--color-primary) py-2 px-6 transition-all">
              Explore Governance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Governance;