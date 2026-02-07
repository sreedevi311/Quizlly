// src/main/java/com/quizlly/backend/entity/Content.java
package com.quizlly.backend.entity;
import com.quizlly.backend.entity.ContentType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT")
    private String sourceText;
    
    private String sourceUrl;
    
    @Enumerated(EnumType.STRING)
    private ContentType type;
    
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Concept> concepts = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

