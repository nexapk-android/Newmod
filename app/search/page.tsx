import type { Metadata } from "next";
import { Search } from "lucide-react";

import { getPublishedApps } from "@/lib/apps";
import { AppCard } from "@/components/app-card";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "Search Apps & Games | GenMod",

  description:
    "Search Android apps and games on GenMod by app name, publisher, category or description.",

  alternates: {
    canonical: `${siteUrl}/search`,
  },

  robots: {
    index: false,
    follow: true,
  },

  openGraph: {
    title: "Search Apps & Games | GenMod",
    description:
      "Search Android apps and games on GenMod.",
    url: `${siteUrl}/search`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: "Search Apps & Games | GenMod",
    description:
      "Search Android apps and games on GenMod.",
  },
};

export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim().toLowerCase();

  // Get only published apps from Supabase
  const apps = await getPublishedApps();

  const results = q
    ? apps.filter((app) =>
        [
          app.name,
          app.publisher,
          app.category,
          app.description,
        ].some((value) =>
          value.toLowerCase().includes(q)
        )
      )
    : [];

  return (
    <div className="container pt-8">
      <h1 className="section-title">
        Search Apps & Games
      </h1>

      <p className="mt-1 text-sm text-[var(--muted)]">
        Find Android apps and games by name, publisher or category.
      </p>

      <form
        action="/search"
        className="mt-5 flex gap-2"
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4">
          <Search
            size={19}
            className="text-[var(--muted)]"
          />

          <input
            autoFocus
            name="q"
            defaultValue={searchParams.q || ""}
            placeholder="Search apps, games or publishers..."
            className="min-w-0 flex-1 bg-transparent py-4 outline-none"
            aria-label="Search apps and games"
          />
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-gen-500 px-5 font-bold text-white"
        >
          Search
        </button>
      </form>

      <div className="mt-8">
        {q ? (
          <>
            <p className="mb-4 text-sm text-[var(--muted)]">
              {results.length} result(s) for{" "}
              <b className="text-[var(--text)]">
                &quot;{q}&quot;
              </b>
            </p>

            {results.length > 0 ? (
              <div className="app-grid">
                {results.map((app) => (
                  <AppCard
                    key={app.slug}
                    app={app}
                  />
                ))}
              </div>
            ) : (
              <div className="surface rounded-3xl p-10 text-center">
                <h2 className="font-bold">
                  No results found
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  Try another app name, publisher or category.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="surface rounded-3xl p-10 text-center text-[var(--muted)]">
            Type something above to search.
          </div>
        )}
      </div>
    </div>
  );
}
