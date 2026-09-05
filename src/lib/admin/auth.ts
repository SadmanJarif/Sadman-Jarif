"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@insforge/sdk/ssr";
import { ADMIN_EMAIL } from "./config";

export type AdminUser = { id: string; email: string };

async function serverClient() {
  return createServerClient({ cookies: await cookies() });
}

/** Returns the signed-in admin user, or null. Never throws. */
export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const client = await serverClient();
    const { data, error } = await client.auth.getCurrentUser();
    const user = data?.user;
    if (error || !user || !user.email || user.email.toLowerCase() !== ADMIN_EMAIL) return null;
    return { id: user.id, email: user.email };
  } catch {
    return null;
  }
}

/** Guard for admin layout/pages: redirects non-admins to login. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Raw server client for admin data access (RLS enforces admin-only writes). */
export async function adminDb() {
  const client = await serverClient();
  return client.database;
}
