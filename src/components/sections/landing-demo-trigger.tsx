"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

type LandingDemoTriggerProps = {
  label?: string;
  className?: string;
  iconClassName?: string;
};

export function LandingDemoTrigger({
  label = "Play Demo",
  className,
  iconClassName,
}: LandingDemoTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-2 rounded-[8px] border border-[#d7dbd8] bg-white px-5 py-2.5 text-base font-medium tracking-[-0.025em] text-ink transition hover:border-[#bccabb] hover:bg-[#f7f7f7]",
          className,
        )}
      >
        <Play className={cn("h-4 w-4 fill-current", iconClassName)} />
        <span>{label}</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0f1311]/80 px-4 py-8 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative z-[1] w-full max-w-[1120px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0f1311] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-white">
              <div>
                <div className="text-sm font-semibold tracking-[0.08em] text-[#4ade80]">FounderReach Demo</div>
                <div className="mt-1 text-sm text-white/70">
                  Watch the product workflow from match to booked meeting.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Close demo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-[#0b0f0d] p-3 sm:p-5">
              <video
                key={open ? "founderreach-demo-open" : "founderreach-demo-closed"}
                className="aspect-video w-full rounded-[18px] bg-black object-cover"
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster="/assets/demo/founderreach-demo-poster.jpg"
              >
                <source src="/assets/demo/founderreach-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
