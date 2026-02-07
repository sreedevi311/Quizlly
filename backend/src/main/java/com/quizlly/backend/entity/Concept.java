// src/main/java/com/quizlly/backend/entity/Concept.java
package com.quizlly.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "concepts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Concept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String contextParagraph;
    
    @Column(columnDefinition = "TEXT")
    private String simplifiedExplanation;
    
    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;
    
    @OneToMany(mappedBy = "concept", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Question> questions = new ArrayList<>();
}