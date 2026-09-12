import type { Metadata } from "next";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "DMCA & Copyright Policy",
  description:
    "Read the GenMod DMCA and Copyright Policy for reporting copyright concerns, requesting content review and submitting takedown notices.",
  alternates: {
    canonical: `${siteUrl}/dmca`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "DMCA & Copyright Policy",
    description:
      "Learn how to submit copyright and DMCA-related requests to GenMod.",
    url: `${siteUrl}/dmca`,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "DMCA & Copyright Policy",
    description:
      "Learn how to submit copyright-related requests to GenMod.",
  },
};

export default function DmcaPage() {
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
        name: "DMCA & Copyright",
        item: `${siteUrl}/dmca`,
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
            Copyright protection
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.03em]">
            DMCA / Copyright
          </h1>

          <p className="mt-5 leading-8 text-[var(--muted)]">
            GenMod respects the intellectual property rights of developers,
            publishers, copyright owners and other content creators. If you
            believe that material available through GenMod infringes your
            copyright, you may contact us with the relevant details so the
            matter can be reviewed.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            Copyright concerns
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            Copyright owners or their authorized representatives may submit a
            copyright complaint when they believe specific material on the
            website infringes their rights.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            What to include in a request
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            To help us review a request efficiently, please provide as much of
            the following information as applicable:
          </p>

          <ul className="mt-4 space-y-3 leading-7 text-[var(--muted)]">
            <li>• Your name and contact information</li>
            <li>• Identification of the copyrighted work</li>
            <li>• The exact URL or location of the material in question</li>
            <li>• An explanation of why you believe the material infringes your copyright</li>
            <li>• A statement confirming that the information provided is accurate</li>
            <li>• Confirmation that you are authorized to act for the copyright owner, where applicable</li>
          </ul>

          <h2 className="mt-8 text-2xl font-black">
            Review and action
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            After receiving a sufficiently detailed copyright complaint, GenMod
            may review the reported material and take appropriate action where
            warranted. This may include removing or disabling access to
            material that is determined to infringe applicable rights.
          </p>

          <h2 className="mt-8 text-2xl font-black">
            False or incomplete requests
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            Please do not submit false, misleading or fraudulent copyright
            complaints. Requests should be submitted by the copyright owner or
            an authorized representative and should contain enough information
            for the reported material to be identified and reviewed.
          </p>

          <div className="mt-8 rounded-2xl bg-[var(--surface-2)] p-5">
            <h2 className="text-lg font-extrabold">
              Official copyright contact
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Add your official copyright/DMCA contact email here before
              publishing the website. Do not publish a placeholder email.
            </p>
          </div>

          <h2 className="mt-8 text-2xl font-black">
            Important notice
          </h2>

          <p className="mt-4 leading-8 text-[var(--muted)]">
            This page provides general information about GenMod&apos;s
            copyright complaint process and is not legal advice. Make sure
            this policy and your actual takedown process comply with the laws
            and regulations applicable to your website and business.
          </p>
        </div>
      </div>
    </>
  );
}
