package com.ganesh.portfolio.controller;

import com.ganesh.portfolio.dto.ChatRequest;
import com.ganesh.portfolio.dto.ChatResponse;
import com.ganesh.portfolio.service.OpenAiChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final OpenAiChatService openAiChatService;

    public AiController(OpenAiChatService openAiChatService) {
        this.openAiChatService = openAiChatService;
    }

    @PostMapping("/ask")
    public ChatResponse askQuestion(@Valid @RequestBody ChatRequest request) {
        return new ChatResponse(openAiChatService.answerQuestion(request.question()));
    }
}
