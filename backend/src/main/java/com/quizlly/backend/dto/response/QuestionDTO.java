// src/main/java/com/quizlly/backend/dto/response/QuestionDTO.java
package com.quizlly.backend.dto.response;

import com.quizlly.backend.entity.DifficultyLevel;
import com.quizlly.backend.entity.QuestionType;
import java.util.List;

public record QuestionDTO(
    Long id,
    Long conceptId,
    String conceptName,
    String questionText,
    QuestionType type,
    List<String> options,
    DifficultyLevel difficulty
) {}