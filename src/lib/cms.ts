/* Public content layer: database-first, static fallback.
 * Every getter tries InsForge (published/public rows) and falls back to the
 * checked-in static data if the backend is unreachable — the site never breaks.
 * Admin edits revalidate pages via revalidatePath("/", "layout").
 */
import { cache } from "react";
import type { Metadata } from "next";
import { insforge, isInsforgeConfigured } from "./insforge";
import { PROJECTS as STATIC_PROJECTS, SKILLS as STATIC_SKILLS, WRITING as STATIC_WRITING, SITE_NAV as STATIC_NAV, MORE_LINKS as STATIC_MORE, SOCIALS as STATIC_SOCIALS } from "@/data/portfolio";
import { PROJECT_DETAILS as STATIC_DETAILS } from "@/data/projects";
import { POSTS as STATIC_POSTS } from "@/data/writing";
import {
  EXPERIENCE_DETAILS as STATIC_EXP, ECA_DETAILS as STATIC_ECA, RESEARCH_NOTES as STATIC_RESEARCH,
  JOURNEY_MILESTONES as STATIC_JOURNEY, GOALS as STATIC_GOALS, NOW_DATA as STATIC_NOW,
  USES_DATA as STATIC_USES, UPDATES as STATIC_UPDATES, VENTURE_IDEAS as STATIC_IDEAS,
  BUILD_LOG as STATIC_BUILDLOG, FREELANCE_INFO as STATIC_FREELANCE, RESUME_DATA as STATIC_RESUME,
} from "@/data/site";

type Row = Record<string, unknown>;
const str = (v: unknown, fb = ""): string => (typeof v === "string" ? v : fb);
const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
const num = (v: unknown, fb = 0): number => (typeof v === "number" ? v : fb);
const bool = (v: unknown): boolean => v === true;

async function table(name: string, orderBy = "sort"): Promise<Row[]> {
  if (!isInsforgeConfigured) throw new Error("InsForge not configured — using static fallback");
  const { data, error } = await insforge.database.from(name).select("*").order(orderBy, { ascending: true }).limit(500);
  if (error || !data) throw new Error(error?.message ?? `empty ${name}`);
  return data as Row[];
}

const bySort = (a: Row, b: Row) => num(a["sort"]) - num(b["sort"]);

/* ---------------- projects ---------------- */

export const getProjects = cache(async () => {
  try {
    const rows = (await table("projects")).filter((r) => bool(r["published"])).sort(bySort);
    if (rows.length === 0) return STATIC_PROJECTS;
    return rows.map((r) => ({
      slug: str(r["slug"]), title: str(r["title"]), description: str(r["description"]),
      tags: arr(r["tech"]), category: arr(r["categories"])[0] ?? "Project",
      gradient: str(r["gradient"]), icon: str(r["icon"], "◆"),
      live: str(r["live_url"]) || undefined, github: str(r["github_url"]) || undefined,
      status: str(r["status"], "Project"),
    }));
  } catch {
    return STATIC_PROJECTS;
  }
});

export const getProjectDetails = cache(async () => {
  const fromDb = async () => {
    const rows = (await table("projects")).filter((r) => bool(r["published"])).sort(bySort);
    if (rows.length === 0) return null;
    return rows.map((r) => ({
      slug: str(r["slug"]), title: str(r["title"]), tagline: str(r["tagline"]),
      description: str(r["description"]), overview: str(r["overview"]),
      problem: str(r["problem"]), idea: str(r["idea"]), solution: str(r["solution"]),
      role: str(r["role"]), features: arr(r["features"]), tech: arr(r["tech"]),
      challenges: str(r["challenges"]), learned: str(r["learned"]), future: arr(r["future"]),
      categories: arr(r["categories"]) as ("AI" | "Software" | "Web" | "Mobile" | "SaaS" | "Experiments" | "Business")[],
      status: str(r["status"], "Experiment") as "Featured" | "In Development" | "Completed" | "Experiment",
      gradient: str(r["gradient"]), icon: str(r["icon"], "◆"), year: str(r["year"]),
      liveUrl: str(r["live_url"]), githubUrl: str(r["github_url"]) || "https://github.com/",
      coverUrl: str(r["cover_url"]),
    }));
  };
  try {
    return (await fromDb()) ?? STATIC_DETAILS.map((p) => ({ ...p, liveUrl: "", githubUrl: "https://github.com/", coverUrl: "" }));
  } catch {
    return STATIC_DETAILS.map((p) => ({ ...p, liveUrl: "", githubUrl: "https://github.com/", coverUrl: "" }));
  }
});

export const getProjectSlugs = cache(async () => (await getProjectDetails()).map((p) => p.slug));

/* ---------------- posts ---------------- */

export const getPosts = cache(async () => {
  try {
    const rows = (await table("posts")).filter((r) => str(r["status"]) === "published").sort(bySort);
    if (rows.length === 0) return STATIC_POSTS;
    return rows.map((r) => ({
      slug: str(r["slug"]), title: str(r["title"]), subtitle: str(r["subtitle"]),
      category: str(r["category"], "AI"), date: str(r["date_text"]), readTime: str(r["read_time"]),
      excerpt: str(r["excerpt"]), featured: bool(r["featured"]),
      content: (r["content"] ?? []) as { heading?: string; body: string[] }[],
    }));
  } catch {
    return STATIC_POSTS;
  }
});

export const getPostSlugs = cache(async () => (await getPosts()).map((p) => p.slug));

export const getWritingCards = cache(async () => {
  const posts = await getPosts();
  if (posts === STATIC_POSTS) return STATIC_WRITING;
  return posts.slice(0, 3).map((p) => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt, tag: p.category, readTime: p.readTime, date: p.date,
  }));
});

/* ---------------- experience / education / skills ---------------- */

export const getExperience = cache(async () => {
  try {
    const rows = await table("experience");
    if (rows.length === 0) return STATIC_EXP;
    return rows.sort(bySort).map((r) => ({
      org: str(r["org"]), role: str(r["role"]), place: str(r["place"]), time: str(r["time"]),
      current: bool(r["current"]), summary: str(r["summary"]),
      responsibilities: arr(r["responsibilities"]), tech: arr(r["tech"]),
      learned: str(r["learned"]), impact: str(r["impact"]),
    }));
  } catch {
    return STATIC_EXP;
  }
});

export const getEducation = cache(async () => {
  try {
    const rows = await table("education");
    if (rows.length === 0) return null;
    return rows.sort(bySort).map((r) => ({
      school: str(r["school"]), degree: str(r["degree"]), meta: str(r["meta"]),
      tag: str(r["tag"]), text: str(r["text"]),
    }));
  } catch {
    return null;
  }
});

export const getSkills = cache(async () => {
  try {
    const rows = await table("skills");
    if (rows.length === 0) return STATIC_SKILLS;
    return rows.sort(bySort).map((r) => ({
      category: str(r["category"]), items: arr(r["items"]),
      accent: str(r["accent"]), note: str(r["note"]),
    }));
  } catch {
    return STATIC_SKILLS;
  }
});

export const getCertifications = cache(async () => {
  try {
    const rows = await table("certifications");
    if (rows.length === 0) return null;
    return rows.sort(bySort).map((r) => ({
      title: str(r["title"]), org: str(r["org"]), note: str(r["description"]),
      date: str(r["date_text"]), url: str(r["credential_url"]),
    }));
  } catch {
    return null;
  }
});

/* ---------------- eca / research / updates ---------------- */

export const getEca = cache(async () => {
  try {
    const rows = await table("eca_activities");
    if (rows.length === 0) return STATIC_ECA;
    return rows.sort(bySort).map((r) => ({
      title: str(r["title"]), icon: str(r["icon"], "◆"),
      did: str(r["did"]), why: str(r["why"]), learned: str(r["learned"]), impact: str(r["impact"]),
    }));
  } catch {
    return STATIC_ECA;
  }
});

export const getEcaFull = cache(async () => {
  const fb = STATIC_ECA.map((a) => ({
    title: a.title, icon: a.icon, org: "", position: "", date: "",
    did: a.did, why: a.why, learned: a.learned, impact: a.impact,
  }));
  try {
    const rows = await table("eca_activities");
    if (rows.length === 0) return fb;
    return rows.sort(bySort).map((r) => ({
      title: str(r["title"]), icon: str(r["icon"], "◆"), org: str(r["org"]),
      position: str(r["position"]), date: str(r["date_text"]),
      did: str(r["did"]), why: str(r["why"]), learned: str(r["learned"]), impact: str(r["impact"]),
    }));
  } catch {
    return fb;
  }
});

export const getResearch = cache(async () => {
  try {
    const rows = (await table("research_notes")).filter((r) => str(r["status"]) === "published").sort(bySort);
    if (rows.length === 0) return STATIC_RESEARCH;
    return rows.map((r) => ({
      title: str(r["title"]), area: str(r["area"]), type: str(r["type"], "Research Note"),
      date: str(r["date_text"]), summary: str(r["summary"]), tags: arr(r["tags"]),
    }));
  } catch {
    return STATIC_RESEARCH;
  }
});

export const getUpdates = cache(async () => {
  try {
    const rows = await table("site_updates");
    if (rows.length === 0) return STATIC_UPDATES;
    return rows.sort(bySort).map((r) => ({
      date: str(r["date_text"]), title: str(r["title"]), text: str(r["text"]),
    }));
  } catch {
    return STATIC_UPDATES;
  }
});

/* ---------------- journey / goals / now / uses / ideas ---------------- */

export const getJourney = cache(async () => {
  try {
    const rows = await table("journey_milestones");
    if (rows.length === 0) return STATIC_JOURNEY;
    return rows.sort(bySort).map((r) => ({
      era: str(r["era"]), period: str(r["period"]), title: str(r["title"]),
      text: str(r["text"]), tags: arr(r["tags"]),
    }));
  } catch {
    return STATIC_JOURNEY;
  }
});

export const getGoals = cache(async () => {
  try {
    const rows = await table("goals");
    if (rows.length === 0) return STATIC_GOALS;
    const g = (grp: string) =>
      rows.filter((r) => str(r["grp"]) === grp).sort(bySort)
        .map((r) => ({ title: str(r["title"]), detail: str(r["detail"]) }));
    return { current: g("current"), oneYear: g("oneYear"), longTerm: g("longTerm") };
  } catch {
    return STATIC_GOALS;
  }
});

export const getNow = cache(async () => {
  try {
    const [rows, settings] = await Promise.all([table("now_items"), getSettings()]);
    if (rows.length === 0) return STATIC_NOW;
    const sec = (s: string) => rows.filter((r) => str(r["section"]) === s).sort(bySort).map((r) => str(r["text"]));
    return {
      updated: settings["now_updated"] ?? STATIC_NOW.updated,
      learning: sec("Learning"), building: sec("Building"), reading: sec("Reading"),
      workingOn: sec("Working on"), preparingFor: sec("Preparing for"), exploring: sec("Exploring"),
    };
  } catch {
    return STATIC_NOW;
  }
});

export const getUses = cache(async () => {
  try {
    const rows = await table("uses_items");
    if (rows.length === 0) return STATIC_USES;
    const sections = Array.from(new Set(rows.map((r) => str(r["section"]))));
    const order = ["Development", "AI Tools", "Productivity", "Learning", "Design", "Research"];
    sections.sort((a, b) => {
      const ai = order.indexOf(a), bi = order.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    return sections.map((s) => ({
      section: s,
      items: rows.filter((r) => str(r["section"]) === s).sort(bySort)
        .map((r) => ({ name: str(r["name"]), desc: str(r["description"]) })),
    }));
  } catch {
    return STATIC_USES;
  }
});

export const getIdeas = cache(async () => {
  try {
    const rows = await table("ideas");
    if (rows.length === 0) return STATIC_IDEAS;
    return rows.sort(bySort).map((r) => ({
      title: str(r["title"]), area: str(r["area"]), text: str(r["text"]), stage: str(r["stage"], "Idea"),
    }));
  } catch {
    return STATIC_IDEAS;
  }
});

export const getBuildLog = cache(async () => {
  try {
    const rows = await table("build_log");
    if (rows.length === 0) return STATIC_BUILDLOG;
    return rows.sort(bySort).map((r) => ({ date: str(r["date_text"]), text: str(r["text"]) }));
  } catch {
    return STATIC_BUILDLOG;
  }
});

export const getFreelance = cache(async () => STATIC_FREELANCE);
export const getResumeStatic = cache(async () => STATIC_RESUME);

/* ---------------- nav / settings / seo / homepage ---------------- */

export const getNav = cache(async () => {
  try {
    if (!isInsforgeConfigured) throw new Error("unconfigured");
    const { data, error } = await insforge.database.from("nav_items")
      .select("label,href,location,sort,visible").order("sort", { ascending: true }).limit(200);
    if (error || !data || data.length === 0) throw new Error("empty nav");
    const rows = data as Row[];
    const main = rows.filter((r) => str(r["location"]) === "main" && bool(r["visible"]))
      .map((r) => ({ label: str(r["label"]), href: str(r["href"]) }));
    const more = rows.filter((r) => str(r["location"]) === "more" && bool(r["visible"]))
      .map((r) => ({ label: str(r["label"]), href: str(r["href"]), desc: "" }));
    return {
      main: main.length ? main : STATIC_NAV,
      more: more.length ? more : STATIC_MORE,
    };
  } catch {
    return { main: STATIC_NAV, more: STATIC_MORE };
  }
});

export const getSocials = cache(async () => {
  const s = await getSettings();
  return {
    github: s["social_github"] || STATIC_SOCIALS.github,
    linkedin: s["social_linkedin"] || STATIC_SOCIALS.linkedin,
    email: s["contact_email"] ? `mailto:${s["contact_email"]}` : STATIC_SOCIALS.email,
  };
});

export const getSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    if (!isInsforgeConfigured) throw new Error("unconfigured");
    const { data, error } = await insforge.database.from("site_settings").select("key,value").limit(200);
    if (error || !data) throw new Error("empty settings");
    const out: Record<string, string> = {};
    for (const r of data as Row[]) out[str(r["key"])] = str(r["value"]);
    return out;
  } catch {
    return {};
  }
});

export const getHomepageSections = cache(async (): Promise<string[] | null> => {
  try {
    if (!isInsforgeConfigured) throw new Error("unconfigured");
    const { data, error } = await insforge.database.from("homepage_sections")
      .select("key,enabled,sort").order("sort", { ascending: true }).limit(50);
    if (error || !data) throw new Error("empty sections");
    return (data as Row[]).filter((r) => bool(r["enabled"])).map((r) => str(r["key"]));
  } catch {
    return null;
  }
});

export const SITE_URL = "https://sadmanjarif.xyz";

export async function seoMeta(path: string, fallback: { title: string; description: string }): Promise<Metadata> {
  const seo = await getSeoFor(path, fallback);
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords || undefined,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title, description: seo.description, url,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}
export const getSeoFor = cache(async (path: string, fallback: { title: string; description: string }) => {
  try {
    if (!isInsforgeConfigured) throw new Error("unconfigured");
    const { data, error } = await insforge.database.from("page_seo").select("*").eq("path", path).limit(1);
    const row = ((data as Row[] | null)?.[0]) as Row | undefined;
    if (error || !row) throw new Error("no seo");
    return {
      title: str(row["title"]) || fallback.title,
      description: str(row["description"]) || fallback.description,
      keywords: str(row["keywords"]),
      ogImage: str(row["og_image"]),
      noindex: bool(row["noindex"]),
    };
  } catch {
    return { ...fallback, keywords: "", ogImage: "", noindex: false };
  }
});
