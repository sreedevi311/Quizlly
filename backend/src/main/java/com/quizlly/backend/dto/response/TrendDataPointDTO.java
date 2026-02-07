// src/main/java/com/quizlly/backend/dto/response/TrendDataPointDTO.java
package com.quizlly.backend.dto.response;

import java.time.LocalDateTime;

public record TrendDataPointDTO(
    LocalDateTime date,
    Double averageScore
) {}