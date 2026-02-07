// src/main/java/com/quizlly/backend/service/QuizService.java
package com.quizlly.backend.service;

import com.quizlly.backend.dto.request.StartQuizDTO;
import com.quizlly.backend.dto.request.SubmitAnswerDTO;
import com.quizlly.backend.dto.response.*;
import com.quizlly.backend.entity.*;
import com.quizlly.backend.exception.ResourceNotFoundException;
import com.quizlly.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {
    
    @Autowired
    private ContentRepository contentRepository;
    
    @Autowired
    private QuizAttemptRepository attemptRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private QuestionResponseRepository responseRepository;
    
    @Autowired
    private ConceptScoreRepository conceptScoreRepository;
    
    @Autowired
    private UserService userService;
    
    @Transactional
    public QuizSessionDTO startQuiz(StartQuizDTO dto) {
        Content content = contentRepository.findById(dto.contentId())
            .orElseThrow(() -> new ResourceNotFoundException("Content not found"));
        
        User currentUser = userService.getCurrentUser();
        
        QuizAttempt attempt = QuizAttempt.builder()
            .content(content)
            .user(currentUser)
            .timerEnabled(dto.timerEnabled())
            .durationMinutes(dto.durationMinutes())
            .build();
        
        attempt = attemptRepository.save(attempt);
        
        // Fetch all questions for this content
        List<Question> questions = questionRepository.findByConcept_Content_Id(dto.contentId());
        
        List<QuestionDTO> questionDTOs = questions.stream()
            .map(this::mapToQuestionDTO)
            .collect(Collectors.toList());
        
        return new QuizSessionDTO(
            attempt.getId(),
            content.getId(),
            questionDTOs,
            attempt.getStartedAt(),
            dto.durationMinutes(),
            dto.timerEnabled()
        );
    }
    
    @Transactional
    public FeedbackDTO submitAnswer(SubmitAnswerDTO dto) {
        QuizAttempt attempt = attemptRepository.findById(dto.attemptId())
            .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found"));
        
        Question question = questionRepository.findById(dto.questionId())
            .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        
        boolean isCorrect = evaluateAnswer(question, dto.answer());
        
        QuestionResponse response = QuestionResponse.builder()
            .attempt(attempt)
            .question(question)
            .userAnswer(dto.answer())
            .isCorrect(isCorrect)
            .pointsEarned(isCorrect ? 1 : 0)
            .build();
        
        responseRepository.save(response);
        
        if (!isCorrect) {
            return new FeedbackDTO(
                question.getId(),
                false,
                question.getCorrectAnswer(),
                question.getConcept().getContextParagraph(),
                question.getConcept().getSimplifiedExplanation(),
                question.getConcept().getName()
            );
        }
        
        return new FeedbackDTO(question.getId(), true, null, null, null, null);
    }
    
    @Transactional
    public QuizResultDTO completeQuiz(Long attemptId) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
            .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found"));
        
        // Calculate scores
        List<QuestionResponse> responses = responseRepository.findByAttemptId(attemptId);
        
        int totalScore = responses.stream()
            .mapToInt(QuestionResponse::getPointsEarned)
            .sum();
        
        attempt.setCompletedAt(LocalDateTime.now());
        attempt.setTotalScore(totalScore);
        attempt.setMaxScore(responses.size());
        
        // Calculate concept-wise performance
        Map<Concept, List<QuestionResponse>> conceptResponses = responses.stream()
            .collect(Collectors.groupingBy(r -> r.getQuestion().getConcept()));
        
        List<ConceptScore> conceptScores = conceptResponses.entrySet().stream()
            .map(entry -> calculateConceptScore(entry.getKey(), entry.getValue(), attempt))
            .collect(Collectors.toList());
        
        conceptScoreRepository.saveAll(conceptScores);
        attemptRepository.save(attempt);
        
        // Generate result
        return generateQuizResult(attempt, conceptScores, responses);
    }
    
    private boolean evaluateAnswer(Question question, String userAnswer) {
        if (question.getType() == QuestionType.MCQ) {
            return question.getCorrectAnswer().trim().equalsIgnoreCase(userAnswer.trim());
        } else {
            // For short answers, simple string matching (can be enhanced with NLP later)
            return question.getCorrectAnswer().toLowerCase().contains(userAnswer.toLowerCase());
        }
    }
    
    private ConceptScore calculateConceptScore(Concept concept, List<QuestionResponse> responses, QuizAttempt attempt) {
        int correctAnswers = (int) responses.stream()
            .filter(QuestionResponse::getIsCorrect)
            .count();
        
        int totalQuestions = responses.size();
        double accuracy = (correctAnswers * 100.0) / totalQuestions;
        
        PerformanceLevel level;
        if (accuracy >= 75) {
            level = PerformanceLevel.STRONG;
        } else if (accuracy >= 50) {
            level = PerformanceLevel.MODERATE;
        } else {
            level = PerformanceLevel.WEAK;
        }
        
        return ConceptScore.builder()
            .attempt(attempt)
            .concept(concept)
            .correctAnswers(correctAnswers)
            .totalQuestions(totalQuestions)
            .accuracyPercentage(accuracy)
            .level(level)
            .build();
    }
    
    private QuizResultDTO generateQuizResult(QuizAttempt attempt, List<ConceptScore> conceptScores, List<QuestionResponse> responses) {
        double overallAccuracy = (attempt.getTotalScore() * 100.0) / attempt.getMaxScore();
        
        List<ConceptPerformanceDTO> conceptPerformance = conceptScores.stream()
            .map(cs -> new ConceptPerformanceDTO(
                cs.getConcept().getName(),
                cs.getCorrectAnswers(),
                cs.getTotalQuestions(),
                cs.getAccuracyPercentage(),
                cs.getLevel(),
                generateRelearningLinks(cs.getConcept().getName(), cs.getLevel())
            ))
            .collect(Collectors.toList());
        
        List<FeedbackDTO> wrongAnswers = responses.stream()
            .filter(r -> !r.getIsCorrect())
            .map(r -> new FeedbackDTO(
                r.getQuestion().getId(),
                false,
                r.getQuestion().getCorrectAnswer(),
                r.getQuestion().getConcept().getContextParagraph(),
                r.getQuestion().getConcept().getSimplifiedExplanation(),
                r.getQuestion().getConcept().getName()
            ))
            .collect(Collectors.toList());
        
        String gamifiedTitle = generateGamifiedTitle(conceptScores);
        String summary = generateSummary(overallAccuracy, conceptScores);
        
        return new QuizResultDTO(
            attempt.getTotalScore(),
            attempt.getMaxScore(),
            Math.round(overallAccuracy * 100.0) / 100.0,
            conceptPerformance,
            wrongAnswers,
            gamifiedTitle,
            summary
        );
    }
    
    private String generateGamifiedTitle(List<ConceptScore> conceptScores) {
        long strongConcepts = conceptScores.stream()
            .filter(cs -> cs.getLevel() == PerformanceLevel.STRONG)
            .count();
        
        if (strongConcepts >= conceptScores.size() * 0.8) {
            return "🏆 Master Scholar";
        } else if (strongConcepts >= conceptScores.size() * 0.6) {
            return "🌟 Knowledge Seeker";
        } else if (strongConcepts >= conceptScores.size() * 0.4) {
            return "📚 Dedicated Learner";
        } else {
            return "🌱 Growing Mind";
        }
    }
    
    private String generateSummary(double overallAccuracy, List<ConceptScore> conceptScores) {
        long strongConcepts = conceptScores.stream()
            .filter(cs -> cs.getLevel() == PerformanceLevel.STRONG)
            .count();
        
        if (overallAccuracy >= 80) {
            return String.format("Excellent performance! You've mastered %d concepts with %.1f%% accuracy.", 
                strongConcepts, overallAccuracy);
        } else if (overallAccuracy >= 60) {
            return String.format("Good job! You have a solid understanding with %.1f%% accuracy. Keep practicing weak areas.", 
                overallAccuracy);
        } else {
            return String.format("You're making progress at %.1f%% accuracy. Review the concepts and try again!", 
                overallAccuracy);
        }
    }
    
    private List<String> generateRelearningLinks(String conceptName, PerformanceLevel level) {
        if (level == PerformanceLevel.WEAK) {
            return Arrays.asList(
                "https://www.khanacademy.org/search?q=" + conceptName.replace(" ", "+"),
                "https://en.wikipedia.org/wiki/" + conceptName.replace(" ", "_")
            );
        }
        return Collections.emptyList();
    }
    
    private QuestionDTO mapToQuestionDTO(Question question) {
        return new QuestionDTO(
            question.getId(),
            question.getConcept().getId(),
            question.getConcept().getName(),
            question.getQuestionText(),
            question.getType(),
            question.getOptions(),
            question.getDifficulty()
        );
    }
}