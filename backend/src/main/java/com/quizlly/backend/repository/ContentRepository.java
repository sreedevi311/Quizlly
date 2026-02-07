// src/main/java/com/quizlly/backend/repository/ContentRepository.java
package com.quizlly.backend.repository;

import com.quizlly.backend.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
}