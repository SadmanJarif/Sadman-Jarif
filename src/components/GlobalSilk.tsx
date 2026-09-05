"use client";

import { usePathname } from "next/navigation";
import SilkBackground from "./SilkBackground";

/* Site-wide dark backdrop: the Silk shader fixed behind all page content,
 * plus a faint white grid. Skipped in light mode (CSS) and across /admin.
 * Content cards keep their own surfaces; only page backgrounds go transparent.
 */
export default function GlobalSilk() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden light:hidden" aria-hidden>
      <SilkBackground />
      <div className="bg-grid-global absolute inset-0" />
    </div>
  );
}
