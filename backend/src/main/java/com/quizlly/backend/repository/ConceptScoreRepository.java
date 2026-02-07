// src/main/java/com/quizlly/backend/repository/ConceptScoreRepository.java
package com.quizlly.backend.repository;

import com.quizlly.backend.entity.ConceptScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConceptScoreRepository extends JpaRepository<ConceptScore, Long> {
    List<ConceptScore> findByAttemptId(Long attemptId);
}