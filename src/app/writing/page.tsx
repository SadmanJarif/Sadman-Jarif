import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogExplorer from "./BlogExplorer";
import { getPosts, getSeoFor } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoFor("/writing", {
    title: "Writing — Sadman Mubassir Jarif",
    description: "AI, software, entrepreneurship, career, education — thinking in public.",
  });
  return {
    title: seo.title, description: seo.description,
    keywords: seo.keywords || undefined,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: seo.title, description: seo.description, images: seo.ogImage ? [{ url: seo.ogImage }] : undefined },
  };
}

export default async function WritingPage() {
  const posts = await getPosts();
  return (
    <main className="relative min-h-screen text-slate-100 light:text-slate-700">
      <PageHero
        eyebrow="Writing / Blog"
        title="Thinking"
        highlight="in public."
        description="AI, software, entrepreneurship, career, education — long-form thinking with excellent typography. Built to grow for years."
        crumbs={[{ label: "Home", href: "/" }, { label: "Writing" }]}
      />
      <BlogExplorer posts={posts} />
    </main>
  );
}
