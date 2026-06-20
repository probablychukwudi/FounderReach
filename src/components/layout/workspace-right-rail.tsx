"use client";

import Link from "next/link";
import {
  CalendarPlus,
  CheckCircle2,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  formatOpportunityDate,
  getDaysUntil,
  getOpportunityDate,
  getTimingLabel,
  sortOpportunitiesByUrgency,
} from "@/lib/opportunities";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";

type RailProps = {
  pathname: string;
};

function SectionTitle({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#262625]">{title}</h2>
      {meta ? <span className="text-[12px] text-[#666663]">{meta}</span> : null}
    </div>
  );
}

export function WorkspaceRightRail({ pathname }: RailProps) {
  const opportunities = useAppStore((state) => state.opportunities);
  const selectedOpportunityId = useAppStore((state) => state.selectedOpportunityId);
  const savedOpportunityIds = useAppStore((state) => state.savedOpportunityIds);
  const setSelectedOpportunityId = useAppStore((state) => state.setSelectedOpportunityId);
  const toggleSavedOpportunity = useAppStore((state) => state.toggleSavedOpportunity);

  const selectedOpportunity =
    opportunities.find((item) => item.id === selectedOpportunityId) ?? opportunities[0];
  const saved = savedOpportunityIds.includes(selectedOpportunity.id);
  const upcoming = sortOpportunitiesByUrgency(opportunities)
    .filter((item) => getDaysUntil(getOpportunityDate(item)) !== null)
    .slice(0, 5);
  const savedItems = opportunities.filter((item) => savedOpportunityIds.includes(item.id)).slice(0, 4);

  return (
    <aside className="border-l border-black/[0.08] bg-[#f7f4eb] xl:h-screen xl:overflow-hidden">
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-black/[0.08] px-5 py-5">
          <div className="text-[12px] text-[#666663]">{pathname.startsWith("/calendar") ? "Schedule context" : "Opportunity context"}</div>
          <h1 className="mt-1 text-[18px] font-semibold tracking-normal text-[#191919]">Founder briefing</h1>
        </div>

        <div className="scrollbar-none min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <section className="rounded-[10px] border border-black/[0.08] bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[12px] text-[#666663]">{selectedOpportunity.organization}</div>
                <h2 className="mt-1 text-[18px] font-semibold leading-6 tracking-normal text-[#191919]">
                  {selectedOpportunity.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => toggleSavedOpportunity(selectedOpportunity.id)}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border transition",
                  saved
                    ? "border-[#d97757]/30 bg-[#d97757]/10 text-[#aa532e]"
                    : "border-black/[0.08] text-[#666663] hover:bg-[#f0f0eb]",
                )}
                aria-label={saved ? "Remove saved opportunity" : "Save opportunity"}
              >
                <Star className={cn("h-4 w-4", saved && "fill-current")} />
              </button>
            </div>

            <p className="mt-3 text-[13px] leading-5 text-[#40403e]">{selectedOpportunity.summary}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded-[8px] bg-[#f7f4eb] px-3 py-2">
                <div className="text-[#666663]">Timing</div>
                <div className="mt-1 font-medium text-[#191919]">{getTimingLabel(selectedOpportunity)}</div>
              </div>
              <div className="rounded-[8px] bg-[#f7f4eb] px-3 py-2">
                <div className="text-[#666663]">Value</div>
                <div className="mt-1 font-medium text-[#191919]">{selectedOpportunity.value ?? "Network access"}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12px] text-[#666663]">
              <MapPin className="h-3.5 w-3.5" />
              <span>{selectedOpportunity.format} · {selectedOpportunity.location}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedOpportunity.tags.map((tag) => (
                <span key={tag} className="rounded-[6px] bg-[#f0f0eb] px-2 py-1 text-[11px] text-[#40403e]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={selectedOpportunity.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#0b6b3a]/20 bg-[#0b6b3a] px-3 py-2 text-[13px] font-medium text-white"
              >
                {selectedOpportunity.actionLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/calendar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-black/[0.08] text-[#40403e] hover:bg-[#f0f0eb]"
                aria-label="Open calendar"
              >
                <CalendarPlus className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section>
            <SectionTitle title="Trust note" meta={selectedOpportunity.sourceName} />
            <div className="mt-3 rounded-[10px] border border-black/[0.08] bg-white px-4 py-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0b6b3a]" />
                <p className="text-[13px] leading-5 text-[#40403e]">{selectedOpportunity.trustSignal}</p>
              </div>
            </div>
          </section>

          <section>
            <SectionTitle title="Upcoming" meta="deadline first" />
            <div className="mt-3 space-y-2">
              {upcoming.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedOpportunityId(item.id)}
                  className={cn(
                    "w-full rounded-[10px] border px-3 py-3 text-left transition",
                    selectedOpportunity.id === item.id
                      ? "border-[#0b6b3a]/25 bg-white"
                      : "border-black/[0.06] bg-white/70 hover:bg-white",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-[#191919]">{item.title}</div>
                      <div className="mt-1 text-[12px] text-[#666663]">{formatOpportunityDate(getOpportunityDate(item))}</div>
                    </div>
                    <span className="shrink-0 rounded-[6px] bg-[#f0f0eb] px-2 py-1 text-[11px] text-[#40403e]">
                      {getTimingLabel(item)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Saved stack" meta={`${savedItems.length} items`} />
            <div className="mt-3 space-y-2">
              {savedItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedOpportunityId(item.id)}
                  className="flex w-full items-center gap-2 rounded-[8px] px-2 py-2 text-left text-[13px] text-[#40403e] transition hover:bg-white"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0b6b3a]" />
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[10px] border border-[#d97757]/20 bg-[#fff7ed] px-4 py-4">
            <div className="flex gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#aa532e]" />
              <p className="text-[13px] leading-5 text-[#5f3b26]">
                The first version is free and trust-first. Sources are visible so founders can verify before applying.
              </p>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
