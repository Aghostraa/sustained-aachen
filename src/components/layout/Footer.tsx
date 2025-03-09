// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-(--color-dark) text-white py-12">
      <div className="container">
        <div className="flex flex-wrap gap-12 mb-12">
          <div className="footer-logo">
            <Link to="/" className="flex items-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--color-primary) text-white font-bold mr-2">S</span>
              <span className="font-bold text-xl">Sustained Aachen</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-wrap gap-12">
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul>
                <li className="mb-2"><Link to="/marketplace" className="hover:text-(--color-primary-light)">Projects</Link></li>
                <li className="mb-2"><Link to="/impact" className="hover:text-(--color-primary-light)">Impact</Link></li>
                <li className="mb-2"><Link to="/learning" className="hover:text-(--color-primary-light)">Learning</Link></li>
                <li className="mb-2"><Link to="/governance" className="hover:text-(--color-primary-light)">Governance</Link></li>
              </ul>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-white font-bold mb-4">Get Involved</h4>
              <ul>
                <li className="mb-2"><Link to="/submit-project" className="hover:text-(--color-primary-light)">Submit a Project</Link></li>
                <li className="mb-2"><Link to="/volunteer" className="hover:text-(--color-primary-light)">Volunteer</Link></li>
                <li className="mb-2"><Link to="/partner" className="hover:text-(--color-primary-light)">Partner With Us</Link></li>
                <li className="mb-2"><Link to="/donate" className="hover:text-(--color-primary-light)">Donate</Link></li>
              </ul>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul>
                <li className="mb-2"><Link to="/about-qf" className="hover:text-(--color-primary-light)">About Quadratic Funding</Link></li>
                <li className="mb-2"><Link to="/guidelines" className="hover:text-(--color-primary-light)">Sustainability Guidelines</Link></li>
                <li className="mb-2"><Link to="/impact" className="hover:text-(--color-primary-light)">Impact Measurement</Link></li>
                <li className="mb-2"><Link to="/faq" className="hover:text-(--color-primary-light)">FAQ</Link></li>
              </ul>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <ul>
                <li className="mb-2"><Link to="/contact" className="hover:text-(--color-primary-light)">Contact Us</Link></li>
                <li className="mb-2"><Link to="/newsletter" className="hover:text-(--color-primary-light)">Newsletter</Link></li>
                <li className="mb-2"><a href="#" className="hover:text-(--color-primary-light)">Twitter</a></li>
                <li className="mb-2"><a href="#" className="hover:text-(--color-primary-light)">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex justify-between flex-wrap text-(--color-gray-light) text-sm">
          <p>&copy; 2025 Sustained Aachen. All rights reserved.</p>
          <p>Made with 💚 for the future of Aachen</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;