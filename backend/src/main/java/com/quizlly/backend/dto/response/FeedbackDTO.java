// src/main/java/com/quizlly/backend/dto/response/FeedbackDTO.java
package com.quizlly.backend.dto.response;

public record FeedbackDTO(
    Long questionId,
    Boolean isCorrect,
    String correctAnswer,
    String contextParagraph,
    String simplifiedExplanation,
    String conceptName
) {}