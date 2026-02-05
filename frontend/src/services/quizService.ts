// services/quizService.ts
import api from './api';
import type { QuizSession, Feedback, QuizResult } from '../types/quiz.types';

export const quizService = {
  startQuiz: async (contentId: number, timerEnabled: boolean, durationMinutes?: number): Promise<QuizSession> => {
    const response = await api.post('/quiz/start', {
      contentId,
      timerEnabled,
      durationMinutes,
    });
    return response.data;
  },

  submitAnswer: async (attemptId: number, questionId: number, answer: string): Promise<Feedback> => {
    const response = await api.post('/quiz/submit-answer', {
      attemptId,
      questionId,
      answer,
    });
    return response.data;
  },

  completeQuiz: async (attemptId: number): Promise<QuizResult> => {
    const response = await api.post(`/quiz/${attemptId}/complete`);
    return response.data;
  },
};