// src/main/java/com/quizlly/backend/dto/request/SubmitAnswerDTO.java
package com.quizlly.backend.dto.request;

import jakarta.validation.constraints.NotNull;

public record SubmitAnswerDTO(
    @NotNull Long attemptId,
    @NotNull Long questionId,
    @NotNull String answer
) {}