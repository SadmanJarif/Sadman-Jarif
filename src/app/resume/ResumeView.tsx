"use client";

import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";

export type ResumeData = {
  name: string;
  tagline: string;
  profile: string;
  socials: { github: string; linkedin: string; email: string };
  education: { s: string; d: string }[];
  experience: { org: string; role: string; time: string; place: string; summary: string }[];
  projects: { slug: string; title: string; status: string; description: string }[];
  skills: { category: string; items: string[] }[];
  languages: string;
};

export default function ResumeView({ data }: { data: ResumeData }) {
  const print = () => window.print();

  return (
    <main className="relative min-h-screen text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
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
                <p className="font-display text-lg font-bold text-white light:text-slate-900">data.name</p>
                <p className="text-[13px] text-slate-300 light:text-slate-500">{data.tagline}</p>
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200">{c.t}</p>
                  <p className="mt-1.5 text-[13px] font-medium text-slate-200 light:text-slate-700">{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Full resume */}
          <div className="mt-6 space-y-5">
            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-300 light:text-slate-500">Profile</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-300 light:text-slate-700">{data.profile}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[12.5px]">
                  <a href={data.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-slate-200 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900">
                    <GithubIcon className="h-3.5 w-3.5" /> GitHub
                  </a>
                  <a href={data.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-slate-200 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900">
                    <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                  <a href={data.socials.email} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-medium text-slate-200 hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900">
                    <MailIcon className="h-3.5 w-3.5" /> Email
                  </a>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-300 light:text-slate-500">Education</h2>
                <ul className="mt-3 space-y-2.5">
                  {data.education.map((e) => (
                    <li key={e.s} className="text-[13.5px] text-slate-300 light:text-slate-700">
                      <span className="font-bold text-white light:text-slate-900">{e.s}:</span> {e.d}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-300 light:text-slate-500">Experience</h2>
                <ul className="mt-3 space-y-3">
                  {data.experience.map((e) => (
                    <li key={e.org} className="text-[13.5px] leading-relaxed text-slate-300 light:text-slate-700">
                      <span className="font-bold text-white light:text-slate-900">{e.role} — {e.org}</span>
                      <span className="text-slate-300"> ({e.time}, {e.place})</span>
                      <br />{e.summary}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-300 light:text-slate-500">Projects</h2>
                <ul className="mt-3 space-y-2">
                  {data.projects.map((p) => (
                    <li key={p.slug} className="text-[13.5px] text-slate-300 light:text-slate-700">
                      <span className="font-bold text-white light:text-slate-900">{p.title}</span>
                      <span className="text-slate-300"> [{p.status}]</span> — {p.description}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-3xl p-7">
                <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-slate-300 light:text-slate-500">Skills</h2>
                <div className="mt-3 space-y-2">
                  {data.skills.map((s) => (
                    <p key={s.category} className="text-[13px] text-slate-300 light:text-slate-700">
                      <span className="font-bold text-white light:text-slate-900">{s.category}:</span> {s.items.join(" • ")}
                    </p>
                  ))}
                </div>
                <p className="mt-3 text-[13px] text-slate-300 light:text-slate-700">
                  <span className="font-bold text-white light:text-slate-900">Languages:</span> {data.languages}
                </p>
              </section>
            </Reveal>
          </div>

          <p className="mt-6 pb-16 text-center text-[12.5px] text-slate-200">
            Tip: “Download Resume” opens your print dialog — choose “Save as PDF” for a clean file.
          </p>
        </div>
      </section>
    </main>
  );
}
