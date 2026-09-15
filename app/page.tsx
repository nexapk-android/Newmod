import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Star,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { categories } from "@/lib/data";
import { getPublishedApps } from "@/lib/apps";
import { TelegramSupport } from "@/components/telegram-support";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

const siteUrl = "https://genmod.in";
const siteDescription =
  "GENMOD.IN - Free MOD APKS, MOD Games, & Premium Apps | 100% Working Downloads.";

function categorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

export const metadata: Metadata = {
  title: "GENMOD.IN",

  description: siteDescription,

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "GENMOD.IN",
    description: siteDescription,
    url: siteUrl,
    siteName: "GENMOD.IN - Modded APKs & Premium Android Apps",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "GENMOD.IN",
    description: siteDescription,
  },
};
export default async function HomePage() {
  const apps = await getPublishedApps();
  const trendingApps = [...apps]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GENMOD.IN - Modded APKs & Premium Android Apps",
  alternateName: "GENMOD.IN",
  url: siteUrl,
  description: siteDescription,
};

  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GENMOD.IN",
  url: siteUrl,
};

  return (
    <>
      {/* Homepage Structured Data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* Trending Hero */}
      <section className="container pt-8 sm:pt-12">
        <div className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-soft">
          <div className="border-b border-[var(--border)] px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gen-500/10 px-3 py-1.5 text-xs font-bold text-gen-500">
                  <TrendingUp size={14} />
                  Popular right now
                </div>

                <h1 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">
                  🔥 Trending on GenMod
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-base">
                  Discover popular Android apps and games getting the most
                  attention on GenMod.
                </p>
              </div>

              <Link
                href="/trending"
                className="inline-flex w-fit items-center gap-2 text-sm font-bold text-gen-500 hover:text-gen-600"
              >
                View all trending
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Trending Cards */}
          <div className="grid gap-3 p-3 sm:grid-cols-3 sm:gap-4 sm:p-5">
            {trendingApps.map((app, index) => (
              <Link
                key={app.slug}
                href={`/app/${app.slug}`}
                className="group relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-4 transition duration-200 hover:-translate-y-1 hover:border-gen-500/40 hover:shadow-soft"
              >
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--surface)] text-sm font-black shadow-sm">
                  {index + 1}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={app.icon}
                    alt={`${app.name} icon`}
                    className="h-[64px] w-[64px] shrink-0 rounded-[18px] object-cover shadow-sm"
                  />

                  <div className="min-w-0 pr-8">
                    <div className="flex items-center gap-1.5">
                      <h2 className="line-clamp-1 text-[17px] font-extrabold tracking-[-0.02em] group-hover:text-gen-500">
                        {app.name}
                      </h2>

                      <ShieldCheck
                        size={16}
                        className="shrink-0 text-gen-500"
                      />
                    </div>

                    <p className="mt-1 text-xs font-semibold text-[var(--muted)]">
                      {app.category}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <b>{app.rating}</b>

                      <span className="text-[var(--muted)]">
                        · {app.votes.toLocaleString()} downloads
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-5 text-[var(--muted)]">
                  {app.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    v{app.version}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gen-500">
                    Explore
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* Featured */}
        <Section
          title="Featured Apps"
          subtitle="Explore popular Android apps and games selected for GenMod."
        >
          <div className="app-grid">
            {apps.slice(0, 6).map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </Section>

        {/* Categories */}
        <Section
          title="Popular Categories"
          subtitle="Browse Android apps by category."
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category}
                href={`/category/${categorySlug(category)}`}
                className="shrink-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-bold transition hover:border-gen-500 hover:text-gen-500"
              >
                {category}
              </Link>
            ))}
          </div>
        </Section>

        {/* Latest */}
        <Section
          title="Latest Updates"
          subtitle="Explore recently updated Android apps and games."
        >
          <div className="app-grid">
            {[...apps]
              .reverse()
              .slice(0, 6)
              .map((app) => (
                <AppCard key={app.slug} app={app} />
              ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/latest"
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-bold transition hover:border-gen-500 hover:text-gen-500"
            >
              Load more apps
              <ArrowRight size={17} />
            </Link>
          </div>
        </Section>

                {/* Telegram Support */}
        <Section
          title="Stay Connected"
          subtitle="Get GenMod updates, news and support on Telegram."
        >
          <TelegramSupport />
        </Section>

        {/* Why GenMod */}
        <Section title="Why GenMod?">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [
                "Fast discovery",
                "Clean pages, responsive cards and lightweight navigation.",
              ],
              [
                "Useful details",
                "Version, size, Android requirement, screenshots and changelog.",
              ],
              [
                "Built for mobile",
                "Designed around the 360–430px experience first.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="surface rounded-3xl p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gen-500/10 text-gen-500">
                  <Flame size={19} />
                </div>

                <h3 className="font-extrabold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
