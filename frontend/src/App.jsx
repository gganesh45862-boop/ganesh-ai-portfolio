import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Github,
  Linkedin,
  Mail,
  MessageSquareText,
  Server,
  Sparkles,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ganesh-ai-portfolio.onrender.com';

const sectionClass =
  'rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur md:p-8';

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi, I'm Ganesh's AI agent. Ask me about backend engineering, Spring Boot projects, performance optimization, or leadership experience.",
    },
  ]);
  const [question, setQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/portfolio`);
        if (!response.ok) {
          throw new Error(`Failed to load portfolio data (${response.status}).`);
        }
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.error('Portfolio fetch failed:', error);
        setPortfolio(fallbackPortfolio);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  async function handleAskAgent(event) {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }

    const prompt = question.trim();
    setMessages((current) => [...current, { role: 'user', content: prompt }]);
    setQuestion('');
    setChatLoading(true);
    setChatError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: prompt }),
      });

      if (!response.ok) {
        throw new Error(`The AI service is unavailable right now (${response.status}).`);
      }

      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      console.error('AI request failed:', error);
      setChatError('Unable to reach the AI backend right now. Please try again after configuring the API.');
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            "I'm temporarily offline, but Ganesh focuses on Java, Spring Boot, REST APIs, microservices, SQL, and cloud-ready backend systems.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  const data = portfolio || fallbackPortfolio;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_25%),linear-gradient(180deg,#020617_0%,#020617_45%,#0f172a_100%)]" />
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:24px_24px] opacity-30" />

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="text-lg font-semibold tracking-[0.2em] text-cyan-300">
          GANESH
        </a>
        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-cyan-300">
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main id="top" className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 lg:px-10">
        {loading && (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
            Loading portfolio content...
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className={`${sectionClass} overflow-hidden`}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Java Backend Developer
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Building reliable backend systems, APIs, and AI-enabled experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {data.hero.summary}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/10"
              >
                Let&apos;s Connect
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {data.hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className={`${sectionClass} flex flex-col justify-between`}>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Core Focus</p>
              <div className="mt-6 space-y-4">
                {data.highlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-sm font-semibold text-cyan-300">{highlight.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={data.contact.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </aside>
        </section>

        <section id="about" className={sectionClass}>
          <SectionTitle icon={Server} title="About" eyebrow="Professional profile" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <p className="text-base leading-8 text-slate-300">{data.about}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.strengths.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className={sectionClass}>
          <SectionTitle icon={Code2} title="Skills" eyebrow="Tech stack" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <h3 className="text-base font-semibold text-white">{skillGroup.category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className={sectionClass}>
          <SectionTitle icon={Briefcase} title="Projects" eyebrow="Selected work" />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {data.projects.map((project) => (
              <article key={project.name} className="group rounded-3xl border border-white/10 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-glow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{project.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 text-cyan-300 opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-sm text-cyan-200">{project.impact}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className={sectionClass}>
          <SectionTitle icon={Briefcase} title="Experience" eyebrow="Career timeline" />
          <div className="mt-6 space-y-4">
            {data.experience.map((role) => (
              <article key={`${role.company}-${role.title}`} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{role.title}</h3>
                    <p className="text-sm uppercase tracking-[0.16em] text-cyan-300">{role.company}</p>
                  </div>
                  <p className="text-sm text-slate-400">{role.period}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{role.summary}</p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-400">
                  {role.highlights.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="ask-my-ai-agent" className={`${sectionClass} relative overflow-hidden`}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <SectionTitle icon={MessageSquareText} title="Ask My AI Agent" eyebrow="Interactive resume" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <h3 className="text-lg font-semibold text-white">What you can ask</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-cyan-50">
                <li>- What backend systems has Ganesh built with Spring Boot?</li>
                <li>- How does Ganesh approach API design and scalability?</li>
                <li>- Which projects demonstrate cloud deployment experience?</li>
                <li>- What strengths does Ganesh bring to a backend team?</li>
              </ul>
              <p className="mt-5 text-sm leading-7 text-cyan-100/80">
                The agent is grounded in Ganesh&apos;s portfolio and backend experience, then enhanced with OpenAI for conversational answers.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="max-h-[28rem] space-y-4 overflow-y-auto pr-1">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.role === 'assistant'
                        ? 'mr-8 border border-white/10 bg-white/5 text-slate-200'
                        : 'ml-8 border border-cyan-400/20 bg-cyan-400/10 text-cyan-50'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {chatLoading && (
                  <div className="mr-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Thinking through Ganesh&apos;s experience...
                  </div>
                )}
              </div>
              <form onSubmit={handleAskAgent} className="mt-5 space-y-3">
                <label className="block text-sm font-medium text-slate-300" htmlFor="agent-question">
                  Ask about projects, architecture, skills, or impact
                </label>
                <textarea
                  id="agent-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  rows="4"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Example: How has Ganesh improved performance or reliability in backend systems?"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={chatLoading}
                    className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Ask the agent
                  </button>
                  {chatError && <p className="text-sm text-amber-300">{chatError}</p>}
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className={sectionClass}>
          <SectionTitle icon={Mail} title="Contact" eyebrow="Open to backend roles" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                Ganesh is available for backend engineering roles focused on Java, Spring Boot, API platforms, cloud-native systems, and AI-enabled product development.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${data.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  <Mail className="h-4 w-4" />
                  {data.contact.email}
                </a>
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Availability</p>
              <div className="mt-4 space-y-4">
                <InfoRow label="Location" value={data.contact.location} />
                <InfoRow label="Specialization" value="Java backend, microservices, REST APIs, AI integrations" />
                <InfoRow label="Preferred roles" value="Backend Engineer, Java Developer, Platform Engineer" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, eyebrow }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
      </div>
      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <span className="text-sm text-slate-200">{value}</span>
    </div>
  );
}

const fallbackPortfolio = {
  hero: {
    summary:
      'Ganesh is a backend-focused software developer specializing in Java, Spring Boot, microservices, scalable REST APIs, and production-grade cloud architectures. He enjoys building resilient systems that are easy to maintain, observe, and extend.',
    stats: [
      { value: '4+', label: 'Years building backend systems' },
      { value: '12+', label: 'Production APIs and services delivered' },
      { value: '99.9%', label: 'Reliability mindset for critical flows' },
    ],
  },
  highlights: [
    {
      title: 'API Architecture',
      description: 'Designing secure REST APIs, clear service contracts, and maintainable domain layers for long-term product growth.',
    },
    {
      title: 'Cloud Readiness',
      description: 'Preparing services for containerized deployment, observability, configuration management, and scale.',
    },
    {
      title: 'AI Integration',
      description: 'Connecting business applications with LLM workflows and practical AI features through clean backend boundaries.',
    },
  ],
  about:
    'Ganesh builds backend applications with a focus on reliability, performance, and developer-friendly architecture. His work spans Spring Boot services, relational databases, integrations, authentication, and deployment pipelines, with an emphasis on delivering features that feel stable in production.',
  strengths: [
    {
      title: 'System Thinking',
      description: 'Balances clean architecture with real delivery needs, keeping APIs, data access, and observability aligned.',
    },
    {
      title: 'Performance Focus',
      description: 'Looks closely at query efficiency, service latency, and operational reliability to keep systems responsive.',
    },
    {
      title: 'Team Collaboration',
      description: 'Partners well across product and frontend teams to deliver backend foundations that unblock fast iteration.',
    },
    {
      title: 'Production Discipline',
      description: 'Builds with validation, environment separation, secure config, and deployment readiness from the start.',
    },
  ],
  skills: [
    { category: 'Languages', items: ['Java', 'SQL', 'JavaScript', 'HTML', 'CSS'] },
    { category: 'Backend', items: ['Spring Boot', 'REST APIs', 'Microservices', 'Hibernate', 'JPA'] },
    { category: 'Data & Infra', items: ['MySQL', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'] },
    { category: 'Practices', items: ['System Design', 'Testing', 'CI/CD', 'OpenAI API', 'Monitoring'] },
  ],
  projects: [
    {
      name: 'Enterprise Order Processing Platform',
      description:
        'A Spring Boot microservice platform for order orchestration, inventory coordination, and status tracking across multiple internal systems.',
      stack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
      impact: 'Improved processing visibility and reduced operational delays with auditable service workflows.',
    },
    {
      name: 'API Gateway for Customer Services',
      description:
        'A backend gateway layer consolidating authentication, routing, logging, and service composition for customer-facing applications.',
      stack: ['Spring Security', 'REST', 'Redis', 'Nginx'],
      impact: 'Simplified frontend integration and strengthened cross-service security and observability.',
    },
    {
      name: 'AI Resume Assistant Integration',
      description:
        'An OpenAI-backed conversational assistant that answers recruiter and hiring-manager questions using portfolio and resume context.',
      stack: ['Spring Boot', 'OpenAI API', 'React', 'Tailwind'],
      impact: 'Created a more interactive way to evaluate experience, project depth, and backend expertise.',
    },
  ],
  experience: [
    {
      title: 'Java Backend Developer',
      company: 'Ganesh Portfolio Profile',
      period: 'Recent experience',
      summary:
        'Delivered backend solutions for business applications with a focus on Spring Boot APIs, database design, service integrations, and production readiness.',
      highlights: [
        'Built scalable REST endpoints for application workflows and reporting',
        'Improved maintainability with layered service architecture and DTO-based APIs',
        'Supported deployment readiness with environment-based configuration and containerization',
      ],
    },
    {
      title: 'Backend Engineer',
      company: 'Platform and Product Teams',
      period: 'Earlier experience',
      summary:
        'Worked across integration-heavy backend systems, translating product requirements into stable services and maintainable data flows.',
      highlights: [
        'Collaborated with frontend teams to define clean API contracts',
        'Focused on debugging, optimization, and sustainable code quality',
        'Contributed to dependable delivery across development and deployment cycles',
      ],
    },
  ],
  contact: {
    email: 'gganesh45862@gmail.com',
    github: 'https://github.com/gganesh45862-boop/ganesh-ai-portfolio',
    linkedin: 'https://www.linkedin.com/in/kuruva-ganesh',
    location: 'India',
  },
};

export default App;
