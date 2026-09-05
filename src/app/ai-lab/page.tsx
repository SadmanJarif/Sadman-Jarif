import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { LAB_AREAS, LAB_ITEMS } from "@/data/site";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "AI Lab — Sadman Mubassir Jarif",
  description: "My experimentation space: AI agents, automation, chatbots, products, and research notes.",
};

const KIND_STYLES: Record<string, string> = {
  Prototype: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  Experiment: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200",
  "Research Note": "border-violet-400/25 bg-violet-400/10 text-violet-200",
  Idea: "border-amber-400/25 bg-amber-400/10 text-amber-200",
};

export default function AILabPage() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="AI Lab 🧪"
        title="Experiments over"
        highlight="opinions."
        description="This page is intentionally rawer than the rest of the site. Half-finished prototypes, open questions, and notes from the workbench — updated as I build."
        crumbs={[{ label: "Home", href: "/" }, { label: "AI Lab" }]}
      />

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
          {LAB_AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0a0f1e] p-6">
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${a.accent} opacity-20 blur-2xl`} />
                <span className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${a.accent} text-lg text-white`}>
                  {a.icon}
                </span>
                <h2 className="font-display relative mt-4 text-[16px] font-bold text-white">{a.title}</h2>
                <p className="relative mt-1.5 text-[13px] leading-relaxed text-slate-400">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-glow relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Workbench</p>
              <h2 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">Prototypes, ideas & research notes</h2>
            </div>
            <Link href="/research" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-cyan-300 hover:text-cyan-200">
              Full research archive <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LAB_ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <div className="glass card-hover h-full rounded-3xl p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest ${KIND_STYLES[item.kind]}`}>
                      {item.kind}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[16px] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 pb-20 sm:py-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#0b1024] to-[#160b24] p-8 text-center sm:p-12">
              <div className="dot-bg absolute inset-0 opacity-30" />
              <p className="font-display relative text-xl font-bold text-white sm:text-2xl">
                The lab rule: <span className="text-gradient">ship the ugly version first.</span>
              </p>
              <p className="relative mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-400">
                Every polished project on this site started as a lab mess. If you&apos;re building with AI
                and want to compare notes — my inbox is open.
              </p>
              <Link href="/contact" className="btn-primary relative mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-semibold text-white">
                Talk AI with me <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
