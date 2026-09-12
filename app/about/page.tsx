import type { Metadata } from "next";

const siteUrl = "https://enmodapk.vercel.app";

export const metadata: Metadata = {
  title: "About GenMod",
  description:
    "Learn about GenMod, a mobile-first platform for discovering Android apps and games with clean pages, useful information and a fast browsing experience.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About GenMod",
    description:
      "Learn about GenMod and our focus on a clean, fast and useful Android app discovery experience.",
    url: `${siteUrl}/about`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "About GenMod",
    description:
      "Learn about GenMod and our mobile-first Android app discovery platform.",
  },
};

export default function AboutPage() {
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
        name: "About GenMod",
        item: `${siteUrl}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="container pt-10">
        <div className="surface max-w-3xl rounded-[30px] p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-gen-500">
            About GenMod
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.03em]">
            About GenMod
          </h1>

          <p className="mt-5 leading-8 text-[var(--muted)]">
            GenMod is a mobile-first app discovery platform focused on clean
            pages, useful software information and a fast browsing experience.
          </p>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            Our goal is to make it easier to discover Android apps and games,
            compare important information and quickly find details such as
            versions, requirements, features and screenshots.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            What you can find on GenMod
          </h2>

          <ul className="mt-4 space-y-3 leading-7 text-[var(--muted)]">
            <li>• Android apps and games organized by category</li>
            <li>• App versions, sizes and Android requirements</li>
            <li>• Features, screenshots and app information</li>
            <li>• Latest and trending app updates</li>
            <li>• Fast, mobile-friendly browsing experience</li>
          </ul>

          <h2 className="mt-8 text-2xl font-black">
            Our approach
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            GenMod is designed with simplicity, speed and usability in mind.
            We aim to present app information in a clear format so visitors
            can understand an app before choosing whether to download or use
            it.
          </p>
        </div>
      </div>
    </>
  );
}
