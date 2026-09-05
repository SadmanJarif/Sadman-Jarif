"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser, adminDb } from "./auth";
import type { ActionResult } from "./actions";

async function log(db: Awaited<ReturnType<typeof adminDb>>, email: string, action: string, detail: string) {
  try {
    await db.from("activity_log").insert([
      { actor_email: email, action, entity: "site", entity_id: "", detail },
    ]);
  } catch { /* non-fatal */ }
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ---------------- settings (key/value) ---------------- */

export async function getSettings() {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const { data, error } = await db.from("site_settings").select("key,value").limit(200);
  if (error) return { ok: false as const, message: error.message };
  const out: Record<string, string> = {};
  for (const r of (data ?? []) as { key: string; value: string }[]) out[r.key] = r.value;
  return { ok: true as const, settings: out };
}

export async function saveSettings(values: Record<string, string>): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  const db = await adminDb();
  for (const [key, value] of Object.entries(values)) {
    const updated = await db.from("site_settings").update({ value }).eq("key", key);
    const rows = (updated.data as unknown[] | null) ?? [];
    if (rows.length === 0) {
      const inserted = await db.from("site_settings").insert([{ key, value }]);
      if (inserted.error) return { ok: false, message: inserted.error.message };
    } else if (updated.error) {
      return { ok: false, message: updated.error.message };
    }
  }
  await log(db, user.email, "Updated", "Website settings updated");
  revalidateSite();
  return { ok: true };
}

/* ---------------- navigation ---------------- */

export type NavRow = { id?: string; label: string; href: string; location: string; sort: number; visible: boolean };

export async function getNav() {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const { data, error } = await db.from("nav_items").select("*").order("sort", { ascending: true }).limit(200);
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, rows: (data ?? []) as Record<string, unknown>[] };
}

export async function saveNav(items: NavRow[]): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  for (const it of items) {
    if (!it.label.trim() || !it.href.trim()) return { ok: false, message: "Every nav item needs a label and a link." };
  }
  const db = await adminDb();
  const del = await db.from("nav_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (del.error) return { ok: false, message: del.error.message };
  if (items.length > 0) {
    const ins = await db.from("nav_items").insert(
      items.map((it, i) => ({ label: it.label.trim(), href: it.href.trim(), location: it.location, sort: i, visible: it.visible }))
    );
    if (ins.error) return { ok: false, message: ins.error.message };
  }
  await log(db, user.email, "Updated", "Navigation updated");
  revalidateSite();
  return { ok: true };
}

/* ---------------- homepage sections ---------------- */

export async function getHomepageSections() {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const { data, error } = await db.from("homepage_sections").select("*").order("sort", { ascending: true }).limit(100);
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, rows: (data ?? []) as Record<string, unknown>[] };
}

export async function saveHomepageSections(rows: { id: string; enabled: boolean; sort: number }[]): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  const db = await adminDb();
  for (const r of rows) {
    const { error } = await db.from("homepage_sections").update({ enabled: r.enabled, sort: r.sort }).eq("id", r.id);
    if (error) return { ok: false, message: error.message };
  }
  await log(db, user.email, "Updated", "Homepage layout updated");
  revalidateSite();
  return { ok: true };
}

/* ---------------- SEO ---------------- */

export async function getSeo() {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const { data, error } = await db.from("page_seo").select("*").order("path", { ascending: true }).limit(200);
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, rows: (data ?? []) as Record<string, unknown>[] };
}

export async function saveSeo(
  rows: { id?: string; path: string; title: string; description: string; keywords: string; og_image: string; noindex: boolean }[]
): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  const db = await adminDb();
  for (const r of rows) {
    if (!r.path.trim()) return { ok: false, message: "Every SEO entry needs a path." };
    const payload = {
      path: r.path.trim(), title: r.title, description: r.description,
      keywords: r.keywords, og_image: r.og_image, noindex: r.noindex,
    };
    if (r.id) {
      const { error } = await db.from("page_seo").update(payload).eq("id", r.id);
      if (error) return { ok: false, message: error.message };
    } else {
      const { error } = await db.from("page_seo").insert([payload]);
      if (error) return { ok: false, message: error.message };
    }
  }
  await log(db, user.email, "Updated", "SEO settings updated");
  revalidateSite();
  return { ok: true };
}

export async function deleteSeo(id: string): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  const db = await adminDb();
  const { error } = await db.from("page_seo").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateSite();
  return { ok: true };
}
