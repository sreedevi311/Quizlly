// src/pages/QuizPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/quiz/QuestionCard';
import { useQuizSession } from '../hooks/useQuizSession';
import type { Question } from '../types/quiz.types';

const QuizPage: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const navigate = useNavigate();
  const { session, startQuiz, completeQuiz, } = useQuizSession();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min timer

  // Start quiz when page loads
  useEffect(() => {
    if (!contentId) return;
    startQuiz(Number(contentId), true);
  }, [contentId, startQuiz]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (!session) return;
    const questionId = session.questions[currentQuestionIndex].id;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = async () => {
    if (!session) return;

    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Submit all answers at once
      try {
        const result = await completeQuiz();
        navigate(`/quiz/${session.attemptId}/results`, { state: { result } });
      } catch (error) {
        console.error('Failed to complete quiz', error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session) return <p>Loading quiz...</p>;

  const question: Question = session.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-pink-200 dark:border-gray-700">
            <span className='font-bold text-white'>Question </span>
            <span className="font-bold text-pink-600">{currentQuestionIndex + 1}</span>
            <span className='font-bold text-white'> of {session.questions.length}</span>
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
              style={{ width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={question}
          onSubmit={handleAnswerSelect}
          selectedAnswer={selectedAnswers[question.id] || ''}
        />

        {/* Next / Finish Button */}
        <button
          onClick={handleNext}
          disabled={!selectedAnswers[question.id]}
          className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
        >
          {currentQuestionIndex === session.questions.length - 1 ? '🏁 Finish Quiz' : '➡️ Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
