"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_NAV } from "@/lib/admin/config";
import { logoutAction } from "@/lib/admin/auth-actions";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminSidebar({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await logoutAction();
    router.push("/admin/login");
  };

  const nav = (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-2xl px-2 py-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/favicon.jpg" alt="Admin logo" className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-inset ring-white/25" />
        <span>
          <span className="font-display block text-[14px] font-bold text-white light:text-slate-900">Admin Console</span>
          <span className="block max-w-[150px] truncate text-[11px] text-slate-500">{email}</span>
        </span>
      </Link>

      {ADMIN_NAV.map((group) => (
        <div key={group.section}>
          <p className="px-3 pb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-slate-600">
            {group.section}
          </p>
          <div className="grid gap-0.5">
            {group.links.map((l) => {
              const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 text-white shadow-[inset_0_0_0_1px_rgba(103,232,249,0.2)] light:from-cyan-700/[0.08] light:to-violet-700/[0.08] light:text-slate-900 light:shadow-none light:ring-1 light:ring-cyan-700/20"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.05] light:hover:text-slate-900"
                  }`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-[13px] ${active ? "bg-white/10 text-cyan-300" : "bg-white/[0.04] text-slate-500"}`}>
                    {l.icon}
                  </span>
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-auto grid gap-2 border-t border-white/[0.07] pt-4 light:border-slate-900/10">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white light:text-slate-600 light:hover:bg-slate-900/[0.05] light:hover:text-slate-900"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-[13px] text-slate-500">↗</span>
            Website
          </Link>
          <ThemeToggle />
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium text-rose-300/90 transition-colors hover:bg-rose-400/10 hover:text-rose-200"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-400/10 text-[13px]">⏻</span>
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile topbar */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/[0.07] bg-[#04060d]/85 px-4 py-3 backdrop-blur-xl light:border-slate-900/10 light:bg-white/85 lg:hidden">
        <span className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.jpg" alt="Admin logo" className="h-8 w-8 rounded-lg object-cover ring-1 ring-inset ring-white/25" />
          <span className="font-display text-[14px] font-bold text-white light:text-slate-900">Admin</span>
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white light:border-slate-900/10 light:bg-white light:text-slate-700 light:shadow-sm"
          >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "top-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-[2px] w-full rounded bg-current transition-all duration-300 ${open ? "top-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute left-0 top-0 h-full w-[290px] border-r border-white/10 bg-[#070b18] transition-transform duration-300 light:border-slate-900/10 light:bg-white ${open ? "translate-x-0" : "-translate-x-full"}`}>
          {nav}
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[270px] shrink-0 border-r border-white/[0.07] bg-[#060a16]/80 light:border-slate-900/10 light:bg-white/90 lg:block">
        {nav}
      </aside>
    </>
  );
}
