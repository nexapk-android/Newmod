"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  HardDrive,
  Heart,
  Instagram,
  Send,
  Share2,
  ShieldCheck,
  Star,
  Smartphone,
  Tag,
  UserRound,
  X,
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

      <div className="mt-3 text-xs text-[var(--muted)]">
        {label}
      </div>

      <div className="mt-1 font-extrabold">
        {value}
      </div>
    </div>
  );
}

type Task = {
  id: string;
  title: string;
  description: string;
  button: string;
  url: string;
  icon: "telegram" | "instagram" | "reel";
};

export function AppDetail({ app }: { app: AppItem }) {
  const [open, setOpen] = useState<string | null>("Introduction");

  const [showTasks, setShowTasks] = useState(false);

  const [completedTasks, setCompletedTasks] = useState<string[]>(
    []
  );

  const [verifyingTask, setVerifyingTask] = useState<string | null>(
    null
  );

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

  const tasks: Task[] = [
    app.taskTelegramEnabled && {
      id: "telegram",
      title: "Join GenMod on Telegram",
      description:
        "Join our Telegram channel to get the latest GenMod updates and announcements.",
      button: "Join Telegram",
      url: app.taskTelegramUrl,
      icon: "telegram",
    },
    app.taskInstagramEnabled && {
      id: "instagram",
      title: "Follow GenMod on Instagram",
      description:
        "Follow the Instagram account to stay updated with GenMod content.",
      button: "Follow Instagram",
      url: app.taskInstagramUrl,
      icon: "instagram",
    },
    app.taskReelEnabled && {
      id: "reel",
      title: "Like & Comment on our Reel",
      description:
        "Open Instagram, like the Reel and leave a good comment to support GenMod.",
      button: "Open Reel",
      url: app.taskReelUrl,
      icon: "reel",
    },
  ].filter(Boolean) as Task[];

  const completedCount = completedTasks.length;

  const allCompleted =
    completedCount === tasks.length;

  const taskProtectionActive =
    app.taskPopupEnabled && tasks.length > 0;

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: app.name,
        text: app.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );
    }
  };

  const verifyTask = (task: Task) => {
    if (completedTasks.includes(task.id)) {
      return;
    }

    if (verifyingTask !== null) {
      return;
    }

    window.open(
      task.url,
      "_blank",
      "noopener,noreferrer"
    );

    setVerifyingTask(task.id);

    window.setTimeout(() => {
      setCompletedTasks((current) =>
        current.includes(task.id)
          ? current
          : [...current, task.id]
      );

      setVerifyingTask(null);
    }, 6000);
  };

  const continueDownload = () => {
    if (!allCompleted) {
      return;
    }

    window.location.href = app.downloadUrl;
  };

  return (
    <>
      <div className="container pt-5 sm:pt-8">

        {/* Breadcrumb */}
        <div className="text-xs text-[var(--muted)]">
          <Link
            href="/"
            className="hover:text-gen-500"
          >
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

            {/* App Icon */}
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

                {/* Download Button */}
                <button
                  onClick={() => {
                    if (taskProtectionActive) {
                      setShowTasks(true);
                    } else {
                      continueDownload();
                    }
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gen-500 px-6 font-extrabold text-white shadow-lg transition hover:bg-gen-600"
                >
                  <ArrowDownToLine size={19} />
                  Download APK
                </button>

                {/* Share */}
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

          <Info
            icon={Code2}
            label="Version"
            value={app.version}
          />

          <Info
            icon={HardDrive}
            label="Size"
            value={app.size}
          />

          <Info
            icon={Smartphone}
            label="Requirements"
            value={`Android ${app.android}`}
          />

          <Info
            icon={UserRound}
            label="Publisher"
            value={app.publisher}
          />

          <Info
            icon={Calendar}
            label="Last Updated"
            value={app.updated}
          />

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
                  This version is marked as{" "}
                  {app.modInfo.label || "MOD"}.
                </p>

              </div>

            </div>

            {app.modInfo.features.length > 0 && (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">

                {app.modInfo.features.map(
                  (feature) => (
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
                  )
                )}

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

            {app.screenshots.map(
              (src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${app.name} screenshot ${i + 1}`}
                  className="h-[430px] w-[245px] shrink-0 snap-start rounded-[24px] object-cover shadow-card"
                />
              )
            )}

          </div>
        </section>

        {/* App Information */}
        <section className="mt-6">

          <h2 className="mb-4 text-2xl font-black tracking-[-0.035em]">
            App Information
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">

            {sections.map(
              ([title, body]) => (
                <div
                  key={title}
                  className="surface overflow-hidden rounded-2xl"
                >

                  <button
                    onClick={() =>
                      setOpen(
                        open === title
                          ? null
                          : title
                      )
                    }
                    className="flex w-full items-center justify-between p-5 text-left font-extrabold"
                  >
                    {title}

                    <ChevronDown
                      size={19}
                      className={`transition ${
                        open === title
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {open === title && (
                    <div className="border-t border-[var(--border)] px-5 pb-5 pt-4 text-sm leading-7 text-[var(--muted)]">
                      {body}
                    </div>
                  )}

                </div>
              )
            )}

          </div>
        </section>
      </div>

      {/* ================================================= */}
      {/* DOWNLOAD TASK POPUP */}
      {/* ================================================= */}

      {showTasks && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="relative max-h-[88vh] w-full max-w-sm overflow-y-auto rounded-[26px] border border-white/10 bg-[#101313] text-white shadow-2xl">

            {/* Top Left X */}
            <button
              onClick={() =>
                setShowTasks(false)
              }
              className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={17} />
            </button>

            {/* Top Right X */}
            <button
              onClick={() =>
                setShowTasks(false)
              }
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={17} />
            </button>

            {/* Header */}
            <div className="border-b border-white/10 px-5 pb-4 pt-14">

              <div className="text-center">

                <div className="inline-flex items-center gap-2 rounded-full bg-gen-500/15 px-3 py-1.5 text-[10px] font-black tracking-wide text-gen-400">
                  <ShieldCheck size={13} />
                  QUICK UNLOCK
                </div>

                <h2 className="mt-3 text-xl font-black tracking-[-0.035em]">
                  Unlock your download
                </h2>

                <p className="mx-auto mt-1.5 max-w-[280px] text-xs leading-5 text-white/50">
                  Complete these quick tasks to continue to your download.
                </p>

              </div>

              {/* Progress */}
              <div className="mt-4">

                <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold">

                  <span className="text-white/40">
                    Progress
                  </span>

                  <span className="text-gen-400">
                    {completedCount}/{tasks.length}
                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                  <div
                    className="h-full rounded-full bg-gen-500 transition-all duration-500"
                    style={{
                      width: `${
                        (completedCount /
                          tasks.length) *
                        100
                      }%`,
                    }}
                  />

                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-2.5 p-4">

              {tasks.map(
                (task, index) => {
                  const completed =
                    completedTasks.includes(
                      task.id
                    );

                  const verifying =
                    verifyingTask === task.id;

                  return (
                    <div
                      key={task.id}
                      className={`rounded-[18px] border p-3 transition-all duration-500 ${
                        completed
                          ? "border-emerald-400/30 bg-emerald-400/10"
                          : verifying
                            ? "border-gen-500/30 bg-gen-500/10"
                            : "border-white/10 bg-white/[0.035]"
                      }`}
                    >

                      <div className="flex gap-3">

                        {/* Task Icon */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                            completed
                              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                              : verifying
                                ? "bg-gen-500 text-white"
                                : task.icon ===
                                    "telegram"
                                  ? "bg-[#229ED9] text-white"
                                  : task.icon ===
                                      "instagram"
                                    ? "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white"
                                    : "bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 text-white"
                          }`}
                        >

                          {completed ? (
                            <Check
                              size={18}
                              strokeWidth={3}
                            />
                          ) : task.icon ===
                            "telegram" ? (
                            <Send
                              size={17}
                              fill="currentColor"
                            />
                          ) : task.icon ===
                            "instagram" ? (
                            <Instagram size={18} />
                          ) : (
                            <Heart
                              size={18}
                              fill="currentColor"
                            />
                          )}

                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <div>

                              <div className="text-[9px] font-black uppercase tracking-wider text-white/35">
                                Task {index + 1}
                              </div>

                              <h3 className="mt-0.5 text-[13px] font-extrabold leading-5">
                                {task.title}
                              </h3>

                            </div>

                            {completed && (
                              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8px] font-black text-emerald-400">
                                VERIFIED
                              </span>
                            )}

                          </div>

                          <p className="mt-1 text-[10px] leading-4 text-white/45">
                            {task.description}
                          </p>

                          {!completed ? (
                            <div className="mt-2.5">

                              <button
                                onClick={() =>
                                  verifyTask(task)
                                }
                                disabled={
                                  verifyingTask !==
                                  null
                                }
                                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[10px] font-extrabold text-white transition-all duration-300 ${
                                  verifying
                                    ? "cursor-wait bg-gen-500/80"
                                    : task.icon ===
                                        "telegram"
                                      ? "bg-[#229ED9] hover:-translate-y-0.5 hover:bg-[#1d8fc4]"
                                      : task.icon ===
                                          "instagram"
                                        ? "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] hover:-translate-y-0.5"
                                        : "bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 hover:-translate-y-0.5"
                                }`}
                              >

                                {verifying ? (
                                  <>
                                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                    Verifying...
                                  </>
                                ) : (
                                  <>
                                    {task.button}

                                    <ArrowUpRight
                                      size={11}
                                    />
                                  </>
                                )}

                              </button>

                              {verifying && (
                                <div className="mt-2 flex items-center gap-1.5 text-[9px] font-semibold text-white/40">

                                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gen-400" />

                                  Verifying your action, please wait...

                                </div>
                              )}

                            </div>
                          ) : (
                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-black text-emerald-400">

                              <CheckCircle2 size={13} />

                              Verified successfully

                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {/* Continue */}
              <div className="pt-1">

                <button
                  onClick={continueDownload}
                  disabled={!allCompleted}
                  className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-xs font-black transition-all duration-300 ${
                    allCompleted
                      ? "bg-gen-500 text-white shadow-lg shadow-gen-500/20 hover:-translate-y-0.5 hover:bg-gen-600"
                      : "cursor-not-allowed bg-white/10 text-white/25"
                  }`}
                >

                  {allCompleted ? (
                    <>
                      <ArrowDownToLine size={16} />
                      Continue to Download
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={15} />
                      Complete all tasks to unlock
                    </>
                  )}

                </button>

                <p className="mt-2 text-center text-[9px] leading-4 text-white/25">
                  Complete the tasks above to unlock your download.
                </p>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
