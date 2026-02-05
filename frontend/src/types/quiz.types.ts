// types/quiz.types.ts
export type QuestionType = 'MCQ' | 'SHORT_ANSWER';

export type PerformanceLevel = 'WEAK' | 'MODERATE' | 'STRONG';

export interface Question {
  id: number;
  conceptId: number;
  conceptName: string;
  questionText: string;
  type: 'MCQ' | 'SHORT_ANSWER';
  options?: string[];
  difficulty: string;
}

export interface QuizSession {
  attemptId: number;
  contentId: number;
  questions: Question[];
  startedAt: string;
  durationMinutes?: number;
  timerEnabled: boolean;
}

export interface Feedback {
  questionId: number;
  isCorrect: boolean;
  correctAnswer?: string;
  contextParagraph?: string;
  simplifiedExplanation?: string;
  conceptName?: string;
}

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