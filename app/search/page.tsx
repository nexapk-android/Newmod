import { Search } from "lucide-react";
import { apps } from "@/lib/data";
import { AppCard } from "@/components/app-card";

export const metadata = { title: "Search Apps", description: "Search apps and games on GenMod." };

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || "").trim().toLowerCase();
  const results = q ? apps.filter((a) => [a.name, a.publisher, a.category, a.description].some((v) => v.toLowerCase().includes(q))) : [];

  return (
    <div className="container pt-8">
      <h1 className="section-title">Search</h1>
      <form action="/search" className="mt-5 flex gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4">
          <Search size={19} className="text-[var(--muted)]" />
          <input autoFocus name="q" defaultValue={searchParams.q || ""} placeholder="Search apps, games or publishers..." className="min-w-0 flex-1 bg-transparent py-4 outline-none" />
        </div>
        <button className="rounded-2xl bg-gen-500 px-5 font-bold text-white">Search</button>
      </form>

      <div className="mt-8">
        {q ? (
          <>
            <p className="mb-4 text-sm text-[var(--muted)]">{results.length} result(s) for <b className="text-[var(--text)]">&quot;{q}&quot;</b></p>
            {results.length ? <div className="app-grid">{results.map((app) => <AppCard key={app.slug} app={app} />)}</div> : <div className="surface rounded-3xl p-10 text-center"><h2 className="font-bold">No results found</h2><p className="mt-2 text-sm text-[var(--muted)]">Try another app name or category.</p></div>}
          </>
        ) : <div className="surface rounded-3xl p-10 text-center text-[var(--muted)]">Type something above to search.</div>}
      </div>
    </div>
  );
}
