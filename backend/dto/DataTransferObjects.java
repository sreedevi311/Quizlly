public class DataTransferObjects {
    // Request DTOs
public record ContentInputDTO(
    String text,
    String url,
    ContentType type
) {}

public record StartQuizDTO(
    Long contentId,
    boolean timerEnabled,
    Integer durationMinutes
) {}

public record SubmitAnswerDTO(
    Long attemptId,
    Long questionId,
    String answer
) {}

// Response DTOs
public record ConceptDTO(
    Long id,
    String name,
    String description,
    Integer questionCount
) {}

public record QuestionDTO(
    Long id,
    Long conceptId,
    String conceptName,
    String questionText,
    QuestionType type,
    List<String> options,
    DifficultyLevel difficulty
) {}

public record QuizSessionDTO(
    Long attemptId,
    Long contentId,
    List<QuestionDTO> questions,
    LocalDateTime startedAt,
    Integer durationMinutes,
    boolean timerEnabled
) {}

public record FeedbackDTO(
    Long questionId,
    boolean isCorrect,
    String correctAnswer,
    String contextParagraph,
    String simplifiedExplanation,
    String conceptName
) {}

public record ConceptPerformanceDTO(
    String conceptName,
    Integer correctAnswers,
    Integer totalQuestions,
    Double accuracy,
    PerformanceLevel level,
    List<String> relearningLinks
) {}

public record QuizResultDTO(
    Integer totalScore,
    Integer maxScore,
    Double overallAccuracy,
    List<ConceptPerformanceDTO> conceptPerformance,
    List<FeedbackDTO> wrongAnswerFeedback,
    String gamifiedTitle,
    String overallSummary
) {}
}