// src/main/java/com/quizlly/backend/repository/QuestionResponseRepository.java
package com.quizlly.backend.repository;

import com.quizlly.backend.entity.QuestionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionResponseRepository extends JpaRepository<QuestionResponse, Long> {

    List<QuestionResponse> findByAttemptId(Long attemptId);
}
