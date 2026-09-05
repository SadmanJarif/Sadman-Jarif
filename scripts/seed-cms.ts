/* One-time CMS seed: migrates the portfolio's current static content into InsForge.
 * Reads the admin API key from .insforge/project.json (gitignored, never committed).
 * Safe to re-run: it clears CMS tables first, then re-inserts everything.
 * Run: npx -y tsx scripts/seed-cms.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createAdminClient } from "@insforge/sdk";
import { PROJECT_DETAILS } from "../src/data/projects.ts";
import { POSTS } from "../src/data/writing.ts";
import {
  EXPERIENCE_DETAILS,
  ECA_DETAILS,
  RESEARCH_NOTES,
  JOURNEY_MILESTONES,
  GOALS,
  NOW_DATA,
  USES_DATA,
  UPDATES,
  VENTURE_IDEAS,
  BUILD_LOG,
} from "../src/data/site.ts";
import { SKILLS, SITE_NAV, MORE_LINKS } from "../src/data/portfolio.ts";

const root = path.resolve(import.meta.dirname, "..");
const link = JSON.parse(fs.readFileSync(path.join(root, ".insforge", "project.json"), "utf8"));
const admin = createAdminClient({ baseUrl: link.oss_host, apiKey: link.api_key });
const db = admin.database;

const UUID_TABLES = [
  "projects", "posts", "experience", "education", "skills", "certifications",
  "eca_activities", "research_notes", "site_updates", "media", "nav_items",
  "homepage_sections", "page_seo", "journey_milestones", "goals", "now_items",
  "uses_items", "ideas", "build_log", "activity_log",
];
const NIL = "00000000-0000-0000-0000-000000000000";

async function wipe() {
  for (const t of UUID_TABLES) {
    const { error } = await db.from(t).delete().neq("id", NIL);
    if (error) throw new Error(`wipe ${t}: ${error.message}`);
  }
  const { error } = await db.from("site_settings").delete().neq("key", "__none__");
  if (error) throw new Error(`wipe site_settings: ${error.message}`);
}

async function put(table: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const { error } = await db.from(table).insert(rows);
  if (error) throw new Error(`seed ${table}: ${error.message}`);
  console.log(`  ${table}: ${rows.length} rows`);
}

const CERTIFICATIONS = [
  { title: "Harvard CS50x", org: "Harvard", date_text: "2025", credential_url: "", description: "Computer science foundations — where rigorous thinking started." },
  { title: "GCI Data & Science", org: "University of Tokyo", date_text: "2025", credential_url: "", description: "Data science perspectives from a global research program." },
  { title: "Probability for AI", org: "Stanford", date_text: "2025", credential_url: "", description: "The math behind machine learning, made practical." },
  { title: "Business Foundations", org: "Wharton", date_text: "2025", credential_url: "", description: "How real companies create, capture and sustain value." },
  { title: "Entrepreneurship Programs", org: "Multiple", date_text: "2025", credential_url: "", description: "Idea validation, pitching and building under pressure." },
  { title: "Professional Simulations", org: "Industry", date_text: "2025", credential_url: "", description: "Externships including Beats By Dre market analysis." },
  { title: "AI & Tech Workshops", org: "Community", date_text: "2025", credential_url: "", description: "Hands-on sessions on chatbots, automation and LLM tools." },
  { title: "Leadership Development", org: "Ongoing", date_text: "2025", credential_url: "", description: "Communication, teamwork and ownership through real roles." },
];

const EDUCATION = [
  { school: "Penn Foster", degree: "High School Diploma", meta: "GPA 3.87 • 2026", tag: "Completed", text: "Built strong self-study discipline through an independent, US-based diploma program — finishing with distinction." },
  { school: "University of the People", degree: "Associate of Science in Computer Science", meta: "Currently pursuing", tag: "In Progress", text: "Deepening foundations in programming, systems and theory while building real projects alongside coursework." },
];

const HOMEPAGE_SECTIONS: [string, string][] = [
  ["currently", "Currently Strip"], ["about", "About"], ["education", "Education"],
  ["experience", "Experience"], ["projects", "Projects"], ["lab-teaser", "AI Lab Teaser"],
  ["ventures", "Entrepreneurship"], ["skills", "Skills"], ["achievements", "Achievements"],
  ["leadership", "Leadership"], ["learning", "Learning Snapshot"], ["vision", "Vision"],
  ["focus", "Current Focus"], ["goals", "Goals Preview"], ["writing", "Writing"],
  ["recent-articles", "Recent Articles"], ["updates", "Latest Updates"], ["contact", "Contact"],
];

const SETTINGS: [string, string][] = [
  ["site_name", "Sadman Mubassir Jarif"],
  ["profile_name", "Sadman Mubassir Jarif"],
  ["profile_tagline", "Developer • Entrepreneur • AI Enthusiast"],
  ["hero_badge", "CS @ University of the People • Building AI products"],
  ["hero_l1", "Building with AI."],
  ["hero_l2", "Creating with"],
  ["hero_l3", "Technology."],
  ["hero_l4", "Thinking Beyond Today."],
  ["hero_description", "I'm passionate about building AI-powered products, software, digital experiences and businesses that solve real problems — from intelligent agents to tools people use every day."],
  ["hero_location", "Based in Bangladesh • Building for a global future"],
  ["about_heading", "Ambitious, but human."],
  ["about_text", "I'm Sadman — a self-motivated developer and entrepreneur from Bangladesh.\n\nI started by exploring everything that caught my eye — web development, Flutter, WordPress, digital marketing, AI systems. Over time my interests sharpened around AI, computer science and entrepreneurship.\n\nI don't have everything figured out. But I show up, I ship, and I keep raising the bar."],
  ["vision_title", "Become the engineer who builds the future — then funds it."],
  ["vision_text", "My long-term goal is to become a highly skilled AI/software engineer and entrepreneur — work internationally, build meaningful technology products, and eventually create companies that solve real-world problems."],
  ["contact_headline", "Let's build something meaningful."],
  ["contact_text", "Open to connecting for collaboration, projects, AI and software opportunities, entrepreneurship, research and professional networking."],
  ["contact_email", "hello@sadmanjarif.dev"],
  ["social_github", "https://github.com/"],
  ["social_linkedin", "https://www.linkedin.com/"],
  ["footer_text", "Developer • Entrepreneur • AI Enthusiast. Based in Bangladesh, building for a global future."],
  ["now_updated", NOW_DATA.updated],
  ["resume_url", ""],
];

const SEO: [string, string, string][] = [
  ["/", "Sadman Mubassir Jarif — Developer, Entrepreneur & AI Enthusiast", "Portfolio of Sadman Mubassir Jarif — developer, entrepreneur and aspiring AI/software engineer from Bangladesh building AI-powered products for a global future."],
  ["/about", "About — Sadman Mubassir Jarif", "The deeper story: a young builder from Bangladesh working toward a global career in AI, computer science, and entrepreneurship."],
  ["/journey", "Journey — Sadman Mubassir Jarif", "An interactive timeline: from early education in Bangladesh to AI, computer science, and global ambitions."],
  ["/work", "Work — Sadman Mubassir Jarif", "Professional experience: Connect For Purpose, Africa ICT Right, Beats By Dre — plus freelance and independent work."],
  ["/projects", "Projects — Sadman Mubassir Jarif", "Real things I've built: AI agents, automation, chatbots, web and mobile apps, SaaS experiments."],
  ["/ai-lab", "AI Lab — Sadman Mubassir Jarif", "My experimentation space: AI agents, automation, chatbots, products, and research notes."],
  ["/ventures", "Entrepreneurship — Sadman Mubassir Jarif", "Startup ideas, AI businesses, SaaS, one-person businesses — and building in public."],
  ["/learning", "Learning — Sadman Mubassir Jarif", "Continuous learning across CS, AI, data, business, and communication."],
  ["/writing", "Writing — Sadman Mubassir Jarif", "AI, software, entrepreneurship, career, education — thinking in public."],
  ["/research", "Research & Notes — Sadman Mubassir Jarif", "AI research notes, technical explainers, data experiments, and programming notes."],
  ["/eca", "ECA & Leadership — Sadman Mubassir Jarif", "Beyond coding: MUN, volunteering, competitions, leadership, and community."],
  ["/resume", "Resume — Sadman Mubassir Jarif", "Online resume: education, experience, projects, skills, and contact."],
  ["/uses", "My Setup — Sadman Mubassir Jarif", "The tools I use for development, AI, productivity, learning, design, and research."],
  ["/goals", "Goals — Sadman Mubassir Jarif", "An honest personal roadmap: current, 1-year, and long-term goals."],
  ["/now", "Now — Sadman Mubassir Jarif", "What I'm learning, building, reading, and preparing for right now."],
  ["/contact", "Contact — Sadman Mubassir Jarif", "Have an idea, opportunity, or project? Let's talk."],
];

const NOW_SECTIONS: [keyof Omit<typeof NOW_DATA, "updated">, string][] = [
  ["learning", "Learning"], ["building", "Building"], ["reading", "Reading"],
  ["workingOn", "Working on"], ["preparingFor", "Preparing for"], ["exploring", "Exploring"],
];

async function main() {
  console.log("Wiping CMS tables…");
  await wipe();
  console.log("Seeding…");

  await put("projects", PROJECT_DETAILS.map((p, i) => ({
    slug: p.slug, title: p.title, tagline: p.tagline, description: p.description,
    overview: p.overview, problem: p.problem, idea: p.idea, solution: p.solution, role: p.role,
    features: p.features, tech: p.tech, challenges: p.challenges, learned: p.learned, future: p.future,
    categories: p.categories, status: p.status, published: true, featured: p.status === "Featured",
    gradient: p.gradient, icon: p.icon, year: p.year,
    live_url: "", github_url: "https://github.com/", cover_url: "", cover_key: "", sort: i,
  })));

  await put("posts", POSTS.map((p, i) => ({
    slug: p.slug, title: p.title, subtitle: p.subtitle, category: p.category,
    excerpt: p.excerpt, content: p.content, cover_url: "", cover_key: "",
    tags: [p.category], read_time: p.readTime, date_text: p.date,
    seo_title: p.title, seo_desc: p.excerpt, status: "published",
    featured: Boolean(p.featured), published_at: new Date().toISOString(), sort: i,
  })));

  await put("experience", EXPERIENCE_DETAILS.map((r, i) => ({
    org: r.org, role: r.role, place: r.place, time: r.time, start_date: "", end_date: "",
    current: Boolean(r.current), summary: r.summary, responsibilities: r.responsibilities,
    tech: r.tech, learned: r.learned, impact: r.impact, sort: i,
  })));

  await put("education", EDUCATION.map((e, i) => ({ ...e, sort: i })));
  await put("skills", SKILLS.map((s, i) => ({
    category: s.category, items: s.items, accent: s.accent, note: s.note, featured: false, sort: i,
  })));
  await put("certifications", CERTIFICATIONS.map((c, i) => ({ ...c, sort: i })));
  await put("eca_activities", ECA_DETAILS.map((a, i) => ({
    title: a.title, icon: a.icon, org: "", position: "", date_text: "",
    did: a.did, why: a.why, learned: a.learned, impact: a.impact, sort: i,
  })));
  await put("research_notes", RESEARCH_NOTES.map((n, i) => ({
    title: n.title, area: n.area, type: n.type, date_text: n.date, summary: n.summary,
    content: n.summary, links: [], tags: n.tags, status: "published", sort: i,
  })));
  await put("site_updates", UPDATES.map((u, i) => ({ date_text: u.date, title: u.title, text: u.text, sort: i })));
  await put("journey_milestones", JOURNEY_MILESTONES.map((m, i) => ({
    era: m.era, period: m.period, title: m.title, text: m.text, tags: m.tags, sort: i,
  })));

  const goalRows = [
    ...GOALS.current.map((g, i) => ({ grp: "current", title: g.title, detail: g.detail, sort: i })),
    ...GOALS.oneYear.map((g, i) => ({ grp: "oneYear", title: g.title, detail: g.detail, sort: i })),
    ...GOALS.longTerm.map((g, i) => ({ grp: "longTerm", title: g.title, detail: g.detail, sort: i })),
  ];
  await put("goals", goalRows);

  await put("now_items", NOW_SECTIONS.flatMap(([k, section]) =>
    (NOW_DATA[k] as string[]).map((text, i) => ({ section, text, sort: i }))
  ));
  await put("uses_items", USES_DATA.flatMap((s) =>
    s.items.map((t, i) => ({ section: s.section, name: t.name, description: t.desc, sort: i }))
  ));
  await put("ideas", VENTURE_IDEAS.map((v, i) => ({
    title: v.title, area: v.area, text: v.text, stage: v.stage, sort: i,
  })));
  await put("build_log", BUILD_LOG.map((b, i) => ({ date_text: b.date, text: b.text, sort: i })));

  await put("nav_items", [
    ...SITE_NAV.map((l, i) => ({ label: l.label, href: l.href, location: "main", sort: i, visible: true })),
    ...MORE_LINKS.map((l, i) => ({ label: l.label, href: l.href, location: "more", sort: i, visible: true })),
    ...["Home", "About", "Projects", "Writing", "Contact"].map((label, i) => ({
      label, href: label === "Home" ? "/" : `/${label.toLowerCase()}`, location: "footer", sort: i, visible: true,
    })),
  ]);
  await put("homepage_sections", HOMEPAGE_SECTIONS.map(([key, label], i) => ({
    key, label, enabled: true, sort: i,
  })));
  await put("site_settings", SETTINGS.map(([key, value]) => ({ key, value })));
  await put("page_seo", SEO.map(([path, title, description]) => ({
    path, title, description, keywords: "", og_image: "", noindex: false,
  })));

  console.log("Seed complete.");
}

main().catch((e) => { console.error("SEED FAILED:", e.message); process.exit(1); });
