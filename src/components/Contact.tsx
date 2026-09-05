"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon, MailIcon, CheckIcon } from "./Icons";
import { SOCIALS } from "@/data/portfolio";

const REASONS = ["Collaboration", "Projects", "AI & Software", "Entrepreneurship", "Research", "Networking"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@sadmanjarif.dev?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-[#0a0f22] via-[#0c0a26] to-[#140b24] p-8 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[110px]" />
              <div className="dot-bg absolute inset-0 opacity-25" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Contact
                </span>
                <h2 className="font-display mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[2.75rem]">
                  Let&apos;s build something{" "}
                  <span className="text-gradient">meaningful.</span>
                </h2>
                <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-300/90">
                  Open to connecting for collaboration, projects, AI and software opportunities,
                  entrepreneurship, research and professional networking. I reply fast.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {REASONS.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[12px] font-medium text-slate-200"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                  >
                    <GithubIcon className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                  >
                    <LinkedinIcon className="h-4 w-4" /> LinkedIn
                  </a>
                  <a
                    href={SOCIALS.email}
                    className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-white"
                  >
                    <MailIcon className="h-4 w-4" /> Email
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-md sm:p-7">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">
                      Your name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Cooper"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project, idea, or opportunity…"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-bold text-white"
                  >
                    {sent ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <CheckIcon className="h-4 w-4" /> Opening your email app…
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  <p className="text-center text-[12px] text-slate-600">
                    Prefer email directly? hello@sadmanjarif.dev
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
