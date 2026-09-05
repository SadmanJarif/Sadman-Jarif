"use client";

import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { RESUME_DATA } from "@/data/site";
import { SOCIALS, SKILLS } from "@/data/portfolio";
import { EXPERIENCE_DETAILS } from "@/data/site";
import { PROJECT_DETAILS } from "@/data/projects";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";

export default function ResumePage() {
  const print = () => window.print();

  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="Resume"
        title="The one-page"
        highlight="story."
        description="A polished online resume — scannable in 30 seconds, detailed if you keep scrolling. Hiring? Collaborating? Start here."
        crumbs={[{ label: "Home", href: "/" }, { label: "Resume" }]}
      />

      <section className="relative pb-8">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <div className="glass flex flex-col items-center justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:p-7">
              <div>
                <p className="font-display text-lg font-bold text-white">Sadman Mubassir Jarif</p>
                <p className="text-[13px] text-slate-400">Developer • Entrepreneur • AI Enthusiast — Bangladesh → Global</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={print} className="btn-primary rounded-full px-6 py-3 text-[13.5px] font-bold text-white">
                  ⬇ Download Resume (PDF)
                </button>
                <a href="/contact" className="btn-ghost rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[13.5px] font-semibold text-white">
                  Contact me
                </a>
              </div>
            </div>
          </Reveal>

          {/* Quick scan */}
          <Reveal delay={80}>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { t: "Education", d: "UoPeople CS (in progress) • Penn Foster 3.87" },
                { t: "Experience", d: "3 international roles across 2025–Present" },
                { t: "Focus", d: "AI agents • Automation • SaaS • EdTech" },
              ].map((c) => (
                <div key={c.t} className="glass rounded-2xl p-5 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">{c.t}</p>
                  <p className="mt-1.5 text-[13px] font-medium text-slate-200">{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Full resume */}
          <div className="mt-6 space-y-5">
            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-400">Profile</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-300">{RESUME_DATA.profile}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[12.5px]">
                  <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-slate-200 hover:text-white">
                    <GithubIcon className="h-3.5 w-3.5" /> GitHub
                  </a>
                  <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-slate-200 hover:text-white">
                    <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                  <a href={SOCIALS.email} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-slate-200 hover:text-white">
                    <MailIcon className="h-3.5 w-3.5" /> Email
                  </a>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-400">Education</h2>
                <ul className="mt-3 space-y-2.5">
                  {RESUME_DATA.education.map((e) => (
                    <li key={e.s} className="text-[13.5px] text-slate-300">
                      <span className="font-bold text-white">{e.s}:</span> {e.d}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-400">Experience</h2>
                <ul className="mt-3 space-y-3">
                  {EXPERIENCE_DETAILS.map((e) => (
                    <li key={e.org} className="text-[13.5px] leading-relaxed text-slate-300">
                      <span className="font-bold text-white">{e.role} — {e.org}</span>
                      <span className="text-slate-500"> ({e.time}, {e.place})</span>
                      <br />{e.summary}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-400">Projects</h2>
                <ul className="mt-3 space-y-2">
                  {PROJECT_DETAILS.map((p) => (
                    <li key={p.slug} className="text-[13.5px] text-slate-300">
                      <span className="font-bold text-white">{p.title}</span>
                      <span className="text-slate-500"> [{p.status}]</span> — {p.description}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-400">Skills</h2>
                <div className="mt-3 space-y-2">
                  {SKILLS.map((s) => (
                    <p key={s.category} className="text-[13px] text-slate-300">
                      <span className="font-bold text-white">{s.category}:</span> {s.items.join(" • ")}
                    </p>
                  ))}
                </div>
                <p className="mt-3 text-[13px] text-slate-300">
                  <span className="font-bold text-white">Languages:</span> {RESUME_DATA.languages}
                </p>
              </section>
            </Reveal>
          </div>

          <p className="mt-6 pb-16 text-center text-[12.5px] text-slate-600">
            Tip: “Download Resume” opens your print dialog — choose “Save as PDF” for a clean file.
          </p>
        </div>
      </section>
    </main>
  );
}
