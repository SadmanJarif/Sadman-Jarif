"use client";

import { useMemo, useState } from "react";
import { PageHeader, EmptyState, formatDate } from "@/components/admin/ui";

type Row = Record<string, unknown>;

const ACTION_COLORS: Record<string, string> = {
  Created: "bg-emerald-400",
  Updated: "bg-cyan-400",
  Deleted: "bg-rose-400",
  Uploaded: "bg-violet-400",
  Published: "bg-amber-400",
};

export default function ActivityList({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const [entity, setEntity] = useState("All");

  const entities = useMemo(
    () => ["All", ...Array.from(new Set(rows.map((r) => String(r["entity"] || "site")))).sort()],
    [rows]
  );

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (entity !== "All" && String(r["entity"] || "site") !== entity) return false;
      if (needle && !`${r["action"]} ${r["detail"]} ${r["actor_email"]}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [rows, q, entity]);

  return (
    <div>
      <PageHeader title="Activity Log" desc={`${rows.length} recent actions across the console`} />

      <div className="glass mt-5 flex flex-col gap-2.5 rounded-2xl p-3.5 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search actions…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/50 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 sm:max-w-xs"
        />
        <select value={entity} onChange={(e) => setEntity(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-slate-200 outline-none light:border-slate-900/15 light:bg-white light:text-slate-700 [&>option]:bg-[#0a0f1e] light:[&>option]:bg-white">
          {entities.map((e) => <option key={e} value={e}>{e === "All" ? "All areas" : e}</option>)}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="mt-4"><EmptyState title="No activity found." hint="Actions you take in the console are recorded here." /></div>
      ) : (
        <div className="mt-4 grid gap-2">
          {visible.map((r) => (
            <div key={String(r["id"])} className="glass flex items-start gap-3 rounded-2xl p-4">
              <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${ACTION_COLORS[String(r["action"])] ?? "bg-slate-500"}`} />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] text-slate-200 light:text-slate-700">
                  <span className="font-bold text-white light:text-slate-900">{String(r["action"])}</span>
                  {r["entity"] ? <span className="text-slate-500"> · {String(r["entity"])}</span> : null}
                  {" — "}{String(r["detail"] || "")}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-600">
                  {formatDate(String(r["created_at"]))} · {String(r["actor_email"])}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
