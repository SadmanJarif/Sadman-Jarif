import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

const PILLARS = [
  {
    title: "AI Agents",
    text: "Assistants that don't just chat — they do work: research, outreach, ops, support.",
    icon: "◆",
  },
  {
    title: "AI Automation",
    text: "Removing repetitive hours from small businesses with smart workflows.",
    icon: "⬢",
  },
  {
    title: "SaaS",
    text: "Small, focused software people pay for because it saves time or makes money.",
    icon: "⬣",
  },
  {
    title: "One-Person Businesses",
    text: "Lean companies run by a founder plus AI — my favorite model to explore.",
    icon: "⬔",
  },
];

export default function Entrepreneurship() {
  return (
    <section id="ventures" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#0b1024] via-[#0d0a24] to-[#160b24] p-8 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
              <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[100px]" />
              <div className="dot-bg absolute inset-0 opacity-30" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]" />
                  Entrepreneurship
                </span>
                <h2 className="font-display mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
                  I don&apos;t just want a job.{" "}
                  <span className="text-gradient">I want to build companies.</span>
                </h2>
                <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-slate-300/90 sm:text-[15.5px]">
                  I&apos;m interested in building software companies and AI products — especially
                  solutions that help businesses and individuals{" "}
                  <span className="font-semibold text-white">automate work, operate efficiently and
                  build digital businesses</span>. Small teams, real revenue, global reach.
                </p>
                <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-slate-400">
                  Visionary? Maybe a little. But grounded: start with useful automations, charge for
                  outcomes, reinvest into bigger products.
                </p>
                <a
                  href="#contact"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-[14px] font-semibold text-white backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10"
                >
                  Talk startups with me
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {PILLARS.map((p, i) => (
                  <Reveal key={p.title} delay={i * 90}>
                    <div className="h-full rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/25 hover:bg-black/45">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-600/30 text-lg text-cyan-200">
                        {p.icon}
                      </span>
                      <h3 className="font-display mt-3.5 text-[15px] font-bold text-white">{p.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
