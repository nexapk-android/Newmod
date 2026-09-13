import type { Metadata } from "next";

import { getPublishedApps } from "@/lib/apps";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "Latest Apps & Games – Latest Android Versions | GenMod",

  description:
    "Explore the latest Android apps and games on GenMod. Discover recently updated apps, new versions, features, screenshots and Android requirements.",

  alternates: {
    canonical: `${siteUrl}/latest`,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Latest Apps & Games | GenMod",
    description:
      "Explore recently updated Android apps and games on GenMod.",
    url: `${siteUrl}/latest`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: "Latest Apps & Games | GenMod",
    description:
      "Explore recently updated Android apps and games on GenMod.",
  },
};

export const revalidate = 60;

export default async function LatestPage() {
  // Get all published apps from Supabase.
  // They are already sorted by updated_at in getPublishedApps().
  const latestApps = await getPublishedApps();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Latest Apps",
        item: `${siteUrl}/latest`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Latest Android Apps and Games",
    url: `${siteUrl}/latest`,
    numberOfItems: latestApps.length,

    itemListElement: latestApps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: app.name,
      url: `${siteUrl}/app/${app.slug}`,
    })),
  };

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Item List Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Page Content */}
      <div className="container pt-8">
        <Section
          title="Latest Apps & Games"
          subtitle="Explore recently updated Android apps and games on GenMod."
        >
          {latestApps.length > 0 ? (
            <div className="app-grid">
              {latestApps.map((app) => (
                <AppCard
                  key={app.slug}
                  app={app}
                />
              ))}
            </div>
          ) : (
            <div className="surface rounded-[24px] p-8 text-center">
              <h2 className="text-xl font-extrabold">
                No apps available yet
              </h2>

              <p className="mt-2 text-sm text-[var(--muted)]">
                Published apps will appear here automatically.
              </p>
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
