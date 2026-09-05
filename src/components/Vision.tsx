import Reveal from "./Reveal";

const FORMULA = ["Computer Science", "AI", "Entrepreneurship", "Leadership", "Global Education"];

export default function Vision() {
  return (
    <section id="vision" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] px-7 py-14 text-center sm:px-12 sm:py-20">
            {/* Animated gradient bg */}
            <div className="absolute inset-0 bg-[#070b18]" />
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(600px 300px at 20% 20%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(700px 340px at 80% 30%, rgba(139,92,246,0.26), transparent 60%), radial-gradient(600px 320px at 50% 90%, rgba(232,121,249,0.18), transparent 60%)",
                backgroundSize: "200% 200%",
              }}
            />
            <div className="grid-bg absolute inset-0 opacity-70" />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10" />

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-md">
                My Vision
              </span>
              <h2 className="font-display mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
                Become the engineer who{" "}
                <span className="text-gradient">builds the future</span> — then funds it.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-slate-300/90 sm:text-base">
                My long-term goal is to become a highly skilled{" "}
                <span className="font-semibold text-white">AI/software engineer and entrepreneur</span> —
                work internationally, build meaningful technology products, and eventually create
                companies that solve real-world problems.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {FORMULA.map((f, i) => (
                  <span key={f} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-white backdrop-blur-md">
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
