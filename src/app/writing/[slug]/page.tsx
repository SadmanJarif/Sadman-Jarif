import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ReadingProgress } from "@/components/Bits";
import { getPosts, getPostSlugs } from "@/lib/cms";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function findPost(slug: string) {
  const all = await getPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) return null;
  const sameCategory = all.filter((p) => p.slug !== slug && p.category === post.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== post.category);
  return { post, related: [...sameCategory, ...rest].slice(0, 2) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await findPost(slug);
  if (!found) return { title: "Article not found" };
  const p = found.post;
  const url = `https://sadmanjarif.xyz/writing/${slug}`;
  return {
    title: `${p.title} — Sadman Mubassir Jarif`,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: { title: `${p.title} — Sadman Mubassir Jarif`, description: p.excerpt, url, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = await findPost(slug);
  if (!found) notFound();
  const { post, related } = found;

  return (
    <main className="relative min-h-screen text-slate-100 light:bg-[#f3f5fa] light:text-slate-700">
      <ReadingProgress />

      {/* Cover */}
      <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-fuchsia-600/15 blur-[120px] light:from-cyan-300/30 light:via-indigo-300/30 light:to-fuchsia-300/25" />
          <div className="grid-bg absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04060d] to-transparent light:from-[#f3f5fa]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-slate-300">
              <Link href="/" className="transition-colors hover:text-cyan-300">Home</Link>
              <span className="text-slate-700">/</span>
              <Link href="/writing" className="transition-colors hover:text-cyan-300">Writing</Link>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300 light:text-slate-700">{post.category}</span>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800">
              {post.category}
            </span>
            <h1 className="font-display mt-5 text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[2.75rem] light:text-slate-900">
              {post.title}
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-300 light:text-slate-600">{post.subtitle}</p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-white/[0.08] py-4 light:border-slate-900/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-[14px] font-extrabold text-white">
                SJ
              </span>
              <div>
                <p className="text-[14px] font-bold text-white light:text-slate-900">Sadman Mubassir Jarif</p>
                <p className="text-[12.5px] text-slate-300">{post.date} • {post.readTime}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Share on GitHub" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-500 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900">
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-500 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900">
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a href="mailto:hello@sadmanjarif.dev" aria-label="Share via email" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:text-white light:border-slate-900/10 light:bg-white light:text-slate-500 light:shadow-sm light:hover:border-slate-900/25 light:hover:text-slate-900">
                  <MailIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="relative pb-8">
        <div id="article-body" className="mx-auto max-w-3xl px-5 sm:px-8">
          {post.content.map((block, i) => (
            <Reveal key={i}>
              <div className="mt-8">
                {block.heading && (
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl light:text-slate-900">{block.heading}</h2>
                )}
                <div className="space-y-4">
                  {block.body.map((para, j) => (
                    <p key={j} className={`leading-[1.85] text-slate-300 light:text-slate-700 ${j === 0 && i === 0 && !block.heading ? "text-[17px] first-letter:font-display first-letter:text-2xl first-letter:font-bold first-letter:text-white first-letter:light:text-slate-900" : "text-[15.5px]"}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 text-center light:border-slate-900/10 light:bg-white light:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.18)]">
              <p className="font-display text-[16px] font-bold text-white light:text-slate-900">Enjoyed this? Let&apos;s talk about it.</p>
              <p className="mx-auto mt-2 max-w-md text-[13.5px] text-slate-300">
                I write to think clearly. If this sparked an idea — a project, a disagreement, a collaboration — I want to hear it.
              </p>
              <Link href="/contact" className="btn-primary mt-5 inline-flex rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="relative py-12 pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl light:text-slate-900">Related articles</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link href={`/writing/${r.slug}`} className="glass card-hover block h-full rounded-3xl p-6">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-200 light:border-cyan-700/25 light:bg-cyan-700/[0.07] light:text-cyan-800">
                    {r.category}
                  </span>
                  <h3 className="font-display mt-3 text-[16px] font-bold leading-snug text-white light:text-slate-900">{r.title}</h3>
                  <p className="mt-2 text-[13px] text-slate-300 light:text-slate-600">{r.excerpt}</p>
                  <p className="mt-3 text-[12px] font-medium text-slate-300">{r.date} • {r.readTime}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
