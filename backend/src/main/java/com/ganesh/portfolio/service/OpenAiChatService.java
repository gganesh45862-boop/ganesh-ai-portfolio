package com.ganesh.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class OpenAiChatService {

    private final WebClient openAiWebClient;
    private final PortfolioDataService portfolioDataService;

    @Value("${app.openai.api-key:}")
    private String apiKey;

    @Value("${app.openai.model:gpt-4.1-mini}")
    private String model;

    public OpenAiChatService(WebClient openAiWebClient, PortfolioDataService portfolioDataService) {
        this.openAiWebClient = openAiWebClient;
        this.portfolioDataService = portfolioDataService;
    }

    public String answerQuestion(String question) {
        if (!StringUtils.hasText(apiKey)) {
            return "The AI agent is configured, but the OpenAI API key is missing. Add OPENAI_API_KEY in the backend environment to enable grounded answers about Ganesh's experience.";
        }

        Map<String, Object> requestBody = new LinkedHashMap<>();
        requestBody.put("model", model);
        requestBody.put("input", List.of(
                Map.of(
                        "role", "system",
                        "content", List.of(
                                Map.of(
                                        "type", "input_text",
                                        "text", buildSystemPrompt()
                                )
                        )
                ),
                Map.of(
                        "role", "user",
                        "content", List.of(
                                Map.of(
                                        "type", "input_text",
                                        "text", question
                                )
                        )
                )
        ));

        try {
            JsonNode response = openAiWebClient.post()
                    .uri("responses")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .timeout(Duration.ofSeconds(45))
                    .block();

            JsonNode outputText = response != null ? response.path("output_text") : null;
            if (outputText != null && outputText.isTextual() && StringUtils.hasText(outputText.asText())) {
                return outputText.asText();
            }
        } catch (WebClientResponseException exception) {
            return "The AI provider returned an error while answering. Please verify the OpenAI API key, model access, and network connectivity.";
        } catch (Exception exception) {
            return "The AI agent could not answer right now due to a backend connectivity issue. The portfolio context is still available on this site.";
        }

        return "I couldn't generate an answer just now, but Ganesh's profile emphasizes Spring Boot, Java APIs, microservices, databases, deployment readiness, and AI-backed product integration.";
    }

    private String buildSystemPrompt() {
        return """
                You are Ganesh's AI portfolio assistant.
                Answer only using the provided portfolio and resume-style context.
                If a fact is not supported by the context, say that the portfolio does not provide that detail.
                Keep answers concise, professional, and recruiter-friendly.
                Highlight backend engineering strengths, architecture decisions, impact, and technologies where relevant.

                Portfolio context:
                """ + portfolioDataService.getAiContextSummary();
    }
}
