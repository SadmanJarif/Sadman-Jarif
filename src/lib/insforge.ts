import { createClient } from "@insforge/sdk";

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ?? "";

/** False on deploys without InsForge env vars — cms.ts then serves static fallback data. */
export const isInsforgeConfigured = baseUrl.length > 0 && anonKey.length > 0;

/**
 * Shared InsForge client (anon key, user-scoped).
 * Never throws at import time so `next build` succeeds without credentials.
 * Import anywhere client or server components need database/auth/storage access.
 * For privileged server-only code, use createAdminClient with the admin API key instead.
 */
export const insforge = createClient({
  baseUrl: baseUrl || "https://localhost",
  anonKey: anonKey || "unconfigured",
});
