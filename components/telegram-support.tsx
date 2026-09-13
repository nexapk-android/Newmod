import {
  ArrowUpRight,
  Send,
  ShieldCheck,
} from "lucide-react";

export function TelegramSupport() {
  return (
    <a
      href="https://t.me/Genmodapk"
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[24px] border border-[#229ED9]/20 bg-[#229ED9]/10 transition duration-300 hover:-translate-y-0.5 hover:border-[#229ED9]/40 hover:bg-[#229ED9]/15"
    >
      <div className="flex items-center gap-4 p-5 sm:p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#229ED9] text-white shadow-lg shadow-[#229ED9]/20">
          <Send
            size={26}
            fill="currentColor"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black tracking-[-0.02em]">
              Join GenMod on Telegram
            </h3>

            <ShieldCheck
              size={17}
              className="shrink-0 text-[#229ED9]"
            />
          </div>

          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            Get latest app updates, news and GenMod support directly on
            Telegram.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2.5 text-sm font-extrabold text-white shadow-md shadow-[#229ED9]/20 sm:flex">
          Join Now
          <ArrowUpRight size={16} />
        </div>

        <ArrowUpRight
          size={20}
          className="shrink-0 text-[#229ED9] sm:hidden"
        />
      </div>
    </a>
  );
}
