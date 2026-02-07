// src/main/java/com/quizlly/backend/dto/request/StartQuizDTO.java
package com.quizlly.backend.dto.request;

import jakarta.validation.constraints.NotNull;

public record StartQuizDTO(
    @NotNull Long contentId,
    boolean timerEnabled,
    Integer durationMinutes
) {}