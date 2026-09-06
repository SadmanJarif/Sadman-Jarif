import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getEcaFull, seoMeta } from "@/lib/cms";
import { ArrowRight } from "@/components/Icons";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/eca", {
    title: "ECA & Leadership — Sadman Mubassir Jarif",
    description: "Beyond coding: MUN, volunteering, competitions, leadership, and community — impact and development.",
  });
}

export default async function ECAPage() {
  const ECA_DETAILS = await getEcaFull();
  return (
    <main className="relative min-h-screen text-slate-100 light:text-slate-700">
      <PageHero
        eyebrow="ECA & Leadership"
        title="More than"
        highlight="just code."
        description="Growth happens off the keyboard — in conference halls, volunteer teams, competitions, and communities. Every activity below follows one format: what I did → why I joined → what I learned → what impact I created."
        crumbs={[{ label: "Home", href: "/" }, { label: "ECA & Leadership" }]}
      />

      <section className="relative pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8">
          {ECA_DETAILS.map((a, i) => (
            <Reveal key={a.title} delay={Math.min(i * 70, 200)}>
              <article className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
                <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                  <div>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-600/25 text-2xl text-violet-200">
                      {a.icon}
                    </span>
                    <h2 className="font-display mt-4 text-xl font-bold text-white light:text-slate-900">{a.title}</h2>
                    {[a.org, a.position, a.date].filter(Boolean).length > 0 && (
                      <p className="mt-1.5 text-[12.5px] font-medium text-slate-300">
                        {[a.org, a.position, a.date].filter(Boolean).join(" • ")}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { t: "What I did", d: a.did, c: "text-cyan-200 light:text-cyan-800" },
                      { t: "Why I joined", d: a.why, c: "text-violet-300 light:text-violet-800" },
                      { t: "What I learned", d: a.learned, c: "text-amber-300 light:text-amber-800" },
                      { t: "Impact I created", d: a.impact, c: "text-emerald-300 light:text-emerald-800" },
                    ].map((b) => (
                      <div key={b.t} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 light:border-slate-900/10 light:bg-white light:shadow-sm">
                        <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${b.c}`}>{b.t}</p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300 light:text-slate-700">{b.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={100}>
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-gradient-to-r from-cyan-500/[0.07] via-violet-600/[0.07] to-fuchsia-500/[0.07] p-7 text-center sm:p-9">
              <p className="font-display text-[16px] font-bold text-white sm:text-lg light:text-slate-900">
                Impact • Curiosity • Leadership • Continuous growth
              </p>
              <p className="mx-auto mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate-300 light:text-slate-600">
                The thread connecting everything: starting things, learning fast, and leaving places
                slightly better than I found them.
              </p>
              <Link href="/contact" className="group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-cyan-200 hover:text-cyan-200">
                Want me on your team or program? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
