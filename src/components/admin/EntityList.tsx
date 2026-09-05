"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { EntityDef } from "@/lib/admin/config";
import { deleteRow, toggleRow } from "@/lib/admin/actions";
import { PageHeader, StatusBadge, EmptyState } from "./ui";

type Row = Record<string, unknown>;

function haystack(row: Row, fields: string[]): string {
  return fields
    .map((f) => {
      const v = row[f];
      return Array.isArray(v) ? v.join(" ") : String(v ?? "");
    })
    .join(" ")
    .toLowerCase();
}

function statusOf(def: EntityDef, row: Row): string {
  if (def.statusField === "published") return row["published"] ? "published" : "draft";
  if (def.statusField === "status") return String(row["status"] ?? "draft");
  return "";
}

export default function EntityList({ def, rows }: { def: EntityDef; rows: Row[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("default");
  const [busy, setBusy] = useState<string | null>(null);

  const filterOptions = useMemo(() => {
    if (!def.filterField) return [];
    const set = new Set<string>();
    rows.forEach((r) => {
      const v = r[def.filterField!];
      if (Array.isArray(v)) v.forEach((x) => set.add(String(x)));
      else if (v) set.add(String(v));
    });
    return ["All", ...Array.from(set).sort()];
  }, [rows, def.filterField]);

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = rows.filter((r) => {
      if (needle && !haystack(r, def.searchIn).includes(needle)) return false;
      if (def.filterField && filter !== "All") {
        const v = r[def.filterField];
        const vals = Array.isArray(v) ? v.map(String) : [String(v ?? "")];
        if (!vals.includes(filter)) return false;
      }
      if (def.statusField && status !== "All") {
        if (statusOf(def, r) !== status) return false;
      }
      return true;
    });
    out = [...out].sort((a, b) => {
      if (sort === "title") return String(a[def.titleField] ?? "").localeCompare(String(b[def.titleField] ?? ""));
      if (sort === "newest") return String(b["created_at"] ?? "").localeCompare(String(a["created_at"] ?? ""));
      return Number(a[def.defaultSort] ?? 0) - Number(b[def.defaultSort] ?? 0);
    });
    return out;
  }, [rows, q, filter, status, sort, def]);

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete “${title}” permanently? This cannot be undone.`)) return;
    setBusy(id);
    const r = await deleteRow(def.key, id);
    setBusy(null);
    if (!r.ok) alert(r.message);
    else router.refresh();
  };

  const toggle = async (id: string, field: string, value: boolean | string, label: string) => {
    setBusy(id + field);
    const r = await toggleRow(def.key, id, field, value);
    setBusy(null);
    if (!r.ok) alert(r.message + (label ? "" : ""));
    else router.refresh();
  };

  return (
    <div>
      <PageHeader
        title={def.plural}
        desc={`${rows.length} total · ${def.description}`}
        action={
          <Link href={`/admin/${def.key}/new`} className="btn-primary rounded-full px-5 py-2.5 text-[13px] font-semibold text-white">
            + New {def.singular}
          </Link>
        }
      />

      <div className="glass mt-5 flex flex-col gap-2.5 rounded-2xl p-3.5 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${def.plural.toLowerCase()}…`}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/50 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {filterOptions.length > 0 && (
            <select value={filter} onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-slate-200 outline-none light:border-slate-900/15 light:bg-white light:text-slate-700 [&>option]:bg-[#0a0f1e] light:[&>option]:bg-white">
              {filterOptions.map((o) => <option key={o} value={o}>{o === "All" ? "All categories" : o}</option>)}
            </select>
          )}
          {def.statusField && (
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-slate-200 outline-none light:border-slate-900/15 light:bg-white light:text-slate-700 [&>option]:bg-[#0a0f1e] light:[&>option]:bg-white">
              <option value="All">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          )}
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-slate-200 outline-none light:border-slate-900/15 light:bg-white light:text-slate-700 [&>option]:bg-[#0a0f1e] light:[&>option]:bg-white">
            <option value="default">Sort: custom order</option>
            <option value="title">Sort: title A–Z</option>
            <option value="newest">Sort: newest first</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-[12.5px] text-slate-500">
        Showing <span className="font-bold text-slate-200 light:text-slate-800">{visible.length}</span> of {rows.length}
      </p>

      {visible.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={q || filter !== "All" || status !== "All" ? "Nothing matches your search." : `No ${def.plural.toLowerCase()} yet.`}
            hint={q ? "Try a different term or clear the filters." : `Create your first ${def.singular.toLowerCase()} to get started.`}
            action={<Link href={`/admin/${def.key}/new`} className="btn-primary inline-flex rounded-full px-5 py-2.5 text-[13px] font-semibold text-white">+ New {def.singular}</Link>}
          />
        </div>
      ) : (
        <div className="mt-3 grid gap-2.5">
          {visible.map((r) => {
            const id = String(r["id"]);
            const st = statusOf(def, r);
            return (
              <div key={id} className="glass flex flex-wrap items-center gap-3 rounded-2xl p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-white light:text-slate-900">{String(r[def.titleField] ?? "(untitled)")}</p>
                  {def.subtitleField && (
                    <p className="truncate text-[12px] text-slate-500">{String(r[def.subtitleField] ?? "")}</p>
                  )}
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {st && <StatusBadge value={st} />}
                    {def.featuredField && r[def.featuredField] ? <StatusBadge value="Featured" /> : null}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {def.statusField === "published" && (
                    <button
                      disabled={busy === id + "published"}
                      onClick={() => toggle(id, "published", !(r["published"] as boolean), "")}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-200 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-emerald-700/40 light:hover:text-emerald-700"
                    >
                      {r["published"] ? "Unpublish" : "Publish"}
                    </button>
                  )}
                  {def.statusField === "status" && (
                    <button
                      disabled={busy === id + "status"}
                      onClick={() => toggle(id, "status", String(r["status"]) === "published" ? "draft" : "published", "")}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-200 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-emerald-700/40 light:hover:text-emerald-700"
                    >
                      {String(r["status"]) === "published" ? "Unpublish" : "Publish"}
                    </button>
                  )}
                  {(def.key === "posts" || def.key === "projects" || def.key === "research") && (
                    <Link href={`/admin/${def.key}/${id}/preview`}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200 light:border-slate-900/10 light:bg-white light:text-slate-600 light:shadow-sm light:hover:border-cyan-700/40 light:hover:text-cyan-700">
                      Preview
                    </Link>
                  )}
                  <Link href={`/admin/${def.key}/${id}`}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/10 light:border-slate-900/15 light:bg-white light:text-slate-800 light:hover:border-slate-900/30">
                    Edit
                  </Link>
                  <button
                    disabled={busy === id}
                    onClick={() => remove(id, String(r[def.titleField] ?? "this item"))}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-rose-300/90 transition-colors hover:border-rose-400/40 hover:text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
