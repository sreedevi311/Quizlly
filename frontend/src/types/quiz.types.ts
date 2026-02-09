// src/types/quiz.types.ts
// Question Type
export const QuestionType = {
  MCQ: 'MCQ',
  SHORT_ANSWER: 'SHORT_ANSWER',
} as const;

export type QuestionType =
  typeof QuestionType[keyof typeof QuestionType];


// Difficulty Level
export const DifficultyLevel = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export type DifficultyLevel =
  typeof DifficultyLevel[keyof typeof DifficultyLevel];


// Performance Level
export const PerformanceLevel = {
  WEAK: 'WEAK',
  MODERATE: 'MODERATE',
  STRONG: 'STRONG',
} as const;

export type PerformanceLevel =
  typeof PerformanceLevel[keyof typeof PerformanceLevel];


export interface Question {
  id: number;
  conceptId: number;
  conceptName: string;
  questionText: string;
  type: QuestionType;
  options: string[];
  difficulty: DifficultyLevel;
  correctAnswer?: string; // Not sent from backend for security
}

// src/types/quiz.types.ts (ADD THESE)

export interface QuizSession {
  attemptId: number;
  contentId: number; // ADD THIS
  questions: Question[];
  startedAt: string; // ADD THIS
  durationMinutes?: number; // ADD THIS
  timerEnabled: boolean; // ADD THIS
}

export interface Feedback {
  questionId: number;
  isCorrect: boolean;
  correctAnswer?: string; // Make optional since it's only sent when wrong
  contextParagraph?: string; // ADD THIS
  simplifiedExplanation?: string; // ADD THIS
  conceptName?: string; // ADD THIS
}

// ADD THIS for results page
export interface ConceptPerformance {
  conceptName: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  level: PerformanceLevel;
  relearningLinks: string[];
}

export interface QuizResult {
  totalScore: number;
  maxScore: number;
  overallAccuracy: number;
  conceptPerformance: ConceptPerformance[];
  wrongAnswerFeedback: Feedback[];
  gamifiedTitle: string;
  overallSummary: string;
}