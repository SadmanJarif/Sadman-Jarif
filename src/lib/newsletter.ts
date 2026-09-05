"use server";

import { insforge } from "./insforge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Stores a footer newsletter signup. Duplicate emails are treated as success. */
export async function subscribeEmail(email: string): Promise<{ ok: boolean }> {
  const clean = email.trim().toLowerCase().slice(0, 254);
  if (!EMAIL_RE.test(clean)) return { ok: false };
  try {
    const { error } = await insforge.database.from("newsletter_signups").insert([{ email: clean }]);
    if (error && !/duplicate|unique|already/i.test(error.message)) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
