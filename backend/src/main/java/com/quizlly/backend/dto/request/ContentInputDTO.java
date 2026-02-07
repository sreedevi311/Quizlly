// src/main/java/com/quizlly/backend/dto/request/ContentInputDTO.java
package com.quizlly.backend.dto.request;

import com.quizlly.backend.entity.ContentType;
import jakarta.validation.constraints.NotNull;

public record ContentInputDTO(
    String text,
    String url,
    @NotNull ContentType type
) {}