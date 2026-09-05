import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { JOURNEY_MILESTONES } from "@/data/site";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Journey — Sadman Mubassir Jarif",
  description: "An interactive timeline: from early education in Bangladesh to AI, computer science, and global ambitions.",
};

const ERA_ACCENTS = [
  "from-slate-400 to-slate-500",
  "from-cyan-400 to-sky-500",
  "from-violet-400 to-purple-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-blue-400 to-indigo-500",
  "from-fuchsia-400 to-pink-500",
  "from-cyan-300 via-violet-400 to-fuchsia-400",
];

export default function JourneyPage() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="Journey / Timeline"
        title="Milestones,"
        highlight="not noise."
        description="The major chapters of my development — each one a bet that compounded into the next. Scroll through the story."
        crumbs={[{ label: "Home", href: "/" }, { label: "Journey" }]}
      />

      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="relative">
            <div className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-cyan-400/50 via-violet-500/40 to-fuchsia-400/30 sm:left-[21px]" />
            <div className="grid gap-5">
              {JOURNEY_MILESTONES.map((m, i) => (
                <Reveal key={m.era} delay={Math.min(i * 60, 200)}>
                  <article className="glass card-hover relative rounded-3xl p-6 pl-14 sm:p-7 sm:pl-16">
                    <span className="absolute left-[11px] top-7 sm:left-[13px]">
                      <span className={`block h-4 w-4 rounded-full bg-gradient-to-br ${ERA_ACCENTS[i % ERA_ACCENTS.length]} shadow-lg sm:h-[18px] sm:w-[18px]`} />
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest text-cyan-200">
                        {m.era}
                      </span>
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                        {m.period}
                      </span>
                    </div>
                    <h2 className="font-display mt-3 text-lg font-bold leading-snug text-white sm:text-xl">
                      {m.title}
                    </h2>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-slate-400">{m.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={100}>
            <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-white/[0.015] p-7 text-center">
              <p className="font-display text-[16px] font-bold text-slate-200">This timeline is still being written.</p>
              <p className="mx-auto mt-2 max-w-md text-[13.5px] text-slate-500">
                The next milestones — deeper expertise, international education, companies with real users — are the ones I&apos;m working on now.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/goals" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white">
                  My goals <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/now" className="btn-ghost inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-2.5 text-[13.5px] font-semibold text-white">
                  What I&apos;m doing now
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
