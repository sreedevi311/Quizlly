// src/main/java/com/quizlly/backend/entity/Concept.java
package com.quizlly.backend.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "concepts")
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
    private List<Question> questions = new ArrayList<>();

    // Constructors
    public Concept() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContextParagraph() { return contextParagraph; }
    public void setContextParagraph(String contextParagraph) { this.contextParagraph = contextParagraph; }

    public String getSimplifiedExplanation() { return simplifiedExplanation; }
    public void setSimplifiedExplanation(String simplifiedExplanation) { this.simplifiedExplanation = simplifiedExplanation; }

    public Content getContent() { return content; }
    public void setContent(Content content) { this.content = content; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }
}