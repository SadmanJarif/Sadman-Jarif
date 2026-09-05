/* Shared site content: journey, experience detail, learning, ECA, goals, now, uses, lab, ventures */

export const JOURNEY_MILESTONES = [
  {
    era: "Early Education",
    period: "Foundations",
    title: "A curious student finds the internet",
    text: "Early schooling in Bangladesh, then a transition toward self-directed learning online — discovering that curiosity plus an internet connection could take me anywhere.",
    tags: ["Bangladesh", "Self-learning"],
  },
  {
    era: "Technology Exploration",
    period: "Breadth first",
    title: "Trying everything: web, Flutter, WordPress, marketing",
    text: "Web development, Flutter apps, WordPress client sites, digital marketing — I said yes to a lot of things and built a lot of imperfect things. Each one left a skill behind.",
    tags: ["Web Dev", "Flutter", "WordPress", "Marketing"],
  },
  {
    era: "Professional Experience",
    period: "2025",
    title: "First international roles: Beats, Africa ICT Right, Connect For Purpose",
    text: "An externship in market analysis with Beats By Dre, a web + AI chatbot internship with Africa ICT Right, and ongoing Web & AI development with Connect For Purpose. Real teams, real deadlines.",
    tags: ["Internships", "Remote", "AI Chatbots"],
  },
  {
    era: "Entrepreneurship",
    period: "Experiments",
    title: "First digital businesses and product ideas",
    text: "Client websites, automation recipes, SaaS concepts like BizAutomate — learning that distribution and packaging matter as much as code.",
    tags: ["Startups", "SaaS", "Automation"],
  },
  {
    era: "Computer Science",
    period: "Rigor",
    title: "Harvard CS50x: learning to think like a computer scientist",
    text: "Pointers, memory, algorithms — the hardest course I had finished at that point, and the one that gave me the mental models behind everything else.",
    tags: ["CS50x", "Algorithms"],
  },
  {
    era: "UoPeople",
    period: "Present",
    title: "Associate degree in Computer Science begins",
    text: "Formal CS education at University of the People — structure, peers, and credentials to match the self-taught skills, while preparing for future international opportunities.",
    tags: ["Degree", "CS Foundations"],
  },
  {
    era: "AI Focus",
    period: "Now",
    title: "Going deep: agents, automation, data science, ML",
    text: "Increasing focus on AI agents, automation, LLMs, data science and machine learning — building products, not just tutorials.",
    tags: ["AI Agents", "LLMs", "Data Science"],
  },
  {
    era: "Future",
    period: "Next",
    title: "International education, deeper expertise, global impact",
    text: "Scholarships and international programs, deeper technical mastery, companies that solve real problems. The roadmap is honest and ambitious.",
    tags: ["Global", "Entrepreneurship", "Impact"],
  },
];

export type ExperienceDetail = {
  org: string;
  role: string;
  place: string;
  time: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  tech: string[];
  learned: string;
  impact: string;
};

export const EXPERIENCE_DETAILS: ExperienceDetail[] = [
  {
    org: "Connect For Purpose",
    role: "Web & AI Developer",
    place: "United States • Remote",
    time: "2025 — Present",
    current: true,
    summary:
      "Contributing to technology projects for social good, including an Impact Calculator and an AI Events Manager for nonprofit teams.",
    responsibilities: [
      "Building interactive calculator UI with live recalculation and visualizations",
      "Developing AI-assisted event workflows: scheduling, messaging, reminders",
      "Iterating directly with nonprofit stakeholders on requirements",
      "Ensuring responsive, accessible experiences on low-end devices",
    ],
    tech: ["React", "JavaScript", "AI Automation", "Data Viz", "REST APIs"],
    learned:
      "How to build for non-technical users: fewer inputs, clearer labels, and always being able to explain a number in one sentence.",
    impact:
      "Working tools used by a real nonprofit team — impact reporting and event coordination that previously took hours of manual work.",
  },
  {
    org: "Africa ICT Right",
    role: "Web Developer Intern",
    place: "Ghana • Remote",
    time: "2025",
    summary:
      "Website development and redesign plus AI chatbot development and workflow improvements for an education-focused nonprofit.",
    responsibilities: [
      "Redesigned website structure for findability and mobile experience",
      "Built SupportIQ chatbot grounded in curated organizational knowledge",
      "Curated FAQs and knowledge base with source-linked answers",
      "Documented workflows so the team could maintain everything",
    ],
    tech: ["WordPress", "JavaScript", "Python", "NLP", "Chatbots"],
    learned:
      "A chatbot is a UX project first: escalation paths, empty states, and suggested questions matter more than model choice.",
    impact:
      "Faster answers for visitors, fewer repetitive emails for the team, and a maintainable site the org actually owns.",
  },
  {
    org: "Beats By Dre",
    role: "Consumer Behavior & Market Analysis Extern",
    place: "United States • Remote",
    time: "2025",
    summary:
      "Consumer analytics, competitor research, market analysis, and executive reporting through a professional externship program.",
    responsibilities: [
      "Analyzed consumer behavior patterns and segment preferences",
      "Researched competitors across product, pricing, and positioning",
      "Synthesized findings into executive-ready reports",
      "Presented insights with data-backed recommendations",
    ],
    tech: ["Market Research", "Consumer Analytics", "Strategy", "Reporting"],
    learned:
      "How great brands think: positioning before product, story before specs — and how data earns a seat at that table.",
    impact:
      "Executive-style deliverables reviewed by program mentors; a foundation in business thinking I now apply to every product.",
  },
];

export const FREELANCE_INFO = {
  title: "Freelance & Independent Work",
  text: "Alongside formal roles, I have taken on websites, software builds, digital products, AI setups, and business-related projects for clients — mostly small businesses and individuals who needed something that works, fast.",
  items: ["Business websites (WordPress, custom)", "AI chatbot setups", "Automation recipes", "Marketing + landing pages", "Technical writing"],
};

export const LEARNING_TRACKS = [
  {
    area: "Computer Science",
    desc: "Programming, algorithms, software engineering.",
    accent: "from-cyan-400 to-sky-500",
    completed: ["Harvard CS50x", "C programming basics", "DSA foundations (ongoing)"],
    learning: ["Algorithms in depth", "System design basics"],
    next: ["Operating systems", "Databases internals"],
  },
  {
    area: "Artificial Intelligence",
    desc: "AI, machine learning, LLMs, agents, automation.",
    accent: "from-violet-400 to-purple-500",
    completed: ["LLM app patterns", "Chatbot builds", "Prompt engineering practice"],
    learning: ["Agent orchestration", "RAG + evals"],
    next: ["ML theory", "Fine-tuning", "Vector DBs at scale"],
  },
  {
    area: "Data",
    desc: "Statistics, probability, data science.",
    accent: "from-emerald-400 to-teal-500",
    completed: ["UoTokyo GCI Data & Science", "Data viz practice"],
    learning: ["Stanford Probability for AI"],
    next: ["Applied ML projects", "Experimental design"],
  },
  {
    area: "Business",
    desc: "Entrepreneurship, strategy, marketing, finance.",
    accent: "from-amber-400 to-orange-500",
    completed: ["Wharton Business Foundations", "Beats externship", "Digital marketing practice"],
    learning: ["SaaS pricing & packaging"],
    next: ["Startup finance", "Sales systems"],
  },
  {
    area: "Communication",
    desc: "English, writing, public speaking, presentations.",
    accent: "from-fuchsia-400 to-pink-500",
    completed: ["Technical writing", "MUN participation", "Executive reporting"],
    learning: ["Writing in public (this blog)"],
    next: ["Public speaking", "Teaching & mentorship"],
  },
];

export const ECA_DETAILS = [
  {
    title: "Model United Nations",
    icon: "◉",
    did: "Participated in international MUN conferences — researching country positions, drafting resolutions, debating live.",
    why: "To learn diplomacy, structured thinking, and speaking under pressure.",
    learned: "Preparation wins debates; listening wins allies. Both transfer directly to client and team work.",
    impact: "Stronger public speaking and research habits I use in every presentation since.",
  },
  {
    title: "Volunteering",
    icon: "♥",
    did: "Technology and community-focused volunteer work, including nonprofit tech contributions.",
    why: "Skills compound fastest when they serve someone real.",
    learned: "Constraints breed creativity — small teams, real users, no budget for waste.",
    impact: "Working tools for orgs that couldn't have afforded them otherwise.",
  },
  {
    title: "Competitions",
    icon: "⬢",
    did: "Hackathons, challenges, simulations, and professional externship competitions.",
    why: "To benchmark myself against talented peers and learn to deliver under time pressure.",
    learned: "Done beats perfect. Scoping to the judging criteria is a skill of its own.",
    impact: "A portfolio of finished, demoable work — and comfort with deadlines.",
  },
  {
    title: "Leadership",
    icon: "⬣",
    did: "Leadership activities and roles across learning programs, teams, and community projects.",
    why: "Because building bigger things requires bringing people with you.",
    learned: "Ownership is the difference: leaders close loops instead of completing tasks.",
    impact: "Teams and projects that kept moving because someone took responsibility.",
  },
  {
    title: "Community",
    icon: "⬔",
    did: "Projects and activities intended to help others — from EdTech ideas to knowledge sharing.",
    why: "The ecosystem that raised me (free courses, open source) runs on people giving back.",
    learned: "Teaching is the fastest way to find gaps in your own understanding.",
    impact: "Notes, writing, and tools that others can learn from and build on.",
  },
];

export const RESEARCH_NOTES = [
  { title: "Agent loops: plan → act → verify", area: "AI Agents", type: "Research Note", date: "Jan 2026", summary: "Why planner-executor loops with verification beat single-pass prompting, with patterns from my Nexus build.", tags: ["agents", "llm"] },
  { title: "RAG grounding checklist", area: "AI Chatbots", type: "Explainer", date: "Dec 2025", summary: "The exact checklist I use before calling any chatbot 'grounded': retrieval, citations, abstention, escalation.", tags: ["rag", "chatbots"] },
  { title: "Evals for side projects", area: "AI Engineering", type: "Experiment", date: "Dec 2025", summary: "Five test goals, re-run after every change. A minimal eval harness that caught regressions my eyes missed.", tags: ["evals", "testing"] },
  { title: "Probability intuitions for builders", area: "Data Science", type: "Study Note", date: "Nov 2025", summary: "Priors, likelihoods, expected value — translated from Stanford coursework into decisions I make while building.", tags: ["probability", "stats"] },
  { title: "Spaced repetition that sticks", area: "Learning Science", type: "Experiment", date: "Nov 2025", summary: "What the literature says about retrieval practice, and how StudyFlow implements it without annoying users.", tags: ["edtech", "learning"] },
  { title: "DSA patterns I actually reuse", area: "Programming", type: "Code Notes", date: "Oct 2025", summary: "Hash maps, two pointers, sliding windows — the small set of patterns behind most interview and real-world problems I meet.", tags: ["dsa", "c", "python"] },
  { title: "Prompt patterns for support bots", area: "AI Chatbots", type: "Explainer", date: "Sep 2025", summary: "Tone controls, context injection, and abstention prompts distilled from shipping SupportIQ.", tags: ["prompts", "ux"] },
  { title: "SaaS pricing for solo tools", area: "Business", type: "Literature Review", date: "Sep 2025", summary: "What I read on outcome-based pricing, and how it reshaped BizAutomate from platform to recipes.", tags: ["saas", "pricing"] },
];

export const LAB_AREAS = [
  { title: "AI Agents", icon: "◆", text: "Autonomous agents and business workflows — planners, tools, memory, evals.", accent: "from-cyan-400 to-sky-500" },
  { title: "AI Automation", icon: "⬢", text: "Automating repetitive business and productivity tasks with recipes that hold up.", accent: "from-violet-400 to-purple-500" },
  { title: "AI Chatbots", icon: "⬣", text: "Conversational systems and support solutions people actually trust.", accent: "from-amber-400 to-orange-500" },
  { title: "AI Products", icon: "⬔", text: "Experiments and products in development — small, useful, shippable.", accent: "from-emerald-400 to-teal-500" },
];

export const LAB_ITEMS = [
  { kind: "Prototype", title: "Nexus agent loop v2", text: "Planner-executor with approval checkpoints and step budgets. Currently my main build.", status: "Active" },
  { kind: "Experiment", title: "Eval harness (5 goals)", text: "Re-running five fixed goals after every prompt change. Caught two regressions already.", status: "Running" },
  { kind: "Research Note", title: "Grounding checklist", text: "Retrieval → citation → abstention → escalation. Required reading before any chatbot ships.", status: "Published" },
  { kind: "Idea", title: "Tutor follow-up recipe", text: "Automated reminders + progress summaries for private tutors. Candidate BizAutomate pack.", status: "Exploring" },
  { kind: "Prototype", title: "Quiz-from-notes", text: "StudyFlow's constrained quiz generation — questions only from the student's own notes.", status: "Active" },
  { kind: "Research Note", title: "Support-bot prompts", text: "Tone controls and context injection patterns from SupportIQ, written up for reuse.", status: "Published" },
];

export const VENTURE_IDEAS = [
  { title: "Tutor Ops Pack", area: "EdTech Automation", text: "Follow-ups, fee reminders, and progress summaries for private tutors — the first BizAutomate niche pack.", stage: "Prototyping" },
  { title: "Support-in-a-box", area: "AI Chatbots", text: "Grounded chatbot + knowledge setup for small businesses, delivered done-for-you in a week.", stage: "Exploring" },
  { title: "StudyFlow", area: "EdTech SaaS", text: "Spaced repetition + AI quizzes for students in emerging markets. My longest-running product bet.", stage: "Prototype" },
  { title: "Content engine for agencies", area: "Automation", text: "Draft → review → schedule pipeline tuned to an agency's voice. Outcome: a month of posts in a day.", stage: "Idea" },
];

export const BUILD_LOG = [
  { date: "Jan 2026", text: "Shipped Nexus approval checkpoints — error rate dropped visibly on my 5-goal eval set." },
  { date: "Dec 2025", text: "Impact Calculator live-recalc refactor with the Connect For Purpose team." },
  { date: "Nov 2025", text: "First paying automation recipe test with a local business. Learned more in a week than in a month of building." },
  { date: "Oct 2025", text: "SupportIQ handoff flow: escalations now carry full conversation context." },
];

export const GOALS = {
  current: [
    { title: "Excel at UoPeople", detail: "Strong grades in CS foundations while building alongside coursework." },
    { title: "Ship Nexus v1", detail: "A reliable agent loop with evals, memory, and three business templates." },
    { title: "Write in public", detail: "One honest post per month on AI, building, and learning." },
    { title: "First SaaS revenue", detail: "One niche automation pack with paying users and referrals." },
  ],
  oneYear: [
    { title: "Deeper technical mastery", detail: "DSA fluency, system design basics, ML coursework in progress." },
    { title: "International applications", detail: "Scholarships, transfer options, internships, and competitions submitted." },
    { title: "Two products live", detail: "StudyFlow and one BizAutomate pack serving real users." },
    { title: "Research footprint", detail: "Notes and writing that others cite and learn from." },
  ],
  longTerm: [
    { title: "AI/software engineer, internationally", detail: "Work with world-class teams on meaningful systems." },
    { title: "Founder", detail: "Build companies that solve real problems and sustain themselves." },
    { title: "Educator leverage", detail: "Create learning resources for students from places like mine." },
    { title: "Financial independence", detail: "Freedom to choose problems, not chase paychecks." },
  ],
};

export const NOW_DATA = {
  updated: "February 2026",
  learning: ["DSA in C + Python", "Stanford Probability for AI", "Agent orchestration patterns"],
  building: ["Nexus AI Agent v2", "Impact Calculator improvements", "StudyFlow prototype"],
  reading: ["AI engineering blogs", "SaaS pricing literature", "Technical papers on evals"],
  workingOn: ["Connect For Purpose deliverables", "UoPeople coursework", "Monthly blog post"],
  preparingFor: ["Scholarship applications", "Internship applications", "Competitions"],
  exploring: ["One-person business models", "EdTech for emerging markets", "Public speaking"],
};

export const USES_DATA = [
  { section: "Development", items: [{ name: "VS Code", desc: "Daily editor for web, Python, and docs." }, { name: "Next.js + React", desc: "My default for shipping web apps fast." }, { name: "Flutter", desc: "For mobile prototypes and EdTech ideas." }, { name: "Python", desc: "AI experiments, scripting, data work." }, { name: "Git + GitHub", desc: "Version control and my public build log." }] },
  { section: "AI Tools", items: [{ name: "LLM assistants", desc: "Drafting, debugging, and rubber-ducking at speed." }, { name: "AI code completion", desc: "Boilerplate and test scaffolding." }, { name: "Prompt lab", desc: "My own notes + eval set for agent work." }] },
  { section: "Productivity", items: [{ name: "Simple task list", desc: "Three priorities a day, no more." }, { name: "Calendar blocks", desc: "Two-hour deep-work blocks for hard topics." }, { name: "Confusion log", desc: "Every stuck point, timestamped — patterns included." }] },
  { section: "Learning", items: [{ name: "UoPeople", desc: "Formal CS degree structure." }, { name: "Harvard CS50x", desc: "Completed — my rigor foundation." }, { name: "Docs + papers", desc: "Primary sources before tutorials." }] },
  { section: "Design", items: [{ name: "Figma-style flows", desc: "Quick mockups before code." }, { name: "Video editing", desc: "For demos and future content." }] },
  { section: "Research", items: [{ name: "Python notebooks", desc: "Data and probability experiments." }, { name: "This site's notes", desc: "Research & Notes page as personal knowledge base." }] },
];

export const UPDATES = [
  { date: "Feb 2026", title: "Site becomes a platform", text: "This revamp: 16 pages, blog, lab, research archive — a digital home, not just a portfolio." },
  { date: "Jan 2026", title: "Nexus agent v2", text: "Approval checkpoints + eval harness. Reliability over cleverness." },
  { date: "Dec 2025", title: "Impact Calculator progress", text: "Live recalculation shipped with Connect For Purpose." },
  { date: "2025", title: "Three international roles", text: "Beats By Dre, Africa ICT Right, Connect For Purpose — in one year." },
];

export const RESUME_DATA = {
  profile: "Developer, entrepreneur, and aspiring AI/software engineer from Bangladesh. I build AI-powered products — agents, automation, chatbots, web and mobile apps — and study Computer Science at University of the People (Associate, in progress; Penn Foster HS Diploma, GPA 3.87, 2026).",
  education: [
    { s: "University of the People", d: "Associate of Science in Computer Science — in progress" },
    { s: "Penn Foster", d: "High School Diploma — GPA 3.87, 2026" },
    { s: "Programs", d: "Harvard CS50x • UoTokyo GCI • Stanford Probability for AI • Wharton Business Foundations" },
  ],
  experience: [
    { s: "Connect For Purpose — Web & AI Developer (2025–Present, US remote)", d: "Impact Calculator + AI Events Manager for nonprofit teams." },
    { s: "Africa ICT Right — Web Developer Intern (2025, Ghana remote)", d: "Website redesign, SupportIQ AI chatbot, workflow improvements." },
    { s: "Beats By Dre — Market Analysis Extern (2025, US remote)", d: "Consumer analytics, competitor research, executive reporting." },
  ],
  skills: "AI agents • Automation • NLP • Chatbots • LLM apps • Flutter • React • JS • Python • C • SQL • WordPress • Marketing • Strategy",
  languages: "Bengali (native) • English (professional)",
};
