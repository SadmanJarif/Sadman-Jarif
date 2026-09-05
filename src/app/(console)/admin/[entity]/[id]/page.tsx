import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/config";
import { getRow } from "@/lib/admin/actions";
import { blocksToMarkdown } from "@/lib/admin/markdown";
import EntityForm from "@/components/admin/EntityForm";

export const dynamic = "force-dynamic";

export default async function EntityEditPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();

  const res = await getRow(entity, id);
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load entry: {res.message}</p>;
  }
  const row = res.row;

  // DB row -> form values
  const initial: Record<string, unknown> = {};
  for (const f of def.fields) {
    if (f.type === "image") {
      initial[f.name] = {
        url: String(row[`${f.name}_url`] ?? ""),
        key: String(row[`${f.name}_key`] ?? ""),
      };
    } else if (entity === "posts" && f.name === "content") {
      const blocks = (row["content"] ?? []) as { heading?: string; body: string[] }[];
      initial[f.name] = blocksToMarkdown(blocks);
    } else if (f.type === "tags" || f.type === "lines") {
      initial[f.name] = (row[f.name] as string[]) ?? [];
    } else {
      initial[f.name] = row[f.name] ?? f.defaultValue ?? "";
    }
  }
  return <EntityForm def={def} id={id} initial={initial} />;
}
