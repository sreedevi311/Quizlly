@Entity
public class Content {
    @Id @GeneratedValue
    private Long id;
    private String sourceText;
    private String sourceUrl;
    private ContentType type; // TEXT, URL
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Concept> concepts;
    
    @ManyToOne
    private User user;
}

@Entity
public class Concept {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String contextParagraph; // Original text snippet
    private String simplifiedExplanation;
    
    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;
    
    @OneToMany(mappedBy = "concept")
    private List<Question> questions;
}

@Entity
public class Question {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "concept_id")
    private Concept concept;
    
    private QuestionType type; // MCQ, SHORT_ANSWER
    private String questionText;
    
    @ElementCollection
    private List<String> options; // For MCQs
    
    private String correctAnswer;
    private DifficultyLevel difficulty;
}

@Entity
public class QuizAttempt {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private Content content;
    
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Integer totalScore;
    private Integer maxScore;
    
    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL)
    private List<QuestionResponse> responses;
    
    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL)
    private List<ConceptScore> conceptScores;
}

@Entity
public class QuestionResponse {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    private QuizAttempt attempt;
    
    @ManyToOne
    private Question question;
    
    private String userAnswer;
    private Boolean isCorrect;
    private Integer pointsEarned;
}

@Entity
public class ConceptScore {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    private QuizAttempt attempt;
    
    @ManyToOne
    private Concept concept;
    
    private Integer correctAnswers;
    private Integer totalQuestions;
    private Double accuracyPercentage;
    private PerformanceLevel level; // WEAK, MODERATE, STRONG
}

@Entity
public class User {
    @Id @GeneratedValue
    private Long id;
    private String username;
    private String email;
    
    @OneToMany(mappedBy = "user")
    private List<QuizAttempt> attempts;
}