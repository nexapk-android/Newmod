import Link from "next/link";
import Image from "next/image";
import { Download, Star, ShieldCheck } from "lucide-react";
import type { AppItem } from "@/lib/data";

type AppCardProps = {
  app: AppItem;
};

export default function AppCard({ app }: AppCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/app/${app.slug}`} className="block">
        <div className="flex gap-4">
          {/* App Icon */}
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={app.icon}
              alt={`${app.name} icon`}
              fill
              sizes="80px"
              className="object-cover"
            />

            {/* MOD Badge */}
            {app.modInfo?.isMod && (
              <span className="absolute right-1 top-1 rounded-md bg-green-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                MOD
              </span>
            )}
          </div>

          {/* Main Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-1">
              <h3 className="truncate text-base font-bold">
                {app.name}
              </h3>

              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                aria-label="Verified"
              />
            </div>

            <div className="mt-1 flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="font-semibold">{app.rating}</span>
              <span className="text-muted-foreground">
                ({app.votes.toLocaleString()})
              </span>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {app.category}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-2 text-sm leading-5 text-muted-foreground">
          {app.description}
        </p>

        {/* App Details */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-y py-3 text-center text-xs">
          <div>
            <p className="text-muted-foreground">Version</p>
            <p className="mt-1 font-semibold">{app.version}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="mt-1 font-semibold">{app.size}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Android</p>
            <p className="mt-1 font-semibold">{app.android}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {app.downloads.toLocaleString()}+ downloads
          </span>

          <span className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-green-700">
            <Download className="h-4 w-4" />
            Download
          </span>
        </div>
      </Link>
    </article>
  );
}
