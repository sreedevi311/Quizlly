// hooks/useQuizSession.ts
import { useState, useCallback } from 'react';
import { quizService } from '../services/quizService';
import type { QuizSession, QuizResult } from '../types/quiz.types';

export const useQuizSession = () => {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ questionId: number; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const startQuiz = useCallback(async (contentId: number, timerEnabled: boolean, duration?: number) => {
    setLoading(true);
    try {
      const quizSession = await quizService.startQuiz(contentId, timerEnabled, duration);
      setSession(quizSession);
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswerLocally = useCallback((questionId: number, answer: string) => {
    setSelectedAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => (a.questionId === questionId ? { questionId, answer } : a));
      }
      return [...prev, { questionId, answer }];
    });
  }, []);

  const completeQuiz = useCallback(async () => {
    if (!session) return null;
    setLoading(true);
    try {
      const result = await quizService.completeQuiz(session.attemptId, selectedAnswers);
      return result;
    } catch (error) {
      console.error('Failed to complete quiz:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [session, selectedAnswers]);

  return {
    session,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswers,
    startQuiz,
    submitAnswerLocally,
    completeQuiz,
    loading,
  };
};
