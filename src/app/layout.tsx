import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalSilk from "@/components/GlobalSilk";
import { getNav } from "@/lib/cms";

export const metadata: Metadata = {
  metadataBase: new URL("https://sadmanjarif.xyz"),
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
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title: "Sadman Mubassir Jarif — Building with AI. Creating with Technology.",
    description:
      "Developer • Entrepreneur • AI Enthusiast. Based in Bangladesh, building for a global future.",
    type: "website",
    url: "https://sadmanjarif.xyz",
    siteName: "Sadman Mubassir Jarif",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadman Mubassir Jarif — Developer & AI Enthusiast",
    description: "Building with AI. Creating with Technology. Thinking Beyond Today.",
  },
  alternates: {
    canonical: "https://sadmanjarif.xyz",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { main, more } = await getNav();
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&family=Averia+Serif+Libre:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sj-theme');if(t==='light'||(!t&&matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-[#0B1128] text-slate-100 antialiased light:bg-[#f3f5fa] light:text-slate-700">
        <ThemeProvider>
          <GlobalSilk />
          <Header nav={main} more={more} />
          {children}
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
