import Link from "next/link";
import { Download, Star, ShieldCheck } from "lucide-react";
import type { AppItem } from "@/lib/data";

export function AppCard({ app }: { app: AppItem }) {
  return (
    <article className="surface rounded-[24px] p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex gap-3">
        {/* App Icon */}
        <div className="relative h-[68px] w-[68px] shrink-0">
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            className="h-[68px] w-[68px] rounded-[18px] object-cover"
          />

          {/* MOD Badge */}
          {app.modInfo?.isMod && (
            <span className="absolute -right-2 -top-2 rounded-md bg-gen-500 px-1.5 py-0.5 text-[9px] font-black uppercase leading-none text-white shadow-md">
              MOD
            </span>
          )}
        </div>

        {/* App Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/app/${app.slug}`}
              className="line-clamp-1 text-[17px] font-extrabold tracking-[-0.02em] hover:text-gen-500"
            >
              {app.name}
            </Link>

            <ShieldCheck
              size={18}
              className="shrink-0 text-gen-500"
              aria-label="Verified"
            />
          </div>

          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
            <b>{app.rating}</b>

            <span className="text-[var(--muted)]">
              ({app.votes.toLocaleString()})
            </span>
          </div>

          <span className="mt-1 inline-block text-xs font-semibold text-[var(--muted)]">
            {app.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-5 text-[var(--muted)]">
        {app.description}
      </p>

      {/* App Details */}
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[var(--surface-2)] p-3 text-xs">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Version
          </div>
          <b>{app.version}</b>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Size
          </div>
          <b>{app.size}</b>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Android
          </div>
          <b>{app.android}</b>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
        <span className="text-xs text-[var(--muted)]">
          Updated {app.updated}
        </span>

        <Link
          href={`/app/${app.slug}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gen-500 px-4 text-sm font-bold text-white shadow-sm hover:bg-gen-600"
        >
          <Download size={16} />
          Download
        </Link>
      </div>
    </article>
  );
}
