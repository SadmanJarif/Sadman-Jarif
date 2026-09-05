import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { USES_DATA } from "@/data/site";

export const metadata: Metadata = {
  title: "My Setup — Sadman Mubassir Jarif",
  description: "The tools I use for development, AI, productivity, learning, design, and research.",
};

export default function UsesPage() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="My Setup"
        title="Tools I"
        highlight="build with."
        description="Lightweight, personal, and honest — what I actually use daily for learning and building. Updated as the stack evolves."
        crumbs={[{ label: "Home", href: "/" }, { label: "My Setup" }]}
      />
      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
          {USES_DATA.map((s, i) => (
            <Reveal key={s.section} delay={(i % 3) * 80}>
              <div className="glass h-full rounded-3xl p-6 sm:p-7">
                <h2 className="font-display text-[16px] font-bold text-white">{s.section}</h2>
                <ul className="mt-4 space-y-3.5">
                  {s.items.map((t) => (
                    <li key={t.name}>
                      <p className="text-[13.5px] font-bold text-cyan-200">{t.name}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-400">{t.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
