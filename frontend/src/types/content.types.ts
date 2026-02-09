// src/types/content.types.ts
// content.types.ts
export const ContentType = {
  TEXT: 'TEXT',
  URL: 'URL',
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];


export interface ContentInputDTO {
  text?: string;
  url?: string;
  type: ContentType;
}

export interface ConceptDTO {
  conceptName: string;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  level: 'WEAK' | 'AVERAGE' | 'STRONG';
}

export interface ProcessedContentDTO {
  contentId: number;
  concepts: ConceptDTO[];
  totalQuestions: number;
}