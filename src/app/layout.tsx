import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Sadman Mubassir Jarif — Developer, Entrepreneur & AI Enthusiast",
  description:
    "Portfolio of Sadman Mubassir Jarif — developer, entrepreneur and aspiring AI/software engineer from Bangladesh building AI-powered products for a global future.",
  keywords: [
    "Sadman Mubassir Jarif",
    "AI Engineer",
    "Software Engineer",
    "Entrepreneur",
    "Portfolio",
    "Bangladesh",
    "AI Agents",
    "Flutter",
    "React",
  ],
  authors: [{ name: "Sadman Mubassir Jarif" }],
  openGraph: {
    title: "Sadman Mubassir Jarif — Building with AI. Creating with Technology.",
    description:
      "Developer • Entrepreneur • AI Enthusiast. Based in Bangladesh, building for a global future.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadman Mubassir Jarif — Developer & AI Enthusiast",
    description: "Building with AI. Creating with Technology. Thinking Beyond Today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#04060d] text-slate-100 antialiased">
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
