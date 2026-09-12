"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="min-h-[80vh] px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="surface rounded-[30px] p-6 shadow-soft sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gen-500 text-white shadow-lg">
            <LockKeyhole size={25} />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-3xl font-black tracking-[-0.04em]">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Sign in to manage GenMod apps.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Admin email"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 outline-none transition focus:border-gen-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 outline-none transition focus:border-gen-500"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gen-500 px-5 font-extrabold text-white shadow-lg transition hover:bg-gen-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={18} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
