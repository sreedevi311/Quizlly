// src/main/java/com/quizlly/backend/service/ConceptExtractionService.java
package com.quizlly.backend.service;

import com.quizlly.backend.entity.Concept;
import com.quizlly.backend.entity.Content;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ConceptExtractionService {

    public List<Concept> extractConcepts(String text, Content content) {

        List<Concept> concepts = new ArrayList<>();

        List<String> conceptKeywords = Arrays.asList(
            "photosynthesis", "respiration", "mitosis", "meiosis",
            "evolution", "ecology", "metabolism", "dna", "rna"
        );

        for (String keyword : conceptKeywords) {
            if (text.toLowerCase().contains(keyword)) {

                Concept concept = Concept.builder()
                    .name(capitalizeFirstLetter(keyword))
                    .description("Concept related to " + keyword)
                    .content(content)
                    .build();

                concepts.add(concept);
            }
        }

        if (concepts.isEmpty()) {
            concepts.add(
                Concept.builder()
                    .name("General Knowledge")
                    .description("General concepts from the content")
                    .content(content)
                    .build()
            );
        }

        return concepts;
    }

    private String capitalizeFirstLetter(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
