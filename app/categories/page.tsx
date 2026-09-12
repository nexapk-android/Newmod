import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { categories } from "@/lib/data";

export const metadata = { title: "Categories", description: "Browse GenMod app categories." };

export default function CategoriesPage() {
  return (
    <div className="container pt-8">
      <h1 className="section-title">Categories</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">Browse apps by category.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category} href={`/category/${category.toLowerCase()}`} className="surface flex items-center gap-4 rounded-3xl p-5 shadow-card hover:border-gen-500">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gen-500/10 text-gen-500"><FolderOpen size={22} /></span>
            <div><h2 className="font-extrabold">{category}</h2><p className="mt-1 text-xs text-[var(--muted)]">Explore {category.toLowerCase()} apps</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
