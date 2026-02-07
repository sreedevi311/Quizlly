// src/main/java/com/quizlly/backend/dto/response/ProcessedContentDTO.java
package com.quizlly.backend.dto.request;

import java.util.List;

public record ProcessedContentDTO(
    Long contentId,
    List<ConceptDTO> concepts,
    Integer totalQuestions
) {}