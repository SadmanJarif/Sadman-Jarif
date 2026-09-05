export type ProjectStatus = "Featured" | "In Development" | "Completed" | "Experiment";
export type ProjectCategory = "AI" | "Software" | "Web" | "Mobile" | "SaaS" | "Experiments" | "Business";

export type ProjectDetail = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  overview: string;
  problem: string;
  idea: string;
  solution: string;
  role: string;
  features: string[];
  tech: string[];
  challenges: string;
  learned: string;
  future: string[];
  categories: ProjectCategory[];
  status: ProjectStatus;
  gradient: string;
  icon: string;
  year: string;
};

export const PROJECT_CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "AI",
  "Software",
  "Web",
  "Mobile",
  "SaaS",
  "Experiments",
  "Business",
];

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "nexus-ai-agent",
    title: "Nexus AI Agent",
    tagline: "An autonomous assistant that researches, plans and gets work done.",
    description:
      "Autonomous AI agent that researches, plans and executes multi-step tasks — web search, summarization and workflow automation in one conversational interface.",
    overview:
      "Nexus started as a question I kept asking myself: what if a chatbot could actually finish a task instead of just talking about it? I built a prototype agent that takes a goal in plain language, breaks it into steps, uses tools like web search and summarization, and reports back with results. It is still rough around the edges — which is exactly why it is my favorite project.",
    problem:
      "Most chatbots answer questions but leave the actual work to you. Researching a topic, comparing options, drafting a summary — every step still needs a human in the loop.",
    idea: "Give an LLM a loop: plan the steps, call tools for each step, check the result, and keep going until the goal is done — with the human approving key decisions.",
    solution:
      "A conversational agent with a planner-executor loop. It decomposes goals into sub-tasks, calls search and text-processing tools, keeps working memory of what it has found, and produces a final structured answer with sources.",
    role: "Sole builder — prompt design, agent loop, tool integrations, testing and iteration.",
    features: [
      "Goal decomposition into ordered sub-tasks",
      "Web search + summarization tool calls",
      "Working memory across multi-step runs",
      "Structured final reports with sources",
      "Human-in-the-loop approval checkpoints",
    ],
    tech: ["Python", "LLM APIs", "LangChain patterns", "REST APIs"],
    challenges:
      "The agent was confidently wrong in early tests — looping forever or hallucinating tool results. I added step limits, result validation, and approval checkpoints, which made it slower but dramatically more trustworthy.",
    learned:
      "Agents fail like interns, not like code. Reliability comes from constraints — clear tools, tight loops, good fallbacks — not from a smarter model alone.",
    future: ["Persistent memory across sessions", "eval harness for regression testing", "Template library for business workflows"],
    categories: ["AI", "Software", "Experiments"],
    status: "In Development",
    gradient: "from-cyan-500/25 via-sky-600/10 to-violet-600/25",
    icon: "◆",
    year: "2025–Present",
  },
  {
    slug: "impact-calculator",
    title: "Impact Calculator",
    tagline: "Turning nonprofit outcomes into numbers donors understand.",
    description:
      "Built with Connect For Purpose — an interactive web app that quantifies nonprofit impact with dynamic visualizations and data-driven reporting.",
    overview:
      "Nonprofits do life-changing work but struggle to show it in numbers. With Connect For Purpose I helped build an Impact Calculator: answer a few questions about programs and reach, and get clear, visual estimates of outcomes you can share with donors and partners.",
    problem:
      "Small nonprofits rarely have data teams, so impact reporting is manual, inconsistent, and hard for donors to grasp.",
    idea: "A guided calculator — simple inputs, transparent math, beautiful outputs — that any program manager can use without training.",
    solution:
      "An interactive web app with a step-by-step input flow, live recalculation, charts for outcomes over time, and exportable summaries for grant reports.",
    role: "Web & AI developer — UI components, calculation logic, data visualization, responsiveness.",
    features: [
      "Guided multi-step input flow",
      "Live impact recalculation",
      "Charts and visual outcome summaries",
      "Exportable report views",
      "Fully responsive for field use on mobile",
    ],
    tech: ["React", "JavaScript", "Data Viz", "Responsive CSS"],
    challenges:
      "The math had to be both honest and understandable. We iterated on the model with the nonprofit team so every number shown could be explained in one sentence.",
    learned:
      "Building for non-technical users taught me restraint — fewer inputs, clearer labels, and always showing your work behind a number.",
    future: ["Saved scenarios and comparisons", "PDF export for grant applications", "Multi-program dashboards"],
    categories: ["Web", "Software", "Business"],
    status: "Featured",
    gradient: "from-emerald-500/25 via-teal-600/10 to-cyan-600/25",
    icon: "◈",
    year: "2025–Present",
  },
  {
    slug: "ai-events-manager",
    title: "AI Events Manager",
    tagline: "Event planning without the spreadsheet chaos.",
    description:
      "AI-assisted event planning platform — smart scheduling, attendee insights and automated reminders that remove hours of manual coordination.",
    overview:
      "Also with Connect For Purpose: an AI-assisted events manager that handles the repetitive side of running community events — scheduling, reminders, attendee lists — so organizers can focus on the actual event.",
    problem:
      "Community organizers lose hours to coordination overhead: chasing RSVPs, sending reminders, reconciling attendee lists across tools.",
    idea: "One place for events where AI drafts the communications, suggests schedules, and flags what needs human attention.",
    solution:
      "An event workspace with AI-drafted announcements and reminders, scheduling helpers, and attendee insights surfaced automatically.",
    role: "Contributor — event workflows, AI-assisted messaging, UI iteration with the nonprofit team.",
    features: [
      "Event workspace with schedules and lists",
      "AI-drafted announcements and reminders",
      "RSVP tracking and attendee insights",
      "Automated reminder sequences",
      "Organizer dashboard",
    ],
    tech: ["React", "AI Automation", "NLP", "REST APIs"],
    challenges:
      "AI-drafted messages sounded generic at first. We added tone controls and organization-specific context so drafts felt like they came from the team.",
    learned: "Automation earns trust one correct draft at a time. Defaults matter more than features.",
    future: ["Calendar integrations", "WhatsApp/SMS reminders", "Post-event impact summaries"],
    categories: ["AI", "Web", "SaaS"],
    status: "In Development",
    gradient: "from-violet-500/25 via-purple-600/10 to-fuchsia-600/25",
    icon: "⬢",
    year: "2025–Present",
  },
  {
    slug: "supportiq-chatbot",
    title: "SupportIQ Chatbot",
    tagline: "Instant answers for a nonprofit, built on their own knowledge.",
    description:
      "Production-style AI chatbot developed during Africa ICT Right internship — trained on org knowledge, cutting response time and streamlining workflows.",
    overview:
      "During my web developer internship with Africa ICT Right, I helped redesign the website and built an AI chatbot trained on the organization's own content — programs, FAQs, contact paths — so visitors get answers instantly instead of waiting for email replies.",
    problem:
      "A small team was answering the same visitor questions repeatedly by email, while the website buried key information three clicks deep.",
    idea: "Pair a website redesign with a chatbot grounded in the org's real content — no hallucinations, always a path to a human.",
    solution:
      "A retrieval-grounded chatbot: questions are matched against curated org knowledge, answers cite their source pages, and anything uncertain escalates to the contact form with context attached.",
    role: "Web developer intern — redesign, chatbot build, knowledge curation, workflow improvements.",
    features: [
      "Grounded answers from curated org content",
      "Source links on every answer",
      "Graceful handoff to human contact",
      "Website redesign for findability",
      "Internal workflow documentation",
    ],
    tech: ["Python", "NLP", "Chatbots", "WordPress", "JavaScript"],
    challenges:
      "Early answers drifted off-topic. Grounding every response in retrieved passages — and saying 'I don't know, here's who to ask' otherwise — fixed trust overnight.",
    learned: "A chatbot is a UX project first and an AI project second. Escalation paths are a feature, not a failure.",
    future: ["Multilingual support", "Analytics on unanswered questions", "Content-gap reports for the team"],
    categories: ["AI", "Software", "Web", "Business"],
    status: "Completed",
    gradient: "from-amber-500/20 via-orange-600/10 to-rose-600/20",
    icon: "⬣",
    year: "2025",
  },
  {
    slug: "studyflow-edtech",
    title: "StudyFlow — EdTech SaaS",
    tagline: "A study companion designed for students like me.",
    description:
      "Flutter-powered study companion concept: spaced repetition, AI quizzes and progress analytics designed for students in emerging markets.",
    overview:
      "StudyFlow is my EdTech exploration: a mobile-first study companion with spaced repetition, AI-generated quizzes from your own notes, and progress analytics. Designed for students with patchy internet and big ambitions — because that describes most of my peers.",
    problem:
      "Students in emerging markets study hard but with weak feedback loops — no tutors, no smart tools, no sense of whether revision is actually working.",
    idea: "Turn any set of notes into an active study plan: flashcards, quizzes, and a schedule that adapts to what you keep getting wrong.",
    solution:
      "A Flutter prototype with decks, quiz generation, streaks, and a simple analytics view showing mastery per topic over time.",
    role: "Designer + builder — concept, UX flow, Flutter prototype, quiz logic.",
    features: [
      "Spaced-repetition flashcard decks",
      "AI quiz generation from notes",
      "Mastery analytics per topic",
      "Streaks and study reminders",
      "Offline-first deck storage",
    ],
    tech: ["Flutter", "Dart", "LLM APIs", "Local storage"],
    challenges:
      "Quiz quality varied wildly by subject. Constraining generation with the student's own notes — rather than open-ended questions — made output far more usable.",
    learned: "EdTech lives or dies on the study loop, not the content library. Small feedback loops beat big feature lists.",
    future: ["Teacher dashboards", "Bangla language support", "Peer challenge mode"],
    categories: ["Mobile", "SaaS", "Experiments", "AI"],
    status: "Experiment",
    gradient: "from-blue-500/25 via-indigo-600/10 to-violet-600/25",
    icon: "⬔",
    year: "2025–Present",
  },
  {
    slug: "bizautomate-suite",
    title: "BizAutomate Suite",
    tagline: "A one-person-business toolkit for solo founders.",
    description:
      "One-person-business toolkit — AI content drafts, lead capture, invoicing helpers and marketing automation for solo founders and small teams.",
    overview:
      "BizAutomate is my business-side experiment: a bundle of small automations for solo founders — drafting content, capturing leads, nudging follow-ups, templating invoices. Each tool is tiny; together they give one person the leverage of a small team.",
    problem:
      "Solo founders spend half their week on repetitive ops — posting, following up, formatting — instead of serving customers.",
    idea: "Sell outcomes, not software: pre-built automation recipes for the ten most repetitive solo-business tasks.",
    solution:
      "A modular toolkit: content draft flows, lead capture pages, follow-up sequences, and simple finance templates, all wired to tools founders already use.",
    role: "Independent builder — market research, prototypes, automation recipes, landing pages.",
    features: [
      "AI content draft workflows",
      "Lead capture + follow-up sequences",
      "Invoice and quote templates",
      "Marketing automation recipes",
      "Simple analytics per workflow",
    ],
    tech: ["AI Automation", "WordPress", "SaaS", "APIs"],
    challenges:
      "Scope creep is the killer — every founder wants something slightly different. I narrowed to repeatable recipes instead of custom builds.",
    learned: "For small businesses, done-for-you beats do-it-yourself. Packaging and onboarding are the product.",
    future: ["Niche packs (tutors, agencies, shops)", "Usage-based pricing", "Partner with local freelancers for fulfillment"],
    categories: ["SaaS", "Business", "AI", "Web"],
    status: "Experiment",
    gradient: "from-fuchsia-500/20 via-purple-600/10 to-cyan-600/20",
    icon: "⬓",
    year: "2025–Present",
  },
];

export const getProject = (slug: string) => PROJECT_DETAILS.find((p) => p.slug === slug);
