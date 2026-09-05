"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
        compact ? "h-10 w-10" : "h-10 w-10"
      } border-white/10 bg-white/[0.05] text-amber-200 hover:border-white/25 light:border-slate-900/10 light:bg-white light:text-slate-700 light:shadow-sm light:hover:border-slate-900/25`}
    >
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isLight ? "-translate-y-6 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
        }`}
      >
        <path d="M21.75 13.5A9.75 9.75 0 0 1 10.5 2.25a.75.75 0 0 0-.9-.97 12 12 0 1 0 13.07 13.07.75.75 0 0 0-.92-.85Z" />
      </svg>
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isLight ? "translate-y-0 rotate-0 opacity-100" : "translate-y-6 -rotate-90 opacity-0"
        }`}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
