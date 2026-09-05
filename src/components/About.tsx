import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./Icons";

const TRAITS = [
  { title: "Builder first", text: "I learn by shipping — prototypes, internships, real client work." },
  { title: "AI-obsessed", text: "Agents, automation and LLM apps are where I go deepest." },
  { title: "Business-minded", text: "I think about users, distribution and sustainability, not just code." },
  { title: "Globally ambitious", text: "Studying internationally, working remotely, aiming worldwide." },
];

const JOURNEY = ["Web Dev", "Flutter", "WordPress", "Marketing", "AI Systems", "CS Theory", "Startups"];

export default function About({
  heading,
  paragraphs,
}: {
  heading?: string;
  paragraphs?: string[];
}) {
  const [headStart, ...headRest] = (heading ?? "Ambitious, but human.").split(",");
  const paras =
    paragraphs ??
    [
      "I'm Sadman — a self-motivated developer and entrepreneur from Bangladesh.",
      "I started by exploring everything that caught my eye — web development, Flutter, WordPress, digital marketing, AI systems, software development. I said yes to a lot of things, built a lot of imperfect things, and learned what actually stuck.",
      "Over time my interests sharpened around AI, computer science and entrepreneurship. Today I'm continuously learning, experimenting, building projects, gaining professional experience — and looking for opportunities where I can create meaningful impact.",
      "I don't have everything figured out. But I show up, I ship, and I keep raising the bar.",
    ];
  return (
    <section id="about" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About Me"
          title={headStart}
          highlight={headRest.join(",").trim() || undefined}
          description="Not a finished expert — a fast-moving builder figuring things out in public and getting a little better with every project."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="glass card-hover relative h-full overflow-hidden rounded-3xl p-7 sm:p-9">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/15 blur-[80px]" />
              {paras.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-lg font-bold text-white sm:text-xl light:text-slate-900"
                      : "mt-4 text-[14.5px] leading-relaxed text-slate-400 light:text-slate-600"
                  }
                >
                  {p}
                </p>
              ))}

              <div className="mt-6 flex flex-wrap gap-2">
                {JOURNEY.map((j) => (
                  <span
                    key={j}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-medium text-slate-300 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm"
                  >
                    {j}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {TRAITS.map((t, i) => (
              <Reveal key={t.title} delay={i * 90}>
                <div className="glass card-hover h-full rounded-3xl p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-600/25 text-cyan-300 light:text-cyan-700">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display mt-4 text-[15px] font-bold text-white light:text-slate-900">{t.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400 light:text-slate-600">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
