import Link from "next/link";
import {
  ArrowUpRight,
  Send,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2">
          <div className="text-3xl font-black tracking-[-0.05em]">
            <span className="text-gen-500">G</span>enMod
          </div>

          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            Discover apps and games through clean, fast and mobile-first
            pages. Only publish software and files you are authorized to
            distribute.
          </p>

          {/* Telegram Support */}
          <a
            href="https://t.me/Genmodapk"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-[#229ED9]/20 bg-[#229ED9]/10 p-4 transition hover:-translate-y-0.5 hover:border-[#229ED9]/40 hover:bg-[#229ED9]/15"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#229ED9] text-white shadow-lg shadow-[#229ED9]/20">
              <Send size={21} fill="currentColor" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-extrabold">
                  GenMod Telegram
                </p>

                <ShieldCheck
                  size={15}
                  className="text-[#229ED9]"
                />
              </div>

              <p className="mt-0.5 text-xs text-[var(--muted)]">
                Join our official channel for updates & support
              </p>
            </div>

            <ArrowUpRight
              size={18}
              className="shrink-0 text-[#229ED9] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-bold">
            Explore
          </h3>

          <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
            <Link
              href="/latest"
              className="transition hover:text-gen-500"
            >
              Latest Apps
            </Link>

            <Link
              href="/trending"
              className="transition hover:text-gen-500"
            >
              Trending
            </Link>

            <Link
              href="/categories"
              className="transition hover:text-gen-500"
            >
              Categories
            </Link>

            <Link
              href="/search"
              className="transition hover:text-gen-500"
            >
              Search
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold">
            Company
          </h3>

          <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
            <Link
              href="/about"
              className="transition hover:text-gen-500"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-gen-500"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-gen-500"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-gen-500"
            >
              Terms
            </Link>

            <Link
              href="/dmca"
              className="transition hover:text-gen-500"
            >
              DMCA
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border)]">
        <div className="container flex flex-col gap-2 py-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} GenMod. All rights reserved.
          </span>

          <span>
            Built for speed • Mobile first • SEO ready
          </span>
        </div>
      </div>
    </footer>
  );
}
