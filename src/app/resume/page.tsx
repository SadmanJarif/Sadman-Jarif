import type { Metadata } from "next";
import ResumeView, { type ResumeData } from "./ResumeView";
import { getEducation, getExperience, getProjectDetails, getSettings, getSkills, getSocials, seoMeta } from "@/lib/cms";
import { RESUME_DATA } from "@/data/site";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/resume", {
    title: "Resume — Sadman Mubassir Jarif",
    description: "Online resume: education, experience, projects, skills, and contact.",
  });
}

export default async function ResumePage() {
  const [settings, socials, education, experience, projects, skills] = await Promise.all([
    getSettings(), getSocials(), getEducation(), getExperience(), getProjectDetails(), getSkills(),
  ]);

  const data: ResumeData = {
    name: settings["profile_name"] || "Sadman Mubassir Jarif",
    tagline: settings["profile_tagline"] || "Developer • Entrepreneur • AI Enthusiast — Bangladesh → Global",
    profile: RESUME_DATA.profile,
    socials,
    education: education
      ? education.map((e) => ({ s: e.school, d: `${e.degree}${e.meta ? ` — ${e.meta}` : ""}` }))
      : RESUME_DATA.education,
    experience: experience.map((e) => ({ org: e.org, role: e.role, time: e.time, place: e.place, summary: e.summary })),
    projects: projects.map((p) => ({ slug: p.slug, title: p.title, status: p.status, description: p.description })),
    skills: skills.map((s) => ({ category: s.category, items: s.items })),
    languages: RESUME_DATA.languages,
  };

  return <ResumeView data={data} />;
}
