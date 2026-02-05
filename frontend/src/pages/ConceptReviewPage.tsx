// src/pages/ConceptReviewPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ConceptReviewPage: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const navigate = useNavigate();
  const [timerEnabled, setTimerEnabled] = useState(false);

  // Mock data - replace with API call
  const concepts = [
    { id: 1, name: 'Photosynthesis', questionCount: 5, difficulty: 'Medium' },
    { id: 2, name: 'Cellular Respiration', questionCount: 4, difficulty: 'Hard' },
    { id: 3, name: 'Plant Structure', questionCount: 3, difficulty: 'Easy' },
    { id: 4, name: 'Chloroplast Function', questionCount: 4, difficulty: 'Medium' },
  ];

  const totalQuestions = concepts.reduce((sum, c) => sum + c.questionCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Concepts Identified
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            We've extracted <span className="font-bold text-pink-600">{concepts.length}</span> key concepts with <span className="font-bold text-pink-600">{totalQuestions}</span> questions
          </p>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {concepts.map((concept, index) => (
            <div 
              key={concept.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                  <span className="text-3xl mr-3">{index === 0 ? '🌱' : index === 1 ? '⚡' : index === 2 ? '🌿' : '🔬'}</span>
                  {concept.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  concept.difficulty === 'Easy' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : concept.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {concept.difficulty}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-pink-600">{concept.questionCount}</span> questions prepared
              </p>
            </div>
          ))}
        </div>

        {/* Quiz Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-pink-100 dark:border-gray-700 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Quiz Settings</h3>
          
          <label className="flex items-center space-x-4 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-rose-500 transition-all"></div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                ⏱️ Enable Timer
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                30 minutes for {totalQuestions} questions
              </div>
            </div>
          </label>
        </div>

        {/* Start Button */}
        <button 
          className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-2xl font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          onClick={() => navigate(`/quiz/${contentId}`)}
        >
          🚀 Start Quiz
        </button>

        {/* Info Box */}
        <div className="mt-8 bg-pink-50 dark:bg-gray-800 rounded-2xl p-6 border border-pink-200 dark:border-gray-700">
          <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center">
            <span className="text-2xl mr-2">ℹ️</span>
            What to Expect
          </h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>✓ Instant feedback on wrong answers</li>
            <li>✓ Contextual explanations from your content</li>
            <li>✓ Concept-wise performance breakdown</li>
            <li>✓ Personalized improvement suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConceptReviewPage;