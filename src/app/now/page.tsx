import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getNow, seoMeta } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/now", {
    title: "Now — Sadman Mubassir Jarif",
    description: "What I'm learning, building, reading, and preparing for right now.",
  });
}

const SECTIONS: { key: "learning" | "building" | "reading" | "workingOn" | "preparingFor" | "exploring"; title: string; icon: string }[] = [
  { key: "learning", title: "Learning", icon: "◉" },
  { key: "building", title: "Building", icon: "◆" },
  { key: "reading", title: "Reading", icon: "✎" },
  { key: "workingOn", title: "Working on", icon: "⬢" },
  { key: "preparingFor", title: "Preparing for", icon: "◎" },
  { key: "exploring", title: "Exploring", icon: "✦" },
];

export default async function NowPage() {
  const NOW_DATA = await getNow();
  return (
    <main className="relative min-h-screen text-slate-100 light:text-slate-700">
      <PageHero
        eyebrow={`Now • Last updated ${NOW_DATA.updated}`}
        title="What I'm doing"
        highlight="right now."
        description="A living snapshot — easy to update, honest by design. If it's not on this page, it's not getting my hours this month."
        crumbs={[{ label: "Home", href: "/" }, { label: "Now" }]}
      />
      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 80}>
              <div className="glass card-hover h-full rounded-3xl p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-violet-600/25 text-lg text-cyan-200">
                  {s.icon}
                </span>
                <h2 className="font-display mt-4 text-[16px] font-bold text-white light:text-slate-900">{s.title}</h2>
                <ul className="mt-3 space-y-2">
                  {(NOW_DATA[s.key] as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-slate-300 light:text-slate-700">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-xl px-5 text-center text-[13px] text-slate-300">
            Inspired by the <span className="font-semibold text-slate-300 light:text-slate-700">/now</span> movement — personal
            sites with a public current status.{" "}
            <Link href="/goals" className="font-semibold text-cyan-200 hover:text-cyan-200">
              See where this is heading →
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
