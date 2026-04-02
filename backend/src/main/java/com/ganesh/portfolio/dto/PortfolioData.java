package com.ganesh.portfolio.dto;

import java.util.List;
import java.util.Map;

public record PortfolioData(
        Map<String, Object> hero,
        List<Map<String, String>> highlights,
        String about,
        List<Map<String, String>> strengths,
        List<Map<String, Object>> skills,
        List<Map<String, Object>> projects,
        List<Map<String, Object>> experience,
        Map<String, String> contact
) {
}
