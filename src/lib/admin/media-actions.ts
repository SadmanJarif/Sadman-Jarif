"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";
import { getAdminUser, adminDb } from "./auth";
import type { ActionResult } from "./actions";

const BUCKET = "media";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"];

function slugFile(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

export async function uploadMedia(formData: FormData): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Choose an image file first." };
  if (!ALLOWED.includes(file.type)) return { ok: false, message: "Only image files (JPG, PNG, WebP, GIF, SVG, AVIF)." };
  if (file.size > MAX_BYTES) return { ok: false, message: "Image must be under 5 MB." };

  const key = `admin/${Date.now()}-${slugFile(file.name)}`;
  const client = createServerClient({ cookies: await cookies() });
  const { data, error } = await client.storage.from(BUCKET).upload(key, file);
  if (error || !data) return { ok: false, message: error?.message ?? "Upload failed." };

  const db = await adminDb();
  const { data: rows, error: dbError } = await db.from("media").insert([
    { url: data.url, key: data.key, name: file.name, mime: file.type, size_bytes: file.size },
  ]);
  if (dbError) {
    await client.storage.from(BUCKET).remove(data.key);
    return { ok: false, message: dbError.message };
  }
  try {
    await db.from("activity_log").insert([
      { actor_email: user.email, action: "Uploaded", entity: "media", entity_id: "", detail: `Media “${file.name}” uploaded` },
    ]);
  } catch { /* non-fatal */ }
  revalidatePath("/", "layout");
  const id = ((rows as Record<string, unknown>[] | null)?.[0]?.["id"] as string) ?? "";
  return { ok: true, id };
}

export async function listMediaRows() {
  const user = await getAdminUser();
  if (!user) return { ok: false as const, message: "Unauthorized" };
  const db = await adminDb();
  const { data, error } = await db.from("media").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) return { ok: false as const, message: error.message };
  return { ok: true as const, rows: (data ?? []) as Record<string, unknown>[] };
}

export async function deleteMedia(id: string, key: string): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, message: "Unauthorized" };
  const client = createServerClient({ cookies: await cookies() });
  if (key) await client.storage.from(BUCKET).remove(key);
  const db = await adminDb();
  const { error } = await db.from("media").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  try {
    await db.from("activity_log").insert([
      { actor_email: user.email, action: "Deleted", entity: "media", entity_id: id, detail: "Media deleted" },
    ]);
  } catch { /* non-fatal */ }
  revalidatePath("/", "layout");
  return { ok: true };
}
