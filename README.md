# Ganesh AI Portfolio

A production-ready portfolio website for a Java Backend Developer named Ganesh, built with React, Tailwind CSS, and Spring Boot. The site includes a recruiter-friendly portfolio UI, project and experience sections, and an OpenAI-powered "Ask My AI Agent" experience grounded in Ganesh's profile data.

## Stack

- Frontend: React 18, Vite, Tailwind CSS, Lucide Icons
- Backend: Spring Boot 3, Java 17, WebFlux `WebClient`, Actuator
- AI: OpenAI Responses API
- Deployment: Docker, Docker Compose, Nginx

## Features

- Responsive dark-themed portfolio UI
- About, Skills, Projects, Experience, and Contact sections
- Special "Ask My AI Agent" section for portfolio Q&A
- Spring Boot REST API for portfolio data and AI chat
- OpenAI integration grounded in resume/profile content
- Docker-ready frontend and backend builds
- Health endpoint for production monitoring

## Project Structure

```text
frontend/   React + Tailwind portfolio UI
backend/    Spring Boot REST API + OpenAI integration
nginx/      Optional reverse proxy configuration
```

## Local Development

### 1. Frontend

Requirements:

- Node.js 20+
- npm 10+

Commands:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### 2. Backend

Requirements:

- Java 17
- Maven 3.9+

Commands:

```bash
cd backend
cp .env.example .env
```

Set environment variables before starting:

```bash
export OPENAI_API_KEY=your_openai_api_key
export OPENAI_MODEL=gpt-4.1-mini
export APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:5173,http://localhost:3000,https://*.vercel.app
```

Then run:

```bash
mvn spring-boot:run
```

The backend runs on `http://localhost:8080`.

### Windows PowerShell equivalents

```powershell
cd backend
$env:OPENAI_API_KEY="your_openai_api_key"
$env:OPENAI_MODEL="gpt-4.1-mini"
$env:APP_CORS_ALLOWED_ORIGIN_PATTERNS="http://localhost:5173,http://localhost:3000,https://*.vercel.app"
mvn spring-boot:run
```

## OpenAI Integration Notes

- The AI endpoint is `POST /api/ai/ask`
- The portfolio endpoint is `GET /api/portfolio`
- If `OPENAI_API_KEY` is not configured, the backend returns a helpful fallback message rather than failing hard
- The AI system prompt is grounded in `backend/src/main/resources/profile/ganesh-profile.json`

Example request:

```bash
curl -X POST http://localhost:8080/api/ai/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What backend strengths does Ganesh bring to a team?"}'
```

## Production Deployment

### Option 1: Docker Compose

Set environment variables in your shell:

```bash
export OPENAI_API_KEY=your_openai_api_key
export OPENAI_MODEL=gpt-4.1-mini
export APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:3000,https://*.vercel.app
```

Run:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

### Option 2: Separate Deployments

Frontend:

```bash
cd frontend
npm install
npm run build
```

Deploy the generated `dist/` folder to Vercel, Netlify, S3 + CloudFront, or Nginx.

Backend:

```bash
cd backend
mvn clean package -DskipTests
java -jar target/portfolio-backend-1.0.0.jar
```

Deploy the backend to Render, Railway, EC2, Azure App Service, or any container platform.

### Option 3: Nginx Reverse Proxy

Use [`nginx/portfolio.conf`](./nginx/portfolio.conf) as a base reverse proxy for routing:

- `/` to the frontend
- `/api/` to the Spring Boot backend

## Customization

Update these values to match Ganesh's real profile:

- `backend/src/main/resources/profile/ganesh-profile.json`
- GitHub and LinkedIn URLs
- Email address
- Project names, experience history, and metrics

The frontend automatically reads the live profile from the backend, so most content changes only need to happen in one place.

## Production Readiness Checklist

- Replace placeholder contact links with real URLs
- Add a real OpenAI API key in the backend environment
- Add analytics if needed
- Add HTTPS in your deployment platform or load balancer
- Add backend tests and frontend E2E tests in CI before launch
- Add a custom domain and metadata/social preview images

## API Endpoints

- `GET /api/portfolio`
- `POST /api/ai/ask`
- `GET /actuator/health`

## Notes

- The profile content currently uses sensible placeholder data based on Ganesh being a Java backend developer
- Once Ganesh's actual resume details are available, update the profile JSON to make the AI answers fully personalized
