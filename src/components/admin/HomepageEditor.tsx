"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveHomepageSections } from "@/lib/admin/site-actions";
import { PageHeader, Toggle } from "@/components/admin/ui";

type Row = { id: string; key: string; label: string; enabled: boolean; sort: number };

export default function HomepageEditor({ initial }: { initial: Row[] }) {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[idx], next[j]] = [next[j], next[idx]];
    setRows(next);
  };

  const save = async () => {
    setBusy(true);
    setMsg(null);
    const r = await saveHomepageSections(rows.map((x, i) => ({ id: x.id, enabled: x.enabled, sort: i })));
    setBusy(false);
    if (!r.ok) setMsg({ ok: false, text: r.message });
    else {
      setMsg({ ok: true, text: "Homepage layout saved — live on the website." });
      router.refresh();
    }
  };

  return (
    <div>
      <PageHeader
        title="Homepage"
        desc="Turn sections on/off and drag their order with the arrows. Top of the list = top of the page."
        action={
          <button onClick={save} disabled={busy} className="btn-primary rounded-full px-6 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">
            {busy ? "Saving…" : "Save layout"}
          </button>
        }
      />
      {msg && (
        <p className={`mt-4 rounded-xl border px-4 py-2.5 text-[13px] ${msg.ok ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200 light:border-emerald-700/25 light:bg-emerald-700/[0.07] light:text-emerald-800" : "border-rose-400/25 bg-rose-400/10 text-rose-200 light:border-rose-700/25 light:bg-rose-700/[0.07] light:text-rose-800"}`}>
          {msg.text}
        </p>
      )}
      <div className="mx-auto mt-5 grid max-w-3xl gap-2">
        {rows.map((r, i) => (
          <div key={r.id} className={`glass flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl p-3.5 ${r.enabled ? "" : "opacity-55"}`}>
            <span className="font-mono text-[11px] text-slate-600">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-bold text-white light:text-slate-900">{r.label}</p>
              <p className="font-mono text-[11px] text-slate-600">{r.key}</p>
            </div>
            <Toggle checked={r.enabled} onChange={(v) => setRows(rows.map((x) => (x.id === r.id ? { ...x, enabled: v } : x)))} label="" />
            <div className="flex gap-1">
              <button onClick={() => move(i, -1)} disabled={i === 0}
                className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[13px] text-slate-300 disabled:opacity-30 light:border-slate-900/15 light:bg-white light:text-slate-600" aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === rows.length - 1}
                className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[13px] text-slate-300 disabled:opacity-30 light:border-slate-900/15 light:bg-white light:text-slate-600" aria-label="Move down">↓</button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-slate-500">
        Featured projects & articles are picked on the{" "}
        <Link href="/admin/projects" className="font-semibold text-cyan-300 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-800">Projects</Link>{" "}and{" "}
        <Link href="/admin/posts" className="font-semibold text-cyan-300 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-800">Blog</Link> pages via the Featured toggle.
      </p>
    </div>
  );
}
