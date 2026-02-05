// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight">
            Master Concepts, Not Just Answers
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Transform any educational content into personalized quizzes with 
            concept-level feedback and performance tracking.
          </p>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/input')}
          >
            Start Learning Now →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-pink-100 dark:border-gray-700">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Smart Content Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Paste text or provide URLs - we extract key concepts automatically
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-pink-100 dark:border-gray-700">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Concept-Based Evaluation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Identify your strong and weak concepts with detailed analytics
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-pink-100 dark:border-gray-700">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Contextual Feedback
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get explanations tied to original content for better understanding
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-pink-100 dark:border-gray-700">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                Track Your Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor improvement over time with comprehensive dashboards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-pink-100">Quizzes Generated</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-pink-100">Concept Mastery Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-pink-100">Concepts Learned</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;