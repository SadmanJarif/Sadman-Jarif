import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WRITING } from "@/data/portfolio";
import { ArrowRight } from "./Icons";

export default function Writing() {
  return (
    <section id="writing" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Writing / Insights"
          title="Thinking"
          highlight="in public."
          description="AI articles, dev lessons, entrepreneurship notes, education journey — a space designed to grow with me."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {WRITING.map((w, i) => (
            <Reveal key={w.title} delay={i * 100} className="h-full">
              <a href={`/writing/${w.slug}`} className="block h-full">
              <article className="glass card-hover group flex h-full cursor-pointer flex-col rounded-3xl p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-200">
                    {w.tag}
                  </span>
                  <span className="text-[11.5px] font-medium text-slate-500">{w.date}</span>
                </div>
                <h3 className="font-display mt-4 text-[17px] font-bold leading-snug text-white transition-colors group-hover:text-cyan-100">
                  {w.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-400">{w.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[12.5px]">
                  <span className="font-medium text-slate-500">{w.readTime}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 transition-all group-hover:gap-2.5">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["AI articles", "Dev lessons", "Research", "Career", "Startups", "EdTech", "Opinions"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[12px] font-medium text-slate-400"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
