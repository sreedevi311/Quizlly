// src/main/java/com/quizlly/backend/dto/response/UserDashboardDTO.java
package com.quizlly.backend.dto.response;

import java.util.List;

public record UserDashboardDTO(
    ProgressSummaryDTO overallProgress,
    List<String> strongConcepts,
    List<String> weakConcepts,
    List<AttemptSummaryDTO> recentAttempts,
    ImprovementTrendDTO improvementTrend
) {}