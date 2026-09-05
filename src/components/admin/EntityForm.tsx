"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { EntityDef } from "@/lib/admin/config";
import { saveRow } from "@/lib/admin/actions";
import { slugify } from "@/lib/admin/markdown";
import { inputCls, PageHeader, TagsInput, Toggle } from "./ui";
import MediaPicker, { MediaLibraryModal } from "./MediaPicker";

type Values = Record<string, unknown>;

function Field({
  def, name, value, onChange, pickerFor, setPickerFor,
}: {
  def: EntityDef;
  name: string;
  value: unknown;
  onChange: (v: unknown) => void;
  pickerFor: string | null;
  setPickerFor: (v: string | null) => void;
}) {
  const f = def.fields.find((x) => x.name === name)!;

  switch (f.type) {
    case "textarea":
      return (
        <textarea rows={3} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}
          placeholder={f.placeholder} className={`${inputCls} resize-y`} />
      );
    case "markdown":
      return (
        <div>
          <textarea rows={12} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}
            placeholder={f.placeholder ?? "Write in Markdown…"} spellCheck
            className={`${inputCls} resize-y font-mono !text-[13px] !leading-relaxed`} />
          <p className="mt-1.5 text-[11.5px] text-slate-600">## creates a section heading · blank lines separate paragraphs.</p>
        </div>
      );
    case "select":
      return (
        <select value={String(value ?? f.defaultValue ?? "")} onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} [&>option]:bg-[#0a0f1e]`}>
          {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    case "tags":
      return (
        <TagsInput value={(value as string[]) ?? []} onChange={onChange}
          placeholder={f.placeholder} suggestions={f.options} />
      );
    case "lines":
      return (
        <textarea
          rows={5}
          value={((value as string[]) ?? []).join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          placeholder="One item per line"
          className={`${inputCls} resize-y`}
        />
      );
    case "boolean":
      return <Toggle checked={Boolean(value)} onChange={onChange} label={value ? "On" : "Off"} />;
    case "number":
      return (
        <input type="number" value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} className={inputCls} />
      );
    case "url":
      return (
        <input type="url" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}
          placeholder="https://…" className={inputCls} />
      );
    case "image": {
      const v = (value ?? { url: "", key: "" }) as { url: string; key: string };
      return (
        <>
          <MediaPicker value={v} onChange={onChange} onBrowse={() => setPickerFor(name)} />
          <MediaLibraryModal
            open={pickerFor === name}
            onClose={() => setPickerFor(null)}
            onPick={(m) => onChange(m)}
          />
        </>
      );
    }
    default:
      return (
        <input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={f.placeholder}
          className={inputCls}
        />
      );
  }
}

export default function EntityForm({
  def, id, initial,
}: {
  def: EntityDef; id: string | null; initial: Values;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initial);
  const [pickerFor, setPickerFor] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const set = (name: string, v: unknown) => {
    setValues((prev) => {
      const next = { ...prev, [name]: v };
      // Auto-slug from title while the slug still looks auto-generated
      if ((def.key === "posts" || def.key === "projects") && name === "title" && typeof v === "string") {
        const cur = String(prev["slug"] ?? "");
        if (!cur || cur === slugify(String(prev["title"] ?? ""))) next["slug"] = slugify(v);
      }
      return next;
    });
    setSaved("");
  };

  const isPublished = useMemo(() => {
    if (def.statusField === "published") return Boolean(values["published"]);
    if (def.statusField === "status") return values["status"] === "published";
    return null;
  }, [values, def.statusField]);

  const submit = async (mode: "draft" | "publish" | "preview") => {
    setBusy(mode);
    setError("");
    setSaved("");
    const payload = { ...values };
    if (mode === "draft") {
      if (def.statusField === "published") payload["published"] = false;
      if (def.statusField === "status") payload["status"] = "draft";
    } else {
      if (def.statusField === "published") payload["published"] = true;
      if (def.statusField === "status") payload["status"] = "published";
    }
    const r = await saveRow(def.key, id, payload);
    setBusy(null);
    if (!r.ok) {
      setError(r.message);
      return;
    }
    if (mode === "preview" && (def.key === "posts" || def.key === "projects" || def.key === "research")) {
      router.push(`/admin/${def.key}/${r.id}/preview`);
    } else if (!id && r.id) {
      router.push(`/admin/${def.key}/${r.id}`);
    } else {
      setValues(payload);
      setSaved(mode === "draft" ? "Draft saved." : "Published — live on the website.");
      router.refresh();
    }
  };

  const canPreview = def.key === "posts" || def.key === "projects" || def.key === "research";

  return (
    <div>
      <PageHeader
        title={id ? `Edit ${def.singular}` : `New ${def.singular}`}
        desc={def.description}
        action={
          <Link href={`/admin/${def.key}`} className="rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-slate-300 transition-all hover:text-white light:border-slate-900/15 light:bg-white light:text-slate-600 light:shadow-sm light:hover:text-slate-900">
            ← All {def.plural}
          </Link>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="glass rounded-3xl p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {def.fields.map((f) => (
              <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
                <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">
                  {f.label}
                  {f.required && <span className="ml-1 text-rose-400">*</span>}
                </label>
                <Field
                  def={def} name={f.name} value={values[f.name] ?? f.defaultValue ?? ""}
                  onChange={(v) => set(f.name, v)}
                  pickerFor={pickerFor} setPickerFor={setPickerFor}
                />
                {f.help && <p className="mt-1.5 text-[11.5px] text-slate-600">{f.help}</p>}
              </div>
            ))}
          </div>

          {error && <p className="mt-5 rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[13px] text-rose-200">{error}</p>}
          {saved && <p className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-[13px] text-emerald-200">{saved}</p>}

          <div className="mt-6 flex flex-wrap gap-2.5 border-t border-white/[0.07] pt-5">
            {def.statusField && (
              <button onClick={() => submit("draft")} disabled={!!busy}
                className="rounded-xl border border-white/12 bg-white/[0.05] px-5 py-2.5 text-[13px] font-semibold text-slate-200 transition-all hover:border-white/25 hover:text-white light:border-slate-900/15 light:bg-white light:text-slate-700 light:shadow-sm light:hover:text-slate-900 disabled:opacity-60">
                {busy === "draft" ? "Saving…" : "Save Draft"}
              </button>
            )}
            <button onClick={() => submit("publish")} disabled={!!busy}
              className="btn-primary rounded-xl px-5 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">
              {busy === "publish" ? "Publishing…" : def.statusField ? "Publish" : "Save"}
            </button>
            {canPreview && (
              <button onClick={() => submit("preview")} disabled={!!busy}
                className="rounded-xl border border-cyan-400/25 bg-cyan-400/[0.07] px-5 py-2.5 text-[13px] font-semibold text-cyan-200 transition-all hover:bg-cyan-400/[0.12] disabled:opacity-60">
                {busy === "preview" ? "Saving…" : "Save & Preview"}
              </button>
            )}
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-6 lg:self-start">
          <div className="glass rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">State</p>
            <div className="mt-2.5 text-[13px] text-slate-300 light:text-slate-600">
              {isPublished === null ? (
                <span>Always visible once saved.</span>
              ) : isPublished ? (
                <span className="font-semibold text-emerald-300 light:text-emerald-700">● Live on the website</span>
              ) : (
                <span className="font-semibold text-amber-300 light:text-amber-700">● Draft — hidden publicly</span>
              )}
            </div>
            {id && (
              <p className="mt-2 break-all font-mono text-[11px] text-slate-600">id: {id}</p>
            )}
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Tips</p>
            <ul className="mt-2.5 space-y-1.5 text-[12.5px] leading-relaxed text-slate-400 light:text-slate-600">
              <li>• Saving refreshes the public site automatically.</li>
              <li>• Slugs must be unique and URL-safe.</li>
              <li>• Use Preview before publishing big pieces.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
