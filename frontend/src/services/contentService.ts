// src/services/contentService.ts
import api from './api';
import type { ContentInputDTO, ProcessedContentDTO, ConceptDTO } from '../types/content.types';

export const contentService = {
  processContent: async (input: ContentInputDTO): Promise<ProcessedContentDTO> => {
    const response = await api.post('/content/process', input);
    console.log('API response:', response.data);
    return response.data;
  },

  getConceptsByContentId: async (contentId: number): Promise<ConceptDTO[]> => {
    const response = await api.get(`/content/${contentId}/concepts`);
    return response.data;
  },
};