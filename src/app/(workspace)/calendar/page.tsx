"use client";

import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { formatOpportunityDate, getOpportunityDate, getTimingLabel, sortOpportunitiesByUrgency } from "@/lib/opportunities";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const startDate = new Date("2026-05-31T12:00:00-04:00");
const calendarCells = Array.from({ length: 35 }, (_, index) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + index);
  const iso = date.toISOString().slice(0, 10);
  return {
    iso,
    day: date.getDate(),
    inMonth: date.getMonth() === 5,
  };
});

export default function CalendarPage() {
  const opportunities = useAppStore((state) => state.opportunities);
  const selectedOpportunityId = useAppStore((state) => state.selectedOpportunityId);
  const setSelectedOpportunityId = useAppStore((state) => state.setSelectedOpportunityId);
  const upcoming = sortOpportunitiesByUrgency(opportunities).filter((item) => getOpportunityDate(item));

  return (
    <div className="min-h-full bg-surface px-8 py-5 text-ink">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 border-b border-black/5 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-green">
              <CalendarDays className="h-4 w-4" />
              Founder calendar
            </div>
            <h1 className="mt-2 text-[30px] font-semibold tracking-normal">Deadlines, events, and launch windows</h1>
            <p className="mt-2 max-w-[680px] text-[14px] leading-6 text-ink-2">
              A deadline-first view of hackathons, accelerators, grants, conferences, and launch channels.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-[10px] border border-black/5 bg-[#f4efe8] p-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-[8px] text-ink-2 hover:bg-white" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-8 rounded-[8px] bg-white px-3 text-[13px] font-medium text-ink">June 2026</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-[8px] text-ink-2 hover:bg-white" aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
          <section className="overflow-hidden rounded-[14px] border border-black/5 bg-white">
            <div className="grid grid-cols-7 border-b border-black/5 bg-[#f4efe8] text-center text-[11px] font-medium uppercase tracking-[0.06em] text-ink-3">
              {weekDays.map((day) => (
                <div key={day} className="border-r border-black/5 px-2 py-3 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarCells.map((cell) => {
                const events = upcoming.filter((item) => getOpportunityDate(item) === cell.iso);
                const isToday = cell.iso === "2026-06-20";

                return (
                  <div
                    key={cell.iso}
                    className={cn(
                      "min-h-[126px] border-b border-r border-black/5 px-2 py-2 last:border-r-0",
                      !cell.inMonth && "bg-[#f7f7f4] text-ink-3",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full text-[13px]",
                        isToday ? "bg-green font-semibold text-white" : cell.inMonth ? "text-ink" : "text-ink-3",
                      )}
                    >
                      {cell.day}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {events.slice(0, 3).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedOpportunityId(item.id)}
                          className={cn(
                            "block w-full truncate rounded-[6px] px-2 py-1 text-left text-[11px]",
                            item.id === selectedOpportunityId
                              ? "bg-green-soft text-green"
                              : item.priority === "urgent"
                                ? "bg-[#fff4df] text-[#8b5a00]"
                                : "bg-[#f0f0ec] text-ink-2",
                          )}
                        >
                          {item.title}
                        </button>
                      ))}
                      {events.length > 3 ? <div className="text-[10px] text-ink-3">+{events.length - 3} more</div> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="rounded-[14px] border border-black/5 bg-white">
            <div className="border-b border-black/5 px-4 py-4">
              <h2 className="text-[16px] font-semibold tracking-normal">Upcoming queue</h2>
              <p className="mt-1 text-[13px] text-ink-2">Sorted by nearest deadline or event start.</p>
            </div>
            <div className="space-y-2 p-3">
              {upcoming.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-[10px] border px-3 py-3 transition hover:bg-[#fbfbf8]",
                    item.id === selectedOpportunityId ? "border-green/30 bg-[#fbfbf8]" : "border-black/5",
                  )}
                >
                  <button type="button" onClick={() => setSelectedOpportunityId(item.id)} className="block w-full text-left">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium text-ink">{item.title}</div>
                        <div className="mt-1 text-[12px] text-ink-2">{formatOpportunityDate(getOpportunityDate(item))}</div>
                      </div>
                      <span className="shrink-0 text-[11px] text-green">{getTimingLabel(item)}</span>
                    </div>
                  </button>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="truncate text-[11px] text-ink-3">{item.organization}</span>
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-ink-2" aria-label={`Open ${item.title}`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
