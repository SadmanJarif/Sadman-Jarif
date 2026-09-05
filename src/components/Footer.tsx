import { FooterCta } from "./ui/ember-footer-cta";
import { getSocials, getSettings } from "@/lib/cms";
import { subscribeEmail } from "@/lib/newsletter";

export default async function Footer() {
  const [socials, settings] = await Promise.all([getSocials(), getSettings()]);
  const name = settings["profile_name"] || "Sadman Mubassir Jarif";
  const tagline =
    settings["footer_text"] ||
    "Developer • Entrepreneur • AI Enthusiast. Based in Bangladesh, building for a global future.";

  return (
    <FooterCta
      eyebrow="stay connected"
      heading="Let's build something meaningful."
      sub={tagline}
      brand={`${name} © ${new Date().getFullYear()}`}
      links={[
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Writing", href: "/writing" },
        { label: "Journey", href: "/journey" },
        { label: "Contact", href: "/contact" },
        { label: "GitHub", href: socials.github },
      ]}
      note="Based in Bangladesh • Building for a global future"
      onSubscribe={subscribeEmail}
    />
  );
}
