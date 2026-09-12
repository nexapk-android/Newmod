import type { Metadata } from "next";

import { apps } from "@/lib/data";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

const siteUrl = "https://enmodapk.vercel.app";

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

export default function TrendingPage() {
  const trending = [...apps].sort(
    (a, b) => b.votes - a.votes
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
      {/* Structured Data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

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
          <div className="app-grid">
            {trending.map((app) => (
              <AppCard
                key={app.slug}
                app={app}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
