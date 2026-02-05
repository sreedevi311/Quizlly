// src/pages/QuizPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  // Mock questions
  const questions = [
    {
      id: 1,
      concept: 'Photosynthesis',
      text: 'What is the primary function of chlorophyll in photosynthesis?',
      options: [
        'To absorb light energy',
        'To produce oxygen',
        'To store glucose',
        'To absorb carbon dioxide'
      ],
      correctAnswer: 'To absorb light energy'
    },
    // Add more questions...
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        navigate(`/quiz/1/results`);
      }
    }, 3000);
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-pink-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Question </span>
            <span className="font-bold text-pink-600">{currentQuestion + 1}</span>
            <span className="text-gray-600 dark:text-gray-400"> of {questions.length}</span>
          </div>
          
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full px-6 py-3 shadow-lg font-bold">
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100 dark:border-gray-700 mb-8">
          {/* Concept Tag */}
          <div className="inline-block bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            📚 {question.concept}
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">
            {question.text}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                disabled={showFeedback}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedAnswer === option
                    ? showFeedback
                      ? option === question.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                      : 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                    selectedAnswer === option
                      ? 'border-pink-500 bg-pink-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedAnswer === option && (
                      <span className="text-white font-bold">
                        {showFeedback ? (option === question.correctAnswer ? '✓' : '✗') : ''}
                      </span>
                    )}
                  </div>
                  <span className="text-lg text-gray-800 dark:text-white font-medium">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        {showFeedback && selectedAnswer !== question.correctAnswer && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8 animate-fade-in">
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center text-xl">
              <span className="text-2xl mr-2">💡</span>
              Here's why:
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Chlorophyll is the green pigment in plants that captures light energy from the sun, which is essential for the photosynthesis process.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-l-4 border-pink-500">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                "Chlorophyll molecules are arranged in and around photosystems that are embedded in the thylakoid membranes of chloroplasts."
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {!showFeedback && (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {currentQuestion === questions.length - 1 ? '🏁 Finish Quiz' : '➡️ Submit Answer'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;