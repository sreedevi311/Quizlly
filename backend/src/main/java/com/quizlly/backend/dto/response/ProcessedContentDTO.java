// src/main/java/com/quizlly/backend/dto/response/ProcessedContentDTO.java
package com.quizlly.backend.dto.response;

import java.util.List;

public record ProcessedContentDTO(
    Long contentId,
    List<ConceptPerformanceDTO> concepts,
    int totalQuestions
) {}
