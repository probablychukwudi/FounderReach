"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  BadgePercent,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Handshake,
  LayoutGrid,
  ListFilter,
  MessageCircle,
  Newspaper,
  PlusCircle,
  Rocket,
  Search,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { CompanyLogo } from "@/components/opportunities/company-logo";
import { getOpportunityLogoDomain, getOpportunityLogoUrl } from "@/lib/logos";
import {
  formatOpportunityDate,
  getDaysUntil,
  getOpportunityDate,
  getTimingLabel,
  opportunityCategories,
  opportunityStats,
  sortOpportunitiesByUrgency,
} from "@/lib/opportunities";
import { captureFounderEvent } from "@/lib/analytics/client";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";
import type { Opportunity, OpportunityCategory } from "@/types";

const categoryIcons: Record<OpportunityCategory, React.ComponentType<{ className?: string }>> = {
  hackathon: Zap,
  accelerator: Rocket,
  conference: CalendarDays,
  funding: BadgeDollarSign,
  incentive: BadgePercent,
  investor: Handshake,
  mentor: Users,
  talent: GraduationCap,
  launch: Sparkles,
  news: Newspaper,
  forum: MessageCircle,
  fellowship: Star,
  competition: Trophy,
};

const formats = ["All formats", "Online", "In-person", "Hybrid", "Remote", "Global", "Directory"] as const;
const costs = ["All access", "Free", "Non-dilutive", "Credits", "Community", "Paid", "Equity", "Dilutive"] as const;
const sortModes = ["Deadline soonest", "Featured", "Largest value"] as const;
const pageSizeByView = {
  cards: 12,
  list: 18,
} as const;
const views = [
  { id: "cards", label: "Cards", icon: LayoutGrid },
  { id: "list", label: "List", icon: ListFilter },
] as const;

function getValueScore(value?: string) {
  if (!value) return 0;
  const normalized = value.toLowerCase();
  const match = normalized.match(/\$([0-9,.]+)/);
  if (!match) return normalized.includes("network") ? 1000 : 0;
  const amount = Number(match[1].replaceAll(",", ""));
  return normalized.includes("million") ? amount * 1_000_000 : amount;
}

function matchesQuery(item: Opportunity, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return [
    item.title,
    item.organization,
    item.category,
    item.format,
    item.location,
    item.audience,
    item.summary,
    item.value,
    item.cost,
    item.sourceName,
    ...item.sectors,
    ...item.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

function OpportunityCard({
  item,
  selected,
  saved,
  onSelect,
  onToggleSaved,
}: {
  item: Opportunity;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onToggleSaved: () => void;
}) {
  const Icon = categoryIcons[item.category];
  const dateValue = getOpportunityDate(item);
  const daysUntil = getDaysUntil(dateValue);
  const logoDomain = getOpportunityLogoDomain(item);
  const logoUrl = getOpportunityLogoUrl(item);

  return (
    <article
      className={cn(
        "group min-h-[128px] rounded-[12px] border bg-white px-5 py-4 transition hover:bg-[#fbfbf8]",
        selected ? "border-green/30 shadow-[0px_6px_22px_rgba(0,109,54,0.08)]" : "border-black/5",
      )}
    >
      <button type="button" onClick={onSelect} className="block w-full text-left">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <CompanyLogo name={item.organization} domain={logoDomain} logoUrl={logoUrl} className="mt-0.5" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-3">
                <span>{item.organization}</span>
                <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#f0f0ec] px-1.5 py-0.5 text-[10px] capitalize text-ink-3">
                  <Icon className="h-3 w-3" />
                  {item.category}
                </span>
                {item.featured ? <span className="rounded-[5px] bg-green-soft px-1.5 py-0.5 text-[10px] text-green">Featured</span> : null}
              </div>
              <h2 className="mt-1 line-clamp-1 text-[16px] font-semibold leading-6 tracking-normal text-ink">{item.title}</h2>
            </div>
          </div>

          <span
            className={cn(
              "shrink-0 rounded-[6px] px-2 py-1 text-[11px]",
              daysUntil !== null && daysUntil <= 3 ? "bg-[#fff4df] text-[#8b5a00]" : "bg-[#f0f0ec] text-ink-3",
            )}
          >
            {getTimingLabel(item)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-ink-2">{item.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-ink-3">
          <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{item.format}</span>
          <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{item.location}</span>
          <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{formatOpportunityDate(dateValue)}</span>
          <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{item.value ?? "Network"}</span>
        </div>
      </button>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            captureFounderEvent("opportunity_source_opened", {
              opportunity_id: item.id,
              category: item.category,
              source_name: item.sourceName,
              cost: item.cost,
              format: item.format,
              surface: "card",
            })
          }
          className="inline-flex h-[33px] flex-1 items-center justify-center gap-2 rounded-[8px] border border-[rgba(0,109,54,0.18)] bg-green px-3 text-[13px] font-medium text-white transition hover:bg-green-deep"
        >
          {item.actionLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <button
          type="button"
          onClick={onToggleSaved}
          className={cn(
            "flex h-[33px] w-[33px] items-center justify-center rounded-[8px] border transition",
            saved ? "border-green/25 bg-green-soft text-green" : "border-black/10 text-ink-3 hover:bg-[#f4efe8]",
          )}
          aria-label={saved ? "Remove saved opportunity" : "Save opportunity"}
        >
          <Star className={cn("h-4 w-4", saved && "fill-current")} />
        </button>
      </div>
    </article>
  );
}

function OpportunityRow({
  item,
  selected,
  saved,
  onSelect,
  onToggleSaved,
}: {
  item: Opportunity;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onToggleSaved: () => void;
}) {
  const Icon = categoryIcons[item.category];
  const logoDomain = getOpportunityLogoDomain(item);
  const logoUrl = getOpportunityLogoUrl(item);

  return (
    <article
      className={cn(
        "rounded-[10px] border bg-white px-4 py-3 transition hover:bg-[#fbfbf8]",
        selected ? "border-green/30" : "border-black/5",
      )}
    >
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_160px_130px_110px] lg:items-center">
        <button type="button" onClick={onSelect} className="flex min-w-0 gap-3 text-left">
          <CompanyLogo name={item.organization} domain={logoDomain} logoUrl={logoUrl} className="mt-0.5" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-[15px] font-semibold text-ink">{item.title}</div>
              <Icon className="h-3.5 w-3.5 shrink-0 text-green" />
            </div>
            <div className="mt-1 line-clamp-1 text-[13px] text-ink-2">{item.summary}</div>
          </div>
        </button>
        <div className="text-[13px] text-ink-2">{item.organization}</div>
        <div className="text-[13px] text-ink-2">{getTimingLabel(item)}</div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onToggleSaved}
            className={cn("flex h-8 w-8 items-center justify-center rounded-[8px]", saved ? "bg-green-soft text-green" : "text-ink-3 hover:bg-[#f4efe8]")}
            aria-label={saved ? "Remove saved opportunity" : "Save opportunity"}
          >
            <Star className={cn("h-4 w-4", saved && "fill-current")} />
          </button>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              captureFounderEvent("opportunity_source_opened", {
                opportunity_id: item.id,
                category: item.category,
                source_name: item.sourceName,
                cost: item.cost,
                format: item.format,
                surface: "list",
              })
            }
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-green hover:bg-green-soft"
            aria-label={`Open ${item.title}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const opportunities = useAppStore((state) => state.opportunities);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const selectedOpportunityId = useAppStore((state) => state.selectedOpportunityId);
  const savedOpportunityIds = useAppStore((state) => state.savedOpportunityIds);
  const opportunityQuery = useAppStore((state) => state.opportunityQuery);
  const setSelectedOpportunityId = useAppStore((state) => state.setSelectedOpportunityId);
  const setOpportunityQuery = useAppStore((state) => state.setOpportunityQuery);
  const toggleSavedOpportunity = useAppStore((state) => state.toggleSavedOpportunity);
  const [format, setFormat] = useState<(typeof formats)[number]>("All formats");
  const [cost, setCost] = useState<(typeof costs)[number]>("All access");
  const [sortMode, setSortMode] = useState<(typeof sortModes)[number]>("Deadline soonest");
  const [view, setView] = useState<(typeof views)[number]["id"]>("cards");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let next = opportunities.filter((item) => {
      const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
      const formatMatch = format === "All formats" || item.format === format;
      const costMatch = cost === "All access" || item.cost === cost;
      return categoryMatch && formatMatch && costMatch && matchesQuery(item, opportunityQuery);
    });

    if (sortMode === "Deadline soonest") {
      next = sortOpportunitiesByUrgency(next);
    } else if (sortMode === "Featured") {
      next = [...next].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    } else {
      next = [...next].sort((a, b) => getValueScore(b.value) - getValueScore(a.value));
    }

    return next;
  }, [cost, format, opportunities, opportunityQuery, selectedCategory, sortMode]);

  useEffect(() => {
    setPage(1);
  }, [cost, format, opportunityQuery, selectedCategory, sortMode, view]);

  useEffect(() => {
    const normalized = opportunityQuery.trim();
    if (!normalized) return;

    const timeout = window.setTimeout(() => {
      captureFounderEvent("opportunity_search_performed", {
        query_length: normalized.length,
        selected_category: selectedCategory,
        format,
        cost,
        result_count: filtered.length,
      });
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [cost, filtered.length, format, opportunityQuery, selectedCategory]);

  const pageSize = pageSizeByView[view];
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, filtered.length);
  const visibleItems = filtered.slice(pageStart, pageEnd);
  const selectedCategoryMeta = opportunityCategories.find((category) => category.id === selectedCategory) ?? opportunityCategories[0];
  const selectedOpportunity = filtered.find((item) => item.id === selectedOpportunityId) ?? filtered[0] ?? opportunities[0];
  const selectedLogoDomain = selectedOpportunity ? getOpportunityLogoDomain(selectedOpportunity) : undefined;
  const selectedLogoUrl = selectedOpportunity ? getOpportunityLogoUrl(selectedOpportunity) : undefined;
  const freeCount = opportunities.filter((item) => ["Free", "Credits", "Community", "Non-dilutive"].includes(item.cost)).length;
  const hackathonCount = opportunities.filter((item) => item.category === "hackathon").length;

  const handleToggleSaved = (item: Opportunity) => {
    const wasSaved = savedOpportunityIds.includes(item.id);
    captureFounderEvent(wasSaved ? "opportunity_unsaved" : "opportunity_saved", {
      opportunity_id: item.id,
      category: item.category,
      source_name: item.sourceName,
      cost: item.cost,
      format: item.format,
      priority: item.priority,
    });
    toggleSavedOpportunity(item.id);
  };

  return (
    <div className="min-h-full bg-surface text-ink">
      <div className="flex min-h-[65px] flex-col gap-3 border-b border-black/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-green" />
          <div className="text-[18px] font-medium tracking-normal">Opportunity radar</div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          {views.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setView(mode.id)}
                className={cn(
                  "inline-flex h-[33px] items-center gap-1.5 rounded-[8px] px-3 text-[13px] transition",
                  view === mode.id ? "bg-white text-ink shadow-[0px_1px_2px_rgba(15,19,17,0.05)]" : "text-ink-2 hover:bg-white/70",
                )}
              >
                <Icon className="h-4 w-4" />
                {mode.label}
              </button>
            );
          })}
          <Link
            href="/data"
            className="inline-flex h-[33px] items-center gap-1.5 rounded-[8px] border border-[rgba(0,109,54,0.18)] bg-green px-3 text-[13px] font-medium text-white hover:bg-green-deep"
          >
            <PlusCircle className="h-4 w-4" />
            Add source
          </Link>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-ink">{selectedCategoryMeta.label}</h1>
              <p className="mt-1 max-w-[760px] text-[14px] leading-6 text-ink-2">{selectedCategoryMeta.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[520px]">
              {[
                ["Tracked", opportunities.length.toString()],
                ["Hackathons", hackathonCount.toString()],
                ["Prize signal", opportunityStats.hacklistPrizePool],
                ["Free first", freeCount.toString()],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[10px] border border-black/5 bg-white px-3 py-2">
                  <div className="text-[11px] text-ink-3">{label}</div>
                  <div className="mt-1 truncate text-[15px] font-semibold text-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[12px] border border-black/5 bg-[#f4efe8] p-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full lg:max-w-[460px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
              <input
                value={opportunityQuery}
                onChange={(event) => setOpportunityQuery(event.target.value)}
                placeholder="Search sectors, locations, deadlines, sources..."
                className="h-[45px] w-full rounded-[10px] border border-black/10 bg-white pl-10 pr-3 text-[16px] text-ink outline-none placeholder:text-ink-3 focus:border-green/35 sm:text-[14px]"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                [format, setFormat, formats],
                [cost, setCost, costs],
                [sortMode, setSortMode, sortModes],
              ].map(([value, setter, options]) => (
                <label key={String(value)} className="relative">
                  <select
                    value={value as string}
                    onChange={(event) => (setter as (next: string) => void)(event.target.value)}
                    className="h-[33px] appearance-none rounded-[8px] border border-black/10 bg-white pl-3 pr-8 text-[13px] text-ink outline-none"
                  >
                    {(options as readonly string[]).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                </label>
              ))}
            </div>
          </div>

          {selectedOpportunity ? (
            <div className="rounded-[12px] border border-black/5 bg-white px-4 py-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 gap-3">
                  <CompanyLogo name={selectedOpportunity.organization} domain={selectedLogoDomain} logoUrl={selectedLogoUrl} />
                  <div className="min-w-0">
                    <div className="text-[12px] text-ink-3">Selected opportunity</div>
                    <div className="mt-1 truncate text-[16px] font-semibold text-ink">{selectedOpportunity.title}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-2">
                  <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{selectedOpportunity.organization}</span>
                  <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{getTimingLabel(selectedOpportunity)}</span>
                  <span className="rounded-[6px] bg-[#f0f0ec] px-2 py-1">{selectedOpportunity.cost}</span>
                  <a
                    href={selectedOpportunity.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      captureFounderEvent("opportunity_source_opened", {
                        opportunity_id: selectedOpportunity.id,
                        category: selectedOpportunity.category,
                        source_name: selectedOpportunity.sourceName,
                        cost: selectedOpportunity.cost,
                        format: selectedOpportunity.format,
                        surface: "selected_summary",
                      })
                    }
                    className="inline-flex h-8 items-center gap-1 rounded-[8px] bg-green-soft px-3 font-medium text-green"
                  >
                    {selectedOpportunity.actionLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ) : null}

          {filtered.length ? (
            view === "cards" ? (
              <section className="grid gap-3 xl:grid-cols-2">
                {visibleItems.map((item) => (
                  <OpportunityCard
                    key={item.id}
                    item={item}
                    selected={item.id === selectedOpportunity?.id}
                    saved={savedOpportunityIds.includes(item.id)}
                    onSelect={() => setSelectedOpportunityId(item.id)}
                    onToggleSaved={() => handleToggleSaved(item)}
                  />
                ))}
              </section>
            ) : (
              <section className="space-y-2">
                {visibleItems.map((item) => (
                  <OpportunityRow
                    key={item.id}
                    item={item}
                    selected={item.id === selectedOpportunity?.id}
                    saved={savedOpportunityIds.includes(item.id)}
                    onSelect={() => setSelectedOpportunityId(item.id)}
                    onToggleSaved={() => handleToggleSaved(item)}
                  />
                ))}
              </section>
            )
          ) : (
            <section className="rounded-[12px] border border-black/5 bg-white px-5 py-10 text-center">
              <div className="text-[16px] font-semibold text-ink">No matching opportunities yet</div>
              <p className="mt-2 text-[14px] text-ink-2">Try a broader search or switch categories in the left sidebar.</p>
            </section>
          )}

          {filtered.length > pageSize ? (
            <div className="flex flex-col gap-3 rounded-[12px] border border-black/5 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[13px] text-ink-2">
                Showing {pageStart + 1}-{pageEnd} of {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-8 items-center gap-1 rounded-[8px] border border-black/10 px-2.5 text-[13px] text-ink-2 transition hover:bg-[#f4efe8] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <div className="min-w-[70px] text-center text-[13px] text-ink-3">
                  {currentPage} / {totalPages}
                </div>
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex h-8 items-center gap-1 rounded-[8px] border border-black/10 px-2.5 text-[13px] text-ink-2 transition hover:bg-[#f4efe8] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
