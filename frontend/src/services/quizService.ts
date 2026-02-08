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

  // Send all answers at once to complete the quiz
  completeQuiz: async (attemptId: number, answers: { questionId: number; answer: string }[]): Promise<QuizResult> => {
    const response = await api.post(`/quiz/${attemptId}/complete`, { answers });
    return response.data;
  },
};