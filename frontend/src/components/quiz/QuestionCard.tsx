// src/components/quiz/QuestionCard.tsx
import React from 'react';
import type { Question } from '../../types/quiz.types';

interface Props {
  question: Question;
  onSubmit: (answer: string) => void;
  selectedAnswer: string;
  disabled?: boolean;
}

const QuestionCard: React.FC<Props> = ({ 
  question, 
  onSubmit, 
  selectedAnswer,
  disabled = false 
}) => {
  const handleSelect = (answer: string) => {
    if (!disabled) {
      onSubmit(answer);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'HARD':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="question-card bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 border border-pink-100 dark:border-gray-700 mb-4">
      {/* Header with Concept and Difficulty */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-block bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-semibold">
          📚 {question.conceptName}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">
        {question.questionText}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={disabled}
            className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedAnswer === option
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500'
            } ${
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-lg'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                selectedAnswer === option
                  ? 'border-pink-500 bg-pink-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {selectedAnswer === option && (
                  <span className="text-white font-bold text-lg">✓</span>
                )}
              </div>
              <span className="text-lg text-gray-800 dark:text-white font-medium">
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Question Type Indicator */}
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Type: {question.type === 'MCQ' ? 'Multiple Choice' : 'Short Answer'}
      </div>
    </div>
  );
};

export default QuestionCard;
