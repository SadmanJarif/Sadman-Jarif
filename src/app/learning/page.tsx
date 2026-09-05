import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { LEARNING_TRACKS } from "@/data/site";
import { getCertifications, seoMeta } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/learning", {
    title: "Learning — Sadman Mubassir Jarif",
    description: "Continuous learning across CS, AI, data, business, and communication — what I learned, built, and used.",
  });
}

export default async function LearningPage() {
  const certs = await getCertifications();
  return (
    <main className="relative min-h-screen text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <PageHero
        eyebrow="Learning"
        title="What I learned →"
        highlight="what I built."
        description="Not a certificate wall. Every entry answers three questions: what did I learn, what did I build with it, and how do I use it now?"
        crumbs={[{ label: "Home", href: "/" }, { label: "Learning" }]}
      />

      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
          {LEARNING_TRACKS.map((t, i) => (
            <Reveal key={t.area} delay={(i % 2) * 90}>
              <div className="glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-8">
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.accent}`} />
                <h2 className="font-display text-xl font-bold text-white light:text-slate-900">{t.area}</h2>
                <p className="mt-1 text-[13px] text-slate-300">{t.desc}</p>
                <div className="mt-6 grid gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300 light:text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Completed
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {t.completed.map((c) => (
                        <li key={c} className="text-[13.5px] text-slate-300 light:text-slate-700">✓ {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200 light:text-cyan-800">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> Currently learning
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {t.learning.map((c) => (
                        <li key={c} className="text-[13.5px] font-medium text-white light:text-slate-900">→ {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> Want to learn
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {t.next.map((c) => (
                        <li key={c} className="text-[13.5px] text-slate-300">○ {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {certs && certs.length > 0 && (
        <section className="section-glow relative pb-20 sm:pb-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Certifications"
              title="Completed"
              highlight="programs."
              description="Manage these from the admin console — they update here automatically."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {certs.map((c, i) => (
                <Reveal key={c.title} delay={(i % 4) * 70}>
                  <div className="glass card-hover h-full rounded-2xl p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">{c.org}</p>
                    <h3 className="font-display mt-1 text-[15px] font-bold text-white light:text-slate-900">{c.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-300">{c.note}</p>
                    {c.date && <p className="mt-2 text-[11.5px] font-medium text-slate-200">{c.date}</p>}
                    {c.url && (
                      <Link href={c.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[12px] font-semibold text-cyan-200 hover:text-cyan-200">
                        View credential →
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
