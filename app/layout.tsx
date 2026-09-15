import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const siteUrl = "https://genmod.in";

const siteDescription =
  "GENMOD.IN - Free MOD APKS, MOD Games, & Premium Apps | 100% Working Downloads.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "GENMOD.IN",
    template: "%s | GENMOD.IN",
  },

  description: siteDescription,

  applicationName: "GENMOD.IN",

  authors: [
    {
      name: "GENMOD.IN",
    },
  ],

  creator: "GENMOD.IN",
  publisher: "GENMOD.IN",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

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

  category: "technology",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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

          <Header />

          <main>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
