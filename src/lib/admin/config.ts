/* Admin allowlist + entity registry driving the generic CRUD engine.
 * To manage a new content type for years to come: add its table (migration),
 * then add one entry here — list page, form, search and filters appear automatically.
 */

export const ADMIN_EMAIL = "sadmanmubassir@gmail.com";

export type FieldType =
  | "text"
  | "textarea"
  | "markdown"
  | "select"
  | "tags"
  | "lines"
  | "boolean"
  | "number"
  | "url"
  | "image";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  defaultValue?: string | boolean | number | string[];
  wide?: boolean;
};

export type EntityDef = {
  key: string;
  table: string;
  singular: string;
  plural: string;
  description: string;
  titleField: string;
  subtitleField?: string;
  searchIn: string[];
  filterField?: string;
  statusField?: "published" | "status";
  featuredField?: string;
  defaultSort: string;
  fields: FieldDef[];
};

export const PROJECT_CATEGORIES = ["AI", "Software", "Web", "Mobile", "SaaS", "Experiments", "Business"];
export const PROJECT_STATUSES = ["Featured", "In Development", "Completed", "Experiment"];
export const POST_CATEGORIES = [
  "AI", "Computer Science", "Software Engineering", "Entrepreneurship",
  "Career", "Education", "Experiments", "Personal Growth",
];
export const RESEARCH_TYPES = ["Research Note", "Explainer", "Experiment", "Study Note", "Code Notes", "Literature Review"];
export const GOAL_GROUPS = ["current", "oneYear", "longTerm"];
export const NOW_SECTIONS = ["Learning", "Building", "Reading", "Working on", "Preparing for", "Exploring"];
export const IDEA_STAGES = ["Idea", "Exploring", "Prototyping", "Prototype", "Active"];
export const GRADIENTS = [
  "from-cyan-500/25 via-sky-600/10 to-violet-600/25",
  "from-emerald-500/25 via-teal-600/10 to-cyan-600/25",
  "from-violet-500/25 via-purple-600/10 to-fuchsia-600/25",
  "from-amber-500/20 via-orange-600/10 to-rose-600/20",
  "from-blue-500/25 via-indigo-600/10 to-violet-600/25",
  "from-fuchsia-500/20 via-purple-600/10 to-cyan-600/20",
];

export const ENTITIES: Record<string, EntityDef> = {
  projects: {
    key: "projects", table: "projects", singular: "Project", plural: "Projects",
    description: "Showcase builds with full case studies.",
    titleField: "title", subtitleField: "tagline",
    searchIn: ["title", "tagline", "description", "tech"],
    filterField: "status", statusField: "published", featuredField: "featured",
    defaultSort: "sort",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, placeholder: "Nexus AI Agent" },
      { name: "slug", label: "Slug", type: "text", required: true, help: "URL: /projects/your-slug. Lowercase letters, numbers, hyphens." },
      { name: "tagline", label: "Tagline", type: "text", wide: true },
      { name: "description", label: "Short description", type: "textarea", wide: true },
      { name: "overview", label: "Overview", type: "markdown", wide: true },
      { name: "problem", label: "Problem", type: "textarea", wide: true },
      { name: "idea", label: "Idea", type: "textarea", wide: true },
      { name: "solution", label: "Solution", type: "textarea", wide: true },
      { name: "role", label: "My role", type: "textarea", wide: true },
      { name: "features", label: "Main features (one per line)", type: "lines", wide: true },
      { name: "tech", label: "Technologies", type: "tags" },
      { name: "challenges", label: "Challenges", type: "textarea", wide: true },
      { name: "learned", label: "What I learned", type: "textarea", wide: true },
      { name: "future", label: "Future improvements (one per line)", type: "lines", wide: true },
      { name: "categories", label: "Categories", type: "tags", options: PROJECT_CATEGORIES },
      { name: "status", label: "Status", type: "select", options: PROJECT_STATUSES, defaultValue: "Experiment" },
      { name: "published", label: "Published", type: "boolean", defaultValue: false, help: "Drafts stay hidden on the public site." },
      { name: "featured", label: "Featured", type: "boolean", defaultValue: false },
      { name: "gradient", label: "Card gradient", type: "select", options: GRADIENTS, defaultValue: GRADIENTS[0] },
      { name: "icon", label: "Card icon", type: "text", defaultValue: "◆" },
      { name: "year", label: "Year", type: "text", placeholder: "2025–Present" },
      { name: "live_url", label: "Live URL", type: "url" },
      { name: "github_url", label: "GitHub URL", type: "url" },
      { name: "cover", label: "Cover image", type: "image" },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  posts: {
    key: "posts", table: "posts", singular: "Article", plural: "Blog Posts",
    description: "Long-form writing with SEO controls.",
    titleField: "title", subtitleField: "category",
    searchIn: ["title", "excerpt", "category", "tags"],
    filterField: "category", statusField: "status", featuredField: "featured",
    defaultSort: "sort",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "slug", label: "Slug", type: "text", required: true, help: "URL: /writing/your-slug." },
      { name: "subtitle", label: "Subtitle", type: "text", wide: true },
      { name: "category", label: "Category", type: "select", options: POST_CATEGORIES, defaultValue: "AI" },
      { name: "excerpt", label: "Excerpt", type: "textarea", wide: true },
      { name: "content", label: "Article body (Markdown: ## headings, blank line between paragraphs)", type: "markdown", wide: true },
      { name: "cover", label: "Cover image", type: "image" },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "read_time", label: "Reading time", type: "text", placeholder: "6 min read", help: "Auto-filled on save if empty." },
      { name: "date_text", label: "Display date", type: "text", placeholder: "Mar 2026" },
      { name: "seo_title", label: "SEO title", type: "text", wide: true },
      { name: "seo_desc", label: "SEO description", type: "textarea", wide: true },
      { name: "status", label: "Status", type: "select", options: ["draft", "published"], defaultValue: "draft" },
      { name: "featured", label: "Featured article", type: "boolean", defaultValue: false },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  experience: {
    key: "experience", table: "experience", singular: "Experience Entry", plural: "Experience",
    description: "Jobs, internships, externships, freelance and volunteering.",
    titleField: "role", subtitleField: "org",
    searchIn: ["org", "role", "summary", "tech"],
    defaultSort: "sort",
    fields: [
      { name: "role", label: "Position", type: "text", required: true },
      { name: "org", label: "Organization", type: "text", required: true },
      { name: "place", label: "Location", type: "text", placeholder: "United States • Remote" },
      { name: "time", label: "Date label", type: "text", placeholder: "2025 — Present" },
      { name: "start_date", label: "Start date", type: "text" },
      { name: "end_date", label: "End date", type: "text" },
      { name: "current", label: "Current role", type: "boolean", defaultValue: false },
      { name: "summary", label: "Summary", type: "textarea", wide: true },
      { name: "responsibilities", label: "Responsibilities (one per line)", type: "lines", wide: true },
      { name: "tech", label: "Technologies / areas", type: "tags" },
      { name: "learned", label: "What I learned", type: "textarea", wide: true },
      { name: "impact", label: "Impact / outcome", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  education: {
    key: "education", table: "education", singular: "Education Entry", plural: "Education",
    description: "Degrees, diplomas and formal programs.",
    titleField: "school", subtitleField: "degree",
    searchIn: ["school", "degree", "text"],
    defaultSort: "sort",
    fields: [
      { name: "school", label: "Institution", type: "text", required: true },
      { name: "degree", label: "Degree", type: "text" },
      { name: "meta", label: "Dates / GPA", type: "text", placeholder: "GPA 3.87 • 2026" },
      { name: "tag", label: "Badge", type: "text", placeholder: "Completed / In Progress" },
      { name: "text", label: "Description", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  skills: {
    key: "skills", table: "skills", singular: "Skill Group", plural: "Skills",
    description: "Grouped skill badges shown on the site.",
    titleField: "category", subtitleField: "note",
    searchIn: ["category", "items", "note"],
    defaultSort: "sort",
    fields: [
      { name: "category", label: "Category", type: "text", required: true },
      { name: "items", label: "Skills", type: "tags" },
      { name: "accent", label: "Accent gradient", type: "select", options: GRADIENTS, defaultValue: GRADIENTS[0] },
      { name: "note", label: "Note", type: "text" },
      { name: "featured", label: "Featured", type: "boolean", defaultValue: false },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  certifications: {
    key: "certifications", table: "certifications", singular: "Certification", plural: "Certifications & Learning",
    description: "Courses, certifications and programs.",
    titleField: "title", subtitleField: "org",
    searchIn: ["title", "org", "description"],
    defaultSort: "sort",
    fields: [
      { name: "title", label: "Program", type: "text", required: true },
      { name: "org", label: "Institution", type: "text" },
      { name: "date_text", label: "Date", type: "text" },
      { name: "credential_url", label: "Credential link", type: "url" },
      { name: "description", label: "Description", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  eca: {
    key: "eca", table: "eca_activities", singular: "ECA Activity", plural: "ECA & Leadership",
    description: "MUN, volunteering, competitions, leadership, community.",
    titleField: "title", subtitleField: "org",
    searchIn: ["title", "org", "did", "impact"],
    defaultSort: "sort",
    fields: [
      { name: "title", label: "Activity", type: "text", required: true },
      { name: "icon", label: "Icon", type: "text", defaultValue: "◆" },
      { name: "org", label: "Organization", type: "text" },
      { name: "position", label: "Position / role", type: "text" },
      { name: "date_text", label: "Date", type: "text" },
      { name: "did", label: "What I did", type: "textarea", wide: true },
      { name: "why", label: "Why I joined", type: "textarea", wide: true },
      { name: "learned", label: "What I learned", type: "textarea", wide: true },
      { name: "impact", label: "Impact I created", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  research: {
    key: "research", table: "research_notes", singular: "Research Note", plural: "Research & Notes",
    description: "Technical notes, explainers and experiments.",
    titleField: "title", subtitleField: "area",
    searchIn: ["title", "summary", "content", "tags", "area"],
    filterField: "area", statusField: "status",
    defaultSort: "sort",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "area", label: "Area", type: "text", placeholder: "AI Agents" },
      { name: "type", label: "Type", type: "select", options: RESEARCH_TYPES, defaultValue: "Research Note" },
      { name: "date_text", label: "Date", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", wide: true },
      { name: "content", label: "Content (Markdown)", type: "markdown", wide: true },
      { name: "links", label: "Links (one per line)", type: "lines", wide: true },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "status", label: "Status", type: "select", options: ["draft", "published"], defaultValue: "draft" },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  updates: {
    key: "updates", table: "site_updates", singular: "Update", plural: "Website Updates",
    description: "Changelog entries shown on the homepage.",
    titleField: "title", subtitleField: "date_text",
    searchIn: ["title", "text"],
    defaultSort: "sort",
    fields: [
      { name: "date_text", label: "Date", type: "text", placeholder: "Mar 2026" },
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "text", label: "Text", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  journey: {
    key: "journey", table: "journey_milestones", singular: "Milestone", plural: "Journey Timeline",
    description: "Major chapters of the journey page.",
    titleField: "title", subtitleField: "era",
    searchIn: ["era", "title", "text"],
    defaultSort: "sort",
    fields: [
      { name: "era", label: "Era", type: "text", required: true },
      { name: "period", label: "Period", type: "text" },
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "text", label: "Text", type: "textarea", wide: true },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  goals: {
    key: "goals", table: "goals", singular: "Goal", plural: "Goals",
    description: "Current, 1-year and long-term roadmap.",
    titleField: "title", subtitleField: "grp",
    searchIn: ["title", "detail"],
    filterField: "grp",
    defaultSort: "sort",
    fields: [
      { name: "grp", label: "Group", type: "select", options: GOAL_GROUPS, defaultValue: "current" },
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "detail", label: "Detail", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  now: {
    key: "now", table: "now_items", singular: "Now Item", plural: "Now Page",
    description: "What you're doing right now, by section.",
    titleField: "text", subtitleField: "section",
    searchIn: ["text", "section"],
    filterField: "section",
    defaultSort: "sort",
    fields: [
      { name: "section", label: "Section", type: "select", options: NOW_SECTIONS, defaultValue: "Learning" },
      { name: "text", label: "Text", type: "text", required: true, wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  uses: {
    key: "uses", table: "uses_items", singular: "Tool", plural: "Uses Page",
    description: "Setup and tools, grouped by section.",
    titleField: "name", subtitleField: "section",
    searchIn: ["name", "description", "section"],
    filterField: "section",
    defaultSort: "sort",
    fields: [
      { name: "section", label: "Section", type: "text", required: true },
      { name: "name", label: "Tool", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  ideas: {
    key: "ideas", table: "ideas", singular: "Idea", plural: "Ideas I'm Exploring",
    description: "Startup and product bets, honestly labeled.",
    titleField: "title", subtitleField: "stage",
    searchIn: ["title", "area", "text"],
    filterField: "stage",
    defaultSort: "sort",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, wide: true },
      { name: "area", label: "Area", type: "text" },
      { name: "text", label: "Text", type: "textarea", wide: true },
      { name: "stage", label: "Stage", type: "select", options: IDEA_STAGES, defaultValue: "Idea" },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
  buildlog: {
    key: "buildlog", table: "build_log", singular: "Log Entry", plural: "Build Log",
    description: "Build-in-public running log.",
    titleField: "text", subtitleField: "date_text",
    searchIn: ["text", "date_text"],
    defaultSort: "sort",
    fields: [
      { name: "date_text", label: "Date", type: "text" },
      { name: "text", label: "Text", type: "textarea", required: true, wide: true },
      { name: "sort", label: "Sort order", type: "number", defaultValue: 0 },
    ],
  },
};

export const ENTITY_ORDER = [
  "projects", "posts", "experience", "education", "skills", "certifications",
  "eca", "research", "updates", "journey", "goals", "now", "uses", "ideas", "buildlog",
];

export const ADMIN_NAV: { section: string; links: { label: string; href: string; icon: string }[] }[] = [
  {
    section: "Overview",
    links: [
      { label: "Dashboard", href: "/admin", icon: "◈" },
      { label: "Activity Log", href: "/admin/activity", icon: "◉" },
    ],
  },
  {
    section: "Content",
    links: [
      { label: "Projects", href: "/admin/projects", icon: "◆" },
      { label: "Blog Posts", href: "/admin/posts", icon: "✎" },
      { label: "Experience", href: "/admin/experience", icon: "⬢" },
      { label: "Education", href: "/admin/education", icon: "⬣" },
      { label: "Skills", href: "/admin/skills", icon: "⬔" },
      { label: "Certifications", href: "/admin/certifications", icon: "★" },
      { label: "ECA & Leadership", href: "/admin/eca", icon: "♥" },
      { label: "Research", href: "/admin/research", icon: "⬓" },
      { label: "Updates", href: "/admin/updates", icon: "✦" },
      { label: "Media", href: "/admin/media", icon: "▣" },
    ],
  },
  {
    section: "Site",
    links: [
      { label: "Homepage", href: "/admin/homepage", icon: "⌂" },
      { label: "Journey", href: "/admin/journey", icon: "◎" },
      { label: "Goals", href: "/admin/goals", icon: "✦" },
      { label: "Now Page", href: "/admin/now", icon: "◐" },
      { label: "Uses Page", href: "/admin/uses", icon: "▤" },
      { label: "Ideas", href: "/admin/ideas", icon: "✧" },
      { label: "Build Log", href: "/admin/buildlog", icon: "☰" },
      { label: "Navigation", href: "/admin/navigation", icon: "⋮⋮" },
      { label: "SEO", href: "/admin/seo", icon: "◍" },
      { label: "Settings", href: "/admin/settings", icon: "⚙" },
    ],
  },
];
