import { getHomepageSections } from "@/lib/admin/site-actions";
import HomepageEditor from "@/components/admin/HomepageEditor";

export const dynamic = "force-dynamic";

export default async function HomepagePage() {
  const res = await getHomepageSections();
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load homepage layout: {res.message}</p>;
  }
  return (
    <HomepageEditor
      initial={res.rows.map((r) => ({
        id: String(r["id"]), key: String(r["key"]), label: String(r["label"]),
        enabled: Boolean(r["enabled"]), sort: Number(r["sort"] ?? 0),
      }))}
    />
  );
}
