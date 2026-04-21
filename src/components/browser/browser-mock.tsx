import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const toneFrames = {
  complete: "from-[#006d36] via-[#2d8f58] to-[#4ade80]",
  running: "from-[#f59e0b] via-[#f7b733] to-[#ffe29a]",
  ready: "from-[#c7c7c1] via-[#b3b3ab] to-[#eeeeea]",
  queued: "from-[#d0d0ca] via-[#b7b7b0] to-[#f0f0ec]",
} as const;

const previewLines = {
  complete: ["Institution mapped to founder thesis", "Contact path validated", "Funding recency confirmed"],
  running: ["Scanning live source pages", "Resolving lab and grant metadata", "Refreshing contact evidence"],
  ready: ["Draft and approval surface prepared", "Waiting for founder review", "Messaging context staged"],
  queued: ["Calendar handoff queued", "Reply monitor armed", "Scheduling step pending"],
} as const;

export function BrowserMock({
  url,
  compact = false,
  status = "queued",
}: {
  url: string;
  compact?: boolean;
  status?: "complete" | "running" | "ready" | "queued";
}) {
  const lines = previewLines[status];

  return (
    <div
      className={cn(
        "w-full rounded-[4px] bg-gradient-to-r p-[1px] shadow-[0px_0px_18px_rgba(0,0,0,0.08)]",
        toneFrames[status],
        compact && "rounded-[3px]",
      )}
    >
      <div className="overflow-hidden rounded-[4px] bg-surface p-[0.5px]">
        <div className="overflow-hidden rounded-[4px] bg-white">
          <div className="flex h-3 items-center gap-[3px] border-b border-[rgba(188,202,187,0.2)] bg-[#dadada] px-[6px]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#ff5f56]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[#ffbd2e]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[#27c93f]" />
            <div className="min-w-0 flex-1 pl-1">
              <div className="flex h-[8px] items-center justify-center rounded-[2px] bg-white px-1 text-[5px] text-ink-2">
                <Globe className="mr-1 h-[4px] w-[4px]" />
                <span className="truncate">{url}</span>
              </div>
            </div>
          </div>

          <div className={cn("relative h-24 bg-white", compact && "h-16")}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f9faf9_0%,#ffffff_55%,#f4f3f0_100%)]" />
            <div className={cn("absolute inset-x-4 top-4 rounded-full bg-[#eff2ef]", compact ? "h-[2px]" : "h-[3px]")} />
            <div className={cn("absolute inset-x-4 top-8 rounded-full bg-[#eff2ef]", compact ? "h-[2px]" : "h-[3px]")} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(243,243,244,0.6)]" />
            <div className="absolute inset-x-0 bottom-0 top-1/2 border-t border-[rgba(188,202,187,0.2)] bg-white/75 backdrop-blur-[3px]">
              <div className={cn("space-y-1 px-2 py-2", compact && "space-y-0.5 px-1.5 py-1.5")}>
                {lines.map((line) => (
                  <div key={line} className={cn("flex items-center gap-1.5", compact && "gap-1")}>
                    <span
                      className={cn(
                        "inline-flex rounded-full",
                        status === "complete" && "bg-green-dot",
                        status === "running" && "bg-amber",
                        (status === "ready" || status === "queued") && "bg-[#c6c6c6]",
                        compact ? "h-1 w-1" : "h-1.5 w-1.5",
                      )}
                    />
                    <div className="h-1 flex-1 rounded-full bg-surface-2" style={{ width: `${Math.min(100, 40 + line.length)}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
