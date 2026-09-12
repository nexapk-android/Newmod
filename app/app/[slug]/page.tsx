import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { apps, getApp } from "@/lib/data";
import { AppDetail } from "@/components/app-detail";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

const siteUrl = "https://genmod.in";

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function generateStaticParams() {
  return apps.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const app = getApp(params.slug);

  if (!app) {
    return {
      title: "App Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${app.name} – Latest Android Version`;

  const description =
    `Explore ${app.name} for Android on GenMod. View the latest version, ` +
    `features, screenshots, requirements, app information and updates.`;

  const url = `${siteUrl}/app/${app.slug}`;
  const iconUrl = absoluteUrl(app.icon);

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
      images: [
        {
          url: iconUrl,
          width: 512,
          height: 512,
          alt: `${app.name} icon`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [iconUrl],
    },
  };
}

export default function AppPage({
  params,
}: {
  params: { slug: string };
}) {
  const app = getApp(params.slug);

  if (!app) {
    notFound();
  }

  const related = apps
    .filter(
      (x) =>
        x.slug !== app.slug &&
        x.category === app.category
    )
    .slice(0, 3);

  const appUrl = `${siteUrl}/app/${app.slug}`;

  const categoryUrl = `${siteUrl}/category/${categorySlug(
    app.category
  )}`;

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
        name: app.category,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: app.name,
        item: appUrl,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: appUrl,
    image: absoluteUrl(app.icon),
    applicationCategory: app.category,
    operatingSystem: `Android ${app.android}`,
    softwareVersion: app.version,
    publisher: {
      "@type": "Organization",
      name: app.publisher,
    },
  };

  return (
    <>
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
          __html: JSON.stringify(softwareSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <AppDetail app={app} />

      {related.length > 0 && (
        <div className="container">
          <Section title="Related Apps">
            <div className="app-grid">
              {related.map((item) => (
                <AppCard
                  key={item.slug}
                  app={item}
                />
              ))}
            </div>
          </Section>
        </div>
      )}
    </>
  );
}
