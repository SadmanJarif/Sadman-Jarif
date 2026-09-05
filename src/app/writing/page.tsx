"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { POSTS, POST_CATEGORIES } from "@/data/writing";
import { ArrowRight } from "@/components/Icons";

export default function WritingPage() {
  const [filter, setFilter] = useState<string>("All");
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p.slug !== featured.slug);
  const visible = filter === "All" ? POSTS : POSTS.filter((p) => p.category === filter);
  const topics = [...POST_CATEGORIES.filter((c) => c !== "All")];

  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="Writing / Blog"
        title="Thinking"
        highlight="in public."
        description="AI, software, entrepreneurship, career, education — long-form thinking with excellent typography. Built to grow for years."
        crumbs={[{ label: "Home", href: "/" }, { label: "Writing" }]}
      />

      {/* Featured */}
      <section className="relative py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <Link
              href={`/writing/${featured.slug}`}
              className="group relative block overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#0b1024] via-[#0d0a24] to-[#160b24] p-8 sm:p-12"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-[100px]" />
              </div>
              <div className="relative">
                <span className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                  ★ Featured Article
                </span>
                <h2 className="font-display mt-5 max-w-2xl text-2xl font-extrabold leading-tight text-white transition-colors group-hover:text-cyan-50 sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-xl text-[14.5px] text-slate-400">{featured.subtitle}</p>
                <p className="mt-4 text-[12.5px] font-medium text-slate-500">
                  {featured.category} • {featured.date} • {featured.readTime}
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <section className="relative py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {(["All", ...topics] as string[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                    filter === c
                      ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                      : "border border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(filter === "All" ? rest : visible).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
                <Link href={`/writing/${p.slug}`} className="glass card-hover group flex h-full flex-col rounded-3xl p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-200">
                      {p.category}
                    </span>
                    <span className="text-[11.5px] font-medium text-slate-500">{p.date}</span>
                  </div>
                  <h3 className="font-display mt-4 text-[16.5px] font-bold leading-snug text-white transition-colors group-hover:text-cyan-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-slate-500">{p.subtitle}</p>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-400">{p.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[12.5px]">
                    <span className="font-medium text-slate-500">{p.readTime}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-cyan-300">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Popular topics + notes */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="glass h-full rounded-3xl p-7">
                <h3 className="font-display text-lg font-bold text-white">Popular topics</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[12px] font-medium text-slate-400 transition-colors hover:border-cyan-400/30 hover:text-white"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="glass h-full rounded-3xl p-7">
                <h3 className="font-display text-lg font-bold text-white">Notes & experiments</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
                  Shorter, rougher thinking lives in the{" "}
                  <Link href="/research" className="font-semibold text-cyan-300 hover:text-cyan-200">Research & Notes archive</Link>{" "}
                  and the <Link href="/ai-lab" className="font-semibold text-cyan-300 hover:text-cyan-200">AI Lab</Link> —
                  updated whenever an experiment teaches me something.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
