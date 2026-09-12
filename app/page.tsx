import Link from "next/link";
import { ArrowRight, Flame, Search, Sparkles } from "lucide-react";
import { apps, categories } from "@/lib/data";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/section";

export default function HomePage() {
  return (
    <>
      <section className="container pt-8 sm:pt-12">
        <div className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-gen-50 px-3 py-1.5 text-xs font-bold text-gen-700 dark:bg-gen-500/10 dark:text-gen-500">
              <Sparkles size={14} /> Fast • Clean • Mobile first
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
              Discover apps you&apos;ll love.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              Explore a growing catalogue of apps and games through fast, detailed and easy-to-use pages.
            </p>
            <form action="/search" className="mt-6 flex max-w-2xl gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4">
                <Search size={19} className="shrink-0 text-[var(--muted)]" />
                <input name="q" placeholder="Search apps, games or publishers..." className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none" />
              </div>
              <button className="rounded-2xl bg-gen-500 px-5 font-bold text-white hover:bg-gen-600">Search</button>
            </form>
          </div>
        </div>
      </section>

      <div className="container">
        <Section title="Featured Apps" subtitle="Hand-picked releases worth checking out.">
          <div className="app-grid">{apps.slice(0, 6).map((app) => <AppCard key={app.slug} app={app} />)}</div>
        </Section>

        <Section title="Popular Categories">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.slice(0, 8).map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase()}`} className="shrink-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-bold hover:border-gen-500 hover:text-gen-500">
                {category}
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Latest Updates" subtitle="Recently updated apps and games.">
          <div className="app-grid">{[...apps].reverse().slice(0, 6).map((app) => <AppCard key={app.slug} app={app} />)}</div>
          <div className="mt-6 text-center">
            <Link href="/latest" className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-bold hover:border-gen-500">
              Load more apps <ArrowRight size={17} />
            </Link>
          </div>
        </Section>

        <Section title="Why GenMod?">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Fast discovery", "Clean pages, responsive cards and lightweight navigation."],
              ["Useful details", "Version, size, Android requirement, screenshots and changelog."],
              ["Built for mobile", "Designed around the 360–430px experience first."]
            ].map(([title, text]) => (
              <div key={title} className="surface rounded-3xl p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gen-500/10 text-gen-500"><Flame size={19} /></div>
                <h3 className="font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
