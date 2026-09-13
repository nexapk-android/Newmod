"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AppWindow,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email ?? "");
      }
    };

    loadUser();
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-[80vh] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-gen-500">
              GenMod Admin
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Dashboard
            </h1>

            {email && (
              <p className="mt-1 text-sm text-[var(--muted)]">
                {email}
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-bold transition hover:bg-[var(--surface-2)]"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="surface rounded-2xl p-5">
            <AppWindow
              size={22}
              className="text-gen-500"
            />

            <p className="mt-4 text-sm text-[var(--muted)]">
              Total Apps
            </p>

            <p className="mt-1 text-3xl font-black">
              —
            </p>
          </div>

          <div className="surface rounded-2xl p-5">
            <AppWindow
              size={22}
              className="text-gen-500"
            />

            <p className="mt-4 text-sm text-[var(--muted)]">
              Published
            </p>

            <p className="mt-1 text-3xl font-black">
              —
            </p>
          </div>

          <div className="surface rounded-2xl p-5">
            <Settings
              size={22}
              className="text-gen-500"
            />

            <p className="mt-4 text-sm text-[var(--muted)]">
              Drafts
            </p>

            <p className="mt-1 text-3xl font-black">
              —
            </p>
          </div>
        </div>

        {/* Actions */}
        <section className="mt-6">
          <h2 className="text-xl font-black">
            Quick Actions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/admin/apps/new"
              className="surface group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gen-500 text-white">
                <Plus size={22} />
              </div>

              <h3 className="mt-4 text-lg font-black">
                Add New App
              </h3>

              <p className="mt-1 text-sm text-[var(--muted)]">
                Create a new app entry for GenMod.
              </p>
            </Link>

            <Link
              href="/admin/apps"
              className="surface group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-2)]">
                <AppWindow
                  size={22}
                  className="text-gen-500"
                />
              </div>

              <h3 className="mt-4 text-lg font-black">
                Manage Apps
              </h3>

              <p className="mt-1 text-sm text-[var(--muted)]">
                View, edit and manage your app entries.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
