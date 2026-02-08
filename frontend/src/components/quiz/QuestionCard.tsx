// src/components/quiz/QuestionCard.tsx
import React from 'react';
import type { Question } from '../../types/quiz.types';

interface Props {
  question: Question;
  onSubmit: (answer: string) => void;
  selectedAnswer: string; // NEW
}

const QuestionCard: React.FC<Props> = ({ question, onSubmit, selectedAnswer }) => {
  const handleSelect = (answer: string) => {
    onSubmit(answer);
  };

  return (
    <div className="question-card bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100 dark:border-gray-700 mb-8">
      {/* Concept Tag */}
      <div className="inline-block bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
        📚 {question.concept}
      </div>

      {/* Question Text */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">
        {question.text}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedAnswer === option
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500'
            } cursor-pointer hover:shadow-lg`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
