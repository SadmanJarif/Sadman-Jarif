"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAV, MORE_LINKS } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

type NavLink = { label: string; href: string; desc?: string };

export default function Header({
  nav = SITE_NAV,
  more = MORE_LINKS,
}: {
  nav?: NavLink[];
  more?: NavLink[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  const moreActive = more.some((l) => isActive(l.href));

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:gap-3 sm:rounded-full sm:px-5 sm:py-3 ${
            scrolled
              ? "glass-strong shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)] light:shadow-[0_18px_45px_-18px_rgba(15,23,42,0.3)]"
              : "border border-white/10 bg-[#0a0f1e]/55 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl light:border-slate-900/10 light:bg-white/70 light:shadow-[0_10px_35px_-15px_rgba(15,23,42,0.25)]"
          }`}
        >
          <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-[15px] font-extrabold text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.7)]">
              SJ
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
            </span>
            <span className="hidden leading-tight min-[400px]:block">
              <span className="font-display block text-[13.5px] font-bold tracking-tight text-white light:text-slate-900">
                Sadman M. Jarif
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-slate-400 light:text-slate-500">
                AI • Software • Ventures
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] light:bg-slate-900/[0.06] light:text-slate-900 light:shadow-none"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.05] light:hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                  moreActive || moreOpen
                    ? "bg-white/[0.08] text-white light:bg-slate-900/[0.06] light:text-slate-900"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.05] light:hover:text-slate-900"
                }`}
                aria-expanded={moreOpen}
              >
                More
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className={`absolute right-0 top-full w-72 pt-2 transition-all duration-300 ${
                  moreOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <div className="glass-strong rounded-2xl p-2 shadow-2xl">
                  {more.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block rounded-xl px-4 py-2.5 transition-colors ${
                        isActive(link.href)
                          ? "bg-white/[0.08] light:bg-slate-900/[0.06]"
                          : "hover:bg-white/[0.05] light:hover:bg-slate-900/[0.04]"
                      }`}
                    >
                      <span className={`block text-[13.5px] font-semibold ${isActive(link.href) ? "text-white light:text-slate-900" : "text-slate-200 light:text-slate-700"}`}>
                        {link.label}
                      </span>
                      <span className="block text-[11.5px] text-slate-500">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="mr-1 hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[11.5px] font-medium text-emerald-200 md:inline-flex light:border-emerald-600/25 light:bg-emerald-600/[0.08] light:text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600" />
              </span>
              Open to work
            </span>
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-primary hidden rounded-full px-5 py-2.5 text-[13px] font-semibold text-white sm:inline-flex"
            >
              Let&apos;s Talk
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white light:border-slate-900/10 light:bg-white light:text-slate-700 light:shadow-sm lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "top-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "top-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 lg:hidden ${
            open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-strong max-h-[80vh] overflow-y-auto rounded-2xl p-3 shadow-2xl">
            <div className="grid gap-1">
              <div className="flex items-center justify-between rounded-xl px-4 py-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 light:text-slate-500">
                  Appearance
                </span>
                <span className="flex items-center gap-2 text-[13px] font-medium text-slate-400 light:text-slate-600">
                  <ThemeToggle />
                </span>
              </div>
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[14px] font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-white/[0.08] text-white light:bg-slate-900/[0.06] light:text-slate-900"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.04] light:hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                More
              </p>
              <div className="grid grid-cols-2 gap-1">
                {more.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-[13.5px] font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-white/[0.08] text-white light:bg-slate-900/[0.06] light:text-slate-900"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.04] light:hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 rounded-xl px-4 py-3 text-center text-[14px] font-semibold text-white"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
