import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="text-3xl font-black tracking-[-0.05em]"><span className="text-gen-500">G</span>enMod</div>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            Discover apps and games through clean, fast and mobile-first pages.
            Only publish software and files you are authorized to distribute.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
            <Link href="/latest">Latest Apps</Link>
            <Link href="/trending">Trending</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/search">Search</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Company</h3>
          <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/dmca">DMCA</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="container flex flex-col gap-2 py-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} GenMod. All rights reserved.</span>
          <span>Built for speed • Mobile first • SEO ready</span>
        </div>
      </div>
    </footer>
  );
}
