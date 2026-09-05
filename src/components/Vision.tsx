import Reveal from "./Reveal";
import { getSettings } from "@/lib/cms";

const FORMULA = ["Computer Science", "AI", "Entrepreneurship", "Leadership", "Global Education"];

export default async function Vision() {
  const settings = await getSettings();
  const title = settings["vision_title"] || "Become the engineer who builds the future — then funds it.";
  const text =
    settings["vision_text"] ||
    "My long-term goal is to become a highly skilled AI/software engineer and entrepreneur — work internationally, build meaningful technology products, and eventually create companies that solve real-world problems.";
  return (
    <section id="vision" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] px-7 py-14 text-center sm:px-12 sm:py-20 light:shadow-[0_30px_80px_-30px_rgba(99,102,241,0.35)]">
            {/* Animated gradient bg */}
            <div className="absolute inset-0 bg-[#070b18] light:bg-white" />
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(600px 300px at 20% 20%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(700px 340px at 80% 30%, rgba(139,92,246,0.26), transparent 60%), radial-gradient(600px 320px at 50% 90%, rgba(232,121,249,0.18), transparent 60%)",
                backgroundSize: "200% 200%",
              }}
            />
            <div className="grid-bg absolute inset-0 opacity-70" />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 light:border-slate-900/10 light:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]" />

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-md light:border-slate-900/10 light:bg-white/80 light:text-cyan-800">
                My Vision
              </span>
              <h2 className="font-display mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl light:text-slate-900">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-slate-300/90 sm:text-base light:text-slate-600">
                {text}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {FORMULA.map((f, i) => (
                  <span key={f} className="flex items-center gap-2">
                      <span className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-white backdrop-blur-md light:border-slate-900/10 light:bg-white/90 light:text-slate-700 light:shadow-sm">
                      {f}
                    </span>
                    {i < FORMULA.length - 1 && <span className="font-bold text-cyan-400">+</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
