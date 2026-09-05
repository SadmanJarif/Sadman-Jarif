import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getIdeas, getBuildLog, seoMeta } from "@/lib/cms";
import { ArrowRight } from "@/components/Icons";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/ventures", {
    title: "Entrepreneurship — Sadman Mubassir Jarif",
    description: "Startup ideas, AI businesses, SaaS, one-person businesses — and building in public.",
  });
}

const FOCUS = ["AI agents", "AI automation", "SaaS", "One-person businesses", "Digital products", "Automation services", "Product thinking", "Market research"];

export default async function VenturesPage() {
  const [VENTURE_IDEAS, BUILD_LOG] = await Promise.all([getIdeas(), getBuildLog()]);
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <PageHero
        eyebrow="Entrepreneurship"
        title="I don't just want a job."
        highlight="I want to build companies."
        description="The goal isn't only to become a great developer — it's to build products and businesses: software companies and AI products that help people automate work, operate efficiently, and build digital businesses."
        crumbs={[{ label: "Home", href: "/" }, { label: "Entrepreneurship" }]}
      />

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span key={f} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12.5px] font-medium text-slate-200 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-12">
            <SectionHeading
              eyebrow="Ideas I'm exploring"
              title="Open bets,"
              highlight="honestly labeled."
              description="New ideas get added here as they emerge. Stage labels keep me honest about what's real versus what's a sketch."
              align="left"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {VENTURE_IDEAS.map((v, i) => (
                <Reveal key={v.title} delay={(i % 2) * 90}>
                  <div className="glass card-hover h-full rounded-3xl p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-200 light:text-amber-800">{v.area}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-slate-300 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm">
                        {v.stage}
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-lg font-bold text-white light:text-slate-900">{v.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400 light:text-slate-600">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-glow relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Build in public"
            title="Progress,"
            highlight="not promises."
            description="What I'm building, experiments I'm running, lessons learned — a running log instead of a highlight reel."
            align="left"
          />
          <div className="relative mx-auto mt-8 max-w-3xl">
            <div className="absolute bottom-8 left-[13px] top-8 w-px bg-gradient-to-b from-amber-400/50 via-orange-500/30 to-transparent" />
            <div className="grid gap-4">
              {BUILD_LOG.map((b, i) => (
                <Reveal key={b.date + b.text.slice(0, 12)} delay={i * 70}>
                  <div className="glass relative ml-0 rounded-2xl p-5 pl-12">
                    <span className="absolute left-[7px] top-6 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                    <span className="text-[11.5px] font-bold uppercase tracking-widest text-amber-200 light:text-amber-800">{b.date}</span>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-300 light:text-slate-700">{b.text}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={100}>
                <div className="rounded-2xl border border-dashed border-white/15 p-5 pl-12 text-[13px] text-slate-500">
                  Next entry ships when the work does. That&apos;s the deal.
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={120}>
            <div className="mt-10 text-center">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-[14px] font-semibold text-white transition-all hover:border-white/25 hover:bg-white/10 light:border-slate-900/15 light:bg-white light:text-slate-800 light:shadow-sm light:hover:border-slate-900/30">
                Talk startups with me <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
