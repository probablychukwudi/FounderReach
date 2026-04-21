import { cn } from "@/lib/utils";

export function FounderReachLogo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-grad-top to-grad-bot shadow-card">
        <span className="absolute inset-[7px] rounded-[10px] border border-white/25" />
        <span className="h-4 w-4 rounded-full bg-green-dot shadow-[0_0_18px_rgba(74,222,128,0.65)]" />
      </div>
      {!compact && (
        <div>
          <div className="font-display text-[22px] font-black leading-none tracking-[-0.06em] text-ink">
            FounderReach
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
            Partnership Intelligence OS
          </div>
        </div>
      )}
    </div>
  );
}
