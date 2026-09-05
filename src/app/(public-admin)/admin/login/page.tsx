"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginAction, resetRequestAction, resetConfirmAction } from "@/lib/admin/auth-actions";

type Mode = "login" | "forgot" | "reset";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    try {
      if (mode === "login") {
        const r = await loginAction(email, password);
        if (r.ok) router.push(safeNext);
        else setError(r.message);
      } else if (mode === "forgot") {
        await resetRequestAction(email);
        setInfo("If that email belongs to the admin account, a 6-digit code is on its way.");
        setMode("reset");
      } else {
        const r = await resetConfirmAction(email, code, password);
        if (r.ok) {
          setInfo("Password updated — please log in with the new password.");
          setMode("login");
          setPassword("");
          setCode("");
        } else setError(r.message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#04060d] px-5 py-16 text-slate-100 light:bg-[#eef1f7] light:text-slate-700">
      <div className="pointer-events-none absolute inset-0 light:opacity-60">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-fuchsia-600/15 blur-[120px]" />
        <div className="grid-bg absolute inset-0" />
      </div>
      <div className="glass relative w-full max-w-md rounded-3xl p-8 sm:p-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-[15px] font-extrabold text-white">SJ</span>
          <span>
            <span className="font-display block text-[15px] font-bold text-white light:text-slate-900">Admin Console</span>
            <span className="block text-[11.5px] text-slate-500">sadmanmubassirjarif · private area</span>
          </span>
        </Link>

        <h1 className="font-display mt-7 text-2xl font-extrabold text-white light:text-slate-900">
          {mode === "login" ? "Welcome back." : mode === "forgot" ? "Reset password." : "Enter the code."}
        </h1>
        <p className="mt-2 text-[13.5px] text-slate-400">
          {mode === "login"
            ? "Sign in with the site owner's credentials to manage content."
            : mode === "forgot"
              ? "A verification code will be emailed to the admin address."
              : "Check the admin inbox for the 6-digit code, then set a new password."}
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Admin email</label>
            <input id="email" type="email" required autoComplete="username" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
          </div>
          {mode === "reset" && (
            <div>
              <label htmlFor="code" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">6-digit code</label>
              <input id="code" required inputMode="numeric" value={code}
                onChange={(e) => setCode(e.target.value)} placeholder="123456"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] tracking-[0.3em] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
            </div>
          )}
          {mode !== "forgot" && (
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">
                {mode === "reset" ? "New password" : "Password"}
              </label>
              <input id="password" type="password" required autoComplete={mode === "reset" ? "new-password" : "current-password"}
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
            </div>
          )}
          {error && <p className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[13px] text-rose-200">{error}</p>}
          {info && <p className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-[13px] text-emerald-200">{info}</p>}
          <button type="submit" disabled={busy} className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-bold text-white disabled:opacity-60">
            {busy ? "Working…" : mode === "login" ? "Log in" : mode === "forgot" ? "Send code" : "Set new password"}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-[13px]">
          {mode === "login" ? (
            <button onClick={() => { setMode("forgot"); setError(""); setInfo(""); }} className="font-medium text-slate-500 transition-colors hover:text-cyan-300">
              Forgot password?
            </button>
          ) : (
            <button onClick={() => { setMode("login"); setError(""); setInfo(""); }} className="font-medium text-slate-500 transition-colors hover:text-cyan-300">
              ← Back to login
            </button>
          )}
          <Link href="/admin/setup" className="font-medium text-slate-500 transition-colors hover:text-cyan-300">
            First time? Set up →
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function AdminLogin() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
