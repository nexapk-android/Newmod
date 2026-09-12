import type { Metadata } from "next";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "Contact GenMod",
  description:
    "Contact GenMod for corrections, licensing questions, app information updates and general enquiries.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact GenMod",
    description:
      "Get in touch with GenMod for corrections, licensing questions, app information updates and general enquiries.",
    url: `${siteUrl}/contact`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Contact GenMod",
    description:
      "Contact GenMod for corrections, licensing questions and general enquiries.",
  },
};

export default function ContactPage() {
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
        name: "Contact GenMod",
        item: `${siteUrl}/contact`,
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
            Get in touch
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.03em]">
            Contact GenMod
          </h1>

          <p className="mt-5 leading-8 text-[var(--muted)]">
            Have a question, correction or licensing enquiry? You can contact
            the GenMod team for help with app information, content corrections
            and general enquiries.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            What can you contact us about?
          </h2>

          <ul className="mt-4 space-y-3 leading-7 text-[var(--muted)]">
            <li>• Incorrect or outdated app information</li>
            <li>• Licensing and copyright-related questions</li>
            <li>• Content correction requests</li>
            <li>• Broken links or technical issues</li>
            <li>• General questions about GenMod</li>
          </ul>

          <div className="mt-8 rounded-2xl bg-[var(--surface-2)] p-5">
            <h2 className="text-lg font-extrabold">
              Official support email
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Add your official GenMod support email address here before
              publishing the website.
            </p>
          </div>

          <p className="mt-6 text-sm leading-6 text-[var(--muted)]">
            When contacting us about an app or page, please include the
            relevant page URL and a short explanation so we can review the
            request more efficiently.
          </p>
        </div>
      </div>
    </>
  );
}
