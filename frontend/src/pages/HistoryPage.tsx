// src/pages/HistoryPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const attempts = [
    { id: 1, topic: 'Biology - Photosynthesis', date: '2026-02-04', score: 85, total: 100 },
    { id: 2, topic: 'Physics - Newton\'s Laws', date: '2026-02-03', score: 92, total: 100 },
    { id: 3, topic: 'Chemistry - Atomic Structure', date: '2026-02-01', score: 78, total: 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Quiz History
        </h1>

        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div 
              key={attempt.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700 hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => navigate(`/quiz/${attempt.id}/results`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {attempt.topic}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {attempt.date}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-pink-600 mb-1">
                    {attempt.score}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {(attempt.score * attempt.total) / 100}/{attempt.total}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;