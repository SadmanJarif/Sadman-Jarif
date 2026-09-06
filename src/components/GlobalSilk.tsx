"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SilkBackground from "./SilkBackground";
import { GradientWave } from "./ui/gradient-wave";
import { useTheme } from "./ThemeProvider";

/* Site-wide animated backdrops, one per theme:
 * - dark: Silk flow shader + faint white grid (covers all sections)
 * - light: pastel GradientWave wash (cards keep their white surfaces)
 * Skipped across /admin. Wave/Silk unmount (and stop animating) when inactive.
 * Content cards keep their own surfaces; only page backgrounds go transparent.
 */
const LIGHT_COLORS = ["#f1f5f9", "#bae6fd", "#c4b5fd", "#f9a8d4", "#bae6fd", "#f1f5f9"];

export default function GlobalSilk() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {theme === "light" ? (
        <GradientWave colors={LIGHT_COLORS} isPlaying={!reduced} />
      ) : (
        <>
          <SilkBackground />
          <div className="bg-grid-global absolute inset-0" />
        </>
      )}
    </div>
  );
}
