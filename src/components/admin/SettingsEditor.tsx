"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/lib/admin/site-actions";
import { inputCls, PageHeader } from "@/components/admin/ui";

const GROUPS: { title: string; keys: { key: string; label: string; area?: boolean }[] }[] = [
  { title: "Website", keys: [{ key: "site_name", label: "Website name" }] },
  {
    title: "Profile",
    keys: [
      { key: "profile_name", label: "Profile name" },
      { key: "profile_tagline", label: "Tagline" },
    ],
  },
  {
    title: "Hero (homepage top)",
    keys: [
      { key: "hero_badge", label: "Badge line" },
      { key: "hero_l1", label: "Headline line 1" },
      { key: "hero_l2", label: "Headline line 2" },
      { key: "hero_l3", label: "Headline line 3" },
      { key: "hero_l4", label: "Headline line 4" },
      { key: "hero_description", label: "Description", area: true },
      { key: "hero_location", label: "Location line" },
    ],
  },
  {
    title: "About section",
    keys: [
      { key: "about_heading", label: "Heading" },
      { key: "about_text", label: "Paragraphs (blank line between paragraphs)", area: true },
    ],
  },
  {
    title: "Vision",
    keys: [
      { key: "vision_title", label: "Title" },
      { key: "vision_text", label: "Text", area: true },
    ],
  },
  {
    title: "Contact",
    keys: [
      { key: "contact_headline", label: "Headline" },
      { key: "contact_text", label: "Intro text", area: true },
      { key: "contact_email", label: "Contact email" },
    ],
  },
  {
    title: "Social links",
    keys: [
      { key: "social_github", label: "GitHub URL" },
      { key: "social_linkedin", label: "LinkedIn URL" },
    ],
  },
  {
    title: "Footer & misc",
    keys: [
      { key: "footer_text", label: "Footer text", area: true },
      { key: "now_updated", label: "Now page — last updated label" },
      { key: "resume_url", label: "Resume URL (empty = use /resume page)" },
    ],
  },
];

export default function SettingsEditor({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const save = async () => {
    setBusy(true);
    setMsg(null);
    const r = await saveSettings(values);
    setBusy(false);
    if (!r.ok) setMsg({ ok: false, text: r.message });
    else {
      setMsg({ ok: true, text: "Settings saved — live on the website." });
      router.refresh();
    }
  };

  return (
    <div>
      <PageHeader
        title="Website Settings"
        desc="Identity, hero, about, vision, contact, socials and footer."
        action={
          <button onClick={save} disabled={busy} className="btn-primary rounded-full px-6 py-2.5 text-[13px] font-bold text-white disabled:opacity-60">
            {busy ? "Saving…" : "Save all settings"}
          </button>
        }
      />
      {msg && (
        <p className={`mt-4 rounded-xl border px-4 py-2.5 text-[13px] ${msg.ok ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-rose-400/25 bg-rose-400/10 text-rose-200"}`}>
          {msg.text}
        </p>
      )}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.title} className="glass h-fit rounded-3xl p-6">
            <h2 className="font-display text-[15px] font-bold text-white light:text-slate-900">{g.title}</h2>
            <div className="mt-4 grid gap-4">
              {g.keys.map((k) => (
                <div key={k.key}>
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">{k.label}</label>
                  {k.area ? (
                    <textarea rows={4} value={values[k.key] ?? ""}
                      onChange={(e) => setValues({ ...values, [k.key]: e.target.value })}
                      className={`${inputCls} resize-y`} />
                  ) : (
                    <input value={values[k.key] ?? ""}
                      onChange={(e) => setValues({ ...values, [k.key]: e.target.value })}
                      className={inputCls} />
                  )}
                  <p className="mt-1 font-mono text-[10.5px] text-slate-700">{k.key}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
