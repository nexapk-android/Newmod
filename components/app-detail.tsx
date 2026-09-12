"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowDownToLine,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Code2,
  HardDrive,
  Share2,
  ShieldCheck,
  Star,
  Smartphone,
  Tag,
  UserRound,
} from "lucide-react";
import type { AppItem } from "@/lib/data";

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="surface rounded-2xl p-4">
      <Icon size={20} className="text-gen-500" />
      <div className="mt-3 text-xs text-[var(--muted)]">{label}</div>
      <div className="mt-1 font-extrabold">{value}</div>
    </div>
  );
}

export function AppDetail({ app }: { app: AppItem }) {
  const [open, setOpen] = useState<string | null>("Introduction");

const sections = [
  [
    "Introduction",
    `${app.name} is an Android ${app.category.toLowerCase()} application published by ${app.publisher}. Explore its latest version, features, screenshots, requirements and update information on GenMod.`,
  ],
  [
    "Features",
    app.features.length > 0
      ? app.features.join(" • ")
      : "Explore the main features and functionality available in this application.",
  ],
  [
    "What's New",
    app.changelog.length > 0
      ? app.changelog.join(" • ")
      : "Check this page for the latest version and update information.",
  ],
  [
    "How to Install",
    "Download the authorized application package from the official or authorized source, open it on your Android device and follow the installation prompts. Only install files from sources you trust.",
  ],
  [
    "How to Use",
    `Open ${app.name} after installation and follow its on-screen instructions. For detailed app-specific guidance, refer to the publisher's documentation.`,
  ],
  [
    "Requirements",
    `Android ${app.android}. Make sure your device has enough available storage for the application and its required data.`,
  ],
  [
    "FAQ",
    `What is ${app.name}? ${app.name} is a ${app.category.toLowerCase()} application published by ${app.publisher}. What Android version is required? This page lists Android ${app.android} as the current requirement. Always check the publisher's latest information before installation.`,
  ],
];

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: app.name,
        text: app.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="container pt-5 sm:pt-8">
      {/* Breadcrumb */}
      <div className="text-xs text-[var(--muted)]">
        <Link href="/" className="hover:text-gen-500">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href={`/category/${app.category
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/\s+/g, "-")}`}
          className="hover:text-gen-500"
        >
          {app.category}
        </Link>{" "}
        / {app.name}
      </div>

      {/* Hero */}
      <section className="surface mt-4 rounded-[30px] p-5 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Icon + MOD Badge */}
          <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0">
            <img
              src={app.icon}
              alt={`${app.name} icon`}
              className="h-28 w-28 rounded-[28px] object-cover shadow-card"
            />

            {app.modInfo?.isMod && (
              <span className="absolute -right-2 -top-2 rounded-lg bg-gen-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
                MOD
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                {app.name}
              </h1>

              <CheckCircle2
                size={21}
                className="text-gen-500"
                aria-label="Verified"
              />
            </div>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Crafted by {app.publisher}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                <b>{app.rating}</b>
                <span className="text-[var(--muted)]">
                  ({app.votes.toLocaleString()})
                </span>
              </span>

              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 font-semibold">
                {app.category}
              </span>

              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 font-semibold">
                v{app.version}
              </span>

              {app.modInfo?.isMod && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gen-500 px-3 py-1 font-bold text-white">
                  <ShieldCheck size={14} />
                  {app.modInfo.label || "MOD"}
                </span>
              )}
            </div>

            <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">
              {app.description}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href={app.downloadUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gen-500 px-6 font-extrabold text-white shadow-lg transition hover:bg-gen-600"
              >
                <ArrowDownToLine size={19} />
                Download APK
              </a>

              <button
                onClick={share}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border)] px-5 font-bold transition hover:bg-[var(--surface-2)]"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* App Info */}
      <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Info icon={Code2} label="Version" value={app.version} />
        <Info icon={HardDrive} label="Size" value={app.size} />
        <Info
          icon={Smartphone}
          label="Requirements"
          value={`Android ${app.android}`}
        />
        <Info icon={UserRound} label="Publisher" value={app.publisher} />
        <Info icon={Calendar} label="Last Updated" value={app.updated} />
      </section>

      {/* MOD Information */}
      {app.modInfo?.isMod && (
        <section className="surface mt-6 rounded-[30px] border border-gen-500/20 p-5 shadow-soft sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gen-500 text-white">
              <ShieldCheck size={22} />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-black tracking-[-0.025em]">
                MOD Information
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                This version is marked as {app.modInfo.label || "MOD"}.
              </p>
            </div>
          </div>

          {app.modInfo.features.length > 0 && (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {app.modInfo.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 rounded-xl bg-[var(--surface-2)] px-4 py-3 text-sm font-semibold"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-gen-500"
                  />
                  {feature}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Screenshots */}
      <section className="surface mt-6 rounded-[30px] p-5 sm:p-7">
        <h2 className="text-2xl font-black tracking-[-0.035em]">
          Screenshots
        </h2>

        <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2">
          {app.screenshots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${app.name} screenshot ${i + 1}`}
              className="h-[430px] w-[245px] shrink-0 snap-start rounded-[24px] object-cover shadow-card"
            />
          ))}
        </div>
      </section>

      {/* App Information */}
      <section className="mt-6">
        <h2 className="mb-4 text-2xl font-black tracking-[-0.035em]">
          App Information
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map(([title, body]) => (
            <div
              key={title}
              className="surface overflow-hidden rounded-2xl"
            >
              <button
                onClick={() =>
                  setOpen(open === title ? null : title)
                }
                className="flex w-full items-center justify-between p-5 text-left font-extrabold"
              >
                {title}

                <ChevronDown
                  size={19}
                  className={`transition ${
                    open === title ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === title && (
                <div className="border-t border-[var(--border)] px-5 pb-5 pt-4 text-sm leading-7 text-[var(--muted)]">
                  {body}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
