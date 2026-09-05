import type { MetadataRoute } from "next";
import { getProjectSlugs, getPostSlugs } from "@/lib/cms";

const BASE = "https://sadmanjarif.xyz";

const STATIC_ROUTES = [
  "",
  "/about",
  "/journey",
  "/work",
  "/projects",
  "/ai-lab",
  "/ventures",
  "/learning",
  "/writing",
  "/research",
  "/eca",
  "/resume",
  "/uses",
  "/goals",
  "/now",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let projectSlugs: string[] = [];
  let postSlugs: string[] = [];
  try {
    [projectSlugs, postSlugs] = await Promise.all([getProjectSlugs(), getPostSlugs()]);
  } catch {
    /* static fallback below still ships */
  }

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${BASE}${r || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${BASE}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...postSlugs.map((slug) => ({
      url: `${BASE}/writing/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
