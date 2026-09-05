"use server";

import { cookies } from "next/headers";
import { createAuthActions, createServerClient } from "@insforge/sdk/ssr";
import { ADMIN_EMAIL } from "./config";

export type AuthResult = { ok: true } | { ok: false; message: string };

function clean(message: string, fallback: string): string {
  if (/already|exists|registered/i.test(message)) return "An account with this email already exists — please log in instead.";
  if (/invalid|incorrect|password|credentials|unauthorized|not found/i.test(message))
    return "Incorrect email or password.";
  return fallback;
}

export async function loginAction(email: string, password: string): Promise<AuthResult> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
    // Generic message: never reveal which emails are admins.
    return { ok: false, message: "Incorrect email or password." };
  }
  const auth = createAuthActions({ cookies: await cookies() });
  const { data, error } = await auth.signInWithPassword({ email: email.trim(), password });
  if (error || !data?.user) {
    return { ok: false, message: clean(error?.message ?? "", "Sign in failed. Please try again.") };
  }
  if (data.user.email?.toLowerCase() !== ADMIN_EMAIL) {
    await auth.signOut();
    return { ok: false, message: "Incorrect email or password." };
  }
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  const auth = createAuthActions({ cookies: await cookies() });
  await auth.signOut();
}

export async function setupAction(
  email: string,
  password: string,
  name: string
): Promise<{ ok: true; needCode: boolean } | { ok: false; message: string; exists?: boolean }> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
    return { ok: false, message: "Setup is only available for the site owner's email address." };
  }
  if (password.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters." };
  }
  const auth = createAuthActions({ cookies: await cookies() });
  const { data, error } = await auth.signUp({ email: email.trim(), password, name: name.trim() || "Admin" });
  if (error) {
    const msg = error.message ?? "";
    if (/already|exists|registered/i.test(msg)) return { ok: false, message: "", exists: true };
    return { ok: false, message: clean(msg, "Account creation failed. Please try again.") };
  }
  if (data?.requireEmailVerification) return { ok: true, needCode: true };
  return { ok: true, needCode: false };
}

export async function verifySetupAction(email: string, otp: string): Promise<AuthResult> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
    return { ok: false, message: "Verification is only available for the site owner's email address." };
  }
  const auth = createAuthActions({ cookies: await cookies() });
  const { data, error } = await auth.verifyEmail({ email: email.trim(), otp: otp.trim() });
  if (error || !data?.user) {
    return { ok: false, message: "Invalid or expired code. Request a fresh setup or try again." };
  }
  return { ok: true };
}

export async function resetRequestAction(email: string): Promise<AuthResult> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
    // Same generic response either way — no account enumeration.
    return { ok: true };
  }
  const client = createServerClient({ cookies: await cookies() });
  await client.auth.sendResetPasswordEmail({ email: email.trim() });
  return { ok: true };
}

export async function resetConfirmAction(
  email: string,
  code: string,
  newPassword: string
): Promise<AuthResult> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL || newPassword.length < 6) {
    return { ok: false, message: "Invalid request." };
  }
  const client = createServerClient({ cookies: await cookies() });
  const { data, error } = await client.auth.exchangeResetPasswordToken({ email: email.trim(), code: code.trim() });
  if (error || !data?.token) {
    return { ok: false, message: "Invalid or expired code. Please request a new one." };
  }
  const done = await client.auth.resetPassword({ newPassword, otp: data.token });
  if (done.error) return { ok: false, message: "Could not set the new password. Please try again." };
  return { ok: true };
}
