import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { apps, categories } from "@/lib/data";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

const siteUrl = "https://enmodapk.vercel.app";

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

function getCategoryFromSlug(slug: string) {
  return categories.find(
    (category) => categorySlug(category) === slug
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: categorySlug(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategoryFromSlug(params.slug);

  if (!category) {
    return {
      title: "Category Not Found | GenMod",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${category} Apps – Latest Android Apps | GenMod`;

  const description =
    `Explore the latest ${category.toLowerCase()} apps on GenMod. ` +
    `Discover app features, versions, screenshots, requirements and updates for Android.`;

  const url = `${siteUrl}/category/${categorySlug(category)}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "GenMod",
      type: "website",
      locale: "en_US",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategoryFromSlug(params.slug);

  if (!category) {
    notFound();
  }

  const items = apps.filter(
    (app) =>
      app.category.toLowerCase() === category.toLowerCase()
  );

  const categoryUrl = `${siteUrl}/category/${categorySlug(category)}`;

  /*
   * Breadcrumb Schema
   */
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
        name: `${category} Apps`,
        item: categoryUrl,
      },
    ],
  };

  /*
   * ItemList Schema
   */
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category} Apps`,
    url: categoryUrl,
    numberOfItems: items.length,

    itemListElement: items.map((app, index) => ({
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

      {/* Category Content */}

      <div className="container pt-8">
        <Section
          title={`${category} Apps`}
          subtitle={`Browse the latest ${category.toLowerCase()} apps on GenMod.`}
        >
          {items.length ? (
            <div className="app-grid">
              {items.map((app) => (
                <AppCard
                  key={app.slug}
                  app={app}
                />
              ))}
            </div>
          ) : (
            <div className="surface rounded-3xl p-8 text-center text-[var(--muted)]">
              No apps in this category yet.
            </div>
          )}
        </Section>
      </div>
    </>
  );
}
