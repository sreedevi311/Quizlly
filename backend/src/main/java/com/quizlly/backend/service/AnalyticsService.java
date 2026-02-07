// src/main/java/com/quizlly/backend/service/AnalyticsService.java
package com.quizlly.backend.service;

import com.quizlly.backend.dto.response.*;
import com.quizlly.backend.entity.ConceptScore;
import com.quizlly.backend.entity.PerformanceLevel;
import com.quizlly.backend.entity.QuizAttempt;
import com.quizlly.backend.repository.ConceptScoreRepository;
import com.quizlly.backend.repository.QuizAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {
    
    @Autowired
    private QuizAttemptRepository attemptRepository;
    
    @Autowired
    private ConceptScoreRepository conceptScoreRepository;
    
    public UserDashboardDTO getUserDashboard(Long userId) {
        List<QuizAttempt> attempts = attemptRepository.findByUserIdOrderByCompletedAtDesc(userId);
        
        return new UserDashboardDTO(
            calculateOverallProgress(attempts),
            identifyStrongConcepts(attempts),
            identifyWeakConcepts(attempts),
            getRecentAttempts(attempts),
            calculateImprovementTrend(attempts)
        );
    }
    
    public List<AttemptHistoryDTO> getAttemptHistory(Long userId) {
        List<QuizAttempt> attempts = attemptRepository.findByUserIdOrderByCompletedAtDesc(userId);
        
        return attempts.stream()
            .filter(attempt -> attempt.getCompletedAt() != null)
            .map(this::mapToAttemptHistoryDTO)
            .collect(Collectors.toList());
    }
    
    private ProgressSummaryDTO calculateOverallProgress(List<QuizAttempt> attempts) {
        if (attempts.isEmpty()) {
            return new ProgressSummaryDTO(0, 0.0, 0, 0);
        }
        
        List<QuizAttempt> completedAttempts = attempts.stream()
            .filter(a -> a.getCompletedAt() != null)
            .toList();
        
        double averageScore = completedAttempts.stream()
            .mapToDouble(a -> (a.getTotalScore() * 100.0) / a.getMaxScore())
            .average()
            .orElse(0.0);
        
        int totalQuestions = completedAttempts.stream()
            .mapToInt(QuizAttempt::getMaxScore)
            .sum();
        
        // Count concepts mastered (>75% accuracy)
        long conceptsMastered = completedAttempts.stream()
            .flatMap(a -> a.getConceptScores().stream())
            .filter(cs -> cs.getLevel() == PerformanceLevel.STRONG)
            .map(cs -> cs.getConcept().getName())
            .distinct()
            .count();
        
        return new ProgressSummaryDTO(
            completedAttempts.size(),
            Math.round(averageScore * 100.0) / 100.0,
            (int) conceptsMastered,
            totalQuestions
        );
    }
    
    private List<String> identifyStrongConcepts(List<QuizAttempt> attempts) {
        Map<String, List<Double>> conceptAccuracies = new HashMap<>();
        
        attempts.stream()
            .filter(a -> a.getCompletedAt() != null)
            .flatMap(a -> a.getConceptScores().stream())
            .forEach(cs -> {
                String conceptName = cs.getConcept().getName();
                conceptAccuracies.computeIfAbsent(conceptName, k -> new ArrayList<>())
                    .add(cs.getAccuracyPercentage());
            });
        
        return conceptAccuracies.entrySet().stream()
            .filter(entry -> {
                double avgAccuracy = entry.getValue().stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);
                return avgAccuracy > 75.0;
            })
            .map(Map.Entry::getKey)
            .limit(5)
            .collect(Collectors.toList());
    }
    
    private List<String> identifyWeakConcepts(List<QuizAttempt> attempts) {
        Map<String, List<Double>> conceptAccuracies = new HashMap<>();
        
        attempts.stream()
            .filter(a -> a.getCompletedAt() != null)
            .flatMap(a -> a.getConceptScores().stream())
            .forEach(cs -> {
                String conceptName = cs.getConcept().getName();
                conceptAccuracies.computeIfAbsent(conceptName, k -> new ArrayList<>())
                    .add(cs.getAccuracyPercentage());
            });
        
        return conceptAccuracies.entrySet().stream()
            .filter(entry -> {
                double avgAccuracy = entry.getValue().stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);
                return avgAccuracy < 50.0;
            })
            .map(Map.Entry::getKey)
            .limit(5)
            .collect(Collectors.toList());
    }
    
    private List<AttemptSummaryDTO> getRecentAttempts(List<QuizAttempt> attempts) {
        return attempts.stream()
            .filter(a -> a.getCompletedAt() != null)
            .limit(10)
            .map(this::mapToAttemptSummaryDTO)
            .collect(Collectors.toList());
    }
    
    private ImprovementTrendDTO calculateImprovementTrend(List<QuizAttempt> attempts) {
        List<QuizAttempt> completedAttempts = attempts.stream()
            .filter(a -> a.getCompletedAt() != null)
            .sorted(Comparator.comparing(QuizAttempt::getCompletedAt))
            .toList();
        
        if (completedAttempts.size() < 2) {
            return new ImprovementTrendDTO(0.0, Collections.emptyList());
        }
        
        List<TrendDataPointDTO> dataPoints = completedAttempts.stream()
            .map(a -> new TrendDataPointDTO(
                a.getCompletedAt(),
                (a.getTotalScore() * 100.0) / a.getMaxScore()
            ))
            .collect(Collectors.toList());
        
        // Calculate improvement: compare first half vs second half
        int midPoint = completedAttempts.size() / 2;
        double firstHalfAvg = completedAttempts.subList(0, midPoint).stream()
            .mapToDouble(a -> (a.getTotalScore() * 100.0) / a.getMaxScore())
            .average()
            .orElse(0.0);
        
        double secondHalfAvg = completedAttempts.subList(midPoint, completedAttempts.size()).stream()
            .mapToDouble(a -> (a.getTotalScore() * 100.0) / a.getMaxScore())
            .average()
            .orElse(0.0);
        
        double improvement = secondHalfAvg - firstHalfAvg;
        
        return new ImprovementTrendDTO(
            Math.round(improvement * 100.0) / 100.0,
            dataPoints
        );
    }
    
    private AttemptSummaryDTO mapToAttemptSummaryDTO(QuizAttempt attempt) {
        double accuracy = (attempt.getTotalScore() * 100.0) / attempt.getMaxScore();
        
        return new AttemptSummaryDTO(
            attempt.getId(),
            attempt.getContent().getId(),
            "Quiz " + attempt.getId(), // You can enhance this with actual content title
            attempt.getTotalScore(),
            attempt.getMaxScore(),
            Math.round(accuracy * 100.0) / 100.0,
            attempt.getCompletedAt()
        );
    }
    
    private AttemptHistoryDTO mapToAttemptHistoryDTO(QuizAttempt attempt) {
        double accuracy = (attempt.getTotalScore() * 100.0) / attempt.getMaxScore();
        
        List<ConceptPerformanceDTO> conceptPerformance = attempt.getConceptScores().stream()
            .map(cs -> new ConceptPerformanceDTO(
                cs.getConcept().getName(),
                cs.getCorrectAnswers(),
                cs.getTotalQuestions(),
                cs.getAccuracyPercentage(),
                cs.getLevel(),
                generateRelearningLinks(cs.getConcept().getName(), cs.getLevel())
            ))
            .collect(Collectors.toList());
        
        return new AttemptHistoryDTO(
            attempt.getId(),
            attempt.getContent().getId(),
            "Quiz " + attempt.getId(),
            attempt.getTotalScore(),
            attempt.getMaxScore(),
            Math.round(accuracy * 100.0) / 100.0,
            attempt.getCompletedAt(),
            conceptPerformance
        );
    }
    
    private List<String> generateRelearningLinks(String conceptName, PerformanceLevel level) {
        if (level == PerformanceLevel.WEAK) {
            // In a real app, you'd generate actual search URLs or course recommendations
            return Arrays.asList(
                "https://www.khanacademy.org/search?q=" + conceptName.replace(" ", "+"),
                "https://en.wikipedia.org/wiki/" + conceptName.replace(" ", "_")
            );
        }
        return Collections.emptyList();
    }
}