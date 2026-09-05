export const SITE_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Writing", href: "/writing" },
];

export const MORE_LINKS = [
  { label: "Journey", href: "/journey", desc: "Milestones from Bangladesh to AI" },
  { label: "Entrepreneurship", href: "/ventures", desc: "Startups, SaaS, build in public" },
  { label: "Learning", href: "/learning", desc: "Tracks, courses, what stuck" },
  { label: "Research", href: "/research", desc: "Notes, explainers, experiments" },
  { label: "ECA & Leadership", href: "/eca", desc: "MUN, volunteering, community" },
  { label: "Goals", href: "/goals", desc: "An honest personal roadmap" },
  { label: "Now", href: "/now", desc: "What I'm doing this month" },
  { label: "My Setup", href: "/uses", desc: "Tools I build with" },
  { label: "Resume", href: "/resume", desc: "Online CV + download" },
  { label: "Contact", href: "/contact", desc: "Ideas, roles, collaboration" },
];

/* Legacy anchor nav (homepage sections) — kept for footer/back-compat */
export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Experience", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Writing", href: "/writing" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" },
];

export const SOCIALS = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  email: "mailto:hello@sadmanjarif.dev",
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  gradient: string;
  icon: string;
  live?: string;
  github?: string;
  status: string;
  slug: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "nexus-ai-agent",
    title: "Nexus AI Agent",
    description:
      "Autonomous AI agent that researches, plans and executes multi-step tasks — web search, summarization and workflow automation in one conversational interface.",
    tags: ["LLM Apps", "AI Agents", "Python", "LangChain"],
    category: "AI Agents",
    gradient: "from-cyan-500/25 via-sky-600/10 to-violet-600/25",
    icon: "◆",
    status: "Building",
  },
  {
    slug: "impact-calculator",
    title: "Impact Calculator",
    description:
      "Built with Connect For Purpose — an interactive web app that quantifies nonprofit impact with dynamic visualizations and data-driven reporting.",
    tags: ["React", "JavaScript", "Data Viz"],
    category: "Web App",
    gradient: "from-emerald-500/25 via-teal-600/10 to-cyan-600/25",
    icon: "◈",
    status: "Live Project",
  },
  {
    slug: "ai-events-manager",
    title: "AI Events Manager",
    description:
      "AI-assisted event planning platform — smart scheduling, attendee insights and automated reminders that remove hours of manual coordination.",
    tags: ["AI Automation", "React", "NLP"],
    category: "AI Automation",
    gradient: "from-violet-500/25 via-purple-600/10 to-fuchsia-600/25",
    icon: "⬢",
    status: "In Progress",
  },
  {
    slug: "supportiq-chatbot",
    title: "SupportIQ Chatbot",
    description:
      "Production-style AI chatbot developed during Africa ICT Right internship — trained on org knowledge, cutting response time and streamlining workflows.",
    tags: ["Chatbots", "NLP", "Python"],
    category: "AI Chatbot",
    gradient: "from-amber-500/20 via-orange-600/10 to-rose-600/20",
    icon: "⬣",
    status: "Shipped",
  },
  {
    slug: "studyflow-edtech",
    title: "StudyFlow — EdTech SaaS",
    description:
      "Flutter-powered study companion concept: spaced repetition, AI quizzes and progress analytics designed for students in emerging markets.",
    tags: ["Flutter", "EdTech", "SaaS"],
    category: "EdTech",
    gradient: "from-blue-500/25 via-indigo-600/10 to-violet-600/25",
    icon: "⬔",
    status: "Prototype",
  },
  {
    slug: "bizautomate-suite",
    title: "BizAutomate Suite",
    description:
      "One-person-business toolkit — AI content drafts, lead capture, invoicing helpers and marketing automation for solo founders and small teams.",
    tags: ["SaaS", "Automation", "WordPress", "AI"],
    category: "SaaS",
    gradient: "from-fuchsia-500/20 via-purple-600/10 to-cyan-600/20",
    icon: "⬓",
    status: "Exploring",
  },
];

export const SKILLS: { category: string; items: string[]; accent: string; note: string }[] = [
  {
    category: "AI & Automation",
    items: ["AI Agents", "AI Automation", "NLP", "Chatbots", "LLM Applications"],
    accent: "from-cyan-400 to-sky-500",
    note: "Where I spend most of my build time",
  },
  {
    category: "Software Development",
    items: ["Flutter", "JavaScript", "React", "HTML", "CSS", "C", "Python", "SQL"],
    accent: "from-violet-400 to-purple-500",
    note: "Foundations I use every week",
  },
  {
    category: "Web & Platforms",
    items: ["WordPress", "Shopify", "Responsive Web Development"],
    accent: "from-emerald-400 to-teal-500",
    note: "Shipping real sites for real clients",
  },
  {
    category: "Business & Growth",
    items: ["Digital Marketing", "Entrepreneurship", "Market Research", "Strategy"],
    accent: "from-amber-400 to-orange-500",
    note: "Thinking beyond the code",
  },
  {
    category: "Other",
    items: ["Data Structures & Algorithms", "UI/UX", "Video Editing", "Technical Writing"],
    accent: "from-fuchsia-400 to-pink-500",
    note: "The connective tissue",
  },
];

export const WRITING = [
  {
    slug: "building-ai-agents-taught-me-thinking",
    title: "What building AI agents taught me about thinking",
    excerpt: "Agents fail like interns, not like code. Here's how I learned to design prompts, tools and fallbacks that actually hold up.",
    tag: "AI",
    readTime: "6 min read",
    date: "Coming soon",
  },
  {
    slug: "wordpress-to-llms-path",
    title: "From WordPress to LLMs: my winding path into software",
    excerpt: "Flutter, marketing, chatbots, CS theory — why exploring widely made me a sharper, more pragmatic builder.",
    tag: "Career",
    readTime: "5 min read",
    date: "Coming soon",
  },
  {
    slug: "one-person-ai-business-playbook",
    title: "One-person AI businesses are real. Here's the playbook I'm testing",
    excerpt: "AI automation + SaaS + distribution: notes from building small, useful products as a solo founder in Bangladesh.",
    tag: "Entrepreneurship",
    readTime: "8 min read",
    date: "Coming soon",
  },
];
