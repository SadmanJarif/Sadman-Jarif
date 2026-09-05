"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setupAction, verifySetupAction } from "@/lib/admin/auth-actions";

export default function AdminSetup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [needCode, setNeedCode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [exists, setExists] = useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setExists(false);
    try {
      const r = await setupAction(email, password, name);
      if (r.ok && r.needCode) setNeedCode(true);
      else if (r.ok) router.push("/admin");
      else if (r.exists) setExists(true);
      else setError(r.message);
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await verifySetupAction(email, code);
      if (r.ok) router.push("/admin");
      else setError(r.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#04060d] px-5 py-16 text-slate-100 light:bg-[#eef1f7] light:text-slate-700">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/15 via-indigo-600/20 to-fuchsia-600/15 blur-[120px]" />
        <div className="grid-bg absolute inset-0" />
      </div>
      <div className="glass relative w-full max-w-md rounded-3xl p-8 sm:p-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-[15px] font-extrabold text-white">SJ</span>
          <span className="font-display block text-[15px] font-bold text-white light:text-slate-900">Admin Console</span>
        </Link>

        <h1 className="font-display mt-7 text-2xl font-extrabold text-white light:text-slate-900">Create the owner account.</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
          One-time setup. Only the site owner&apos;s email can register here — everyone else is turned
          away. Your password is hashed and stored by the backend; it never appears in code or logs.
        </p>

        {exists ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-5 text-center">
            <p className="text-[14px] font-semibold text-emerald-200">The owner account already exists.</p>
            <Link href="/admin/login" className="btn-primary mt-4 inline-flex rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white">
              Go to login →
            </Link>
          </div>
        ) : !needCode ? (
          <form onSubmit={create} className="mt-6 grid gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Owner email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="sadmanmubassir@gmail.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
            </div>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Display name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sadman Mubassir Jarif"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Choose a strong password</label>
              <input id="password" type="password" required autoComplete="new-password" value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters — longer is better"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
            </div>
            {error && <p className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[13px] text-rose-200">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-bold text-white disabled:opacity-60">
              {busy ? "Creating…" : "Create owner account"}
            </button>
          </form>
        ) : (
          <form onSubmit={verify} className="mt-6 grid gap-4">
            <p className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-4 py-2.5 text-[13px] text-cyan-200">
              Account created — a 6-digit verification code was emailed to you. Enter it to finish.
            </p>
            <div>
              <label htmlFor="code" className="mb-1.5 block text-[12.5px] font-semibold text-slate-300 light:text-slate-700">Verification code</label>
              <input id="code" required inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-[14px] tracking-[0.3em] text-white placeholder:text-slate-600 outline-none transition-all focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 light:border-slate-900/15 light:bg-white light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-cyan-700/50 light:focus:ring-cyan-700/20" />
            </div>
            {error && <p className="rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 py-2.5 text-[13px] text-rose-200">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-bold text-white disabled:opacity-60">
              {busy ? "Verifying…" : "Verify & enter dashboard"}
            </button>
          </form>
        )}

        <div className="mt-5 text-center text-[13px]">
          <Link href="/admin/login" className="font-medium text-slate-500 transition-colors hover:text-cyan-300">
            ← Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
