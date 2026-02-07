// src/main/java/com/quizlly/backend/exception/ResourceNotFoundException.java
package com.quizlly.backend.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}