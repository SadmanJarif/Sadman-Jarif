import Link from "next/link";
import { FlameBand } from "./ui/ember-footer-cta";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

type NavLink = { label: string; href: string; desc?: string };

type Socials = { github: string; linkedin: string; email: string };

export default function Footer({
  main,
  more,
  socials,
  settings,
}: {
  main: NavLink[];
  more: NavLink[];
  socials: Socials;
  settings: Record<string, string>;
}) {
  const name = settings["profile_name"] || "Sadman Mubassir Jarif";
  const tagline =
    settings["footer_text"] ||
    "Developer • Entrepreneur • AI Enthusiast. Based in Bangladesh, building for a global future.";
  const emailUser = socials.email.replace(/^mailto:/, "");
  const resourceLinks = more.slice(0, 6);

  return (
    <footer className="relative overflow-hidden bg-[#131126] text-[#F3F1FF] bg-[radial-gradient(90%_70%_at_50%_100%,#221D4E_0%,#161331_45%,#131126_100%)]">
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* CTA */}
        <div className="flex flex-col items-center px-2 pb-14 pt-20 text-center sm:pt-24">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#A99CFF]">stay connected</p>
          <h2 className="mt-4 max-w-2xl text-balance font-averia text-4xl leading-[1.05] sm:text-5xl">
            Let&apos;s build something meaningful.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-[#A8A3C7]">
            {tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#F3F1FF] px-6 py-3 text-sm font-semibold text-[#161331] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(243,241,255,0.4)]"
            >
              Get in touch →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-[#f4f1ea]/15 bg-[#16140f] px-6 py-3 text-sm font-semibold text-[#f4f1ea] transition-all hover:-translate-y-0.5 hover:border-[#ff8a3d]/40 hover:text-[#ffd6bf]"
            >
              View my work
            </Link>
          </div>
        </div>

        {/* Menus */}
        <div className="grid gap-10 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.jpg"
                alt="Sadman Mubassir Jarif logo"
                className="h-10 w-10 rounded-xl object-cover ring-1 ring-inset ring-white/25"
              />
              <span className="font-averia text-[17px] italic">{name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#A8A3C7]">
              I learn → build → experiment → share → build bigger things.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#A8A3C7] transition-all hover:border-[#ff8a3d]/40 hover:text-[#F3F1FF]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#A8A3C7] transition-all hover:border-[#ff8a3d]/40 hover:text-[#F3F1FF]"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={socials.email}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#A8A3C7] transition-all hover:border-[#ff8a3d]/40 hover:text-[#F3F1FF]"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Explore">
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#A99CFF]">explore</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {main.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#A8A3C7] transition-colors hover:text-[#F3F1FF]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#A99CFF]">resources</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#A8A3C7] transition-colors hover:text-[#F3F1FF]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#A99CFF]">contact</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-[#A8A3C7]">
              <li>
                <a href={socials.email} className="break-all transition-colors hover:text-[#F3F1FF]">
                  {emailUser}
                </a>
              </li>
              <li>Bangladesh → remote worldwide</li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#F3F1FF]">
                  Start a conversation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full flex-col items-center gap-3 border-t border-white/10 py-6 text-[12.5px] text-[#A8A3C7] sm:flex-row sm:justify-between">
          <span className="font-averia italic">
            {name} © {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[11px] tracking-[0.08em]">
            Based in Bangladesh • Building for a global future
          </span>
        </div>
        {/* Spacer so the flame band never covers the bottom bar */}
        <div className="h-40 sm:h-48" aria-hidden />
      </div>

      <FlameBand height={240} />
    </footer>
  );
}
