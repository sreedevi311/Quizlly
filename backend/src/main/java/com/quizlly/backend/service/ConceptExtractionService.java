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
                Concept concept = new Concept();
                concept.setName(capitalizeFirstLetter(keyword));
                concept.setDescription("Concept related to " + keyword);
                concept.setContextParagraph(extractContextParagraph(text, keyword));
                concept.setSimplifiedExplanation("This is a fundamental concept in biology.");
                concept.setContent(content);
                
                concepts.add(concept);
            }
        }

        if (concepts.isEmpty()) {
            Concept defaultConcept = new Concept();
            defaultConcept.setName("General Knowledge");
            defaultConcept.setDescription("General concepts from the content");
            defaultConcept.setContextParagraph(text.substring(0, Math.min(500, text.length())));
            defaultConcept.setSimplifiedExplanation("General understanding of the topic");
            defaultConcept.setContent(content);
            
            concepts.add(defaultConcept);
        }

        return concepts;
    }

    private String extractContextParagraph(String text, String keyword) {
        String[] sentences = text.split("\\. ");
        for (String sentence : sentences) {
            if (sentence.toLowerCase().contains(keyword.toLowerCase())) {
                return sentence + ".";
            }
        }
        return text.substring(0, Math.min(200, text.length()));
    }

    private String capitalizeFirstLetter(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}