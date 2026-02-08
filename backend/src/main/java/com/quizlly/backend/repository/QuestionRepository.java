// src/main/java/com/quizlly/backend/repository/QuestionRepository.java
package com.quizlly.backend.repository;

import com.quizlly.backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByConcept_Content_Id(Long contentId);
    int countByConcept_Id(Long conceptId);
}