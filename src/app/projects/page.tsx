import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "./Explorer";
import { getProjectDetails, getSeoFor } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoFor("/projects", {
    title: "Projects — Sadman Mubassir Jarif",
    description: "Real things I've built: AI agents, automation, chatbots, web and mobile apps, SaaS experiments.",
  });
  return {
    title: seo.title, description: seo.description,
    keywords: seo.keywords || undefined,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: seo.title, description: seo.description, images: seo.ogImage ? [{ url: seo.ogImage }] : undefined },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjectDetails();
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <PageHero
        eyebrow="Projects"
        title="Things I've"
        highlight="actually built."
        description="Filter by what interests you — every project opens into a full case study: problem, solution, challenges, and what I'd do differently."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <ProjectsExplorer projects={projects} />
    </main>
  );
}
