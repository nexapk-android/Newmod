import type { Metadata } from "next";

const siteUrl = "https://enmodapk.vercel.app";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the GenMod Terms of Use covering website usage, content, external links, downloads, intellectual property and limitations of liability.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Use",
    description:
      "Review the terms and conditions for using the GenMod website.",
    url: `${siteUrl}/terms`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Terms of Use",
    description:
      "Review the GenMod Terms of Use and website usage guidelines.",
  },
};

export default function TermsPage() {
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
        name: "Terms of Use",
        item: `${siteUrl}/terms`,
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
            Website guidelines
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.03em]">
            Terms of Use
          </h1>

          <p className="mt-5 leading-8 text-[var(--muted)]">
            By accessing or using GenMod, you agree to use the website
            responsibly and in accordance with these Terms of Use. If you do
            not agree with these terms, please do not use the website.
          </p>

          <p className="mt-4 text-sm text-[var(--muted)]">
            Last updated: September 2026
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Use of the website
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            GenMod provides information and discovery pages related to apps
            and games. You agree not to misuse the website, interfere with its
            operation, attempt unauthorized access, or use automated methods
            in a way that may harm the service.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            App information
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            Information displayed on GenMod may include app names, versions,
            descriptions, screenshots, requirements, features and other
            publicly available details. We aim to keep information useful and
            accurate, but we cannot guarantee that every detail will always be
            complete, current or error-free.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Downloads and external links
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            GenMod may provide links to external websites or download
            locations. External websites are operated independently and may
            have their own terms, privacy policies and security practices.
            Users should review the destination website before downloading or
            installing any software.
          </p>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            Users are responsible for ensuring that their use, download and
            installation of software complies with applicable laws and the
            relevant software publisher's terms.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Intellectual property
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            App names, logos, trademarks, icons and other brand assets belong
            to their respective owners. Unless explicitly stated otherwise,
            GenMod does not claim ownership of third-party trademarks or
            copyrighted materials displayed for identification or informational
            purposes.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Acceptable use
          </h2>

          <ul className="mt-4 space-y-3 leading-7 text-[var(--muted)]">
            <li>• Do not attempt to disrupt or damage the website.</li>
            <li>• Do not attempt unauthorized access to systems or data.</li>
            <li>• Do not use GenMod for unlawful activities.</li>
            <li>• Do not abuse automated requests or scraping in a way that harms the service.</li>
            <li>• Respect the intellectual property rights of app publishers and content owners.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-black">
            Disclaimer
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            GenMod is provided on an “as is” and “as available” basis. We do
            not guarantee uninterrupted availability, complete accuracy of
            information, or that every external link or software download will
            remain available or free from errors.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Limitation of liability
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            To the extent permitted by applicable law, GenMod and its operators
            will not be responsible for losses or damages arising from the use
            of the website, reliance on information provided on the website,
            or interactions with third-party websites and services.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Changes to these terms
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            We may update these Terms of Use when the website, features or
            services change. Updated terms will be published on this page with
            a revised update date.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Contact
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            If you have questions regarding these Terms of Use, please contact
            GenMod through the official contact page.
          </p>
        </div>
      </div>
    </>
  );
}
