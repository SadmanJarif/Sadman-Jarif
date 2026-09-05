import { getSeo } from "@/lib/admin/site-actions";
import SeoEditor from "@/components/admin/SeoEditor";

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const res = await getSeo();
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load SEO: {res.message}</p>;
  }
  return (
    <SeoEditor
      initial={res.rows.map((r) => ({
        id: String(r["id"]), path: String(r["path"]), title: String(r["title"] ?? ""),
        description: String(r["description"] ?? ""), keywords: String(r["keywords"] ?? ""),
        og_image: String(r["og_image"] ?? ""), noindex: Boolean(r["noindex"]),
      }))}
    />
  );
}
