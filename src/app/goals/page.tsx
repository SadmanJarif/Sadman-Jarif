import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getGoals, seoMeta } from "@/lib/cms";
import { ArrowRight } from "@/components/Icons";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/goals", {
    title: "Goals — Sadman Mubassir Jarif",
    description: "An honest personal roadmap: current goals, 1-year goals, and long-term ambitions.",
  });
}

function GoalGroup({
  label,
  accent,
  items,
  note,
}: {
  label: string;
  accent: string;
  items: { title: string; detail: string }[];
  note: string;
}) {
  return (
    <div>
      <Reveal>
        <div className="flex items-baseline gap-3">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl light:text-slate-900">{label}</h2>
          <span className={`h-1 flex-1 rounded-full bg-gradient-to-r ${accent}`} />
        </div>
        <p className="mt-2 max-w-2xl text-[13.5px] text-slate-300">{note}</p>
      </Reveal>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 80}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <span className={`font-display bg-gradient-to-r ${accent} bg-clip-text text-[12px] font-bold uppercase tracking-[0.16em] text-transparent`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-2 text-[16px] font-bold text-white light:text-slate-900">{g.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300 light:text-slate-600">{g.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default async function GoalsPage() {
  const GOALS = await getGoals();
  return (
    <main className="relative min-h-screen text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <PageHero
        eyebrow="Goals"
        title="An honest"
        highlight="roadmap."
        description="Not a motivational poster — the actual goals organizing my weeks and years, across education, AI, engineering, entrepreneurship, and life."
        crumbs={[{ label: "Home", href: "/" }, { label: "Goals" }]}
      />
      <section className="relative space-y-14 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl space-y-14 px-5 sm:px-8">
          <GoalGroup
            label="Current goals"
            accent="from-cyan-400 to-sky-500"
            items={GOALS.current}
            note="What my calendar actually reflects this quarter."
          />
          <GoalGroup
            label="1-year goals"
            accent="from-violet-400 to-purple-500"
            items={GOALS.oneYear}
            note="Where focused execution for twelve months should land me."
          />
          <GoalGroup
            label="Long-term goals"
            accent="from-amber-400 to-fuchsia-500"
            items={GOALS.longTerm}
            note="The decade view: engineer internationally, found companies, fund learning for others."
          />
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/now" className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-semibold text-white">
                See what I'm doing now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/journey" className="btn-ghost inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[14px] font-semibold text-white">
                Where I've been
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
