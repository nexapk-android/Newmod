import type { Metadata } from "next";
import Link from "next/link";
import { AppCard } from "@/components/app-card";
import { getPublishedApps } from "@/lib/apps";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Explore Android apps on GENMOD.IN. Find updated apps, features, screenshots, versions, requirements and more.",
  alternates: {
    canonical: `${siteUrl}/apps`,
  },
  openGraph: {
    title: "Apps | GENMOD.IN",
    description:
      "Explore Android apps on GENMOD.IN with features, screenshots, versions and updates.",
    url: `${siteUrl}/apps`,
    siteName: "GENMOD.IN - Modded APKs & Premium Android Apps",
    type: "website",
  },
};

export default async function AppsPage() {
  const allApps = await getPublishedApps();

  const apps = allApps.filter(
    (app) => app.category.toLowerCase() !== "games"
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

          <span>Apps</span>
        </nav>

        <div className="surface rounded-[30px] p-6 shadow-soft sm:p-8">
          <p className="mb-2 text-sm font-bold text-gen-500">
            Android Apps
          </p>

          <h1 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Apps
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Explore the latest Android apps on GENMOD.IN. Browse app
            details, versions, screenshots, requirements and updates.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mb-5">
          <h2 className="section-title">
            Latest Apps
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            {apps.length} published apps available.
          </p>
        </div>

        {apps.length > 0 ? (
          <div className="app-grid">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        ) : (
          <div className="surface rounded-3xl p-8 text-center">
            <h2 className="text-xl font-bold">
              No apps available
            </h2>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Please check back soon for new apps.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
