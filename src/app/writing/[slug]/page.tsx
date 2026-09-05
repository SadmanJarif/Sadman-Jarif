import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ReadingProgress } from "@/components/Bits";
import { getPost, getRelatedPosts, POSTS } from "@/data/writing";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Article not found" };
  return { title: `${p.title} — Sadman Mubassir Jarif`, description: p.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);

  return (
    <main className="relative min-h-screen bg-[#04060d] text-slate-100">
      <ReadingProgress />

      {/* Cover */}
      <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-fuchsia-600/15 blur-[120px]" />
          <div className="grid-bg absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04060d] to-transparent" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
              <Link href="/" className="transition-colors hover:text-cyan-300">Home</Link>
              <span className="text-slate-700">/</span>
              <Link href="/writing" className="transition-colors hover:text-cyan-300">Writing</Link>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300">{post.category}</span>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-200">
              {post.category}
            </span>
            <h1 className="font-display mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-400">{post.subtitle}</p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-white/[0.08] py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-[14px] font-extrabold text-white">
                SJ
              </span>
              <div>
                <p className="text-[14px] font-bold text-white">Sadman Mubassir Jarif</p>
                <p className="text-[12.5px] text-slate-500">{post.date} • {post.readTime}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Share on GitHub" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:text-white">
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:text-white">
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a href="mailto:hello@sadmanjarif.dev" aria-label="Share via email" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:text-white">
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
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{block.heading}</h2>
                )}
                <div className="space-y-4">
                  {block.body.map((para, j) => (
                    <p key={j} className={`leading-[1.85] text-slate-300 ${j === 0 && i === 0 && !block.heading ? "text-[17px] first-letter:font-display first-letter:text-2xl first-letter:font-bold first-letter:text-white" : "text-[15.5px]"}`}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 text-center">
              <p className="font-display text-[16px] font-bold text-white">Enjoyed this? Let&apos;s talk about it.</p>
              <p className="mx-auto mt-2 max-w-md text-[13.5px] text-slate-500">
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
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Related articles</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link href={`/writing/${r.slug}`} className="glass card-hover block h-full rounded-3xl p-6">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-200">
                    {r.category}
                  </span>
                  <h3 className="font-display mt-3 text-[16px] font-bold leading-snug text-white">{r.title}</h3>
                  <p className="mt-2 text-[13px] text-slate-400">{r.excerpt}</p>
                  <p className="mt-3 text-[12px] font-medium text-slate-500">{r.date} • {r.readTime}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
