import type { Metadata } from "next";

import { getPublishedApps } from "@/lib/apps";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "Trending Apps & Games – Popular Android Apps | GenMod",

  description:
    "Discover trending Android apps and games on GenMod. Explore popular apps, latest versions, features, screenshots and Android requirements.",

  alternates: {
    canonical: `${siteUrl}/trending`,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Trending Apps & Games | GenMod",
    description:
      "Discover popular and trending Android apps and games on GenMod.",
    url: `${siteUrl}/trending`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: "Trending Apps & Games | GenMod",
    description:
      "Discover popular and trending Android apps and games on GenMod.",
  },
};

export const revalidate = 60;

export default async function TrendingPage() {
  // Get only published apps from Supabase
  const apps = await getPublishedApps();

  // Highest downloads = most trending
  const trending = [...apps].sort(
    (a, b) => b.downloads - a.downloads
  );

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
        name: "Trending Apps",
        item: `${siteUrl}/trending`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trending Android Apps and Games",
    url: `${siteUrl}/trending`,
    numberOfItems: trending.length,

    itemListElement: trending.map((app, index) => ({
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
          title="Trending Apps & Games"
          subtitle="Discover popular Android apps and games getting the most attention on GenMod."
        >
          {trending.length > 0 ? (
            <div className="app-grid">
              {trending.map((app) => (
                <AppCard
                  key={app.slug}
                  app={app}
                />
              ))}
            </div>
          ) : (
            <div className="surface rounded-[24px] p-8 text-center">
              <h2 className="text-xl font-extrabold">
                No trending apps yet
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
