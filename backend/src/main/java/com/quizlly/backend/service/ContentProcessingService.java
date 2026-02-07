// src/main/java/com/quizlly/backend/service/ContentProcessingService.java
package com.quizlly.backend.service;

import com.quizlly.backend.dto.request.ContentInputDTO;
import com.quizlly.backend.dto.response.ConceptPerformanceDTO;
import com.quizlly.backend.dto.response.ProcessedContentDTO;
import com.quizlly.backend.entity.*;
import com.quizlly.backend.repository.ConceptRepository;
import com.quizlly.backend.repository.ContentRepository;
import com.quizlly.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContentProcessingService {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private ConceptRepository conceptRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ConceptExtractionService conceptExtractionService;

    @Autowired
    private QuestionGenerationService questionGenerationService;
@Transactional
public ProcessedContentDTO processContent(ContentInputDTO input) {

    String contentText = input.type() == ContentType.URL
            ? fetchContentFromUrl(input.url())
            : input.text();

    // DO NOT PASS NON-EXISTENT FIELDS
    Content content = Content.builder().build();
    content = contentRepository.save(content);

    List<Concept> concepts =
            conceptExtractionService.extractConcepts(contentText, content);

    concepts = conceptRepository.saveAll(concepts);

    for (Concept concept : concepts) {
        List<Question> questions =
                questionGenerationService.generateQuestions(concept);
        questionRepository.saveAll(questions);
    }

    concepts = conceptRepository.findByContentId(content.getId());

    int totalQuestions = concepts.stream()
            .mapToInt(c -> c.getQuestions().size())
            .sum();

    List<ConceptPerformanceDTO> conceptPerformance = concepts.stream()
            .map(c -> new ConceptPerformanceDTO(
                    c.getName(),
                    0,
                    c.getQuestions().size(),
                    0.0,
                    PerformanceLevel.WEAK,
                    List.of()
            ))
            .collect(Collectors.toList());

    return new ProcessedContentDTO(
            content.getId(),
            conceptPerformance,
            totalQuestions
    );
}

    public List<ConceptPerformanceDTO> getConceptsByContentId(Long contentId) {

        List<Concept> concepts = conceptRepository.findByContentId(contentId);

        return concepts.stream()
                .map(c -> new ConceptPerformanceDTO(
                        c.getName(),
                        0,
                        c.getQuestions().size(),
                        0.0,
                        PerformanceLevel.WEAK,
                        List.of()
                ))
                .collect(Collectors.toList());
    }

    // Mock URL fetch (replace later)
    private String fetchContentFromUrl(String url) {
        return """
            Photosynthesis is the process by which plants convert light energy
            into chemical energy. This process occurs in chloroplasts and
            involves chlorophyll.
            """;
    }
}
