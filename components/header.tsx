"use client";

import Link from "next/link";
import {
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    ["Home", "/"],
    ["Apps", "/apps"],
    ["Games", "/games"],
    ["FAQ", "/faq"],
    ["Latest Apps", "/latest"],
    ["Trending", "/trending"],
    ["Categories", "/categories"],
    ["Search", "/search"],
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
        <div className="container flex h-[76px] items-center justify-between gap-3">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="flex min-w-0 flex-col items-center leading-none"
          >
            <span className="text-[22px] font-extrabold tracking-[0.08em] leading-none sm:text-[26px]">
  GEN<span className="text-gen-500">MOD</span><span className="text-[0.9em]">APK</span>
</span>

            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.34em] text-[var(--muted)]">
              download & enjoy
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-2)]"
            >
              <Search size={21} />
            </Link>

            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="hidden h-11 w-11 place-items-center rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-2)] sm:grid"
            >
              {theme === "dark" ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onClick={() => setOpen(false)}
        >
          <aside
            className="h-full w-[min(88vw,360px)] overflow-y-auto bg-[var(--surface)] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
  <div>
    <div className="text-2xl font-extrabold tracking-[0.08em] leading-none">
      GEN<span className="text-gen-500">MOD</span><span className="text-[0.9em]">.IN</span>
    </div>

                <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-[var(--muted)]">
                  download & enjoy
                </div>
              </div>

              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)]"
              >
                <X size={20} />
              </button>
            </div>

            <nav
              className="mt-8 grid gap-1"
              aria-label="Main navigation"
            >
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold hover:bg-[var(--surface-2)]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="my-6 border-t border-[var(--border)]" />

            <div className="px-4 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
              Theme
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2">
              {["light", "dark", "system"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm capitalize hover:bg-[var(--surface-2)]"
                >
                  {mode}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
