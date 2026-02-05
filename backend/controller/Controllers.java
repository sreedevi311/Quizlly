import java.util.List;

public class Controllers {
    @RestController
@RequestMapping("/api/content")
public class ContentController {
    
    @Autowired
    private ContentProcessingService contentService;
    
    @PostMapping("/process")
    public ResponseEntity<ProcessedContentDTO> processContent(
        @RequestBody @Valid ContentInputDTO input) {
        return ResponseEntity.ok(contentService.processContent(input));
    }
    
    @GetMapping("/{id}/concepts")
    public ResponseEntity<List<ConceptDTO>> getConcepts(@PathVariable Long id) {
        return ResponseEntity.ok(contentService.getConceptsByContentId(id));
    }
}

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @PostMapping("/start")
    public ResponseEntity<QuizSessionDTO> startQuiz(@RequestBody StartQuizDTO dto) {
        return ResponseEntity.ok(quizService.startQuiz(dto));
    }
    
    @PostMapping("/submit-answer")
    public ResponseEntity<FeedbackDTO> submitAnswer(@RequestBody SubmitAnswerDTO dto) {
        return ResponseEntity.ok(quizService.submitAnswer(dto));
    }
    
    @PostMapping("/{attemptId}/complete")
    public ResponseEntity<QuizResultDTO> completeQuiz(@PathVariable Long attemptId) {
        return ResponseEntity.ok(quizService.completeQuiz(attemptId));
    }
}

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    
    @GetMapping("/dashboard")
    public ResponseEntity<UserDashboardDTO> getDashboard() {
        // Get current user from security context
        return ResponseEntity.ok(analyticsService.getUserDashboard(currentUserId));
    }
    
    @GetMapping("/history")
    public ResponseEntity<List<AttemptHistoryDTO>> getHistory() {
        return ResponseEntity.ok(analyticsService.getAttemptHistory(currentUserId));
    }
}
}