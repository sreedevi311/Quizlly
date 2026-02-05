import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ServiceLayer {
    @Service
public class ContentProcessingService {
    
    @Autowired
    private ConceptExtractionService conceptExtractor;
    
    @Autowired
    private QuestionGenerationService questionGenerator;
    
    public ProcessedContentDTO processContent(ContentInputDTO input) {
        // 1. Extract or fetch content
        String contentText = input.type() == ContentType.URL 
            ? fetchFromUrl(input.url()) 
            : input.text();
        
        // 2. Save content
        Content content = saveContent(contentText, input);
        
        // 3. Extract concepts
        List<Concept> concepts = conceptExtractor.extractConcepts(contentText);
        concepts.forEach(c -> c.setContent(content));
        conceptRepository.saveAll(concepts);
        
        // 4. Generate questions for each concept
        concepts.forEach(concept -> {
            List<Question> questions = questionGenerator.generateQuestions(concept);
            questionRepository.saveAll(questions);
        });
        
        return mapToDTO(content);
    }
}

@Service
public class QuizService {
    
    public QuizSessionDTO startQuiz(StartQuizDTO dto) {
        Content content = contentRepository.findById(dto.contentId())
            .orElseThrow(() -> new ResourceNotFoundException("Content not found"));
        
        QuizAttempt attempt = new QuizAttempt();
        attempt.setContent(content);
        attempt.setStartedAt(LocalDateTime.now());
        attempt = attemptRepository.save(attempt);
        
        // Fetch all questions for this content
        List<Question> questions = questionRepository.findByContentId(dto.contentId());
        
        return new QuizSessionDTO(
            attempt.getId(),
            content.getId(),
            questions.stream().map(this::mapToDTO).toList(),
            attempt.getStartedAt(),
            dto.durationMinutes(),
            dto.timerEnabled()
        );
    }
    
    public FeedbackDTO submitAnswer(SubmitAnswerDTO dto) {
        Question question = questionRepository.findById(dto.questionId())
            .orElseThrow();
        
        boolean isCorrect = evaluateAnswer(question, dto.answer());
        
        QuestionResponse response = new QuestionResponse();
        response.setQuestion(question);
        response.setUserAnswer(dto.answer());
        response.setIsCorrect(isCorrect);
        response.setPointsEarned(isCorrect ? 1 : 0);
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
    
    public QuizResultDTO completeQuiz(Long attemptId) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
            .orElseThrow();
        
        // Calculate scores
        List<QuestionResponse> responses = responseRepository.findByAttemptId(attemptId);
        int totalScore = responses.stream()
            .mapToInt(QuestionResponse::getPointsEarned)
            .sum();
        
        attempt.setCompletedAt(LocalDateTime.now());
        attempt.setTotalScore(totalScore);
        attempt.setMaxScore(responses.size());
        
        // Calculate concept-wise performance
        Map<Concept, List<QuestionResponse>> conceptResponses = 
            responses.stream().collect(Collectors.groupingBy(
                r -> r.getQuestion().getConcept()
            ));
        
        List<ConceptScore> conceptScores = conceptResponses.entrySet().stream()
            .map(entry -> calculateConceptScore(entry.getKey(), entry.getValue(), attempt))
            .toList();
        
        conceptScoreRepository.saveAll(conceptScores);
        attemptRepository.save(attempt);
        
        // Generate result
        return generateQuizResult(attempt, conceptScores, responses);
    }
}

@Service
public class AnalyticsService {
    
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
}
}
