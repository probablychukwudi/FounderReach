import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrowserMock({
  url,
  compact = false,
}: {
  url: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("w-full rounded-[4px] border border-[rgba(188,202,187,0.2)] bg-surface p-[0.5px]", compact && "rounded-[3px]")}>
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(243,243,244,0.5)]" />
          <div className="absolute inset-x-0 bottom-0 top-1/2 border-t border-[rgba(188,202,187,0.2)] bg-white/70 backdrop-blur-[3px]">
            <div className={cn("space-y-1 px-2 py-2", compact && "space-y-0.5 px-1.5 py-1.5")}>
              <div className="h-1 rounded-full bg-surface-2" />
              <div className="h-1 w-2/3 rounded-full bg-surface-2" />
              <div className="h-1 w-4/5 rounded-full bg-surface-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
