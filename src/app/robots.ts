import type { MetadataRoute } from "next";

const BASE = "https://sadmanjarif.xyz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
