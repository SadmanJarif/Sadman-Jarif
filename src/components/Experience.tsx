import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { getExperience } from "@/lib/cms";

const FALLBACK_ROLES = [
  {
    role: "Web & AI Developer",
    org: "Connect For Purpose",
    place: "United States • Remote",
    time: "2025 — Present",
    current: true,
    points: ["Impact Calculator", "AI Events Manager", "Technology projects for social good"],
    text: "Contributing to technology projects including an Impact Calculator and AI Events Manager — turning nonprofit ideas into working software.",
  },
  {
    role: "Web Developer Intern",
    org: "Africa ICT Right",
    place: "Ghana • Remote",
    time: "2025",
    current: false,
    points: ["Website redesign", "AI chatbot development", "Workflow improvements"],
    text: "Worked on website development and redesign, AI chatbot development, and workflow improvements for an education-focused nonprofit.",
  },
  {
    role: "Consumer Behavior & Market Analysis Extern",
    org: "Beats By Dre",
    place: "United States • Remote",
    time: "2025",
    current: false,
    points: ["Consumer analytics", "Competitor research", "Executive reporting"],
    text: "Worked on consumer analytics, competitor research, market analysis, and executive reporting — learning how great brands think.",
  },
];

const ACCENTS = ["from-cyan-400 to-blue-500", "from-violet-400 to-purple-500", "from-fuchsia-400 to-pink-500", "from-emerald-400 to-teal-500"];

export default async function Experience() {
  const rows = await getExperience();
  const ROLES = rows.map((r) => ({
    role: r.role,
    org: r.org,
    place: r.place,
    time: r.time,
    current: r.current,
    points: r.tech.slice(0, 3),
    text: r.summary,
  }));
  const list = ROLES.length > 0 ? ROLES : FALLBACK_ROLES;
  return (
    <section id="experience" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Real work,"
          highlight="real responsibility."
          description="Three international remote roles before most people finish their first degree — each one taught me something different."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-cyan-400/50 via-violet-500/40 to-transparent sm:left-[21px]" />
          <div className="grid gap-5">
            {list.map((r, i) => (
              <Reveal key={r.org} delay={i * 100}>
                <article className="glass card-hover relative ml-0 rounded-3xl p-6 pl-14 sm:p-7 sm:pl-16">
                  <span
                    className={`absolute left-[11px] top-7 flex h-4 w-4 items-center justify-center sm:left-[13px] sm:h-[18px] sm:w-[18px]`}
                  >
                    <span className={`absolute h-full w-full rounded-full bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} opacity-90`} />
                    <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400/30" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {r.current && (
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest text-emerald-200">
                        Current
                      </span>
                    )}
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-500">
                      {r.time} • {r.place}
                    </span>
                  </div>
                  <h3 className="font-display mt-2.5 text-lg font-bold leading-snug text-white sm:text-xl light:text-slate-900">
                    {r.role} <span className="text-slate-500">—</span>{" "}
                    <span className="text-gradient-cyan">{r.org}</span>
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slate-400 light:text-slate-600">{r.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.points.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-slate-300 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={100}>
              <div className="ml-0 rounded-3xl border border-dashed border-white/15 bg-white/[0.015] p-6 pl-14 sm:pl-16">
                <p className="font-display text-[15px] font-bold text-slate-300 light:text-slate-700">
                  Next chapter — loading…
                </p>
                <p className="mt-1 text-[13.5px] text-slate-500">
                  Actively seeking internships, collaborations and AI/software opportunities for 2026 and beyond.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
