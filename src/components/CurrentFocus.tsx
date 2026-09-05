import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FOCUS = [
  {
    title: "AI & Computer Science",
    text: "Building stronger foundations and real-world projects.",
    detail: "DSA • LLM apps • Agents",
    accent: "from-cyan-400 to-sky-500",
    icon: "◆",
  },
  {
    title: "Education",
    text: "Excelling at University of the People and preparing for future international opportunities.",
    detail: "GPA focus • Transfer prep",
    accent: "from-violet-400 to-purple-500",
    icon: "⬢",
  },
  {
    title: "Global Opportunities",
    text: "Preparing for scholarships, universities, internships, competitions, and international programs.",
    detail: "Applications • Networking",
    accent: "from-emerald-400 to-teal-500",
    icon: "◎",
  },
  {
    title: "Entrepreneurship",
    text: "Building AI products and exploring scalable technology businesses.",
    detail: "SaaS • Automation",
    accent: "from-amber-400 to-orange-500",
    icon: "⬣",
  },
];

export default function CurrentFocus() {
  return (
    <section id="focus" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Current Focus"
          title="What I'm working"
          highlight="toward now."
          description="Four bets I'm actively placing with my time in 2026."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="glass card-hover relative h-full overflow-hidden rounded-3xl p-6">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.accent}`} />
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.06] text-lg text-white">
                  {f.icon}
                </span>
                <h3 className="font-display mt-4 text-[15.5px] font-bold leading-snug text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{f.text}</p>
                <p className={`mt-4 inline-block rounded-full bg-gradient-to-r ${f.accent} bg-clip-text text-[12px] font-bold uppercase tracking-wider text-transparent`}>
                  {f.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
