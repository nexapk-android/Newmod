import type { Metadata } from "next";
import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { getPublishedApps } from "@/lib/apps";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Explore Android games on GENMOD.IN. Find updated games, features, screenshots, versions, requirements and more.",
  alternates: {
    canonical: `${siteUrl}/games`,
  },
  openGraph: {
    title: "Games | GENMOD.IN",
    description:
      "Explore Android games on GENMOD.IN with features, screenshots, versions and updates.",
    url: `${siteUrl}/games`,
    siteName: "GENMOD.IN - Modded APKs & Premium Android Apps",
    type: "website",
  },
};

export default async function GamesPage() {
  const allApps = await getPublishedApps();

  const games = allApps.filter(
    (app) => app.category.toLowerCase() === "games"
  );

  return (
    <div className="container">
      <section className="py-8 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 text-sm text-[var(--muted)]"
        >
          <Link href="/" className="hover:text-gen-500">
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>Games</span>
        </nav>

        <div className="surface rounded-[30px] p-6 shadow-soft sm:p-8">
          <p className="mb-2 text-sm font-bold text-gen-500">
            Android Games
          </p>

          <h1 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Games
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Discover Android games on GENMOD.IN. Explore game details,
            screenshots, versions, requirements and recent updates.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mb-5">
          <h2 className="section-title">
            Latest Games
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {games.length} published games available.
          </p>
        </div>

        {games.length > 0 ? (
          <div className="app-grid">
            {games.map((game) => (
              <AppCard key={game.slug} app={game} />
            ))}
          </div>
        ) : (
          <div className="surface rounded-3xl p-8 text-center">
            <h2 className="text-xl font-bold">
              No games available
            </h2>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Please check back soon for new games.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
