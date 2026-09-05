import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PROJECTS } from "@/data/portfolio";
import { ArrowUpRight, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've"
          highlight="actually built."
          description="No tutorial clones. Every card below is a real problem I tried to solve — with AI, the web, or mobile."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0f1e]/80 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/25 hover:shadow-[0_28px_70px_-20px_rgba(34,211,238,0.25),0_16px_50px_-16px_rgba(139,92,246,0.3)]">
                <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                  <div className="dot-bg absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-xl text-white backdrop-blur-md">
                    {p.icon}
                  </span>
                  <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md">
                    {p.status}
                  </span>
                  <span className="absolute bottom-3 left-5 rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-200 backdrop-blur-md">
                    {p.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-cyan-100">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-medium text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
                    <a
                      href={`/projects/${p.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/[0.06] px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-gradient-to-r hover:from-cyan-500 hover:to-violet-600"
                    >
                      Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="inline-flex h-[42px] w-[46px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:border-white/25 hover:text-white"
                    >
                      <GithubIcon className="h-[18px] w-[18px]" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[13.5px] text-slate-500">
            More experiments, prototypes and client builds live on GitHub — this grid only shows the
            highlights.{" "}
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Explore all →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
