"use client";

import { useEffect, useState } from "react";
import { listMediaRows } from "@/lib/admin/media-actions";

export type MediaItem = { id: string; url: string; key: string; name: string; mime: string; size_bytes: number };

export default function MediaPicker({
  value, onChange, onBrowse,
}: {
  value: { url: string; key: string };
  onChange: (v: { url: string; key: string }) => void;
  onBrowse: () => void;
}) {
  return (
    <div className="flex items-start gap-3">
      {value.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value.url} alt="Selected" className="h-20 w-20 shrink-0 rounded-xl border border-white/10 object-cover" />
      ) : (
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-[11px] text-slate-600">
          No image
        </span>
      )}
      <div className="grid gap-2">
        <button type="button" onClick={onBrowse}
          className="rounded-xl border border-white/12 bg-white/[0.05] px-4 py-2 text-[12.5px] font-semibold text-white transition-all hover:border-cyan-400/30">
          {value.url ? "Change image…" : "Choose from library…"}
        </button>
        {value.url && (
          <button type="button" onClick={() => onChange({ url: "", key: "" })}
            className="rounded-xl px-4 py-1.5 text-[12px] font-medium text-slate-500 transition-colors hover:text-rose-300">
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export function MediaLibraryModal({
  open, onClose, onPick,
}: {
  open: boolean; onClose: () => void; onPick: (m: { url: string; key: string }) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    listMediaRows()
      .then((r) => { if (r.ok) setItems(r.rows as unknown as MediaItem[]); })
      .finally(() => setLoading(false));
  }, [open ]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="glass-strong relative max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
          <p className="font-display text-[16px] font-bold text-white light:text-slate-900">Media library</p>
          <button onClick={onClose} className="rounded-lg border border-white/10 px-3 py-1.5 text-[13px] text-slate-300 hover:text-white light:border-slate-900/15 light:text-slate-600 light:hover:text-slate-900" aria-label="Close">✕</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {loading ? (
            <p className="py-10 text-center text-[13px] text-slate-500">Loading…</p>
          ) : items.length === 0 ? (
            <p className="py-10 text-center text-[13px] text-slate-500">
              Library is empty. Upload images from the <span className="font-semibold text-slate-300">Media</span> page first.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {items.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { onPick({ url: m.url, key: m.key }); onClose(); }}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:border-cyan-400/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.name} className="aspect-square w-full object-cover" loading="lazy" />
                  <span className="block truncate px-2 py-1.5 text-left text-[11px] text-slate-400 group-hover:text-white">{m.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
