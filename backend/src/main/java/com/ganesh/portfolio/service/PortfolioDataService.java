package com.ganesh.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ganesh.portfolio.dto.PortfolioData;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class PortfolioDataService {

    private final ObjectMapper objectMapper;
    private PortfolioData portfolioData;

    public PortfolioDataService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void init() throws IOException {
        ClassPathResource resource = new ClassPathResource("profile/ganesh-profile.json");
        try (InputStream inputStream = resource.getInputStream()) {
            this.portfolioData = objectMapper.readValue(inputStream, PortfolioData.class);
        }
    }

    public PortfolioData getPortfolioData() {
        return portfolioData;
    }

    public String getAiContextSummary() {
        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(portfolioData);
        } catch (IOException exception) {
            return "Ganesh is a Java backend developer specializing in Spring Boot, REST APIs, microservices, SQL, Docker, and AI integrations.";
        }
    }
}
