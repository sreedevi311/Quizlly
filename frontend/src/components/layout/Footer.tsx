// src/components/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; 2026 Quizlly. Built to enhance conceptual learning.
          </p>
          <div className="flex space-x-6">
            <a href="/about" className="text-pink-500 hover:text-pink-600 transition-colors">
              About
            </a>
            <a href="/privacy" className="text-pink-500 hover:text-pink-600 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-pink-500 hover:text-pink-600 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;