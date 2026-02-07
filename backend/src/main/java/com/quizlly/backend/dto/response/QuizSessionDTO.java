// src/main/java/com/quizlly/backend/dto/response/QuizSessionDTO.java
package com.quizlly.backend.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record QuizSessionDTO(
    Long attemptId,
    Long contentId,
    List<QuestionDTO> questions,
    LocalDateTime startedAt,
    Integer durationMinutes,
    Boolean timerEnabled
) {}