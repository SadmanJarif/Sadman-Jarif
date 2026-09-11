"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

type NavLink = { label: string; href: string; desc?: string };
type Socials = { github: string; linkedin: string; email: string };

/** Public chrome (navbar, footer, back-to-top) — hidden inside /admin. */
export default function SiteChrome({
  children,
  nav,
  more,
  settings,
  socials,
}: {
  children: React.ReactNode;
  nav: NavLink[];
  more: NavLink[];
  settings: Record<string, string>;
  socials: Socials;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {!isAdmin && <Header nav={nav} more={more} />}
      {children}
      {!isAdmin && <Footer main={nav} more={more} settings={settings} socials={socials} />}
      {!isAdmin && <BackToTop />}
    </>
  );
}
