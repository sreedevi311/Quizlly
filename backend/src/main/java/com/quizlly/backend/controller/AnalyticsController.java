// src/main/java/com/quizlly/backend/controller/AnalyticsController.java
package com.quizlly.backend.controller;

import com.quizlly.backend.dto.response.AttemptHistoryDTO;
import com.quizlly.backend.dto.response.UserDashboardDTO;
import com.quizlly.backend.service.AnalyticsService;
import com.quizlly.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
    
    @Autowired
    private AnalyticsService analyticsService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/dashboard")
    public ResponseEntity<UserDashboardDTO> getDashboard() {
        Long currentUserId = userService.getCurrentUserId();
        return ResponseEntity.ok(analyticsService.getUserDashboard(currentUserId));
    }
    
    @GetMapping("/history")
    public ResponseEntity<List<AttemptHistoryDTO>> getHistory() {
        Long currentUserId = userService.getCurrentUserId();
        return ResponseEntity.ok(analyticsService.getAttemptHistory(currentUserId));
    }
}