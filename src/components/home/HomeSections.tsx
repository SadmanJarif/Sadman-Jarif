import Link from "next/link";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Entrepreneurship from "@/components/Entrepreneurship";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Leadership from "@/components/Leadership";
import Vision from "@/components/Vision";
import CurrentFocus from "@/components/CurrentFocus";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CountUp } from "@/components/Bits";
import { ArrowRight } from "@/components/Icons";
import {
  getGoals, getHomepageSections, getPosts, getSettings, getSkills, getSocials, getUpdates,
} from "@/lib/cms";
import { LAB_AREAS } from "@/data/site";

const CURRENTLY = [
  { dot: "bg-cyan-400", title: "Currently learning", text: "AI & Computer Science — DSA, probability, agent patterns." },
  { dot: "bg-violet-400", title: "Building", text: "AI products — Nexus agent, Impact Calculator, StudyFlow." },
  { dot: "bg-amber-400", title: "Exploring", text: "Entrepreneurship — SaaS recipes and one-person business models." },
  { dot: "bg-emerald-400", title: "Open to", text: "Meaningful opportunities — internships, collabs, research." },
];

function Currently() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CURRENTLY.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="glass flex h-full items-start gap-3 rounded-2xl p-4">
                <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                  <span className={`absolute h-full w-full animate-ping rounded-full ${c.dot} opacity-50`} />
                  <span className={`relative h-2.5 w-2.5 rounded-full ${c.dot}`} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">{c.title}</p>
                  <p className="mt-1 text-[13px] font-medium leading-snug text-slate-200 light:text-slate-700">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LabTeaser() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="AI Lab"
          title="Where I"
          highlight="experiment."
          description="A dedicated space for my AI work — agents, automation, chatbots, and research notes. Rawer than the portfolio, on purpose."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAB_AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="glass card-hover h-full rounded-3xl p-6">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${a.accent} text-lg text-white`}>
                  {a.icon}
                </span>
                <h3 className="font-display mt-4 text-[15.5px] font-bold text-white light:text-slate-900">{a.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300 light:text-slate-600">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8 text-center">
            <Link
              href="/ai-lab"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-[14px] font-semibold text-white transition-all hover:border-white/25 hover:bg-white/10 light:border-slate-900/15 light:bg-white light:text-slate-800 light:shadow-sm light:hover:border-slate-900/30"
            >
              Enter the AI Lab
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LearningSnapshot() {
  const stats = [
    { end: 3, suffix: "+", label: "Intl. roles" },
    { end: 6, suffix: "+", label: "Projects shipped" },
    { end: 10, suffix: "+", label: "Courses & programs" },
    { end: 6, suffix: "", label: "Articles & notes" },
  ];
  return (
    <section className="section-glow relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90 light:border-slate-900/10 light:bg-white/80 light:text-cyan-800 light:shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
              Learning in public
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl light:text-slate-900">
              Evidence over <span className="text-gradient-cyan">claims.</span>
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-300 light:text-slate-600">
              Every course ends in something built; every build ends in something written. My{" "}
              <Link href="/learning" className="font-semibold text-cyan-200 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-800">learning page</Link>{" "}
              tracks what I learned → what I built → how I used it. My{" "}
              <Link href="/research" className="font-semibold text-cyan-200 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-800">research notes</Link>{" "}
              hold the technical detail.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/learning" className="btn-primary rounded-full px-6 py-3 text-[13.5px] font-semibold text-white">
                My Learning
              </Link>
              <Link href="/research" className="btn-ghost rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[13.5px] font-semibold text-white">
                Research Notes
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="glass rounded-3xl p-6 text-center sm:p-8">
                  <p className="font-display text-4xl font-extrabold text-white sm:text-5xl light:text-slate-900">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-slate-300">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoalsPreview({ goals }: { goals: { title: string; detail: string }[] }) {
  const list = goals.slice(0, 4);
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Current Goals"
          title="An honest"
          highlight="roadmap."
          description="Not motivation posters — the actual bets I'm placing with my time right now."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="glass card-hover h-full rounded-3xl p-6">
                <span className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-[15.5px] font-bold text-white light:text-slate-900">{g.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300 light:text-slate-600">{g.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8 text-center">
            <Link
              href="/goals"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-cyan-200 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-800"
            >
              See 1-year + long-term goals
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Updates({ updates }: { updates: { date: string; title: string; text: string }[] }) {
  return (
    <section className="section-glow relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Latest Updates"
          title="What's"
          highlight="new."
          description="Small log, updated by hand — the freshest signal on where my energy is going."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {updates.slice(0, 4).map((u, i) => (
            <Reveal key={u.title} delay={i * 80}>
              <div className="glass flex h-full gap-4 rounded-2xl p-5">
                <span className="h-fit shrink-0 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11.5px] font-bold text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800">
                  {u.date}
                </span>
                <div>
                  <h3 className="font-display text-[14.5px] font-bold text-white light:text-slate-900">{u.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-300 light:text-slate-600">{u.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/now" className="btn-ghost rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[13.5px] font-semibold text-white">
              /now — this month in detail
            </Link>
            <Link href="/journey" className="btn-ghost rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[13.5px] font-semibold text-white">
              Full journey timeline
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RecentArticles({ posts }: { posts: { slug: string; title: string; excerpt: string; category: string; date: string; readTime: string }[] }) {
  const latest = posts.slice(0, 3);
  return (
    <section className="relative py-4 sm:py-6">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90 light:border-slate-900/10 light:bg-white/80 light:text-cyan-800 light:shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                Recent Articles
              </span>
              <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl light:text-slate-900">
                Fresh from the <span className="text-gradient-cyan">notebook.</span>
              </h2>
            </div>
            <Link href="/writing" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-cyan-200 hover:text-cyan-200 light:text-cyan-700 light:hover:text-cyan-800">
              All articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link href={`/writing/${p.slug}`} className="glass card-hover block h-full rounded-3xl p-6">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800">
                  {p.category}
                </span>
                <h3 className="font-display mt-3 text-[15.5px] font-bold leading-snug text-white light:text-slate-900">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-300 light:text-slate-600">{p.excerpt}</p>
                <p className="mt-3 text-[12px] font-medium text-slate-300">{p.date} • {p.readTime}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const DEFAULT_ORDER = [
  "currently", "about", "education", "experience", "projects", "lab-teaser",
  "ventures", "skills", "achievements", "leadership", "learning", "vision",
  "focus", "goals", "writing", "recent-articles", "updates", "contact",
];

export default async function HomeSections() {
  const [settings, skills, updates, goals, posts, order, socials] = await Promise.all([
    getSettings(), getSkills(), getUpdates(), getGoals(), getPosts(), getHomepageSections(), getSocials(),
  ]);

  const aboutParas = settings["about_text"]
    ? settings["about_text"].split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : undefined;

  const blocks: Record<string, React.ReactNode> = {
    currently: <Currently />,
    about: <About heading={settings["about_heading"] || undefined} paragraphs={aboutParas} />,
    education: <Education />,
    experience: <Experience />,
    projects: <Projects />,
    "lab-teaser": <LabTeaser />,
    ventures: <Entrepreneurship />,
    skills: <Skills groups={skills} />,
    achievements: <Achievements />,
    leadership: <Leadership />,
    learning: <LearningSnapshot />,
    vision: <Vision />,
    focus: <CurrentFocus />,
    goals: <GoalsPreview goals={goals.current} />,
    writing: <Writing />,
    "recent-articles": <RecentArticles posts={posts} />,
    updates: <Updates updates={updates} />,
    contact: (
      <Contact
        content={{
          headline: settings["contact_headline"],
          text: settings["contact_text"],
          email: socials.email,
          github: socials.github,
          linkedin: socials.linkedin,
        }}
      />
    ),
  };

  return <>{(order ?? DEFAULT_ORDER).map((key) => blocks[key] ?? null)}</>;
}
