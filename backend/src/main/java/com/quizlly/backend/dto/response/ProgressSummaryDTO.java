// src/main/java/com/quizlly/backend/dto/response/ProgressSummaryDTO.java
package com.quizlly.backend.dto.response;

public record ProgressSummaryDTO(
    Integer totalQuizzesTaken,
    Double averageScore,
    Integer totalConceptsMastered,
    Integer totalQuestionsAnswered
) {}