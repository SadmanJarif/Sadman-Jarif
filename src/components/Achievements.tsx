import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CheckIcon } from "./Icons";
import { getCertifications } from "@/lib/cms";

const FALLBACK = [
  { title: "Harvard CS50x", org: "Harvard", note: "Computer science foundations — where rigorous thinking started." },
  { title: "GCI Data & Science", org: "University of Tokyo", note: "Data science perspectives from a global research program." },
  { title: "Probability for AI", org: "Stanford", note: "The math behind machine learning, made practical." },
  { title: "Business Foundations", org: "Wharton", note: "How real companies create, capture and sustain value." },
  { title: "Entrepreneurship Programs", org: "Multiple", note: "Idea validation, pitching and building under pressure." },
  { title: "Professional Simulations", org: "Industry", note: "Forage-style externships incl. Beats By Dre market analysis." },
  { title: "AI & Tech Workshops", org: "Community", note: "Hands-on sessions on chatbots, automation and LLM tools." },
  { title: "Leadership Development", org: "Ongoing", note: "Communication, teamwork and ownership through real roles." },
];

export default async function Achievements() {
  const certs = await getCertifications();
  const items = certs ?? FALLBACK;
  return (
    <section id="achievements" className="section-glow relative scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Achievements & Learning"
          title="Proof of"
          highlight="consistency."
          description="Not a certificate wall — evidence that I keep showing up, finishing hard things, and compounding knowledge."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 80}>
              <div className="glass card-hover group h-full rounded-2xl p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400/25 to-cyan-500/25 text-emerald-300 light:text-emerald-700">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {a.org}
                </p>
                <h3 className="font-display mt-1 text-[15px] font-bold leading-snug text-white light:text-slate-900">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">{a.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
