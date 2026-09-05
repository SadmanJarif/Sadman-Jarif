"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "sj-theme";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });

function initialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(initialTheme());
    setMounted(true);
    document.documentElement.classList.add("theme-ready");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("light", theme === "light");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme, mounted]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
