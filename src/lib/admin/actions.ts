"use server";

import { revalidatePath } from "next/cache";
import { ENTITIES } from "./config";
import { getAdminUser, adminDb } from "./auth";
import { markdownToBlocks, estimateReadTime } from "./markdown";

export type ActionResult = { ok: true; id?: string } | { ok: false; message: string };

function err(message: string): ActionResult {
  return { ok: false, message };
}

function rowTitle(entity: string, row: Record<string, unknown>): string {
  const def = ENTITIES[entity];
  if (!def) return "item";
  return String(row[def.titleField] ?? "item").slice(0, 80);
}

/** Normalize form values to DB columns (arrays, image pairs, markdown blocks). */
function normalize(entity: string, values: Record<string, unknown>): Record<string, unknown> {
  const def = ENTITIES[entity];
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    const v = values[f.name];
    if (v === undefined) continue;
    switch (f.type) {
      case "tags":
      case "lines":
        out[f.name] = Array.isArray(v) ? v.map(String).filter((s) => s.trim()) : [];
        break;
      case "boolean":
        out[f.name] = v === true || v === "true";
        break;
      case "number":
        out[f.name] = Number(v) || 0;
        break;
      case "image": {
        const obj = (v ?? {}) as { url?: string; key?: string };
        out[`${f.name}_url`] = obj.url ?? "";
        out[`${f.name}_key`] = obj.key ?? "";
        break;
      }
      case "markdown":
        if (entity === "posts" && f.name === "content") {
          out[f.name] = markdownToBlocks(String(v ?? ""));
        } else {
          out[f.name] = String(v ?? "");
        }
        break;
      default:
        out[f.name] = typeof v === "string" ? v : String(v ?? "");
    }
  }
  if (entity === "posts" && !out["read_time"] && typeof values["content"] === "string") {
    out["read_time"] = estimateReadTime(values["content"]);
  }
  return out;
}

async function log(entity: string, action: string, entityId: string, detail: string) {
  try {
    const user = await getAdminUser();
    const db = await adminDb();
    await db.from("activity_log").insert([
      { actor_email: user?.email ?? "admin", action, entity, entity_id: entityId, detail },
    ]);
  } catch {
    /* activity logging must never break the mutation */
  }
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function getRows(entity: string) {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const def = ENTITIES[entity];
  if (!def) return { ok: false as const, message: "Unknown entity" };
  const db = await adminDb();
  const { data, error } = await db.from(def.table).select("*").order(def.defaultSort, { ascending: true });
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, rows: (data ?? []) as Record<string, unknown>[] };
}

export async function getRow(entity: string, id: string) {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const def = ENTITIES[entity];
  if (!def) return { ok: false as const, message: "Unknown entity" };
  const db = await adminDb();
  const { data, error } = await db.from(def.table).select("*").eq("id", id);
  if (error) return { ok: false as const, message: error.message };
  const row = (data as Record<string, unknown>[] | null)?.[0];
  if (!row) return { ok: false as const, message: "Not found" };
  return { ok: true as const, row };
}

export async function saveRow(
  entity: string,
  id: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return err("Unauthorized");
  const def = ENTITIES[entity];
  if (!def) return err("Unknown entity");
  const payload = normalize(entity, values);

  // Required-field check
  for (const f of def.fields) {
    if (f.required && !String(payload[f.name] ?? "").trim()) {
      return err(`${f.label} is required`);
    }
  }

  const db = await adminDb();
  if (id) {
    if (entity === "posts" && payload["status"] === "published") {
      const existing = await db.from(def.table).select("status,published_at").eq("id", id);
      const prev = (existing.data as Record<string, unknown>[] | null)?.[0];
      if (prev && prev["status"] !== "published" && !prev["published_at"]) {
        payload["published_at"] = new Date().toISOString();
      }
    }
    const { error } = await db.from(def.table).update(payload).eq("id", id);
    if (error) {
      if (error.message.includes("duplicate") || error.message.includes("unique")) {
        return err("That slug is already used — pick a unique one.");
      }
      return err(error.message);
    }
    await log(entity, "Updated", id, `${def.singular} “${rowTitle(entity, { ...values, ...payload })}” updated`);
    revalidateSite();
    return { ok: true, id };
  }

  if (entity === "posts" && payload["status"] === "published" && !payload["published_at"]) {
    payload["published_at"] = new Date().toISOString();
  }
  const { data, error } = await db.from(def.table).insert([payload]);
  if (error) {
    if (error.message.includes("duplicate") || error.message.includes("unique")) {
      return err("That slug is already used — pick a unique one.");
    }
    return err(error.message);
  }
  const newId = ((data as Record<string, unknown>[] | null)?.[0]?.["id"] as string) ?? "";
  await log(entity, "Created", newId, `${def.singular} “${rowTitle(entity, { ...values, ...payload })}” created`);
  revalidateSite();
  return { ok: true, id: newId };
}

export async function deleteRow(entity: string, id: string): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return err("Unauthorized");
  const def = ENTITIES[entity];
  if (!def) return err("Unknown entity");
  const db = await adminDb();

  // Best-effort: remove associated cover from storage
  try {
    const existing = await db.from(def.table).select("cover_key,title").eq("id", id);
    const row = (existing.data as Record<string, unknown>[] | null)?.[0];
    const key = row?.["cover_key"] as string | undefined;
    if (key) {
      const { createServerClient } = await import("@insforge/sdk/ssr");
      const { cookies } = await import("next/headers");
      const client = createServerClient({ cookies: await cookies() });
      await client.storage.from("media").remove(key);
    }
    if (row) await log(entity, "Deleted", id, `${def.singular} “${rowTitle(entity, row)}” deleted`);
  } catch {
    /* fall through to row delete */
  }

  const { error } = await db.from(def.table).delete().eq("id", id);
  if (error) return err(error.message);
  revalidateSite();
  return { ok: true };
}

export async function toggleRow(
  entity: string,
  id: string,
  field: string,
  value: boolean | string
): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return err("Unauthorized");
  const def = ENTITIES[entity];
  if (!def) return err("Unknown entity");
  const db = await adminDb();
  const patch: Record<string, unknown> = { [field]: value };
  if (entity === "posts" && field === "status" && value === "published") {
    const existing = await db.from(def.table).select("published_at").eq("id", id);
    const prev = (existing.data as Record<string, unknown>[] | null)?.[0];
    if (prev && !prev["published_at"]) patch["published_at"] = new Date().toISOString();
  }
  const { error } = await db.from(def.table).update(patch).eq("id", id);
  if (error) return err(error.message);
  await log(entity, "Updated", id, `${def.singular} ${field} → ${String(value)}`);
  revalidateSite();
  return { ok: true };
}

export async function getActivity(limit = 50) {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const { data, error } = await db
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, rows: (data ?? []) as Record<string, unknown>[] };
}

export async function getDashboardStats() {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const counts: Record<string, number> = {};
  const tables = [
    "projects", "posts", "experience", "education", "skills", "certifications",
    "eca_activities", "research_notes", "site_updates", "media",
    "journey_milestones", "goals", "now_items", "uses_items", "ideas",
  ];
  await Promise.all(
    tables.map(async (t) => {
      const { data } = await db.from(t).select("id").limit(1000);
      counts[t] = (data as unknown[])?.length ?? 0;
    })
  );
  const posts = (await db.from("posts").select("status").limit(1000)).data as
    | { status: string }[]
    | null;
  const published = posts?.filter((p) => p.status === "published").length ?? 0;
  const recent = await getActivity(8);
  return {
    ok: true as const,
    counts,
    publishedPosts: published,
    draftPosts: (posts?.length ?? 0) - published,
    recent: recent.ok ? recent.rows : [],
  };
}
