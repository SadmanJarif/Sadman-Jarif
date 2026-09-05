"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/lib/admin/auth-actions";
import { ADMIN_EMAIL } from "@/lib/admin/config";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await loginAction(ADMIN_EMAIL, password);
      if (r.ok) router.push(safeNext);
      else setError(r.message);
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
          Welcome back.
        </h1>
        <p className="mt-2 text-[13.5px] text-slate-400">
          Sign in with the site owner&apos;s credentials to manage content.
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Admin email</label>
            <input id="email" type="email" readOnly value={ADMIN_EMAIL} autoComplete="username"
              className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-slate-400 outline-none light:border-slate-900/15 light:bg-slate-900/[0.03] light:text-slate-500" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">
              Password
            </label>
            <input id="password" type="password" required autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
          </div>
          {error && <p className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[13px] text-rose-200">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-bold text-white disabled:opacity-60">
            {busy ? "Working…" : "Log in"}
          </button>
        </form>
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
