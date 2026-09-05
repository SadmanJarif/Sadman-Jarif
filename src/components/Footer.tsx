import Link from "next/link";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";
import { SITE_NAV, MORE_LINKS, SOCIALS } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center gap-3 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-[14px] font-extrabold text-white">
                SJ
              </span>
              <span className="font-display text-[15px] font-bold text-white">Sadman Mubassir Jarif</span>
            </Link>
            <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed text-slate-500 md:mx-0">
              Developer • Entrepreneur • AI Enthusiast. Based in Bangladesh, building for a global
              future. I learn → build → experiment → share → build bigger.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 md:justify-start">
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-white/25 hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-white/25 hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.email}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-white/25 hover:text-white"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] font-medium text-slate-400 md:grid-cols-1">
              {SITE_NAV.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">More</p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] font-medium text-slate-400 md:grid-cols-1">
              {MORE_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[12px] text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Sadman Mubassir Jarif. All rights reserved.</p>
          <p>
            Designed & built with care •{" "}
            <span className="text-slate-500">Building with AI. Thinking Beyond Today.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
