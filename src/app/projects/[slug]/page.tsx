import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CopyLink } from "@/components/Bits";
import { getProject, PROJECT_DETAILS, getProject as _get } from "@/data/projects";
import { GithubIcon, ArrowUpRight, CheckIcon } from "@/components/Icons";

export function generateStaticParams() {
  return PROJECT_DETAILS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} — Sadman Mubassir Jarif`,
    description: p.description,
  };
}

const STATUS_STYLES: Record<string, string> = {
  Featured: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  "In Development": "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
  Completed: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Experiment: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200",
};

function Block({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div id={id} className="group scroll-mt-32">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-lg font-bold text-white sm:text-xl">{label}</h2>
        <CopyLink slug={id} />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = _get(slug);
  if (!p) notFound();

  const others = PROJECT_DETAILS.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-60`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-[#04060d]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
              <Link href="/" className="transition-colors hover:text-cyan-300">Home</Link>
              <span className="text-slate-700">/</span>
              <Link href="/projects" className="transition-colors hover:text-cyan-300">Projects</Link>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300">{p.title}</span>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${STATUS_STYLES[p.status]}`}>
                {p.status}
              </span>
              {p.categories.map((c) => (
                <span key={c} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-slate-300">
                  {c}
                </span>
              ))}
              <span className="text-[12px] font-medium text-slate-500">{p.year}</span>
            </div>
            <h1 className="font-display mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {p.title}
            </h1>
            <p className="mt-3 text-[16px] font-medium text-cyan-200/80 sm:text-lg">{p.tagline}</p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-semibold text-white">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-[13.5px] font-semibold text-white">
                Live Project <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mockup banner */}
      <section className="relative py-6">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${p.gradient} p-8 sm:p-12`}>
              <div className="dot-bg absolute inset-0 opacity-50" />
              <div className="relative flex items-center gap-5">
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-black/40 text-4xl text-white backdrop-blur-md">
                  {p.icon}
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-white sm:text-2xl">{p.title}</p>
                  <p className="mt-1 max-w-md text-[13.5px] text-slate-200/80">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md bg-black/40 px-2.5 py-1 text-[11.5px] font-medium text-slate-200 backdrop-blur-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_280px]">
          <div className="max-w-3xl space-y-10">
            <Reveal>
              <Block id="overview" label="Project overview">
                <p className="text-[14.5px] leading-relaxed text-slate-300">{p.overview}</p>
              </Block>
            </Reveal>
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { t: "Problem", d: p.problem },
                  { t: "Idea", d: p.idea },
                  { t: "Solution", d: p.solution },
                ].map((b) => (
                  <div key={b.t} className="glass rounded-2xl p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">{b.t}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{b.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <Block id="role" label="My role">
                <p className="text-[14px] leading-relaxed text-slate-300">{p.role}</p>
              </Block>
            </Reveal>
            <Reveal>
              <Block id="features" label="Main features">
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-slate-300">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-300">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>
            </Reveal>
            <Reveal>
              <Block id="challenges" label="Challenges">
                <p className="text-[14px] leading-relaxed text-slate-300">{p.challenges}</p>
              </Block>
            </Reveal>
            <Reveal>
              <Block id="learned" label="What I learned">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-5">
                  <p className="text-[14px] leading-relaxed text-slate-200">{p.learned}</p>
                </div>
              </Block>
            </Reveal>
            <Reveal>
              <Block id="future" label="Future improvements">
                <ul className="list-disc space-y-1.5 pl-5 text-[13.5px] text-slate-300">
                  {p.future.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Block>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="glass rounded-2xl p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">On this page</p>
                <div className="mt-3 grid gap-1.5 text-[13px] font-medium">
                  {[["overview", "Overview"], ["role", "My role"], ["features", "Features"], ["challenges", "Challenges"], ["learned", "What I learned"], ["future", "Future"]].map(([id, label]) => (
                    <a key={id} href={`#${id}`} className="rounded-lg px-3 py-1.5 text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="glass rounded-2xl p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-medium text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Keep exploring</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 80}>
                <Link href={`/projects/${o.slug}`} className={`glass card-hover flex items-center gap-4 rounded-2xl bg-gradient-to-br ${o.gradient} p-5`}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-xl text-white">
                    {o.icon}
                  </span>
                  <span>
                    <span className="font-display block text-[15px] font-bold text-white">{o.title}</span>
                    <span className="mt-0.5 block text-[12.5px] text-slate-300">{o.tagline}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
