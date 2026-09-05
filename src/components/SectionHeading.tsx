import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
};

export default function SectionHeading({ eyebrow, title, highlight, description, align = "center" }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90 backdrop-blur-md light:border-slate-900/10 light:bg-white/80 light:text-cyan-800 light:shadow-sm`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        {eyebrow}
      </span>
      <h2 className="font-display mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] light:text-slate-900">
        {title}{" "}
        {highlight ? <span className="text-gradient-cyan">{highlight}</span> : null}
      </h2>
      {description ? (
        <p className="mt-4 text-[15px] leading-relaxed text-slate-400 sm:text-base light:text-slate-600">{description}</p>
      ) : null}
    </Reveal>
  );
}
