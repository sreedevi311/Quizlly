// src/types/quiz.types.ts

export interface Question {
  id: number;
  concept: string;
  text: string;
  options: string[];
  correctAnswer?: string; // optional if server doesn’t send correct answer
}

export interface QuizResult {
  attemptId: number;
  totalScore: number;
  questionResults: {
    questionId: number;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

export interface QuizSession {
  attemptId: number;
  questions: Question[];
}

export interface Feedback {
  questionId: number;
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string; // optional explanation for the answer
}
