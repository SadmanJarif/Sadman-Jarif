import type { Metadata } from "next";
import ContactView from "./ContactView";
import { getSocials, seoMeta } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return seoMeta("/contact", {
    title: "Contact — Sadman Mubassir Jarif",
    description: "Have an idea, opportunity, or project? Let's talk.",
  });
}

export default async function ContactPage() {
  const socials = await getSocials();
  return <ContactView socials={socials} />;
}
