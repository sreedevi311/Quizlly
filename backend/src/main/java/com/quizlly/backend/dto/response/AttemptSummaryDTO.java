// src/main/java/com/quizlly/backend/dto/response/AttemptSummaryDTO.java
package com.quizlly.backend.dto.response;

import java.time.LocalDateTime;

public record AttemptSummaryDTO(
    Long attemptId,
    Long contentId,
    String contentTitle,
    Integer score,
    Integer maxScore,
    Double accuracy,
    LocalDateTime completedAt
) {}