// hooks/useQuizSession.ts
import { useState, useCallback } from 'react';
import { quizService } from '../services/quizService';
import type { QuizSession, Feedback } from '../types/quiz.types';

export const useQuizSession = () => {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const startQuiz = useCallback(async (contentId: number, timerEnabled: boolean, duration?: number) => {
    setLoading(true);
    try {
      const quizSession = await quizService.startQuiz(contentId, timerEnabled, duration);
      setSession(quizSession);
      setCurrentQuestionIndex(0);
      setFeedback([]);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (questionId: number, answer: string) => {
    if (!session) return;
    
    try {
      const feedbackData = await quizService.submitAnswer(session.attemptId, questionId, answer);
      setFeedback(prev => [...prev, feedbackData]);
      
      // Move to next question after a delay if incorrect
      if (!feedbackData.isCorrect) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
        }, 3000);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  }, [session]);

  return {
    session,
    currentQuestionIndex,
    feedback,
    loading,
    startQuiz,
    submitAnswer,
  };
};

