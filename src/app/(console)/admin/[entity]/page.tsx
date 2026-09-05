import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/config";
import { getRows } from "@/lib/admin/actions";
import EntityList from "@/components/admin/EntityList";

export const dynamic = "force-dynamic";

const SPECIAL = ["media", "homepage", "navigation", "seo", "settings", "activity", "journey-page"];

export default async function EntityPage({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const def = ENTITIES[entity];
  if (!def || SPECIAL.includes(entity)) notFound();

  const res = await getRows(entity);
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load {def.plural}: {res.message}</p>;
  }
  return <EntityList def={def} rows={res.rows} />;
}
