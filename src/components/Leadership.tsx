import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const AREAS = [
  { icon: "◉", title: "MUN Participation", text: "Debate, diplomacy and thinking on my feet under pressure." },
  { icon: "♥", title: "Volunteering", text: "Showing up for community projects that needed builders." },
  { icon: "⬢", title: "Leadership Development", text: "Learning to own outcomes, not just complete tasks." },
  { icon: "⬣", title: "Internships", text: "Real teams, real deadlines, real accountability — remotely." },
  { icon: "◆", title: "Competitions", text: "Testing myself against talented peers, win or learn." },
  { icon: "✎", title: "Research & Writing", text: "Technical writing that forces me to understand deeply." },
  { icon: "⬔", title: "Community Projects", text: "Building with and for people, not in isolation." },
  { icon: "✦", title: "Global Learning", text: "International programs that widened how I see the world." },
];

export default function Leadership() {
  return (
    <section id="community" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Leadership, ECA & Community"
          title="More than"
          highlight="just code."
          description="Growth happens off the keyboard too — in rooms, teams, competitions and communities."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 80}>
              <div className="glass card-hover h-full rounded-2xl p-5 text-center sm:text-left">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-600/25 text-lg text-violet-200 sm:mx-0">
                  {a.icon}
                </span>
                <h3 className="font-display mt-3 text-[14.5px] font-bold text-white">{a.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-400">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/[0.08] bg-gradient-to-r from-cyan-500/[0.07] via-violet-600/[0.07] to-fuchsia-500/[0.07] p-6 text-center sm:p-7">
            <p className="font-display text-[15px] font-bold text-white sm:text-base">
              Impact • Curiosity • Leadership • Continuous growth
            </p>
            <p className="mx-auto mt-2 max-w-xl text-[13.5px] leading-relaxed text-slate-400">
              The thread connecting everything: I like starting things, learning fast, and leaving
              places slightly better than I found them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
