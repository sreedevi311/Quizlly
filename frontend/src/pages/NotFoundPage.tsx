// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl mb-4">🤔</div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Page not found
        </p>
        <Link 
          to="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;