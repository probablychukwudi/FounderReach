import Image from "next/image";
import { BrowserMock } from "@/components/browser/browser-mock";
import { cn } from "@/lib/utils";
import type { AgentBlueprint } from "@/types";

const artworkById = {
  match: "/assets/figma/dashboard/match-card.png",
  qualify: "/assets/figma/dashboard/qualify-alt.png",
  outreach: "/assets/figma/dashboard/outreach-card.png",
  book: "/assets/figma/dashboard/book-card.png",
} as const;

const statusStyles = {
  complete: "border-[#006d36] bg-[rgba(74,222,128,0.19)] text-[#005e2d]",
  running: "border-[#f59e0b] bg-[#fff4df] text-[#8b5a00]",
  ready: "border-[#1a1c1c] bg-[#1a1c1c] text-white",
  queued: "border-[#c6c6c6] bg-[#f3f3f4] text-[#5e5e5e]",
} as const;

export function PipelineCard({
  agent,
  active = false,
  compact = false,
}: {
  agent: AgentBlueprint;
  active?: boolean;
  compact?: boolean;
}) {
  const isCompact = compact;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[15px] bg-white shadow-card transition duration-300",
        isCompact ? "w-[116px] rounded-[8px]" : "w-full max-w-[328px] min-w-[300px] xl:min-w-[328px]",
        active && !isCompact && "scale-[1.02] shadow-[0px_16px_36px_rgba(0,0,0,0.22)]",
      )}
    >
      <div className={cn("flex flex-col items-center", isCompact ? "gap-1 px-2 pb-2 pt-2" : "gap-[14px] px-[30px] pb-[28px] pt-[41px]")}>
        <div className="w-full">
          <h3 className={cn("font-display font-bold text-ink", isCompact ? "text-[9px] leading-[9px]" : "text-[18px] leading-[14px]")}>{agent.title}</h3>
          <div className={cn("mt-3 border-t border-[#dadada]", isCompact && "mt-1.5")} />
          <p className={cn("mt-3 font-body text-ink-2", isCompact ? "text-[5px] leading-[6px]" : "text-[12px] leading-[15px]")}>
            {agent.description}
          </p>
        </div>
        <div className={cn("overflow-hidden rounded-[15px] bg-gradient-to-b from-grad-top to-grad-bot shadow-[0px_2px_2px_rgba(0,0,0,0.25)]", isCompact ? "h-[36px] w-full rounded-[5px]" : "h-[235px] w-full")}>
          <div className="relative h-full w-full">
            <Image
              src={artworkById[agent.id]}
              alt={`${agent.title} agent`}
              fill
              className="object-contain p-3"
              sizes={isCompact ? "116px" : "328px"}
            />
          </div>
        </div>
        <div className="w-full">
          <div className={cn("rounded-[6px] border-2 border-[#006d36] bg-white p-3 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]", isCompact && "rounded-[3px] border p-1.5")}>
            <BrowserMock url={agent.primaryUrl} compact={isCompact} />
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className={cn("font-display font-medium text-ink-2", isCompact ? "text-[4px] leading-[4px]" : "text-[12px] leading-[8px]")}>
            {agent.countLabel}
          </div>
          <span
            className={cn(
              "rounded-full border px-2 py-1 font-display font-bold uppercase tracking-[0.01em]",
              statusStyles[agent.status],
              isCompact ? "text-[4px] leading-[4px] px-1 py-0.5" : "text-[12px] leading-[7.5px]",
            )}
          >
            {agent.status}
          </span>
        </div>
      </div>
    </div>
  );
}
