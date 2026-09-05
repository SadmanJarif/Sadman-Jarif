import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About — Sadman Mubassir Jarif",
  description: "The deeper story: a young builder from Bangladesh working toward a global career in AI, computer science, and entrepreneurship.",
};

const DRIVES = [
  { title: "Curiosity", text: "I take things apart to see how they work — code, businesses, ideas. The question 'why is it like this?' has driven every skill I have." },
  { title: "Problem solving", text: "Abstract exercises bore me. Real problems with real users focus me like nothing else." },
  { title: "Independence", text: "I want the ability to choose my problems. Financial independence and ownership aren't luxuries — they're the goal structure." },
  { title: "Usefulness", text: "If nobody uses it, it doesn't count yet. I measure work by outcomes, not effort." },
];

const STRENGTHS = ["Curiosity", "Self-learning", "Persistence", "Entrepreneurial mindset", "Adaptability", "Willingness to experiment", "Global ambition"];

const INTERESTS = ["Artificial Intelligence", "Computer Science", "Startups", "Business", "Data", "Technology", "Education", "Global opportunities", "Writing", "Productivity", "Digital products"];

const PHILOSOPHY = [
  { step: "Learn", text: "Courses, docs, papers, mentors — absorb aggressively and take notes." },
  { step: "Build", text: "Turn every concept into something shippable, however small." },
  { step: "Experiment", text: "Test in public with real users. Let reality grade the work." },
  { step: "Improve", text: "Keep the confusion log. Fix the pattern, not just the bug." },
  { step: "Share", text: "Write it up so others learn faster — and so I understand it deeper." },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="About Me"
        title="A builder from Bangladesh,"
        highlight="aiming global."
        description="Not a success story — a progress story. Here's how I got here, what keeps me going, and what I believe about learning and building."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* My Story */}
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="glass h-full rounded-3xl p-7 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">My Story</p>
              <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">How curiosity became a career plan</h2>
              <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-slate-400">
                <p>
                  I grew up in Bangladesh with an ordinary education and an extraordinary internet connection.
                  While school taught me the syllabus, the internet taught me something bigger: that a kid
                  anywhere could learn anything — web development, app building, marketing, AI — for free.
                </p>
                <p>
                  So I explored. Web development first, then Flutter, then WordPress client work, then digital
                  marketing. Each detour looked scattered from the outside. From the inside, it was research:
                  I was finding out what kind of problems I actually enjoy solving.
                </p>
                <p>
                  The answer turned out to be AI and computer science — with entrepreneurship as the vehicle.
                  Internships and externships in 2025 (Beats By Dre, Africa ICT Right, Connect For Purpose)
                  gave me professional reps. Harvard&apos;s CS50x gave me rigor. University of the People gave
                  me structure. And every project since has sharpened the same thesis:{" "}
                  <span className="font-semibold text-slate-200">
                    learn deeply, build usefully, share openly.
                  </span>
                </p>
                <p>
                  I&apos;m still early. But I&apos;m deliberate now — CS degree, AI focus, products with users,
                  writing in public — and the trajectory is the point.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-4">
              <div className="gradient-border rounded-3xl p-7">
                <p className="font-display text-lg font-bold text-white">The short version</p>
                <ul className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-slate-300">
                  <li><span className="font-bold text-cyan-300">Where:</span> Bangladesh → remote world → global ambitions</li>
                  <li><span className="font-bold text-cyan-300">Studying:</span> CS @ University of the People</li>
                  <li><span className="font-bold text-cyan-300">Building:</span> AI agents, automation, web & mobile apps</li>
                  <li><span className="font-bold text-cyan-300">Exploring:</span> SaaS, one-person businesses, EdTech</li>
                  <li><span className="font-bold text-cyan-300">Open to:</span> internships, collabs, research, ventures</li>
                </ul>
              </div>
              <div className="glass rounded-3xl p-7">
                <p className="font-display text-lg font-bold text-white">My strengths</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STRENGTHS.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[12.5px] font-medium text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What drives me */}
      <section className="section-glow relative py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">What drives me</p>
            <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">Four engines, running daily</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DRIVES.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="glass card-hover h-full rounded-3xl p-6">
                  <span className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-violet-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-2 text-[16px] font-bold text-white">{d.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">What I believe</p>
            <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">Learn → Build → Experiment → Improve → Share</h2>
            <p className="mt-3 text-[14px] text-slate-400">A loop, not a ladder. I run it on everything — courses, products, even this website.</p>
          </Reveal>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-3">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.step} delay={i * 70}>
                <div className="glass flex items-start gap-5 rounded-2xl p-5 sm:items-center sm:p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-600/30 font-display text-[15px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-bold text-white">{p.step}</h3>
                    <p className="mt-0.5 text-[13.5px] text-slate-400">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="section-glow relative py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Personal interests</p>
            <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl">What I enjoy exploring</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {INTERESTS.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-slate-200 transition-colors hover:border-cyan-400/30 hover:text-white">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/journey" className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-semibold text-white">
                See my journey <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-ghost inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[14px] font-semibold text-white">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
