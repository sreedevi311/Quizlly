// src/main/java/com/quizlly/backend/repository/ConceptRepository.java
package com.quizlly.backend.repository;

import com.quizlly.backend.entity.Concept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConceptRepository extends JpaRepository<Concept, Long> {
    List<Concept> findByContentId(Long contentId);
}