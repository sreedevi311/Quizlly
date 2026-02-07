// src/main/java/com/quizlly/backend/entity/QuestionResponse.java
package com.quizlly.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question_responses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private QuizAttempt attempt;
    
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    
    private String userAnswer;
    private Boolean isCorrect;
    private Integer pointsEarned;
}