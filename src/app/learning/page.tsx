import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { LEARNING_TRACKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Learning — Sadman Mubassir Jarif",
  description: "Continuous learning across CS, AI, data, business, and communication — what I learned, built, and used.",
};

export default function LearningPage() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="Learning"
        title="What I learned →"
        highlight="what I built."
        description="Not a certificate wall. Every entry answers three questions: what did I learn, what did I build with it, and how do I use it now?"
        crumbs={[{ label: "Home", href: "/" }, { label: "Learning" }]}
      />

      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
          {LEARNING_TRACKS.map((t, i) => (
            <Reveal key={t.area} delay={(i % 2) * 90}>
              <div className="glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-8">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.accent}`} />
                <h2 className="font-display text-xl font-bold text-white">{t.area}</h2>
                <p className="mt-1 text-[13px] text-slate-500">{t.desc}</p>
                <div className="mt-6 grid gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Completed
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {t.completed.map((c) => (
                        <li key={c} className="text-[13.5px] text-slate-300">✓ {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> Currently learning
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {t.learning.map((c) => (
                        <li key={c} className="text-[13.5px] font-medium text-white">→ {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> Want to learn
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {t.next.map((c) => (
                        <li key={c} className="text-[13.5px] text-slate-500">○ {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
