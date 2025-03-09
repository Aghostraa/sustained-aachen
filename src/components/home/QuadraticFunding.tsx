// src/components/home/QuadraticFunding.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuadraticFunding: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Quadratic Funding</h2>
          <p className="text-(--color-gray) max-w-2xl mx-auto">Where small contributions make a big difference</p>
        </div>
        
        <div className="flex flex-wrap lg:flex-nowrap gap-12 mb-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">How Quadratic Funding Works</h3>
            <p className="mb-4">Quadratic Funding mathematically rewards projects with many contributors over projects with few large donors, creating more democratic funding distribution.</p>
            <div className="bg-(--color-light) p-4 rounded-xs font-mono text-center mb-6">
              <p>Matching Amount = (√Sum of contributions)² - Sum of contributions</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xs mb-6">
              <p><strong>Example:</strong> 25 people contributing €10 each generates more matching funds than 1 person contributing €250.</p>
            </div>
            <a href="#calculator" className="inline-block font-semibold rounded-xs bg-white hover:bg-(--color-primary-light) text-(--color-primary) border-2 border-(--color-primary) py-2 px-6 transition-all">
              Try the Calculator
            </a>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/quadratic-funding.svg" alt="Quadratic Funding Visualization" className="max-w-full h-auto"/>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-center text-2xl font-bold mb-8">Featured Projects</h3>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Project Card 1 */}
            <div className="flex-1 min-w-[300px] max-w-[350px] bg-white rounded-lg overflow-hidden shadow-sm border border-(--color-gray-light)">
              <div className="p-4 bg-green-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-(--color-success) text-white flex items-center justify-center font-bold">ER</div>
                <div className="font-semibold">Ernährungsrat Aachen</div>
              </div>
              <div className="p-4">
                <p className="mb-4">Regional food hub connecting local farmers with urban consumers.</p>
                <div className="mb-2 flex justify-between text-sm">
                  <span>€1,427.50 raised</span>
                  <span>42 contributors</span>
                </div>
                <div className="h-2 bg-(--color-gray-light) rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-(--color-success) rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <Link to="/marketplace" className="block w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-2 text-center transition-colors">
                Fund This Project
              </Link>
            </div>
            
            {/* Project Card 2 */}
            <div className="flex-1 min-w-[300px] max-w-[350px] bg-white rounded-lg overflow-hidden shadow-sm border border-(--color-gray-light)">
              <div className="p-4 bg-blue-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-(--color-primary) text-white flex items-center justify-center font-bold">BM</div>
                <div className="font-semibold">Bewegungsmelder Aachen</div>
              </div>
              <div className="p-4">
                <p className="mb-4">Platform connecting people with social and environmental initiatives.</p>
                <div className="mb-2 flex justify-between text-sm">
                  <span>€2,184.75 raised</span>
                  <span>78 contributors</span>
                </div>
                <div className="h-2 bg-(--color-gray-light) rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-(--color-primary) rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              <Link to="/marketplace" className="block w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-2 text-center transition-colors">
                Fund This Project
              </Link>
            </div>
            
            {/* Project Card 3 */}
            <div className="flex-1 min-w-[300px] max-w-[350px] bg-white rounded-lg overflow-hidden shadow-sm border border-(--color-gray-light)">
              <div className="p-4 bg-amber-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-(--color-accent-1) text-white flex items-center justify-center font-bold">AW</div>
                <div className="font-semibold">Aachen Was Geht</div>
              </div>
              <div className="p-4">
                <p className="mb-4">Local platform highlighting sustainable events and community initiatives.</p>
                <div className="mb-2 flex justify-between text-sm">
                  <span>€1,865.22 raised</span>
                  <span>63 contributors</span>
                </div>
                <div className="h-2 bg-(--color-gray-light) rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-(--color-accent-1) rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <Link to="/marketplace" className="block w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white py-2 text-center transition-colors">
                Fund This Project
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/marketplace" className="inline-block font-semibold rounded-xs bg-white hover:bg-(--color-primary-light) text-(--color-primary) border-2 border-(--color-primary) py-2 px-6 transition-all">
              View All Projects
            </Link>
          </div>
        </div>
        
        <div id="calculator" className="bg-(--color-light) p-8 rounded-lg">
          <h3 className="text-center text-2xl font-bold mb-8">Quadratic Funding Calculator</h3>
          <div className="flex flex-wrap gap-8">
            <div className="flex-1 min-w-[300px]">
              <div className="mb-6">
                <label htmlFor="contribution-amount" className="block mb-2 font-semibold">Your Contribution (€)</label>
                <input type="number" id="contribution-amount" defaultValue="10" min="1" className="w-full p-3 border border-(--color-gray-light) rounded-xs" />
              </div>
              <div className="mb-6">
                <label htmlFor="total-contributors" className="block mb-2 font-semibold">Number of Contributors</label>
                <input type="number" id="total-contributors" defaultValue="50" min="1" className="w-full p-3 border border-(--color-gray-light) rounded-xs" />
              </div>
              <div className="mb-6">
                <label htmlFor="matching-pool" className="block mb-2 font-semibold">Matching Pool Size (€)</label>
                <input type="number" id="matching-pool" defaultValue="15000" min="100" className="w-full p-3 border border-(--color-gray-light) rounded-xs" />
              </div>
              <button id="calculate-button" className="w-full bg-(--color-primary) hover:bg-(--color-primary-dark) text-white font-semibold py-3 rounded-xs transition-all">
                Calculate Impact
              </button>
            </div>
            <div className="flex-1 min-w-[300px] flex flex-col gap-4">
              <div className="bg-(--color-light) p-4 rounded-xs text-center">
                <h4 className="mb-2 text-(--color-gray)">Direct Contribution</h4>
                <div className="text-3xl font-bold">€10.00</div>
              </div>
              <div className="bg-(--color-primary) text-white p-4 rounded-xs text-center">
                <h4 className="mb-2 text-blue-100">Matching Amount</h4>
                <div className="text-3xl font-bold">€105.26</div>
              </div>
              <div className="bg-(--color-light) p-4 rounded-xs text-center">
                <h4 className="mb-2 text-(--color-gray)">Total Impact</h4>
                <div className="text-3xl font-bold">€115.26</div>
              </div>
              <p className="text-center mt-4 text-(--color-gray)">
                Your €10 contribution generates an additional €105.26 in matching funds, multiplying your impact by 11.5x!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuadraticFunding;