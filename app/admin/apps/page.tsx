"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Edit3,
  Plus,
  Search,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

type AppRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  publisher: string;
  version: string;
  published: boolean;
};

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApps() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("apps")
        .select(
          "id, name, slug, category, publisher, version, published"
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setApps(data ?? []);
      }

      setLoading(false);
    }

    loadApps();
  }, []);

  const filteredApps = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return apps;

    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        app.publisher.toLowerCase().includes(query)
    );
  }, [apps, search]);

  async function deleteApp(id: string, name: string) {
    const confirmed = window.confirm(
      `Delete "${name}" permanently?`
    );

    if (!confirmed) return;

    const supabase = createClient();

    const { error } = await supabase
      .from("apps")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setApps((current) =>
      current.filter((app) => app.id !== id)
    );
  }

  return (
    <main className="min-h-[80vh] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-gen-500"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Manage Apps
            </h1>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Manage your GenMod app entries.
            </p>
          </div>

          <Link
            href="/admin/apps/new"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gen-500 px-5 text-sm font-extrabold text-white shadow-lg hover:bg-gen-600"
          >
            <Plus size={18} />
            Add App
          </Link>
        </div>

        {/* Search */}
        <div className="relative mt-6">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search apps, categories or publishers..."
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] py-3 pl-11 pr-4 outline-none focus:border-gen-500"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* Apps */}
        <div className="mt-6 space-y-3">
          {loading ? (
            <div className="surface rounded-2xl p-6 text-sm text-[var(--muted)]">
              Loading apps...
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="surface rounded-2xl p-8 text-center">
              <p className="font-bold">
                No apps found.
              </p>

              <p className="mt-1 text-sm text-[var(--muted)]">
                Add your first app to get started.
              </p>
            </div>
          ) : (
            filteredApps.map((app) => (
              <article
                key={app.id}
                className="surface rounded-2xl p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-black">
                        {app.name}
                      </h2>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                          app.published
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}
                      >
                        {app.published
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                      <span>{app.category}</span>
                      <span>{app.publisher}</span>
                      <span>v{app.version}</span>
                    </div>

                    <p className="mt-1 truncate text-xs text-[var(--muted)]">
                      /app/{app.slug}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/admin/apps/${app.id}/edit`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm font-bold hover:bg-[var(--surface-2)]"
                    >
                      <Edit3 size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteApp(app.id, app.name)
                      }
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-500/20 px-3 text-sm font-bold text-red-600 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
