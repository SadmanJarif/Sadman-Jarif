import Link from "next/link";
import { getDashboardStats } from "@/lib/admin/actions";
import { ENTITIES } from "@/lib/admin/config";

export const dynamic = "force-dynamic";

const CARD_ACCENTS: Record<string, string> = {
  projects: "from-cyan-400 to-sky-500",
  posts: "from-violet-400 to-purple-500",
  experience: "from-emerald-400 to-teal-500",
  education: "from-blue-400 to-indigo-500",
  skills: "from-fuchsia-400 to-pink-500",
  certifications: "from-amber-400 to-orange-500",
  eca: "from-rose-400 to-red-500",
  research: "from-teal-400 to-cyan-500",
  updates: "from-indigo-400 to-violet-500",
};

function Bar({ label, value, max, accent }: { label: string; value: number; max: number; accent: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-medium text-slate-400 light:text-slate-500">{label}</span>
        <span className="font-bold text-white light:text-slate-900">{value}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div className={`h-full rounded-full bg-gradient-to-r ${accent}`} style={{ width: `${max === 0 ? 0 : Math.round((value / max) * 100)}%` }} />
      </div>
    </div>
  );
}

export default async function AdminOverview() {
  const stats = await getDashboardStats();
  if (!stats.ok) {
    return <p className="text-[14px] text-rose-300">Could not load dashboard stats: {stats.message}</p>;
  }

  const cards = [
    { key: "projects", label: "Projects", href: "/admin/projects" },
    { key: "posts", label: "Blog posts", href: "/admin/posts", sub: `${stats.publishedPosts} published · ${stats.draftPosts} drafts` },
    { key: "experience", label: "Experience", href: "/admin/experience" },
    { key: "education", label: "Education", href: "/admin/education" },
    { key: "skills", label: "Skill groups", href: "/admin/skills" },
    { key: "certifications", label: "Certifications", href: "/admin/certifications" },
    { key: "eca", label: "ECA activities", href: "/admin/eca" },
    { key: "research", label: "Research notes", href: "/admin/research" },
    { key: "updates", label: "Updates", href: "/admin/updates" },
  ];
  const max = Math.max(1, ...cards.map((c) => stats.counts[c.key] ?? 0));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">Overview</p>
          <h1 className="font-display mt-2 text-2xl font-extrabold text-white sm:text-3xl light:text-slate-900">Dashboard</h1>
          <p className="mt-1 text-[13.5px] text-slate-500">Everything on your website, manageable from here.</p>
        </div>
        <Link href="/" target="_blank" className="rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:border-white/25 light:border-slate-900/15 light:bg-white light:text-slate-800 light:shadow-sm light:hover:border-slate-900/30">
          View website ↗
        </Link>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.key} href={c.href} className="glass card-hover group rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${CARD_ACCENTS[c.key] ?? "from-slate-400 to-slate-500"} text-[15px] font-bold text-white`}>
                {stats.counts[c.key] ?? 0}
              </span>
              <span className="text-[12px] font-semibold text-slate-600 transition-colors group-hover:text-cyan-300">Manage →</span>
            </div>
            <p className="font-display mt-3 text-[15px] font-bold text-white light:text-slate-900">{c.label}</p>
            <p className="mt-0.5 text-[12px] text-slate-500">{c.sub ?? `${ENTITIES[c.key]?.description ?? ""}`}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-[16px] font-bold text-white light:text-slate-900">Content volume</h2>
          <p className="mt-0.5 text-[12px] text-slate-500">Entries per collection (media library: {stats.counts["media"] ?? 0} files)</p>
          <div className="mt-4 grid gap-3">
            {cards.slice(0, 6).map((c) => (
              <Bar key={c.key} label={c.label} value={stats.counts[c.key] ?? 0} max={max} accent={CARD_ACCENTS[c.key] ?? "from-slate-400 to-slate-500"} />
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[16px] font-bold text-white light:text-slate-900">Recent activity</h2>
            <Link href="/admin/activity" className="text-[12.5px] font-semibold text-cyan-300 hover:text-cyan-200">View all →</Link>
          </div>
          <div className="mt-4 grid gap-2">
            {stats.recent.length === 0 && (
              <p className="text-[13px] text-slate-500">No activity yet — create or edit something and it will show up here.</p>
            )}
            {stats.recent.map((r) => (
              <div key={String(r["id"])} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500" />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-slate-200 light:text-slate-700">
                    <span className="font-bold text-white">{String(r["action"])}</span> · {String(r["detail"] || r["entity"])}
                  </p>
                  <p className="text-[11.5px] text-slate-600">
                    {new Date(String(r["created_at"])).toLocaleString()} · {String(r["actor_email"])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass mt-5 rounded-2xl p-6">
        <h2 className="font-display text-[16px] font-bold text-white light:text-slate-900">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { l: "+ New project", h: "/admin/projects/new" },
            { l: "+ New article", h: "/admin/posts/new" },
            { l: "+ Upload media", h: "/admin/media" },
            { l: "+ Log update", h: "/admin/updates/new" },
            { l: "Edit homepage", h: "/admin/homepage" },
            { l: "Site settings", h: "/admin/settings" },
          ].map((q) => (
            <Link key={q.h + q.l} href={q.h} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12.5px] font-semibold text-slate-200 transition-all hover:border-cyan-400/30 hover:text-white">
              {q.l}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
