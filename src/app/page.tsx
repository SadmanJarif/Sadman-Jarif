import Hero from "@/components/Hero";
import HomeSections from "@/components/home/HomeSections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <Hero />
      <HomeSections />
    </main>
  );
}
