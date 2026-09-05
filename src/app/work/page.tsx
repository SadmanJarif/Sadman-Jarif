import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { EXPERIENCE_DETAILS, FREELANCE_INFO } from "@/data/site";
import { ArrowRight, CheckIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Work — Sadman Mubassir Jarif",
  description: "Professional experience: Connect For Purpose, Africa ICT Right, Beats By Dre — plus freelance and independent work.",
};

const ACCENTS = ["from-cyan-400 to-blue-500", "from-violet-400 to-purple-500", "from-fuchsia-400 to-pink-500"];

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="Work / Experience"
        title="Progressive responsibility,"
        highlight="real outcomes."
        description="Three international remote roles in one year — each one deeper than the last. Here's what I did, what I learned, and what changed because of it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      />

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8">
          {EXPERIENCE_DETAILS.map((r, i) => (
            <Reveal key={r.org} delay={Math.min(i * 80, 160)}>
              <article className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${ACCENTS[i % ACCENTS.length]}`} />
                <div className="flex flex-wrap items-center gap-2">
                  {r.current && (
                    <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest text-emerald-200">
                      Current
                    </span>
                  )}
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                    {r.time} • {r.place}
                  </span>
                </div>
                <h2 className="font-display mt-3 text-xl font-bold text-white sm:text-2xl">
                  {r.role} <span className="text-slate-500">—</span>{" "}
                  <span className="text-gradient-cyan">{r.org}</span>
                </h2>
                <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-slate-400">{r.summary}</p>

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Responsibilities</p>
                    <ul className="mt-3 space-y-2.5">
                      {r.responsibilities.map((x) => (
                        <li key={x} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-300">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                          {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.tech.map((t) => (
                        <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-medium text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300">What I learned</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">{r.learned}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">Impact / outcome</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">{r.impact}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Independent"
            title="Freelance &"
            highlight="independent work."
            description="The work between the titles — where I learned to scope, price, deliver, and keep clients happy."
          />
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7 text-center sm:p-10">
              <h3 className="font-display text-xl font-bold text-white">{FREELANCE_INFO.title}</h3>
              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-400">{FREELANCE_INFO.text}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {FREELANCE_INFO.items.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-[#0a0f1e]/70 px-4 py-2 text-[12.5px] font-medium text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="group mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:border-white/25 hover:bg-white/10">
                Work with me <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 text-center">
              <Link href="/resume" className="text-[14px] font-semibold text-cyan-300 hover:text-cyan-200">
                Prefer the one-page version? See my resume →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
