import Link from "next/link";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
};

export default function PageHero({ eyebrow, title, highlight, description, crumbs }: Props) {
  return (
    <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-fuchsia-600/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04060d] to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {crumbs && (
          <Reveal>
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-slate-700">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-cyan-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-slate-300">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title} {highlight ? <span className="text-gradient">{highlight}</span> : null}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={180}>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400 sm:text-[17px]">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
