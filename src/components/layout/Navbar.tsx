// src/components/layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-(--color-dark) text-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="flex items-center">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--color-primary) text-white font-bold mr-2">S</span>
            <span className="font-bold text-xl">Sustained</span>
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          <li><Link to="/marketplace" className="hover:text-(--color-primary-light) transition-colors">Projects</Link></li>
          <li><Link to="/impact" className="hover:text-(--color-primary-light) transition-colors">Impact</Link></li>
          <li><Link to="/learning" className="hover:text-(--color-primary-light) transition-colors">Learning</Link></li>
          <li><Link to="/governance" className="hover:text-(--color-primary-light) transition-colors">Governance</Link></li>
          <li><Link to="/dashboard" className="bg-(--color-primary) hover:bg-(--color-primary-dark) transition-colors px-4 py-2 rounded-xs text-white">My Dashboard</Link></li>
        </ul>
        <button className="md:hidden">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;