import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/config";
import EntityForm from "@/components/admin/EntityForm";

export const dynamic = "force-dynamic";

export default async function EntityNewPage({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();

  const initial: Record<string, unknown> = {};
  for (const f of def.fields) {
    if (f.type === "tags" || f.type === "lines") initial[f.name] = [];
    else if (f.type === "boolean") initial[f.name] = f.defaultValue ?? false;
    else if (f.type === "number") initial[f.name] = f.defaultValue ?? 0;
    else if (f.type === "image") initial[f.name] = { url: "", key: "" };
    else initial[f.name] = f.defaultValue ?? "";
  }
  return <EntityForm def={def} id={null} initial={initial} />;
}
