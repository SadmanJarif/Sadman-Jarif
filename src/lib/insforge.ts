import { createClient } from "@insforge/sdk";

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!baseUrl || !anonKey) {
  throw new Error(
    "Missing InsForge credentials — set NEXT_PUBLIC_INSFORGE_URL and NEXT_PUBLIC_INSFORGE_ANON_KEY in .env.local"
  );
}

/**
 * Shared InsForge client (anon key, user-scoped).
 * Import anywhere client or server components need database/auth/storage access.
 * For privileged server-only code, use createAdminClient with the admin API key instead.
 */
export const insforge = createClient({ baseUrl, anonKey });
