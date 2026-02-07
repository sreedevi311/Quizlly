// src/main/java/com/quizlly/backend/dto/response/ImprovementTrendDTO.java
package com.quizlly.backend.dto.response;

import java.util.List;

public record ImprovementTrendDTO(
    Double overallImprovementPercentage,
    List<TrendDataPointDTO> dataPoints
) {}