import Image from "next/image";
import { cn } from "@/lib/utils";

export function FounderReachLogo({
  compact = false,
  iconOnly = false,
  className,
  wordmarkClassName,
}: {
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Image
        src="/assets/brand/founderreach-logo-mark.png"
        alt="FounderReach"
        width={compact ? 29 : 48}
        height={compact ? 31 : 52}
        className={cn("h-auto object-contain", compact ? "w-[29px]" : "w-12")}
        priority
      />
      {!iconOnly && (
        <div className={cn("font-display font-black leading-none tracking-[-0.05em] text-ink", compact ? "text-[20px]" : "text-[24px]", wordmarkClassName)}>
          FounderReach
        </div>
      )}
    </div>
  );
}
