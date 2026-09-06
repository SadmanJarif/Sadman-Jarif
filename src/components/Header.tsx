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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.jpg"
              alt="Sadman Mubassir Jarif logo"
              className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-[0_8px_24px_-6px_rgba(99,102,241,0.7)] ring-1 ring-inset ring-white/25"
            />
            <span className="hidden leading-tight min-[400px]:block">
              <span className="font-display block text-[13.5px] font-bold tracking-tight text-white light:text-slate-900">
                Sadman M. Jarif
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-slate-300 light:text-slate-500">
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
                    : "text-slate-300 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.05] light:hover:text-slate-900"
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
                    : "text-slate-300 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.05] light:hover:text-slate-900"
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
                      <span className="block text-[11.5px] text-slate-300">{link.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
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

        {/* Mobile menu — bottom-anchored sheet with backdrop */}
        <div className={`lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
          <div
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 light:bg-slate-900/30 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`fixed inset-x-3 bottom-3 top-auto z-50 mx-auto max-w-6xl transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
            }`}
          >
            <div className="glass-strong max-h-[75vh] overflow-y-auto rounded-3xl p-4 shadow-2xl">
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Menu
                </span>
                <span className="flex items-center gap-2 text-[12.5px] font-medium text-slate-400 light:text-slate-600">
                  Theme <ThemeToggle />
                </span>
              </div>
              <nav className="grid gap-1" aria-label="Mobile">
                {nav.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${i * 25}ms` : "0ms" }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-300 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    } ${
                      isActive(link.href)
                        ? "bg-white/[0.08] text-white light:bg-slate-900/[0.06] light:text-slate-900"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.04] light:hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                    <span aria-hidden className="text-slate-600 light:text-slate-400">→</span>
                  </Link>
                ))}
              </nav>
              <p className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                More
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {more.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-[13.5px] font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-white/[0.08] text-white light:bg-slate-900/[0.06] light:text-slate-900"
                        : "bg-white/[0.03] text-slate-400 hover:text-white light:bg-slate-900/[0.03] light:text-slate-600 light:hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 rounded-2xl px-4 py-3.5 text-center text-[15px] font-semibold text-white"
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
