package com.ganesh.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(
        @NotBlank(message = "Question is required.")
        String question
) {
}
