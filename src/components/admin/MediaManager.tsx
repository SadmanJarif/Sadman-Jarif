"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMedia, deleteMedia, listMediaRows } from "@/lib/admin/media-actions";
import { PageHeader, EmptyState } from "@/components/admin/ui";

type Item = { id: string; url: string; key: string; name: string; mime: string; size_bytes: number; created_at: string };

function kb(n: number): string {
  if (n > 1048576) return `${(n / 1048576).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

export default function MediaManager({ initial }: { initial: Item[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initial);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    const r = await listMediaRows();
    if (r.ok) setItems(r.rows as unknown as Item[]);
    router.refresh();
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.append("file", f);
    const r = await uploadMedia(fd);
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
    if (!r.ok) setError(r.message);
    else refresh();
  };

  const remove = async (it: Item) => {
    if (!confirm(`Delete “${it.name}” permanently? Pages using this image will break.`)) return;
    const r = await deleteMedia(it.id, it.key);
    if (!r.ok) alert(r.message);
    else refresh();
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((m) => `${m.name} ${m.mime}`.toLowerCase().includes(needle));
  }, [items, q]);

  return (
    <div>
      <PageHeader
        title="Media Library"
        desc={`${items.length} files · images only, max 5 MB each`}
        action={
          <label className="btn-primary cursor-pointer rounded-full px-5 py-2.5 text-[13px] font-semibold text-white">
            {busy ? "Uploading…" : "+ Upload image"}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={upload} disabled={busy} />
          </label>
        }
      />

      {error && <p className="mt-4 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[13px] text-rose-200">{error}</p>}

      <div className="glass mt-5 rounded-2xl p-3.5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search media…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13.5px] text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/50 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 sm:max-w-xs"
        />
      </div>

      {visible.length === 0 ? (
        <div className="mt-4">
          <EmptyState title="No media found." hint="Upload your first image to start building the library." />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((m) => (
            <div key={m.id} className="glass group overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-3">
                <p className="truncate text-[12.5px] font-semibold text-white light:text-slate-900" title={m.name}>{m.name}</p>
                <p className="mt-0.5 text-[11px] text-slate-600">{kb(m.size_bytes)} · {m.mime.split("/")[1] ?? ""}</p>
                <div className="mt-2.5 flex gap-1.5">
                  <button onClick={() => copy(m.url)}
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 text-[11.5px] font-semibold text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200 light:border-slate-900/10 light:bg-white light:text-slate-600 light:hover:border-cyan-700/40 light:hover:text-cyan-700">
                    {copied === m.url ? "Copied ✓" : "Copy URL"}
                  </button>
                  <button onClick={() => remove(m)}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11.5px] font-semibold text-rose-300/90 transition-colors hover:border-rose-400/40 hover:text-rose-200">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
