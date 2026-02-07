package com.quizlly.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Concept concept;

    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @ElementCollection
    private List<String> options;

    private String correctAnswer;

    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficulty;
}
