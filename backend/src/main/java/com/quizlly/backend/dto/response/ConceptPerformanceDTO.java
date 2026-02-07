// src/main/java/com/quizlly/backend/dto/response/ConceptPerformanceDTO.java
package com.quizlly.backend.dto.response;

import com.quizlly.backend.entity.PerformanceLevel;
import java.util.List;

public record ConceptPerformanceDTO(
    String conceptName,
    Integer correctAnswers,
    Integer totalQuestions,
    Double accuracy,
    PerformanceLevel level,
    List<String> relearningLinks
) {}