import Link from "next/link";

export default function NotFound() {
  return <div className="container py-24 text-center"><h1 className="text-7xl font-black">404</h1><p className="mt-3 text-[var(--muted)]">The page you requested could not be found.</p><Link href="/" className="mt-7 inline-flex rounded-2xl bg-gen-500 px-5 py-3 font-bold text-white">Back to Home</Link></div>;
}
