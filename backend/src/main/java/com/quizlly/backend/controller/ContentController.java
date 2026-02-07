package com.quizlly.backend.controller;

import com.quizlly.backend.dto.request.ContentInputDTO;
import com.quizlly.backend.dto.response.ConceptPerformanceDTO;
import com.quizlly.backend.dto.response.ProcessedContentDTO;
import com.quizlly.backend.service.ContentProcessingService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentProcessingService contentService;

    @PostMapping("/process")
    public ResponseEntity<ProcessedContentDTO> processContent(
            @RequestBody @Valid ContentInputDTO input) {
        return ResponseEntity.ok(contentService.processContent(input));
    }

    @GetMapping("/{id}/concepts")
    public ResponseEntity<List<ConceptPerformanceDTO>> getConcepts(
            @PathVariable Long id) {
        return ResponseEntity.ok(contentService.getConceptsByContentId(id));
    }
}
