"use client";

import { useState } from "react";

export const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20";

export function PageHeader({
  title, desc, action,
}: {
  title: string; desc?: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
          <h1 className="font-display text-2xl font-extrabold text-white sm:text-[1.7rem] light:text-slate-900">{title}</h1>
        {desc && <p className="mt-1 text-[13px] text-slate-500">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    published: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200 light:border-emerald-700/25 light:bg-emerald-700/[0.07] light:text-emerald-800",
    draft: "border-amber-400/25 bg-amber-400/10 text-amber-200 light:border-amber-700/25 light:bg-amber-700/[0.07] light:text-amber-800",
    Featured: "border-amber-400/30 bg-amber-400/10 text-amber-200 light:border-amber-700/25 light:bg-amber-700/[0.07] light:text-amber-800",
    "In Development": "border-cyan-400/25 bg-cyan-400/10 text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800",
    Completed: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200 light:border-emerald-700/25 light:bg-emerald-700/[0.07] light:text-emerald-800",
    Experiment: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200 light:border-fuchsia-700/25 light:bg-fuchsia-700/[0.07] light:text-fuchsia-800",
  };
  const label = value === "true" ? "Published" : value === "false" ? "Draft" : value;
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${styles[value] ?? "border-white/10 bg-white/[0.05] text-slate-300 light:border-slate-900/10 light:bg-white light:text-slate-600"}`}>
      {label}
    </span>
  );
}

export function TagsInput({
  value, onChange, placeholder, suggestions,
}: {
  value: string[]; onChange: (v: string[]) => void; placeholder?: string; suggestions?: string[];
}) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const t = raw.trim().replace(/,+$/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.08] px-2.5 py-1 text-[12px] font-medium text-cyan-100 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800">
            {t}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} className="text-cyan-400 hover:text-white" aria-label={`Remove ${t}`}>×</button>
          </span>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(draft); } }}
        onBlur={() => draft.trim() && add(draft)}
        placeholder={placeholder ?? "Type and press Enter"}
        className={`${inputCls} mt-2`}
      />
      {suggestions && suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.filter((s) => !value.includes(s)).map((s) => (
            <button key={s} type="button" onClick={() => onChange([...value, s])}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11.5px] text-slate-400 transition-colors hover:border-cyan-400/30 hover:text-white">
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
      </span>
      <span className="text-[13px] font-medium text-slate-300">{label}</span>
    </button>
  );
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-10 text-center">
      <p className="font-display text-[15px] font-bold text-slate-300 light:text-slate-700">{title}</p>
      {hint && <p className="mx-auto mt-1.5 max-w-sm text-[13px] text-slate-500">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
