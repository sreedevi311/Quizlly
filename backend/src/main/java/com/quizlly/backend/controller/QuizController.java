package com.quizlly.backend.controller;

import com.quizlly.backend.dto.request.StartQuizDTO;
import com.quizlly.backend.dto.request.SubmitAnswerDTO;
import com.quizlly.backend.dto.response.FeedbackDTO;
import com.quizlly.backend.dto.response.QuizResultDTO;
import com.quizlly.backend.dto.response.QuizSessionDTO;
import com.quizlly.backend.service.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/start")
    public ResponseEntity<QuizSessionDTO> startQuiz(
            @RequestBody StartQuizDTO dto) {
        return ResponseEntity.ok(quizService.startQuiz(dto));
    }

    @PostMapping("/submit-answer")
    public ResponseEntity<FeedbackDTO> submitAnswer(
            @RequestBody SubmitAnswerDTO dto) {
        return ResponseEntity.ok(quizService.submitAnswer(dto));
    }

    @PostMapping("/{attemptId}/complete")
    public ResponseEntity<QuizResultDTO> completeQuiz(
            @PathVariable Long attemptId) {
        return ResponseEntity.ok(quizService.completeQuiz(attemptId));
    }
}
