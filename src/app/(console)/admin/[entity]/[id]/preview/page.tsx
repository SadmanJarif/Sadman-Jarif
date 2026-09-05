import Link from "next/link";
import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/config";
import { getRow } from "@/lib/admin/actions";
import { blocksToMarkdown } from "@/lib/admin/markdown";
import { StatusBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {String(text ?? "")
        .split(/\n\n+/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i} className="mt-4 text-[15px] leading-[1.85] text-slate-300 first:mt-0">
            {p}
          </p>
        ))}
    </>
  );
}

export default async function EntityPreviewPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const def = ENTITIES[entity];
  if (!def || !["posts", "projects", "research"].includes(entity)) notFound();

  const res = await getRow(entity, id);
  if (!res.ok) {
    return <p className="text-[14px] text-rose-300">Could not load preview: {res.message}</p>;
  }
  const r = res.row;
  const cover = String(r["cover_url"] ?? "");

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.07] px-5 py-3.5 light:border-amber-700/25 light:bg-amber-700/[0.06]">
        <p className="text-[13px] font-medium text-amber-200 light:text-amber-800">
          Preview mode — only you can see this. {String(r["status"] ?? (r["published"] ? "published" : "draft")) === "published" || r["published"] ? "Currently live." : "Currently a draft."}
        </p>
        <div className="flex gap-2">
          <Link href={`/admin/${entity}/${id}`} className="rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-[12.5px] font-semibold text-white">
            ← Back to editor
          </Link>
          {entity === "posts" && (
            <Link href={`/writing/${String(r["slug"])}`} className="rounded-lg bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-slate-300">
              Public page ↗
            </Link>
          )}
          {entity === "projects" && (
            <Link href={`/projects/${String(r["slug"])}`} className="rounded-lg bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-slate-300">
              Public page ↗
            </Link>
          )}
        </div>
      </div>

      <article className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge value={String(r["status"] ?? (r["published"] ? "published" : "draft"))} />
          {Boolean(r["category"]) && <span className="text-[12px] font-semibold text-slate-500">{String(r["category"])}</span>}
          {Boolean(r["date_text"]) && <span className="text-[12px] text-slate-600">· {String(r["date_text"])}</span>}
        </div>
        <h1 className="font-display mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl light:text-slate-900">
          {String(r["title"] ?? "")}
        </h1>
        {Boolean(r["subtitle"] || r["tagline"]) && (
          <p className="mt-3 text-[15.5px] text-slate-400">{String(r["subtitle"] ?? r["tagline"] ?? "")}</p>
        )}
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="Cover" className="mt-6 w-full rounded-3xl border border-white/10 object-cover" />
        )}

        <div className="mt-8">
          {entity === "posts" && (
            <>
              {((r["content"] ?? []) as { heading?: string; body: string[] }[]).map((b, i) => (
                <div key={i} className="mt-7 first:mt-0">
                  {b.heading && <h2 className="font-display text-xl font-bold text-white light:text-slate-900">{b.heading}</h2>}
                  <Paragraphs text={b.body.join("\n\n")} />
                </div>
              ))}
            </>
          )}
          {entity === "projects" && (
            <div className="grid gap-6">
              <Paragraphs text={String(r["overview"] ?? "")} />
              {(r["features"] as string[] | null)?.length ? (
                <ul className="list-disc space-y-1.5 pl-5 text-[14px] text-slate-300">
                  {((r["features"] ?? []) as string[]).map((f) => <li key={f}>{f}</li>)}
                </ul>
              ) : null}
            </div>
          )}
          {entity === "research" && (
            <>
              <Paragraphs text={String(r["summary"] ?? "")} />
              <Paragraphs text={blocksToMarkdown([{ body: String(r["content"] ?? "").split("\n") }]).slice(0, 4000)} />
            </>
          )}
        </div>
      </article>
    </div>
  );
}
