package com.ganesh.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {

    @Bean
    public WebClient openAiWebClient(
            @Value("${app.openai.base-url:https://api.openai.com/v1}") String baseUrl
    ) {
        return WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }
}
