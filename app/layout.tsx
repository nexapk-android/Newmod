import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const siteUrl = "https://enmodapk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "GenMod — Download & Enjoy",
    template: "%s | GenMod",
  },

  description:
    "GenMod is a fast, clean and mobile-friendly platform to discover apps and games, explore features, screenshots, requirements and the latest versions.",

  applicationName: "GenMod",

  authors: [
    {
      name: "GenMod",
    },
  ],

  creator: "GenMod",
  publisher: "GenMod",

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
    title: "GenMod — Download & Enjoy",
    description:
      "Discover apps and games on GenMod. Explore latest versions, features, screenshots and Android requirements.",
    url: siteUrl,
    siteName: "GenMod",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "GenMod — Download & Enjoy",
    description:
      "Discover apps and games on GenMod with clean, fast and mobile-first pages.",
  },

  category: "technology",
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
          <Header />

          <main>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
