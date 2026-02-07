// src/main/java/com/quizlly/backend/dto/response/ConceptDTO.java
package com.quizlly.backend.dto.request;

public record ConceptDTO(
    Long id,
    String name,
    String description,
    Integer questionCount
) {}