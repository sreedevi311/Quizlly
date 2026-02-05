// src/components/layout/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎓</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Quizlly
            </span>
          </Link>
          
          <ul className="hidden md:flex space-x-1">
            <li>
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/input" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/input') 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800'
                }`}
              >
                New Quiz
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/dashboard') 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive('/history') 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800'
                }`}
              >
                History
              </Link>
            </li>
          </ul>
          
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow">
              U
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;