import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeSections from "@/components/home/HomeSections";
import { getSeoFor, getSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoFor("/", {
    title: "Sadman Mubassir Jarif — Developer, Entrepreneur & AI Enthusiast",
    description: "Portfolio of Sadman Mubassir Jarif — developer, entrepreneur and aspiring AI/software engineer from Bangladesh building AI-powered products for a global future.",
  });
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords || undefined,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    alternates: { canonical: "https://sadmanjarif.xyz" },
    openGraph: { title: seo.title, description: seo.description, type: "website", url: "https://sadmanjarif.xyz", images: seo.ogImage ? [{ url: seo.ogImage }] : undefined },
  };
}

export default async function Home() {
  const s = await getSettings();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sadman Mubassir Jarif",
    url: "https://sadmanjarif.xyz",
    jobTitle: "Developer, Entrepreneur & AI Enthusiast",
    address: { "@type": "PostalAddress", addressCountry: "BD" },
    knowsAbout: ["Artificial Intelligence", "Software Engineering", "Computer Science", "Entrepreneurship", "AI Agents", "SaaS"],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sadman Mubassir Jarif",
    url: "https://sadmanjarif.xyz",
  };
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <Hero
        content={{
          badge: s["hero_badge"] || undefined,
          name: s["profile_name"] || undefined,
          roles: s["profile_tagline"] || undefined,
          l1: s["hero_l1"] || undefined,
          l2: s["hero_l2"] || undefined,
          l3: s["hero_l3"] || undefined,
          l4: s["hero_l4"] || undefined,
          description: s["hero_description"] || undefined,
          location: s["hero_location"] || undefined,
        }}
      />
      <HomeSections />
    </main>
  );
}
