import type { MetadataRoute } from "next";
import { categories } from "@/lib/data";
import { getPublishedApps } from "@/lib/apps";

const siteUrl = "https://genmod.in";

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

function getValidDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${siteUrl}/apps`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },

    {
      url: `${siteUrl}/games`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },

    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: `${siteUrl}/latest`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/trending`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },

    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },

    {
      url: `${siteUrl}/dmca`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const categoryUrls: MetadataRoute.Sitemap =
    categories.map((category) => ({
      url: `${siteUrl}/category/${categorySlug(category)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const publishedApps = await getPublishedApps();

  const appUrls: MetadataRoute.Sitemap =
    publishedApps.map((app) => ({
      url: `${siteUrl}/app/${app.slug}`,
      lastModified: getValidDate(app.updated),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    ...staticUrls,
    ...categoryUrls,
    ...appUrls,
  ];
}
