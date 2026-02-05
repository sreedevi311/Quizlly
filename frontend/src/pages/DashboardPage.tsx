// src/pages/DashboardPage.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  const stats = {
    totalQuizzes: 24,
    averageScore: 82,
    strongConcepts: 15,
    improvementRate: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Your Learning Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {stats.totalQuizzes}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Quizzes</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {stats.averageScore}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Average Score</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700">
            <div className="text-4xl mb-2">💪</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {stats.strongConcepts}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Strong Concepts</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              +{stats.improvementRate}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Improvement</div>
          </div>
        </div>

        {/* Recent Activity & Charts would go here */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-pink-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Performance Trends
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart visualization will be implemented here
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;