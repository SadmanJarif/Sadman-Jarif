"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { saveSeo, deleteSeo } from "@/lib/admin/site-actions";
import { inputCls, PageHeader, Toggle } from "@/components/admin/ui";

type Row = { id?: string; path: string; title: string; description: string; keywords: string; og_image: string; noindex: boolean };

function Snippet({ row }: { row: Row }) {
  const host = "sadmanjarif.dev";
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0f1e] p-4 light:border-slate-900/10 light:bg-white light:shadow-[0_16px_45px_-22px_rgba(15,23,42,0.18)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">Search preview {row.noindex && "· noindex (hidden from search)"}</p>
      <p className="mt-2 text-[12px] text-slate-500">{host}{row.path || "/"}</p>
      <p className="mt-0.5 text-[15px] font-medium text-[#8ab4f8] light:text-[#1a56db]">{row.title || "Page title"}</p>
      <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-400">{row.description || "Meta description…"}</p>
      {row.og_image && (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={row.og_image} alt="Open Graph preview" className="max-h-40 w-full object-cover" />
          <p className="truncate px-3 py-2 text-[12px] text-slate-400">{row.title} — shared on social</p>
        </div>
      )}
    </div>
  );
}

export default function SeoEditor({ initial }: { initial: Row[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(
    initial.map((r) => ({
      id: r.id, path: r.path, title: r.title, description: r.description,
      keywords: r.keywords, og_image: r.og_image, noindex: r.noindex,
    }))
  );
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows.map((r, i) => ({ ...r, i }));
    return rows.map((r, i) => ({ ...r, i })).filter((r) => `${r.path} ${r.title}`.toLowerCase().includes(needle));
  }, [rows, q]);

  const set = (i: number, patch: Partial<Row>) => setRows(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  const add = () => {
    setRows([...rows, { path: "/new-page", title: "", description: "", keywords: "", og_image: "", noindex: false }]);
    setSelected(rows.length);
  };

  const remove = async (i: number) => {
    const r = rows[i];
    if (r.id) {
      if (!confirm(`Delete SEO settings for “${r.path}”?`)) return;
      const res = await deleteSeo(r.id);
      if (!res.ok) {
        setMsg({ ok: false, text: res.message });
        return;
      }
    }
    const next = rows.filter((_, j) => j !== i);
    setRows(next);
    setSelected(Math.max(0, Math.min(selected, next.length - 1)));
    router.refresh();
  };

  const save = async () => {
    setBusy(true);
    setMsg(null);
    const r = await saveSeo(rows);
    setBusy(false);
    if (!r.ok) setMsg({ ok: false, text: r.message });
    else {
      setMsg({ ok: true, text: "SEO settings saved." });
      router.refresh();
    }
  };

  const cur = rows[selected];

  return (
    <div>
      <PageHeader
        title="SEO"
        desc="Titles, descriptions, keywords, social images and indexing per page."
        action={
          <div className="flex gap-2">
            <button onClick={add} className="rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-white light:border-slate-900/15 light:bg-white light:text-slate-700 light:shadow-sm">+ Add page</button>
            <button onClick={save} disabled={busy} className="btn-primary rounded-full px-6 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">
              {busy ? "Saving…" : "Save all"}
            </button>
          </div>
        }
      />
      {msg && (
        <p className={`mt-4 rounded-xl border px-4 py-2.5 text-[13px] ${msg.ok ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-rose-400/25 bg-rose-400/10 text-rose-200"}`}>
          {msg.text}
        </p>
      )}
      <div className="glass mt-5 rounded-2xl p-3.5">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pages…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/50 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 sm:max-w-xs" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="grid h-fit gap-1.5">
          {visible.map((r) => (
            <button key={`${r.path}-${r.i}`} onClick={() => setSelected(r.i)}
              className={`break-all rounded-xl px-4 py-2.5 text-left font-mono text-[12.5px] transition-all ${selected === r.i ? "bg-white/[0.08] text-white light:bg-slate-900/[0.06] light:text-slate-900" : "text-slate-400 hover:bg-white/[0.04] hover:text-white light:text-slate-500 light:hover:bg-slate-900/[0.04] light:hover:text-slate-900"}`}>
              {r.path || "/"}
            </button>
          ))}
        </div>
        {cur ? (
          <div className="grid gap-4">
            <div className="glass rounded-3xl p-6">
              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Path</label>
                  <input value={cur.path} onChange={(e) => set(selected, { path: e.target.value })} className={`${inputCls} font-mono !text-[12.5px]`} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Title ({cur.title.length}/60)</label>
                  <input value={cur.title} onChange={(e) => set(selected, { title: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Meta description ({cur.description.length}/160)</label>
                  <textarea rows={3} value={cur.description} onChange={(e) => set(selected, { description: e.target.value })} className={`${inputCls} resize-y`} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Keywords (comma separated)</label>
                  <input value={cur.keywords} onChange={(e) => set(selected, { keywords: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Open Graph image URL</label>
                  <input value={cur.og_image} onChange={(e) => set(selected, { og_image: e.target.value })} placeholder="https://…" className={inputCls} />
                </div>
                <Toggle checked={cur.noindex} onChange={(v) => set(selected, { noindex: v })} label="Hide from search engines (noindex)" />
                <button onClick={() => remove(selected)} className="justify-self-start rounded-lg px-2 py-1 text-[12.5px] font-medium text-rose-300/80 hover:text-rose-200">
                  Delete this entry
                </button>
              </div>
            </div>
            <Snippet row={cur} />
          </div>
        ) : (
          <p className="text-[13px] text-slate-500">No pages — add one to begin.</p>
        )}
      </div>
    </div>
  );
}
