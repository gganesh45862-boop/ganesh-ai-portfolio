package com.ganesh.portfolio.controller;

import com.ganesh.portfolio.dto.PortfolioData;
import com.ganesh.portfolio.service.PortfolioDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioDataService portfolioDataService;

    public PortfolioController(PortfolioDataService portfolioDataService) {
        this.portfolioDataService = portfolioDataService;
    }

    @GetMapping
    public PortfolioData getPortfolio() {
        return portfolioDataService.getPortfolioData();
    }
}
