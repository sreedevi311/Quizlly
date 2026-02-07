// src/main/java/com/quizlly/backend/service/QuestionGenerationService.java
package com.quizlly.backend.service;

import com.quizlly.backend.entity.Concept;
import com.quizlly.backend.entity.DifficultyLevel;
import com.quizlly.backend.entity.Question;
import com.quizlly.backend.entity.QuestionType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class QuestionGenerationService {
    
    public List<Question> generateQuestions(Concept concept) {
        // Template-based question generation for MVP
        // TODO: Replace with AI-powered generation later
        
        List<Question> questions = new ArrayList<>();
        
        // Generate 3-5 questions per concept
        questions.add(generateDefinitionQuestion(concept));
        questions.add(generateApplicationQuestion(concept));
        questions.add(generateAnalysisQuestion(concept));
        
        return questions;
    }
    
    private Question generateDefinitionQuestion(Concept concept) {
        return Question.builder()
            .concept(concept)
            .questionText("What is " + concept.getName() + "?")
            .type(QuestionType.MCQ)
            .options(Arrays.asList(
                concept.getDescription(),
                "An unrelated process",
                "A type of cell division",
                "A chemical reaction"
            ))
            .correctAnswer(concept.getDescription())
            .difficulty(DifficultyLevel.EASY)
            .build();
    }
    
    private Question generateApplicationQuestion(Concept concept) {
        return Question.builder()
            .concept(concept)
            .questionText("How does " + concept.getName() + " work in biological systems?")
            .type(QuestionType.MCQ)
            .options(Arrays.asList(
                "It involves multiple steps and processes",
                "It happens instantly",
                "It doesn't occur naturally",
                "It only happens in labs"
            ))
            .correctAnswer("It involves multiple steps and processes")
            .difficulty(DifficultyLevel.MEDIUM)
            .build();
    }
    
    private Question generateAnalysisQuestion(Concept concept) {
        return Question.builder()
            .concept(concept)
            .questionText("What is the primary function of " + concept.getName() + "?")
            .type(QuestionType.MCQ)
            .options(Arrays.asList(
                "To maintain biological processes",
                "To destroy cells",
                "To create waste products",
                "To stop growth"
            ))
            .correctAnswer("To maintain biological processes")
            .difficulty(DifficultyLevel.HARD)
            .build();
    }
}