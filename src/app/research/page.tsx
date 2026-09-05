import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ResearchExplorer from "./Explorer";
import { getResearch, getSeoFor } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoFor("/research", {
    title: "Research & Notes — Sadman Mubassir Jarif",
    description: "AI research notes, technical explainers, data experiments, and programming notes.",
  });
  return {
    title: seo.title, description: seo.description,
    keywords: seo.keywords || undefined,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: seo.title, description: seo.description, images: seo.ogImage ? [{ url: seo.ogImage }] : undefined },
  };
}

export default async function ResearchPage() {
  const notes = await getResearch();
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <PageHero
        eyebrow="Research & Notes"
        title="A personal"
        highlight="knowledge base."
        description="AI research notes, technical explainers, data experiments, programming notes, and ideas I'm exploring — searchable, honest, always growing."
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
      />
      <ResearchExplorer notes={notes} />
    </main>
  );
}
