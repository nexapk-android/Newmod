import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublishedApp, getPublishedApps } from "@/lib/apps";
import { AppDetail } from "@/components/app-detail";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";
import { TelegramSupport } from "@/components/telegram-support";

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const app = await getPublishedApp(params.slug);

  if (!app) {
    return {
      title: "App Not Found | GenMod",
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

export default async function AppPage({
  params,
}: {
  params: { slug: string };
}) {
  // Load published app directly from Supabase
  const app = await getPublishedApp(params.slug);

  // If app does not exist or is not published
  if (!app) {
    notFound();
  }

  // Load other published apps for related section
  const allApps = await getPublishedApps();

  const related = allApps
    .filter(
      (item) =>
        item.slug !== app.slug &&
        item.category === app.category
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
    operatingSystem: app.android,
    softwareVersion: app.version,

    publisher: {
      "@type": "Organization",
      name: app.publisher,
    },
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

      {/* Software Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* App Details */}
      <AppDetail app={app} />

      {/* Telegram Support */}
      <div className="container mt-8">
        <TelegramSupport />
      </div>

      {/* Related Apps */}
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
