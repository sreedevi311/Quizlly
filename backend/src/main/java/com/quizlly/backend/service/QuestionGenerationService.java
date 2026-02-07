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
        List<Question> questions = new ArrayList<>();
        
        questions.add(generateDefinitionQuestion(concept));
        questions.add(generateApplicationQuestion(concept));
        questions.add(generateAnalysisQuestion(concept));
        
        return questions;
    }
    
    private Question generateDefinitionQuestion(Concept concept) {
        Question question = new Question();
        question.setConcept(concept);
        question.setQuestionText("What is " + concept.getName() + "?");
        question.setType(QuestionType.MCQ);
        question.setOptions(Arrays.asList(
            concept.getDescription(),
            "An unrelated process",
            "A type of cell division",
            "A chemical reaction"
        ));
        question.setCorrectAnswer(concept.getDescription());
        question.setDifficulty(DifficultyLevel.EASY);
        
        return question;
    }
    
    private Question generateApplicationQuestion(Concept concept) {
        Question question = new Question();
        question.setConcept(concept);
        question.setQuestionText("How does " + concept.getName() + " work in biological systems?");
        question.setType(QuestionType.MCQ);
        question.setOptions(Arrays.asList(
            "It involves multiple steps and processes",
            "It happens instantly",
            "It doesn't occur naturally",
            "It only happens in labs"
        ));
        question.setCorrectAnswer("It involves multiple steps and processes");
        question.setDifficulty(DifficultyLevel.MEDIUM);
        
        return question;
    }
    
    private Question generateAnalysisQuestion(Concept concept) {
        Question question = new Question();
        question.setConcept(concept);
        question.setQuestionText("What is the primary function of " + concept.getName() + "?");
        question.setType(QuestionType.MCQ);
        question.setOptions(Arrays.asList(
            "To maintain biological processes",
            "To destroy cells",
            "To create waste products",
            "To stop growth"
        ));
        question.setCorrectAnswer("To maintain biological processes");
        question.setDifficulty(DifficultyLevel.HARD);
        
        return question;
    }
}