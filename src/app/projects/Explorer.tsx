"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";
import { ArrowUpRight, GithubIcon } from "@/components/Icons";

const STATUS_STYLES: Record<string, string> = {
  Featured: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  "In Development": "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  Completed: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Experiment: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200",
};

export type ExplorerProject = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  gradient: string;
  icon: string;
  status: string;
  categories: string[];
  year: string;
  githubUrl: string;
};

export default function ProjectsExplorer({ projects }: { projects: ExplorerProject[] }) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section className="relative pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                  filter === c
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.6)]"
                    : "border border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0f1e]/80 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/25 hover:shadow-[0_28px_70px_-20px_rgba(34,211,238,0.25)] light:border-slate-900/10 light:bg-white light:shadow-[0_16px_45px_-22px_rgba(15,23,42,0.18)]">
                <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                  <div className="dot-bg absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent light:from-white light:via-white/40" />
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-xl text-white backdrop-blur-md">
                    {p.icon}
                  </span>
                  <span className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest backdrop-blur-md ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{p.year}</p>
                  <Link href={`/projects/${p.slug}`}>
                    <h2 className="font-display mt-1 text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-cyan-100 light:text-slate-900 light:group-hover:text-cyan-800">
                      {p.title}
                    </h2>
                  </Link>
                  <p className="mt-1 text-[12.5px] font-medium text-cyan-200/70 light:text-cyan-800">{p.tagline}</p>
                  <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-400 light:text-slate-600">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.categories.map((c) => (
                      <span key={c} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-medium text-slate-300 light:border-slate-900/10 light:bg-slate-900/[0.03] light:text-slate-600">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 light:border-slate-900/10">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-gradient-to-r hover:from-cyan-500 hover:to-violet-600 light:bg-slate-900/[0.05] light:text-slate-800 light:hover:text-white"
                    >
                      Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="inline-flex h-[42px] w-[46px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:border-white/25 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-500 light:hover:border-slate-900/25 light:hover:text-slate-900"
                    >
                      <GithubIcon className="h-[18px] w-[18px]" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
