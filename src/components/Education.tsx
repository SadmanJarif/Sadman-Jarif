import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FORMAL = [
  {
    school: "Penn Foster",
    degree: "High School Diploma",
    meta: "GPA 3.87 • 2026",
    tag: "Completed",
    accent: "from-emerald-400 to-teal-500",
    text: "Built strong self-study discipline through an independent, US-based diploma program — finishing with distinction.",
  },
  {
    school: "University of the People",
    degree: "Associate of Science in Computer Science",
    meta: "Currently pursuing",
    tag: "In Progress",
    accent: "from-cyan-400 to-blue-500",
    text: "Deepening foundations in programming, systems and theory while building real projects alongside coursework.",
  },
];

const PROGRAMS = [
  "Harvard",
  "University of Tokyo",
  "Stanford",
  "Wharton",
  "Santa Clara University",
  "Open University",
  "PMI",
  "Google & Industry Platforms",
];

export default function Education() {
  return (
    <section id="education" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Learning as"
          highlight="a lifestyle."
          description="Formal degrees give me structure. Independent programs give me range. Building gives me depth."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {FORMAL.map((e, i) => (
            <Reveal key={e.school} delay={i * 100}>
              <div className="glass card-hover relative h-full overflow-hidden rounded-3xl p-7 sm:p-8">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${e.accent}`} />
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      e.tag === "Completed"
                        ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                        : "border border-cyan-400/25 bg-cyan-400/10 text-cyan-200"
                    }`}
                  >
                    {e.tag}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-xl font-bold text-white sm:text-2xl">{e.school}</h3>
                <p className="mt-1 text-[14px] font-semibold text-cyan-200/90">{e.degree}</p>
                <p className="mt-1 text-[13px] font-medium text-slate-500">{e.meta}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-slate-400">{e.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7 sm:p-9">
            <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-[80px]" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-[80px]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  Beyond the classroom
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-400">
                  I&apos;ve completed learning programs and coursework from world-class institutions
                  — not to collect certificates, but to think better and build better.
                </p>
              </div>
              <div className="flex max-w-xl flex-1 flex-wrap gap-2">
                {PROGRAMS.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/10 bg-[#0a0f1e]/70 px-4 py-2 text-[12.5px] font-medium text-slate-200 backdrop-blur-md transition-colors hover:border-cyan-400/30 hover:text-white"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
