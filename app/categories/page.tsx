import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { categories } from "@/lib/data";
import { getPublishedApps } from "@/lib/apps";

const siteUrl = "https://genmod.in";

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

export const metadata: Metadata = {
  title: "App Categories – Browse Android Apps | GenMod",

  description:
    "Browse GenMod app categories and discover Android apps by category. Explore apps, features, versions, screenshots and requirements.",

  alternates: {
    canonical: `${siteUrl}/categories`,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "App Categories | GenMod",
    description:
      "Browse Android apps by category on GenMod.",
    url: `${siteUrl}/categories`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary",
    title: "App Categories | GenMod",
    description:
      "Browse Android apps by category on GenMod.",
  },
};

export const revalidate = 60;

export default async function CategoriesPage() {
  // Get only published apps from Supabase
  const apps = await getPublishedApps();

  // Count published apps in every category
  const categoryCounts = categories.reduce(
    (counts, category) => {
      counts[category] = apps.filter(
        (app) =>
          app.category.toLowerCase() === category.toLowerCase()
      ).length;

      return counts;
    },
    {} as Record<string, number>
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
        name: "Categories",
        item: `${siteUrl}/categories`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GenMod App Categories",
    url: `${siteUrl}/categories`,
    numberOfItems: categories.length,

    itemListElement: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category,
      url: `${siteUrl}/category/${categorySlug(category)}`,
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

      {/* ItemList Structured Data */}
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
        <h1 className="section-title">
          App Categories
        </h1>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Browse Android apps by category on GenMod.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = categoryCounts[category] || 0;

            return (
              <Link
                key={category}
                href={`/category/${categorySlug(category)}`}
                className="surface flex items-center gap-4 rounded-3xl p-5 shadow-card transition hover:-translate-y-0.5 hover:border-gen-500"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gen-500/10 text-gen-500">
                  <FolderOpen size={22} />
                </span>

                <div className="min-w-0">
                  <h2 className="font-extrabold">
                    {category}
                  </h2>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {count} {count === 1 ? "app" : "apps"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
