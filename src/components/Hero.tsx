"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import SilkBackground from "./SilkBackground";
import { ArrowRight, LocationIcon, SparkIcon } from "./Icons";

const TYPING_WORDS = ["AI Agents", "SaaS Products", "Web Apps", "Chatbots", "EdTech"];

function useTyping() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[index % TYPING_WORDS.length];
    const speed = deleting ? 42 : 88;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % TYPING_WORDS.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, index, deleting]);

  return text;
}

export type HeroContent = {
  badge: string;
  name: string;
  roles: string;
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  description: React.ReactNode;
  location: string;
};

const DEFAULT_CONTENT: HeroContent = {
  badge: "CS @ University of the People • Building AI products",
  name: "Sadman Mubassir Jarif",
  roles: "Developer • Entrepreneur • AI Enthusiast",
  l1: "Building with AI.",
  l2: "Creating with",
  l3: "Technology.",
  l4: "Thinking Beyond Today.",
  description: (
    <>
      I&apos;m passionate about building{" "}
      <span className="font-semibold text-slate-200">AI-powered products</span>, software,
      digital experiences and businesses that{" "}
      <span className="font-semibold text-slate-200">solve real problems</span> — from
      intelligent agents to tools people use every day.
    </>
  ),
  location: "Building for a global future",
};

export default function Hero({ content: override }: { content?: Partial<HeroContent> }) {
  const content = { ...DEFAULT_CONTENT, ...Object.fromEntries(Object.entries(override ?? {}).filter(([, v]) => v !== undefined && v !== "")) };
  const typed = useTyping();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      {/* Background: Silk WebGL shader (dark) / soft gradient orbs (light) */}
      <div className="pointer-events-none absolute inset-0">
        <SilkBackground className="light:hidden" />
        <div className="absolute inset-0 hidden light:block">
          <div className="grid-bg absolute inset-0" />
          <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-600/25 to-fuchsia-600/20 blur-[120px] light:from-cyan-300/30 light:via-indigo-300/30 light:to-fuchsia-300/25" />
          <div className="animate-float-slow absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cyan-500/[0.12] blur-[100px]" />
          <div className="animate-float absolute -right-32 top-24 h-96 w-96 rounded-full bg-violet-600/[0.16] blur-[100px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#04060d] to-transparent light:from-[#f3f5fa]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left */}
        <div>
          <Reveal>
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-1.5 pr-4 backdrop-blur-md light:border-slate-900/10 light:bg-white/80 light:shadow-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <SparkIcon className="h-3 w-3" /> New
              </span>
              <span className="text-[12.5px] font-medium text-slate-300 light:text-slate-600">
                {content.badge}
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-display mt-7 text-[15px] font-semibold tracking-wide text-cyan-300 sm:text-base light:text-cyan-700">
              {content.name}
            </p>
            <p className="mt-1 text-[12.5px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {content.roles}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <h1 className="font-display mt-5 text-[clamp(2.05rem,8vw,2.6rem)] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.35rem]">
              <span className="text-white light:text-slate-900">{content.l1}</span>
              <br />
              <span className="text-gradient">{content.l2}</span>
              <br />
              <span className="text-white light:text-slate-900">{content.l3}</span>
              <br />
              <span className="text-[0.62em] font-bold text-slate-400 light:text-slate-500">
                {content.l4.split(" ").slice(0, 1).join(" ")}{" "}
                <span className="text-gradient-cyan">
                  {content.l4.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-[17px] light:text-slate-600">
              {content.description}
            </p>
            <p className="mt-3 flex min-h-[28px] items-center text-[15px] font-medium text-slate-300 light:text-slate-600">
              <span className="mr-2 text-slate-500">Currently building</span>
              <span className="typing-caret font-display font-bold text-cyan-300 light:text-cyan-700">{typed}</span>
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/projects"
                className="btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14.5px] font-semibold text-white"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="/contact"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur-md"
              >
                Get In Touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <LocationIcon className="h-4 w-4 text-cyan-400" />
                Based in Bangladesh
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 light:text-slate-700">{content.location}</span>
              </span>
            </div>
            <div className="mt-6 grid max-w-lg grid-cols-3 gap-3">
              {[
                { n: "3+", l: "Intl. Roles" },
                { n: "6+", l: "AI & Web Builds" },
                { n: "10+", l: "Courses & Programs" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-3.5 text-center backdrop-blur-md light:border-slate-900/10 light:bg-white light:shadow-sm"
                >
                  <div className="font-display text-xl font-extrabold text-white sm:text-2xl light:text-slate-900">{s.n}</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right visual */}
        <Reveal delay={300} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/15 via-violet-600/15 to-fuchsia-500/10 blur-2xl" />
            {/* Main card */}
            <div className="gradient-border relative overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-7">
              <div className="dot-bg absolute inset-0 opacity-40" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.08] light:text-cyan-800">
                    ● live
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-xl font-extrabold text-white shadow-lg">
                      SJ
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0a0f1e] bg-emerald-400 text-[10px] text-emerald-950">
                      ✓
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-[16px] font-bold text-white light:text-slate-900">Sadman M. Jarif</p>
                    <p className="text-[12.5px] text-slate-400 light:text-slate-500">AI / Software Engineer in progress</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/40 p-4 font-mono text-[12px] leading-relaxed">
                  <p className="text-slate-500">{"// mission.ts"}</p>
                  <p className="mt-1.5">
                    <span className="text-fuchsia-400">const</span>{" "}
                    <span className="text-cyan-300">mission</span>{" "}
                    <span className="text-slate-500">=</span>{" "}
                    <span className="text-emerald-300">&quot;CS + AI + Entrepreneurship&quot;</span>;
                  </p>
                  <p>
                    <span className="text-fuchsia-400">const</span>{" "}
                    <span className="text-cyan-300">focus</span>{" "}
                    <span className="text-slate-500">=</span>{" "}
                    <span className="text-slate-200">[</span>
                    <span className="text-emerald-300">&quot;agents&quot;</span>
                    <span className="text-slate-500">,</span>{" "}
                    <span className="text-emerald-300">&quot;saas&quot;</span>
                    <span className="text-slate-500">,</span>{" "}
                    <span className="text-emerald-300">&quot;edtech&quot;</span>
                    <span className="text-slate-200">]</span>;
                  </p>
                  <p>
                    <span className="text-violet-400">await</span>{" "}
                    <span className="text-cyan-300">build</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-emerald-300">&quot;global impact&quot;</span>
                    <span className="text-slate-400">)</span>;
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-3.5 light:border-slate-900/10 light:bg-slate-900/[0.03]">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Stack</p>
                    <p className="mt-1 text-[13px] font-semibold text-white light:text-slate-800">Python • React • Flutter</p>
                  </div>
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-3.5 light:border-slate-900/10 light:bg-slate-900/[0.03]">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Obsession</p>
                    <p className="mt-1 text-[13px] font-semibold text-white light:text-slate-800">AI agents & automation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="animate-float absolute -left-4 top-16 hidden rounded-2xl border border-white/10 bg-[#0c1226]/90 px-4 py-2.5 shadow-xl backdrop-blur-xl light:border-slate-900/10 light:bg-white/95 light:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.3)] sm:block">
              <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 light:text-cyan-700">◆ AI Agent</p>
              <p className="text-[12px] font-medium text-slate-300 light:text-slate-600">Task completed ✓</p>
            </div>
            <div className="animate-float-slow absolute -right-3 bottom-20 hidden rounded-2xl border border-white/10 bg-[#0c1226]/90 px-4 py-2.5 shadow-xl backdrop-blur-xl light:border-slate-900/10 light:bg-white/95 light:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.3)] sm:block">
              <p className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300 light:text-fuchsia-700">⬢ SaaS</p>
              <p className="text-[12px] font-medium text-slate-300 light:text-slate-600">New user +1</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div className="relative mx-auto mt-14 flex justify-center">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 transition-colors hover:text-slate-300 light:text-slate-500 light:hover:text-slate-800"
        >
          Scroll
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1.5 light:border-slate-900/20">
            <span className="h-2 w-1 animate-bounce rounded-full bg-cyan-400" />
          </span>
        </a>
      </div>
    </section>
  );
}
