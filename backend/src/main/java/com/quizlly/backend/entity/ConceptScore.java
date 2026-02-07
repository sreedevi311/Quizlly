// src/main/java/com/quizlly/backend/entity/ConceptScore.java
package com.quizlly.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "concept_scores")
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

    // Constructors
    public ConceptScore() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public QuizAttempt getAttempt() { return attempt; }
    public void setAttempt(QuizAttempt attempt) { this.attempt = attempt; }

    public Concept getConcept() { return concept; }
    public void setConcept(Concept concept) { this.concept = concept; }

    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }

    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public Double getAccuracyPercentage() { return accuracyPercentage; }
    public void setAccuracyPercentage(Double accuracyPercentage) { this.accuracyPercentage = accuracyPercentage; }

    public PerformanceLevel getLevel() { return level; }
    public void setLevel(PerformanceLevel level) { this.level = level; }
}