// src/main/java/com/quizlly/backend/dto/response/QuizResultDTO.java
package com.quizlly.backend.dto.response;

import java.util.List;

public record QuizResultDTO(
    Integer totalScore,
    Integer maxScore,
    Double overallAccuracy,
    List<ConceptPerformanceDTO> conceptPerformance,
    List<FeedbackDTO> wrongAnswerFeedback,
    String gamifiedTitle,
    String overallSummary
) {}