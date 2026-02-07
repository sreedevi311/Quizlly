// src/main/java/com/quizlly/backend/repository/QuizAttemptRepository.java
package com.quizlly.backend.repository;

import com.quizlly.backend.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByContentIdOrderByStartedAtDesc(Long contentId);
    List<QuizAttempt> findByUserIdOrderByCompletedAtDesc(Long userId);
}