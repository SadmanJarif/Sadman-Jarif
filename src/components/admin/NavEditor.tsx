"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveNav, type NavRow } from "@/lib/admin/site-actions";
import { inputCls, PageHeader, Toggle } from "@/components/admin/ui";

const LOCATIONS = [
  { key: "main", label: "Header" },
  { key: "more", label: "More menu" },
  { key: "footer", label: "Footer" },
];

export default function NavEditor({ initial }: { initial: Record<string, unknown>[] }) {
  const router = useRouter();
  const [items, setItems] = useState<NavRow[]>(
    initial.map((r) => ({
      id: String(r["id"]), label: String(r["label"]), href: String(r["href"]),
      location: String(r["location"]), sort: Number(r["sort"] ?? 0), visible: Boolean(r["visible"]),
    }))
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const move = (loc: string, idx: number, dir: -1 | 1) => {
    const group = items.filter((i) => i.location === loc);
    const j = idx + dir;
    if (j < 0 || j >= group.length) return;
    const order = items.filter((i) => i.location !== loc);
    const swapped = [...group];
    [swapped[idx], swapped[j]] = [swapped[j], swapped[idx]];
    const merged: NavRow[] = [];
    let gi = 0;
    for (const it of items) {
      if (it.location === loc) merged.push(swapped[gi++]);
      else merged.push(order.shift()!);
    }
    void order;
    setItems(merged);
  };

  const set = (id: string | undefined, patch: Partial<NavRow>) => {
    setItems(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const add = (loc: string) => {
    setItems([...items, { label: "New link", href: "/", location: loc, sort: 0, visible: true }]);
  };

  const remove = (id: string | undefined, label: string) => {
    if (id && !confirm(`Remove “${label}” from navigation?`)) return;
    setItems(items.filter((it) => it.id !== id));
  };

  const save = async () => {
    setBusy(true);
    setMsg(null);
    const r = await saveNav(items);
    setBusy(false);
    if (!r.ok) setMsg({ ok: false, text: r.message });
    else {
      setMsg({ ok: true, text: "Navigation saved — live on the website." });
      router.refresh();
    }
  };

  return (
    <div>
      <PageHeader
        title="Navigation"
        desc="Header links, the More menu and footer links. Order within each group is top-to-bottom."
        action={
          <button onClick={save} disabled={busy} className="btn-primary rounded-full px-6 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">
            {busy ? "Saving…" : "Save navigation"}
          </button>
        }
      />
      {msg && (
        <p className={`mt-4 rounded-xl border px-4 py-2.5 text-[13px] ${msg.ok ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-rose-400/25 bg-rose-400/10 text-rose-200"}`}>
          {msg.text}
        </p>
      )}
      <div className="mt-5 grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
        {LOCATIONS.map((loc) => {
          const group = items.map((it, i) => ({ ...it, i })).filter((it) => it.location === loc.key);
          return (
            <div key={loc.key} className="glass h-fit rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[15px] font-bold text-white light:text-slate-900">{loc.label}</h2>
                <button onClick={() => add(loc.key)} className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[12px] font-semibold text-slate-200 hover:border-cyan-400/30 hover:text-white light:border-slate-900/15 light:bg-white light:text-slate-700 light:shadow-sm light:hover:border-cyan-700/40 light:hover:text-slate-900">
                  + Add
                </button>
              </div>
              <div className="mt-4 grid gap-2.5">
                {group.length === 0 && <p className="text-[12.5px] text-slate-600">No links in this group yet.</p>}
                {group.map((it, gi) => (
                  <div key={it.id ?? `new-${it.i}`} className={`rounded-2xl border p-3.5 ${it.visible ? "border-white/[0.08] bg-white/[0.02]" : "border-dashed border-white/10 bg-transparent opacity-60"}`}>
                    <div className="grid gap-2">
                      <input value={it.label} onChange={(e) => set(it.id, { label: e.target.value })}
                        placeholder="Label" className={inputCls} />
                      <input value={it.href} onChange={(e) => set(it.id, { href: e.target.value })}
                        placeholder="/path or https://…" className={`${inputCls} font-mono !text-[12px]`} />
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <Toggle checked={it.visible} onChange={(v) => set(it.id, { visible: v })} label={it.visible ? "Shown" : "Hidden"} />
                        <div className="flex gap-1">
                          <button onClick={() => move(loc.key, gi, -1)} disabled={gi === 0}
                            className="rounded-lg border border-white/10 px-2.5 py-1 text-[13px] text-slate-300 disabled:opacity-30 light:border-slate-900/15 light:bg-white light:text-slate-600" aria-label="Move up">↑</button>
                          <button onClick={() => move(loc.key, gi, 1)} disabled={gi === group.length - 1}
                            className="rounded-lg border border-white/10 px-2.5 py-1 text-[13px] text-slate-300 disabled:opacity-30 light:border-slate-900/15 light:bg-white light:text-slate-600" aria-label="Move down">↓</button>
                          <button onClick={() => remove(it.id, it.label)}
                            className="rounded-lg border border-white/10 px-2.5 py-1 text-[13px] text-rose-300/90 hover:border-rose-400/40 light:hover:text-rose-700" aria-label="Remove">×</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
