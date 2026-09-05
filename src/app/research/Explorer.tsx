"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
export type ResearchItem = { title: string; area: string; type: string; date: string; summary: string; tags: string[] };

const TYPE_STYLES: Record<string, string> = {
  "Research Note": "border-violet-400/25 bg-violet-400/10 text-violet-200 light:border-violet-700/25 light:bg-violet-700/[0.07] light:text-violet-800",
  Explainer: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800",
  Experiment: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200 light:border-fuchsia-700/25 light:bg-fuchsia-700/[0.07] light:text-fuchsia-800",
  "Study Note": "border-emerald-400/25 bg-emerald-400/10 text-emerald-200 light:border-emerald-700/25 light:bg-emerald-700/[0.07] light:text-emerald-800",
  "Code Notes": "border-amber-400/25 bg-amber-400/10 text-amber-200 light:border-amber-700/25 light:bg-amber-700/[0.07] light:text-amber-800",
  "Literature Review": "border-sky-400/25 bg-sky-400/10 text-sky-200 light:border-sky-700/25 light:bg-sky-700/[0.07] light:text-sky-800",
};

export default function ResearchExplorer({ notes: RESEARCH_NOTES }: { notes: ResearchItem[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");
  const areas = ["All", ...Array.from(new Set(RESEARCH_NOTES.map((n) => n.area)))];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESEARCH_NOTES.filter((n) => {
      const matchArea = area === "All" || n.area === area;
      const matchQuery =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q));
      return matchArea && matchQuery;
    });
  }, [query, area]);

  return (
    <>
      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="glass flex flex-col gap-3 rounded-3xl p-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search notes, topics, tags… (try 'agents' or 'rag')"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-[14px] text-white placeholder:text-slate-400 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {areas.map((a) => (
                  <button
                    key={a}
                    onClick={() => setArea(a)}
                    className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all ${
                      area === a
                        ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                        : "border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-500 light:hover:text-slate-900"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <p className="mt-6 text-[13px] text-slate-300">
            Showing <span className="font-bold text-slate-200 light:text-slate-800">{visible.length}</span> of {RESEARCH_NOTES.length} entries
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {visible.map((n, i) => (
              <Reveal key={n.title} delay={Math.min((i % 4) * 70, 200)}>
                <article className="glass card-hover h-full rounded-3xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest ${TYPE_STYLES[n.type] ?? "border-white/10 bg-white/[0.05] text-slate-300 light:border-slate-900/10 light:bg-white light:text-slate-600"}`}>
                      {n.type}
                    </span>
                    <span className="text-[11.5px] font-medium text-slate-300">{n.area} • {n.date}</span>
                  </div>
                  <h2 className="font-display mt-3.5 text-[16px] font-bold leading-snug text-white light:text-slate-900">{n.title}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300 light:text-slate-600">{n.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {n.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-slate-300 light:bg-slate-900/[0.05] light:text-slate-500">
                        #{t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-8 rounded-3xl border border-dashed border-white/15 p-10 text-center">
              <p className="font-display text-[16px] font-bold text-slate-300 light:text-slate-700">No notes match that search yet.</p>
              <p className="mt-2 text-[13.5px] text-slate-300">Try a broader term — or suggest the topic when you contact me.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
