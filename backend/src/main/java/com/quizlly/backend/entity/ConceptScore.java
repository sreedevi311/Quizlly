// src/main/java/com/quizlly/backend/entity/ConceptScore.java
package com.quizlly.backend.entity;
import com.quizlly.backend.entity.PerformanceLevel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "concept_scores")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConceptScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private QuizAttempt attempt;
    
    @ManyToOne
    @JoinColumn(name = "concept_id")
    private Concept concept;
    
    private Integer correctAnswers;
    private Integer totalQuestions;
    private Double accuracyPercentage;
    
    @Enumerated(EnumType.STRING)
    private PerformanceLevel level;
}
