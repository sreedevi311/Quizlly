// src/pages/ResultsPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  // Mock data
  const results = {
    totalScore: 15,
    maxScore: 20,
    accuracy: 75,
    gamifiedTitle: '🌟 Biology Enthusiast',
    summary: 'Great job! You have a solid understanding of photosynthesis and plant biology.',
    conceptPerformance: [
      { name: 'Photosynthesis', correct: 4, total: 5, accuracy: 80, level: 'STRONG' },
      { name: 'Cellular Respiration', correct: 2, total: 4, accuracy: 50, level: 'WEAK' },
      { name: 'Plant Structure', correct: 3, total: 3, accuracy: 100, level: 'STRONG' },
      { name: 'Chloroplast Function', correct: 3, total: 4, accuracy: 75, level: 'MODERATE' },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with Score */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full text-xl font-bold mb-6">
            {results.gamifiedTitle}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-pink-100 dark:border-gray-700 mb-8">
            <div className="text-8xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              {results.accuracy}%
            </div>
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              Score: <span className="font-bold text-pink-600">{results.totalScore}/{results.maxScore}</span>
            </p>
          </div>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {results.summary}
          </p>
        </div>

        {/* Concept Performance Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            📊 Concept Performance
          </h2>
          
          <div className="space-y-4">
            {results.conceptPerformance.map((concept, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {concept.name}
                  </h3>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    concept.level === 'STRONG' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                      : concept.level === 'MODERATE'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {concept.level === 'STRONG' ? '💪 Strong' : concept.level === 'MODERATE' ? '👍 Good' : '📚 Needs Practice'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 dark:text-gray-400">
                    {concept.correct} / {concept.total} correct
                  </span>
                  <span className="font-bold text-pink-600">
                    {concept.accuracy}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      concept.level === 'STRONG' 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : concept.level === 'MODERATE'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${concept.accuracy}%` }}
                  />
                </div>

                {concept.level === 'WEAK' && (
                  <div className="mt-4 bg-pink-50 dark:bg-gray-900 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      📖 Recommended resources:
                    </p>
                    <a href="#" className="text-pink-600 hover:text-pink-700 text-sm font-semibold">
                      → Review: Understanding {concept.name}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="py-4 bg-white dark:bg-gray-800 border-2 border-pink-500 text-pink-600 dark:text-pink-400 text-lg font-bold rounded-2xl hover:bg-pink-50 dark:hover:bg-gray-700 transition-all"
          >
            📊 View Dashboard
          </button>
          <button 
            onClick={() => navigate('/input')}
            className="py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            🚀 Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;