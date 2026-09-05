"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { SKILLS } from "@/data/portfolio";

export type SkillGroup = { category: string; items: string[]; accent: string; note: string };

export default function Skills({ groups = SKILLS }: { groups?: SkillGroup[] }) {
  const [active, setActive] = useState(0);
  const list = groups.length > 0 ? groups : SKILLS;
  const current = list[Math.min(active, list.length - 1)];

  return (
    <section id="skills" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit built"
          highlight="by doing."
          description="No percentage bars — just honest categories shaped by real projects, internships and curiosity."
        />

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {list.map((s, i) => (
              <button
                key={s.category}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  active === i
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.6)]"
                    : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900"
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} key={active}>
          <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0f1e]/80 p-7 backdrop-blur-md sm:p-9 light:border-slate-900/10 light:bg-white light:shadow-[0_20px_60px_-25px_rgba(15,23,42,0.2)]">
            <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${current.accent}`} />
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl light:text-slate-900">{current.category}</h3>
              <span className="text-[12.5px] font-medium italic text-slate-300">{current.note}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {current.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-[13.5px] font-medium text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:shadow-[0_10px_25px_-8px_rgba(34,211,238,0.4)] light:border-slate-900/10 light:bg-slate-900/[0.03] light:text-slate-700 light:hover:border-cyan-700/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Currently learning", d: "DSA in C + Python, LLM app patterns, system design basics" },
            { t: "Strongest combo", d: "React frontends + AI backends + no-code speed (WordPress/Shopify)" },
            { t: "Next to master", d: "Vector DBs, evals, agent orchestration, SaaS billing & analytics" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="glass h-full rounded-2xl p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200 light:text-cyan-800">{c.t}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300 light:text-slate-600">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
