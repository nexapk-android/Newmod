import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://genmod.in";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to frequently asked questions about GENMOD.IN, Android apps, games, versions, updates and website features.",
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: "FAQ | GENMOD.IN",
    description:
      "Find answers to frequently asked questions about GENMOD.IN and Android apps and games.",
    url: `${siteUrl}/faq`,
    siteName: "GENMOD.IN - Modded APKs & Premium Android Apps",
    type: "website",
  },
};

const faqs = [
  [
    "What is GENMOD.IN?",
    "GENMOD.IN is an Android app and game discovery website where visitors can explore app information, versions, screenshots, requirements and updates.",
  ],
  [
    "Where can I find Android apps?",
    "You can browse Android apps from the Apps section and explore individual app pages and categories.",
  ],
  [
    "Where can I find Android games?",
    "You can browse Android games from the Games section or explore games through available categories.",
  ],
  [
    "How can I find the latest updates?",
    "Visit the Latest section to discover recently updated apps and games available on GENMOD.IN.",
  ],
  [
    "Can I search for an app or game?",
    "Yes. Use the Search page from the website navigation to look for available apps and games.",
  ],
  [
    "Where can I find app screenshots and requirements?",
    "Individual app pages may include screenshots, version information, file size, Android requirements, features and changelog information.",
  ],
  [
    "How can I contact GENMOD.IN?",
    "Visit the Contact page for the available contact information and support options.",
  ],
] as const;

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <div className="container">
        <section className="py-8 sm:py-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-sm text-[var(--muted)]"
          >
            <Link href="/" className="hover:text-gen-500">
              Home
            </Link>

            <span className="mx-2">/</span>

            <span>FAQ</span>
          </nav>

          <div className="surface rounded-[30px] p-6 shadow-soft sm:p-8">
            <p className="mb-2 text-sm font-bold text-gen-500">
              Help Center
            </p>

            <h1 className="text-3xl font-black tracking-[-0.045em] sm:text-5xl">
              FAQ
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
              Find answers to common questions about GENMOD.IN,
              apps, games, updates and website features.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl pb-12">
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="surface rounded-2xl p-5"
              >
                <summary className="cursor-pointer list-none pr-6 text-base font-extrabold sm:text-lg">
                  {question}
                </summary>

                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
