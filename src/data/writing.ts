export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  featured?: boolean;
  content: { heading?: string; body: string[] }[];
};

export const POST_CATEGORIES = [
  "All",
  "AI",
  "Computer Science",
  "Software Engineering",
  "Entrepreneurship",
  "Career",
  "Education",
  "Experiments",
  "Personal Growth",
] as const;

export const POSTS: Post[] = [
  {
    slug: "building-ai-agents-taught-me-thinking",
    title: "What building AI agents taught me about thinking",
    subtitle: "Agents fail like interns, not like code — and that changes how you design them.",
    category: "AI",
    date: "Jan 2026",
    readTime: "6 min read",
    excerpt:
      "Agents fail like interns, not like code. Here's how I learned to design prompts, tools and fallbacks that actually hold up.",
    featured: true,
    content: [
      {
        body: [
          "When I built my first AI agent, I expected it to behave like a function: input in, correct output out. Instead it behaved like a keen but careless intern — fast, confident, and wrong in creative ways.",
          "That single reframing changed everything about how I design. You don't write agents; you manage them. You give them narrow tools, clear checklists, and a supervisor (you, or code) that verifies the work.",
        ],
      },
      {
        heading: "The three failures I kept seeing",
        body: [
          "First, infinite loops: the agent retries the same failing step forever. Fix: step budgets and a rule that says after two failures, escalate instead of retrying.",
          "Second, hallucinated tool results: it would summarize a page it never actually fetched. Fix: every claim must reference a tool output ID, or it doesn't count.",
          "Third, vague goals: 'research the market' means nothing. Fix: force the goal into verifiable sub-tasks before the loop starts.",
        ],
      },
      {
        heading: "What actually works",
        body: [
          "Small tools beat big tools. A search tool that returns three clean snippets outperforms one that dumps whole pages. Constraints are a feature.",
          "Approval checkpoints feel slow but build trust fast. Letting a human approve the plan before execution cut my error rate more than any prompt tweak.",
          "Evals matter even for side projects. I keep five test goals and re-run them after every change. If a 'fix' breaks two of them, it wasn't a fix.",
        ],
      },
      {
        heading: "The bigger lesson",
        body: [
          "Building agents taught me to think in systems: goals, feedback loops, failure modes. That mindset now shows up in everything I build — chatbots, study tools, even my own study routine.",
          "I'm still early in this journey. But if you're starting: build the smallest agent that can fail, watch exactly how it fails, and design the guardrails from what you see — not from what you imagine.",
        ],
      },
    ],
  },
  {
    slug: "wordpress-to-llms-path",
    title: "From WordPress to LLMs: my winding path into software",
    subtitle: "Exploring widely looked slow. It turned out to be the shortcut.",
    category: "Career",
    date: "Dec 2025",
    readTime: "5 min read",
    excerpt:
      "Flutter, marketing, chatbots, CS theory — why exploring widely made me a sharper, more pragmatic builder.",
    featured: true,
    content: [
      {
        body: [
          "My path into software wasn't a straight line. It was WordPress sites for real clients, Flutter experiments, digital marketing gigs, a chatbot internship, then Harvard's CS50x dragging me into proper computer science.",
          "For a while I worried this made me unfocused. Now I see it as cross-training: each detour gave me something the 'pure' path wouldn't have.",
        ],
      },
      {
        heading: "What each detour gave me",
        body: [
          "WordPress taught me clients don't buy code, they buy outcomes — a faster site, more inquiries, less hassle. That lesson shapes every project I scope today.",
          "Flutter taught me state, structure, and the discipline of shipping to a real device people hold in their hands.",
          "Marketing taught me distribution. The best product with no users is a diary entry. I now think about who it's for before I write a line of code.",
          "CS50x taught me humility and rigor — pointers, memory, algorithms. It slowed me down in the best way.",
        ],
      },
      {
        heading: "To anyone on a winding path",
        body: [
          "Depth matters, and I'm going deeper now — CS degree, AI focus, real systems. But breadth first gave me judgment about what deserves depth.",
          "If your journey looks messy, keep the receipts: every project, every gig, every half-finished prototype. One day they connect, and the story makes sense.",
        ],
      },
    ],
  },
  {
    slug: "one-person-ai-business-playbook",
    title: "One-person AI businesses are real. Here's the playbook I'm testing",
    subtitle: "AI leverage plus tiny teams: notes from building as a solo founder in Bangladesh.",
    category: "Entrepreneurship",
    date: "Nov 2025",
    readTime: "8 min read",
    excerpt:
      "AI automation + SaaS + distribution: notes from building small, useful products as a solo founder in Bangladesh.",
    content: [
      {
        body: [
          "I think the most underrated company structure of this decade is one skilled person plus AI doing the work of five. I'm testing that thesis on myself with BizAutomate and small client automations.",
          "The playbook I'm following has four parts: pick a painful repetitive workflow, automate it as a recipe (not a platform), charge for the outcome, and reinvest into the next recipe.",
        ],
      },
      {
        heading: "Why recipes beat platforms (at first)",
        body: [
          "Platforms need scale. Recipes need one happy customer. A tutor who saves six hours a week on follow-ups will pay and refer — and that recipe transfers to the next tutor almost unchanged.",
          "I'm deliberately starting narrow: tutors, small agencies, local shops. Boring problems, clear willingness to pay.",
        ],
      },
      {
        heading: "What I'm learning about selling",
        body: [
          "Nobody buys 'AI automation'. They buy Tuesdays back. My demos now start with the before-and-after calendar, not the tech.",
          "Done-for-you onboarding converts; self-serve docs don't — at least at my scale. Packaging and setup are the product.",
        ],
      },
      {
        heading: "The honest part",
        body: [
          "This is an experiment, not a success story. Revenue is small, churn is real, and I'm learning sales the hard way. But every cycle makes the next product sharper — and that's the whole point of building in public.",
        ],
      },
    ],
  },
  {
    slug: "cs50x-notes-discipline",
    title: "CS50x nearly broke me. It also rebuilt how I learn",
    subtitle: "Pointers, problem sets, and the week I almost quit.",
    category: "Education",
    date: "Oct 2025",
    readTime: "5 min read",
    excerpt:
      "The hardest course I've finished — and the one that changed my relationship with difficult things.",
    content: [
      {
        body: [
          "CS50x was the first course that didn't care about my motivation. The problem sets were hard whether I felt inspired or not. Week 4 (memory, pointers) genuinely made me consider quitting.",
          "What got me through wasn't talent — it was a system: same hours daily, rubber-duck debugging out loud, and asking for help earlier instead of suffering longer.",
        ],
      },
      {
        heading: "The system that worked",
        body: [
          "Two-hour focused blocks, phone in another room. One concept per session, implemented from scratch before moving on.",
          "I kept a 'confusion log' — every stuck point with timestamps. Patterns emerged: I rushed problem decomposition and paid for it in debugging. Slowing down at the start sped everything up.",
        ],
      },
      {
        heading: "Why it mattered beyond C",
        body: [
          "CS50x gave me the mental models I now use everywhere: abstraction, correctness vs. efficiency, testing edge cases. My AI projects got better because my fundamentals got better.",
          "If you're in it right now and struggling: that's the course working as designed. Keep going.",
        ],
      },
    ],
  },
  {
    slug: "chatbot-trust-escalation",
    title: "Nobody trusts your chatbot. Escalation paths are the feature",
    subtitle: "Lessons from shipping SupportIQ for a real nonprofit team.",
    category: "Software Engineering",
    date: "Sep 2025",
    readTime: "6 min read",
    excerpt:
      "Grounding, source links, and graceful handoffs — what made a nonprofit chatbot actually trustworthy.",
    content: [
      {
        body: [
          "During my Africa ICT Right internship I built SupportIQ, a chatbot for the organization's website. The technical build took weeks; earning the team's trust took longer — and taught me more.",
          "The turning point was admitting the bot's limits in the design itself: every answer links its source, and anything uncertain escalates to a human with full context attached.",
        ],
      },
      {
        heading: "Three trust patterns",
        body: [
          "Ground everything: no retrieved passage, no answer. 'I don't know — here's who to ask' is a valid and valuable response.",
          "Show receipts: source links on every answer turned skeptics into reviewers. The team started curating content because they could see exactly what the bot used.",
          "Escalate with context: handoffs include the conversation so far. Nothing kills trust like making a user repeat themselves to a human.",
        ],
      },
      {
        heading: "Chatbots are UX projects",
        body: [
          "Model choice mattered less than empty states, error messages, and the first three suggested questions. Most users need permission to start — good prompts are onboarding.",
          "Ship the humble bot. The confident one gets turned off.",
        ],
      },
    ],
  },
  {
    slug: "probability-for-ai-why-math",
    title: "Why I'm studying probability before chasing bigger models",
    subtitle: "Uncertainty is the whole game in AI. Math is how you see it.",
    category: "Computer Science",
    date: "Aug 2025",
    readTime: "7 min read",
    excerpt:
      "Stanford's Probability for AI convinced me: the math isn't a detour, it's the map.",
    content: [
      {
        body: [
          "It's tempting to skip the math and stack frameworks. I tried that. My agents were mysterious black boxes — when they failed, I could only guess why.",
          "Studying probability gave me language for what I was seeing: priors, likelihoods, expected values, the difference between noise and signal in eval results.",
        ],
      },
      {
        heading: "Where it shows up daily",
        body: [
          "Eval design: is my agent actually better, or did I get lucky on five test cases? Basic statistics answers that honestly.",
          "Retrieval and ranking: understanding scoring as probability makes RAG behavior predictable instead of magical.",
          "Decision thresholds: when should the bot answer vs. escalate? That's a cost-benefit calculation dressed as a product decision.",
        ],
      },
      {
        heading: "My study approach",
        body: [
          "One concept, one implementation. I code every distribution and estimator from scratch in Python before using a library — slow, but it sticks.",
          "Math first, models second. The models change monthly; the math doesn't.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, count = 2) => {
  const current = getPost(slug);
  if (!current) return POSTS.slice(0, count);
  const sameCategory = POSTS.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = POSTS.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
};
