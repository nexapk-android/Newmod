import type { Metadata } from "next";

const siteUrl = "https://enmodapk.vercel.app";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the GenMod Privacy Policy to understand how information may be collected, used and protected when you visit our website.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how GenMod handles information, cookies, logs and third-party services.",
    url: `${siteUrl}/privacy`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description:
      "Read the GenMod Privacy Policy and learn how information is handled.",
  },
};

export default function PrivacyPage() {
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
        name: "Privacy Policy",
        item: `${siteUrl}/privacy`,
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
            Your privacy matters
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.03em]">
            Privacy Policy
          </h1>

          <p className="mt-5 leading-8 text-[var(--muted)]">
            This Privacy Policy explains how GenMod may handle information
            when you visit and use our website. We aim to keep the browsing
            experience simple, transparent and respectful of your privacy.
          </p>

          <p className="mt-4 text-sm text-[var(--muted)]">
            Last updated: September 2026
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Information we may collect
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            Depending on how the website is configured, basic technical
            information such as browser type, device information, approximate
            usage information and server logs may be processed to operate,
            secure and improve the website.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Cookies and similar technologies
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            GenMod may use cookies or similar technologies when required for
            website functionality, preferences, analytics or other services.
            The exact cookies used depend on the services enabled on the
            website.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Analytics and third-party services
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            If analytics, advertising, hosting, security or other third-party
            services are enabled, those services may process information in
            accordance with their own privacy policies. Any third-party
            services used by GenMod should be listed and updated here as the
            website evolves.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            How information may be used
          </h2>

          <ul className="mt-4 space-y-3 leading-7 text-[var(--muted)]">
            <li>• To operate and maintain the GenMod website</li>
            <li>• To improve website performance and usability</li>
            <li>• To detect and prevent abuse or security issues</li>
            <li>• To understand general website usage when analytics are enabled</li>
            <li>• To respond to messages sent through official contact channels</li>
          </ul>

          <h2 className="mt-8 text-2xl font-black">
            Data security
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            We take reasonable measures to protect information processed
            through the website. However, no internet service can guarantee
            complete security of information transmitted or stored online.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            External links
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            GenMod may contain links to external websites or services. We are
            not responsible for the privacy practices, content or security of
            websites that are operated by third parties. We recommend
            reviewing their privacy policies before providing personal
            information.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Changes to this policy
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            This Privacy Policy may be updated when our website, features or
            third-party services change. Any updated version will be published
            on this page with a revised update date.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Contact
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            If you have questions about this Privacy Policy, please contact
            GenMod through the official contact page.
          </p>
        </div>
      </div>
    </>
  );
}
