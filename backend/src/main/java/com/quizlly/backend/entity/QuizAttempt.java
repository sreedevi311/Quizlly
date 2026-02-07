// src/main/java/com/quizlly/backend/entity/QuizAttempt.java
package com.quizlly.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_attempts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // <-- ADD THIS FIELD
    
    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;
    
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    
    private Integer totalScore;
    private Integer maxScore;
    
    private Boolean timerEnabled;
    private Integer durationMinutes;
    
    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<QuestionResponse> responses = new ArrayList<>();
    
    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ConceptScore> conceptScores = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        startedAt = LocalDateTime.now();
    }
}