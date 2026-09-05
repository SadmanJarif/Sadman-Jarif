"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, MailIcon, CheckIcon, LocationIcon } from "@/components/Icons";
import { SOCIALS } from "@/data/portfolio";

const OPTIONS = [
  { title: "Collaboration", text: "Build something together — projects, products, experiments." },
  { title: "AI / Software Projects", text: "Agents, automation, chatbots, web or mobile builds." },
  { title: "Internships & Opportunities", text: "Roles, programs, scholarships, competitions." },
  { title: "Research", text: "Notes, explainers, joint exploration, writing." },
  { title: "Entrepreneurship", text: "Startup ideas, SaaS bets, automation for your business." },
  { title: "Networking", text: "Fellow builders, mentors, peers — conversations welcome." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Collaboration", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`[${form.topic}] Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@sadmanjarif.dev?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <PageHero
        eyebrow="Contact"
        title="Have an idea, opportunity,"
        highlight="or project? Let's talk."
        description="The fastest way to reach me is this form — it lands straight in my inbox with context attached. I reply to everything genuine."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="relative pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {OPTIONS.map((o, i) => (
                  <Reveal key={o.title} delay={Math.min(i * 60, 200)}>
                    <button
                      onClick={() => setForm({ ...form, topic: o.title })}
                      className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                        form.topic === o.title
                          ? "border-cyan-400/40 bg-cyan-400/[0.07] shadow-[0_10px_30px_-10px_rgba(34,211,238,0.4)]"
                          : "glass hover:border-white/20"
                      }`}
                    >
                      <p className={`text-[13.5px] font-bold ${form.topic === o.title ? "text-cyan-200" : "text-white"}`}>
                        {o.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{o.text}</p>
                    </button>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={120}>
                <div className="glass mt-5 rounded-2xl p-5">
                  <p className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
                    <LocationIcon className="h-4 w-4 text-cyan-400" />
                    Based in Bangladesh • working worldwide, remotely
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:border-white/25 hover:bg-white/10">
                      <GithubIcon className="h-4 w-4" /> GitHub
                    </a>
                    <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:border-white/25 hover:bg-white/10">
                      <LinkedinIcon className="h-4 w-4" /> LinkedIn
                    </a>
                    <a href={SOCIALS.email} className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white">
                      <MailIcon className="h-4 w-4" /> Email
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-md sm:p-8">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Your name</label>
                      <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Cooper"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Email</label>
                      <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="topic" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Topic</label>
                    <select id="topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white outline-none transition-all focus:border-cyan-400/50 [&>option]:bg-[#0a0f1e]">
                      {OPTIONS.map((o) => (
                        <option key={o.title}>{o.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Message</label>
                    <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your idea, opportunity, or project — timelines and links help…"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20" />
                  </div>
                  <button type="submit" className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-bold text-white">
                    {sent ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <CheckIcon className="h-4 w-4" /> Opening your email app…
                      </span>
                    ) : (
                      `Send about “${form.topic}”`
                    )}
                  </button>
                  <p className="text-center text-[12px] text-slate-600">Prefer email directly? hello@sadmanjarif.dev</p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
