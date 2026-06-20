"use client";

import { Bell, CheckCircle2, Clock3, ExternalLink, RadioTower } from "lucide-react";
import { getOpportunityDate, getTimingLabel, sortOpportunitiesByUrgency } from "@/lib/opportunities";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";

export default function InboxPage() {
  const opportunities = useAppStore((state) => state.opportunities);
  const selectedOpportunityId = useAppStore((state) => state.selectedOpportunityId);
  const savedOpportunityIds = useAppStore((state) => state.savedOpportunityIds);
  const setSelectedOpportunityId = useAppStore((state) => state.setSelectedOpportunityId);
  const urgent = sortOpportunitiesByUrgency(opportunities)
    .filter((item) => item.priority === "urgent" || savedOpportunityIds.includes(item.id))
    .slice(0, 8);

  return (
    <div className="min-h-full bg-surface px-8 py-5 text-ink">
      <div className="mx-auto max-w-[920px]">
        <div className="border-b border-black/5 pb-5">
          <div className="flex items-center gap-2 text-[13px] text-green">
            <Bell className="h-4 w-4" />
            Founder updates
          </div>
          <h1 className="mt-2 text-[30px] font-semibold tracking-normal">Opportunity inbox</h1>
          <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-ink-2">
            A clean stream for new resources, deadlines you saved, and items that need founder action.
          </p>
        </div>

        <section className="mt-5 space-y-3">
          <div className="rounded-[12px] border border-green/20 bg-green-soft px-4 py-4">
            <div className="flex gap-3">
              <RadioTower className="mt-0.5 h-4 w-4 shrink-0 text-green" />
              <div>
                <h2 className="text-[15px] font-semibold">HackList scrape refreshed</h2>
                <p className="mt-1 text-[13px] leading-5 text-ink-2">
                  FounderReach seeded 32 active hackathons and $3,519,074 in prize signal from HackList for the first resource pass.
                </p>
              </div>
            </div>
          </div>

          {urgent.map((item) => (
            <article
              key={item.id}
              className={cn(
                "rounded-[12px] border bg-white px-4 py-4",
                item.id === selectedOpportunityId ? "border-green/30" : "border-black/5",
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <button type="button" onClick={() => setSelectedOpportunityId(item.id)} className="text-left">
                  <div className="flex items-center gap-2 text-[12px] text-ink-2">
                    {savedOpportunityIds.includes(item.id) ? <CheckCircle2 className="h-3.5 w-3.5 text-green" /> : <Clock3 className="h-3.5 w-3.5 text-[#8b5a00]" />}
                    {item.organization}
                  </div>
                  <h2 className="mt-1 text-[17px] font-semibold tracking-normal">{item.title}</h2>
                  <p className="mt-2 max-w-[680px] text-[13px] leading-5 text-ink-2">{item.summary}</p>
                </button>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-[7px] bg-[#f0f0ec] px-2 py-1 text-[11px] text-green">{getTimingLabel(item)}</span>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-[8px] text-ink-2 hover:bg-[#f4efe8]" aria-label={`Open ${item.title}`}>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              {getOpportunityDate(item) ? (
                <div className="mt-3 text-[12px] text-ink-3">Tracked date: {getOpportunityDate(item)}</div>
              ) : null}
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
