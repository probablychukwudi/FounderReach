"use client";

import Link from "next/link";
import {
  BadgeDollarSign,
  BadgePercent,
  Bell,
  CalendarDays,
  CircleHelp,
  Compass,
  GraduationCap,
  Handshake,
  MessageCircle,
  Newspaper,
  Rocket,
  Search,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { captureFounderEvent } from "@/lib/analytics/client";
import { opportunityCategories, sortOpportunitiesByUrgency } from "@/lib/opportunities";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";
import type { OpportunityCategory } from "@/types";

type NavCategory = OpportunityCategory | "all";

const categoryIcons: Record<NavCategory, React.ComponentType<{ className?: string }>> = {
  all: Compass,
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

const primaryCategories: NavCategory[] = [
  "all",
  "hackathon",
  "accelerator",
  "conference",
  "competition",
  "launch",
  "talent",
  "mentor",
  "forum",
  "investor",
];

const secondaryCategories: NavCategory[] = ["incentive", "funding", "fellowship", "news"];

function CategoryLink({ categoryId }: { categoryId: NavCategory }) {
  const opportunities = useAppStore((state) => state.opportunities);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const category = opportunityCategories.find((item) => item.id === categoryId);
  const active = selectedCategory === categoryId;
  const Icon = categoryIcons[categoryId];
  const count =
    categoryId === "all"
      ? opportunities.length
      : opportunities.filter((item) => item.category === categoryId).length;

  if (!category) return null;

  return (
    <Link
      href="/dashboard"
      onClick={() => {
        setSelectedCategory(categoryId);
        captureFounderEvent("opportunity_category_selected", {
          category: categoryId,
          category_count: count,
        });
      }}
      className={cn(
        "flex h-8 w-full items-center gap-1.5 rounded-[6px] px-1.5 text-[14px] transition",
        active
          ? "bg-white text-ink shadow-[0px_1px_2px_rgba(15,19,17,0.05)]"
          : "text-ink-2 hover:bg-white/65 hover:text-ink",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-green" : "text-ink-3")} />
      <span className="min-w-0 flex-1 truncate">{category.label}</span>
      <span
        className={cn(
          "min-w-5 rounded-[6px] px-1.5 py-0.5 text-center text-[10px]",
          active ? "bg-green-soft text-green" : "bg-[#e1e1df] text-ink-3",
        )}
      >
        {count}
      </span>
    </Link>
  );
}

export function SidebarLeft() {
  const pathname = usePathname();
  const opportunities = useAppStore((state) => state.opportunities);
  const selectedOpportunityId = useAppStore((state) => state.selectedOpportunityId);
  const savedOpportunityIds = useAppStore((state) => state.savedOpportunityIds);
  const account = useAppStore((state) => state.account);
  const setSelectedOpportunityId = useAppStore((state) => state.setSelectedOpportunityId);

  const saved = opportunities.filter((item) => savedOpportunityIds.includes(item.id)).slice(0, 4);
  const upcoming = sortOpportunitiesByUrgency(opportunities)
    .filter((item) => item.priority === "urgent" || item.priority === "soon")
    .slice(0, 6);

  return (
    <aside className="border-r border-[#dadada] bg-surface xl:h-screen xl:overflow-hidden">
      <div className="flex h-full min-h-0 flex-col px-3 py-5">
        <div className="flex h-7 shrink-0 items-center justify-between px-1">
          <Link href="/dashboard" aria-label="Go to FounderReach dashboard">
            <FounderReachLogo compact wordmarkClassName="font-semibold tracking-normal text-ink" />
          </Link>
          <Link
            href="/dashboard"
            className="flex h-6 w-6 items-center justify-center rounded-[8px] text-ink-3 transition hover:bg-white hover:text-ink"
            aria-label="Search opportunities"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <div className="scrollbar-none mt-7 min-h-0 flex-1 overflow-y-auto">
          <nav aria-label="FounderReach opportunity categories" className="space-y-0.5">
            {primaryCategories.map((categoryId) => (
              <CategoryLink key={categoryId} categoryId={categoryId} />
            ))}
          </nav>

          <section className="mt-6">
            <div className="px-1.5 text-[12px] font-medium text-ink">Capital and signals</div>
            <div className="mt-2 space-y-0.5">
              {secondaryCategories.map((categoryId) => (
                <CategoryLink key={categoryId} categoryId={categoryId} />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between px-1.5">
              <div className="text-[12px] font-medium text-ink">Saved</div>
              <span className="text-[12px] text-ink-3">{saved.length}</span>
            </div>
            <div className="mt-2 space-y-0.5">
              {saved.map((item) => (
                <Link
                  key={item.id}
                  href="/dashboard"
                  onClick={() => {
                    setSelectedOpportunityId(item.id);
                    captureFounderEvent("saved_opportunity_opened", {
                      opportunity_id: item.id,
                      category: item.category,
                      source_name: item.sourceName,
                    });
                  }}
                  className={cn(
                    "flex h-[27px] items-center gap-1.5 rounded-[6px] px-1.5 text-[13px] transition",
                    selectedOpportunityId === item.id ? "bg-white text-ink" : "text-ink-2 hover:bg-white/65 hover:text-ink",
                  )}
                >
                  <Star className="h-3.5 w-3.5 shrink-0 text-green" />
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between px-1.5">
              <div className="text-[12px] font-medium text-ink">Closing soon</div>
              <Link href="/calendar" className="text-[12px] text-green">
                Calendar
              </Link>
            </div>
            <div className="mt-2 space-y-0.5">
              {upcoming.map((item) => {
                const Icon = categoryIcons[item.category];
                return (
                  <Link
                    key={item.id}
                    href="/dashboard"
                    onClick={() => {
                      setSelectedOpportunityId(item.id);
                      captureFounderEvent("closing_soon_opportunity_opened", {
                        opportunity_id: item.id,
                        category: item.category,
                        source_name: item.sourceName,
                      });
                    }}
                    className={cn(
                      "flex h-[27px] items-center gap-1.5 rounded-[6px] px-1.5 text-[13px] transition",
                      selectedOpportunityId === item.id ? "bg-white text-ink" : "text-ink-2 hover:bg-white/65 hover:text-ink",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-ink-3" />
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-4 shrink-0 space-y-1 border-t border-black/5 pt-3">
          <Link
            href="/inbox"
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-[6px] px-1.5 text-[13px] transition",
              pathname.startsWith("/inbox") ? "bg-white text-ink" : "text-ink-2 hover:bg-white/65 hover:text-ink",
            )}
          >
            <Bell className="h-4 w-4" />
            Founder updates
          </Link>
          <Link
            href="/permissions"
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-[6px] px-1.5 text-[13px] transition",
              pathname.startsWith("/permissions") ? "bg-white text-ink" : "text-ink-2 hover:bg-white/65 hover:text-ink",
            )}
          >
            <CircleHelp className="h-4 w-4" />
            Help & trust
          </Link>
          <div className="mt-3 overflow-hidden rounded-[10px] border border-black/5 bg-white">
            <div className="border-b border-black/5 bg-[#f4efe8] px-3 py-1.5 text-center text-[12px] text-green">
              {account?.mode === "email" ? "Synced workspace" : "Guest workspace"}
            </div>
            <div className="px-3 py-2 text-[12px] leading-5 text-ink-2">
              {account?.mode === "email"
                ? "Your saved stack and calendar preferences stay attached to this account."
                : "Browse freely, then save your stack, calendar, and updates with email."}
            </div>
            <Link
              href={account?.mode === "email" ? "/profile" : "/signup"}
              className="flex h-8 items-center justify-center gap-1.5 border-t border-black/5 text-[12px] font-medium text-green transition hover:bg-green-soft"
            >
              <UserRound className="h-3.5 w-3.5" />
              {account?.mode === "email" ? "View profile" : "Create free account"}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
