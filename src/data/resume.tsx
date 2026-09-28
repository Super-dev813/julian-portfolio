import { Icons } from "@/components/icons";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string }>;

export interface WorkHighlight {
  label: string;
  text: string;
}

/** A framed picture: a screenshot of a public page, captioned in the frame's address bar. */
export interface Picture {
  src: string;
  alt: string;
  label: string;
}

export interface Work {
  company: string;
  initials: string;
  href: string;
  title: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: readonly WorkHighlight[];
  pictures: readonly Picture[];
}

export interface SkillGroup {
  group: string;
  items: readonly string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  /** Hostname shown in the browser frame above the screenshot. */
  domain: string;
}

export interface Project {
  title: string;
  subtitle: string;
  context: string;
  description: string;
  technologies: readonly string[];
  href?: string;
  /** Screenshot of the live public product; projects without one get an illustration. */
  image?: ProjectImage;
}

export interface Fact {
  value: number;
  suffix: string;
  label: string;
}

export interface Principle {
  title: string;
  text: string;
  art: "monitor" | "queue" | "guardrail" | "tests";
}

/** Real recommendations only — the section stays hidden while this list is empty. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
}

export interface Education {
  school: string;
  initials: string;
  href: string;
  degree: string;
  start: string;
  end: string;
  location: string;
  picture: Picture;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: IconComponent;
}

export interface Profile {
  name: string;
  fullName: string;
  initials: string;
  title: string;
  location: string;
  workMode: string;
  description: string;
  tagline: string;
  about: readonly string[];
  facts: readonly Fact[];
  principles: readonly Principle[];
  testimonials: readonly Testimonial[];
  email: string;
  social: readonly SocialLink[];
  work: readonly Work[];
  skills: readonly SkillGroup[];
  projects: readonly Project[];
  education: readonly Education[];
}

const EMAIL = "carrjulian075@gmail.com";

export const DATA: Profile = {
  name: "Julián Carreño",
  fullName: "Julián Andrés Carreño Galvis",
  initials: "JC",
  title: "Senior Full Stack Developer",
  location: "Chiquinquirá, Colombia",
  workMode: "Remote",
  description:
    "Senior Full Stack Developer with 8+ years building and operating production SaaS platforms, from the interface to the infrastructure.",
  tagline:
    "I build and run production SaaS platforms end to end — from the interface to the infrastructure — and I own what I ship long after it goes live.",
  about: [
    "I'm a senior full stack developer with 8+ years of experience building and operating production SaaS platforms. I work across the whole product — frontend, backend, data, and cloud — and I'm most at home in event-driven and serverless systems, database and caching performance, and taking LLM-powered features to production with real safeguards for cost, latency, and reliability.",
    "I care about ownership: automated testing, solid observability, and staying hands-on with production support for everything I deliver. I also have hands-on mobile development experience with React Native and Android (Kotlin).",
  ],
  facts: [
    { value: 8, suffix: "+", label: "years building and operating production SaaS" },
    { value: 500, suffix: "+", label: "technical and psychometric tests delivered on PeakU's assessment platform" },
    { value: 3, suffix: "", label: "companies, from enterprise IT services to an AI-driven product" },
  ],
  principles: [
    {
      title: "I own it after launch",
      art: "monitor",
      text: "Everything I ship, I also watch in production — Datadog and Sentry dashboards, incident triage, root-cause fixes, and the hardening that follows.",
    },
    {
      title: "Slow work goes to the background",
      art: "queue",
      text: "Long-running jobs move onto queues, webhooks, and serverless workers so the product stays responsive when load arrives.",
    },
    {
      title: "AI ships with guardrails",
      art: "guardrail",
      text: "LLM features go live with prompt orchestration, retries and fallbacks, and explicit budgets for cost and latency.",
    },
    {
      title: "Tested before trusted",
      art: "tests",
      text: "Unit, integration, and end-to-end suites, careful code review, and CI/CD pipelines keep releases repeatable and low-risk.",
    },
  ],
  testimonials: [],
  email: EMAIL,
  social: [
    { name: "GitHub", url: "https://github.com/thedev105", icon: Icons.github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/julian-carreno-galvis/", icon: Icons.linkedin },
  ],
  work: [
    {
      company: "PeakU AI",
      initials: "PU",
      href: "https://peaku.co",
      title: "Senior Full Stack Developer",
      start: "Feb 2023",
      end: "Jun 2026",
      location: "Colombia (Remote)",
      summary:
        "AI-driven SaaS platform. Senior engineer responsible for end-to-end feature delivery, backend architecture, and production reliability.",
      highlights: [
        { label: "Full-stack delivery", text: "Architected and delivered scalable SaaS features end to end using React, Next.js, TypeScript, Node.js, Python, and AWS, owning work from technical design through release and post-launch monitoring." },
        { label: "API & service design", text: "Designed and implemented REST APIs and backend services powering authentication, third-party integrations, workflow automation, and core product flows, with consistent versioning, validation, and error-handling standards." },
        { label: "Performance", text: "Improved application responsiveness and throughput through PostgreSQL query and index optimization, Redis caching layers, server-side rendering, and asynchronous processing of heavy operations." },
        { label: "Event-driven architecture", text: "Built serverless workflows with AWS Lambda, SQS, webhooks, and background services, decoupling long-running tasks from user requests and improving resilience under load." },
        { label: "AI integration", text: "Integrated LLM-powered features into the product using Python and external AI APIs, including prompt orchestration, response handling, and safeguards for cost, latency, and failure modes." },
        { label: "Quality & observability", text: "Established automated testing and monitoring practices with Jest, PyTest, Cypress, Datadog, and Sentry, reducing regressions and shortening time to detect and resolve production incidents." },
        { label: "Leadership", text: "Partnered with product and design to scope and sequence features, and mentored teammates through code reviews, pairing, and guidance on architecture and best practices." },
      ],
      pictures: [
        { src: "/companies/peaku.webp", alt: "PeakU's public job board listing open roles across Colombia", label: "peaku.co/jobs" },
      ],
    },
    {
      company: "Cognox",
      initials: "CX",
      href: "https://co.linkedin.com/company/cognox",
      title: "Full Stack Developer",
      start: "Mar 2021",
      end: "Jan 2023",
      location: "Colombia (Remote)",
      summary: "Software consultancy delivering customer-facing and internal platforms across multiple technology stacks.",
      highlights: [
        { label: "Multi-framework delivery", text: "Developed and maintained production applications with React, Angular, and Vue.js on the frontend and Node.js, Python, Django, and PostgreSQL on the backend, adapting to each client's established stack." },
        { label: "Component libraries", text: "Built reusable, well-tested UI components and scalable REST APIs, accelerating feature delivery and keeping UI and API behavior consistent across products." },
        { label: "Integrations", text: "Implemented authentication and authorization, data-processing pipelines, webhook handlers, and third-party integrations (payments, CRM, and messaging services)." },
        { label: "Performance", text: "Diagnosed and resolved bottlenecks by optimizing database queries, API response paths, and caching strategies, delivering noticeably faster application response times." },
        { label: "DevOps", text: "Containerized services with Docker and set up CI/CD pipelines and AWS deployments, enabling repeatable, low-risk releases and reducing manual deployment effort." },
        { label: "Production ownership", text: "Triaged incidents, performed root-cause analysis, and shipped fixes and hardening improvements for live client systems." },
      ],
      pictures: [
        { src: "/projects/manhattan.webp", alt: "Manhattan Associates' public homepage, a Cognox client Julián built React UI for", label: "manh.com" },
        { src: "/projects/airrange.webp", alt: "Airrange's public homepage, a Cognox client Julián built React UI for", label: "airrange.io" },
      ],
    },
    {
      company: "PersonalSoft",
      initials: "PS",
      href: "https://www.personalsoft.com",
      title: "Software Developer",
      start: "Jun 2018",
      end: "Feb 2021",
      location: "Medellín, Colombia",
      summary: "IT services company building custom web applications for enterprise clients.",
      highlights: [
        { label: "Full-stack development", text: "Built web applications using React, Angular, JavaScript, Node.js, Python, and Django, contributing across frontend, backend, and database layers." },
        { label: "Product features", text: "Developed REST APIs, analytics dashboards, reusable UI components, and data-driven features that supported day-to-day business operations for clients." },
        { label: "Integrations", text: "Connected external APIs, webhooks, PostgreSQL, and MySQL to production applications, handling data validation, error recovery, and synchronization edge cases." },
        { label: "Performance", text: "Improved frontend and backend performance through caching, lazy loading, bundle optimization, and code refactoring." },
        { label: "Engineering practice", text: "Contributed to unit and integration testing, debugging, code reviews, deployments, and production support, progressively taking on larger feature ownership." },
      ],
      pictures: [
        { src: "/companies/personalsoft.webp", alt: "PersonalSoft's public homepage: 'We make it happen'", label: "personalsoft.com" },
      ],
    },
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript (ES2023+)", "Python", "Java", "Kotlin", "C#", "SQL", "HTML5", "CSS3 / SCSS"] },
    { group: "Frontend", items: ["React", "Next.js (SSR / SSG / ISR)", "Vue.js (Vue 3, Nuxt, Pinia)", "Angular (RxJS, NgRx)", "Redux", "React Query"] },
    { group: "Design & UI", items: ["Figma", "Reusable component libraries", "Responsive UI", "Tailwind CSS", "Material UI"] },
    { group: "Backend", items: ["Node.js", "Express", "NestJS", "Django", "Django REST Framework", "FastAPI", ".NET", "REST APIs", "GraphQL", "WebSockets"] },
    { group: "Mobile", items: ["React Native", "Android (Kotlin)"] },
    { group: "Databases & Caching", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ORM & Query Optimization", "Schema Design", "Migrations"] },
    { group: "Cloud & DevOps", items: ["AWS (Lambda, SQS, S3, EC2, RDS, CloudWatch)", "Docker", "GitHub Actions", "CI/CD Pipelines"] },
    { group: "Architecture", items: ["Microservices", "Event-Driven Systems", "Kafka", "Serverless", "API Design", "Caching Strategies", "Background Processing"] },
    { group: "Testing & Quality", items: ["Jest", "PyTest", "React Testing Library", "Cypress", "Unit / Integration / E2E Testing", "TDD", "Code Reviews"] },
    { group: "Monitoring & Tools", items: ["Datadog", "Sentry", "Git", "GitHub", "Postman", "Jira", "Figma"] },
  ],
  projects: [
    {
      title: "Candidate Assessment & Anti-Fraud Engine",
      subtitle: "Assessment platform",
      context: "PeakU",
      description:
        "Assessment platform delivering 500+ technical and psychometric tests with real-time anti-cheat monitoring, automated scoring, and benchmarking. Moved grading and monitoring events onto serverless queues to keep the candidate UI responsive under load, with Python services for scoring and LLM-assisted evaluation under cost and latency safeguards.",
      technologies: ["React", "Node.js", "Python", "AWS Lambda / SQS"],
      image: {
        src: "/projects/peaku-assessments.webp",
        alt: "PeakU's public assessments page, showing candidate cards scored on IQ, technical, cultural-fit, and English tests",
        domain: "peaku.co/candidate-assessments",
      },
    },
    {
      title: "AI Sourcing Agent & ATS Integrations",
      subtitle: "AI-driven recruiting",
      context: "PeakU",
      description:
        "Backend services connecting the applicant tracking system with an AI sourcing agent, LinkedIn-based candidate discovery, and WhatsApp outreach. Prompt orchestration, retry and fallback handling, and Redis caching made AI-driven matching reliable in production, with Datadog and Sentry monitoring latency, errors, and spend.",
      technologies: ["Python (FastAPI)", "Node.js", "LLM APIs", "Redis"],
      image: {
        src: "/projects/peaku-matching.webp",
        alt: "PeakU's public homepage, headlined 'Where the right match happens'",
        domain: "peaku.co",
      },
    },
    {
      title: "Manhattan Associates",
      subtitle: "Supply chain web UI",
      context: "Cognox client",
      description:
        "React frontend development for Manhattan Associates, whose cloud platform runs warehouse and transportation management for global retailers and logistics providers. Delivered as a Cognox client engagement.",
      technologies: ["React"],
      href: "https://www.manh.com",
      image: {
        src: "/projects/manhattan.webp",
        alt: "Manhattan Associates' public homepage introducing the Manhattan Active platform",
        domain: "manh.com",
      },
    },
    {
      title: "Airrange",
      subtitle: "Spreadsheet-to-web platform",
      context: "Cognox client",
      description:
        "React frontend development for Airrange, a no-code platform that turns Excel and Google Sheets models into web apps, calculators, and secure APIs without changing the underlying formulas. Delivered as a Cognox client engagement.",
      technologies: ["React"],
      href: "https://airrange.io",
      image: {
        src: "/projects/airrange.webp",
        alt: "Airrange's public homepage showing a spreadsheet turned into web and mobile app screens",
        domain: "airrange.io",
      },
    },
    {
      title: "Client Business Platforms",
      subtitle: "Portals and internal tools",
      context: "Cognox",
      description:
        "Customer-facing portals and internal tools for mid-market clients in IT services, manufacturing, and retail, with payments, CRM, and messaging integrations. Reusable component libraries and containerized CI/CD deployments shortened delivery cycles across client stacks while keeping API behaviour consistent.",
      technologies: ["React", "Angular", "Vue 3", "Node.js", "Django", "AWS"],
    },
  ],
  education: [
    {
      school: "University of Antioquia",
      initials: "UA",
      href: "https://www.udea.edu.co",
      degree: "Bachelor's Degree in Computer Science",
      start: "2013",
      end: "2018",
      location: "Medellín, Colombia",
      picture: { src: "/companies/udea.webp", alt: "The University of Antioquia's public homepage", label: "udea.edu.co" },
    },
  ],
};
