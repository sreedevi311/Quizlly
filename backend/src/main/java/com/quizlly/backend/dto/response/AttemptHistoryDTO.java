// src/main/java/com/quizlly/backend/dto/response/AttemptHistoryDTO.java
package com.quizlly.backend.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record AttemptHistoryDTO(
    Long attemptId,
    Long contentId,
    String contentTitle,
    Integer totalScore,
    Integer maxScore,
    Double accuracy,
    LocalDateTime completedAt,
    List<ConceptPerformanceDTO> conceptPerformance
) {}