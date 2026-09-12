import type { MetadataRoute } from "next";
import { apps, categories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/latest`, lastModified: new Date() },
    { url: `${base}/trending`, lastModified: new Date() },
    { url: `${base}/categories`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    { url: `${base}/dmca`, lastModified: new Date() },
    ...categories.map((c) => ({ url: `${base}/category/${c.toLowerCase()}`, lastModified: new Date() })),
    ...apps.map((a) => ({ url: `${base}/app/${a.slug}`, lastModified: new Date(a.updated) }))
  ];
}
