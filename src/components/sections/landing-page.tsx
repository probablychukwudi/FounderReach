import Link from "next/link";
import {
  BadgeDollarSign,
  BadgePercent,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Handshake,
  MessageCircle,
  Newspaper,
  Rocket,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import {
  formatOpportunityDate,
  getOpportunityDate,
  getTimingLabel,
  opportunities,
  opportunityCategories,
  opportunityStats,
  sortOpportunitiesByUrgency,
} from "@/lib/opportunities";
import type { OpportunityCategory } from "@/types";

const categoryIcons: Record<OpportunityCategory, React.ComponentType<{ className?: string }>> = {
  hackathon: Zap,
  accelerator: Rocket,
  conference: CalendarDays,
  funding: BadgeDollarSign,
  incentive: BadgePercent,
  investor: Handshake,
  mentor: Handshake,
  talent: GraduationCap,
  launch: Sparkles,
  news: Newspaper,
  forum: MessageCircle,
  fellowship: Sparkles,
  competition: Trophy,
};

export function LandingPage() {
  const featured = sortOpportunitiesByUrgency(opportunities).slice(0, 8);
  const categories = opportunityCategories.filter((category) => category.id !== "all").slice(0, 9);

  return (
    <main className="min-h-screen bg-[#2e2e2b] text-[#f7f4eb]">
      <header className="border-b border-white/[0.08] bg-[#22211d]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 lg:px-8">
          <FounderReachLogo compact wordmarkClassName="text-[#f7f4eb] font-semibold tracking-normal" />
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="rounded-[8px] bg-[#f7f4eb] px-4 py-2 text-[13px] font-medium text-[#191919]">
              Open command center
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-14">
        <div>
          <div className="inline-flex items-center gap-2 rounded-[8px] border border-[#d97757]/25 bg-[#d97757]/10 px-3 py-2 text-[13px] text-[#f1b196]">
            <Sparkles className="h-4 w-4" />
            Free founder opportunity radar
          </div>
          <h1 className="mt-5 max-w-[620px] text-[42px] font-semibold leading-[1.04] tracking-normal text-[#f7f4eb] lg:text-[56px]">
            FounderReach finds what founders can act on next.
          </h1>
          <p className="mt-5 max-w-[560px] text-[16px] leading-7 text-[#ceccc5]">
            Active hackathons, accelerators, non-dilutive funding, conferences, launch channels, jobs, mentors, forums, and founder news in one clean workspace.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-[8px] bg-[#0b6b3a] px-5 py-3 text-[14px] font-medium text-white">
              Browse opportunities
            </Link>
            <Link href="/calendar" className="rounded-[8px] border border-white/[0.12] px-5 py-3 text-[14px] font-medium text-[#f7f4eb]">
              View calendar
            </Link>
          </div>

          <div className="mt-8 grid max-w-[620px] grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Tracked", opportunityStats.activeItems.toString()],
              ["Hackathons", opportunityStats.hacklistActiveCount.toString()],
              ["Prize pool", opportunityStats.hacklistPrizePool],
              ["Updated", "Jun 20"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[10px] border border-white/[0.07] bg-[#262625] px-4 py-4">
                <div className="text-[11px] text-[#91918d]">{label}</div>
                <div className="mt-2 text-[18px] font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.07] bg-[#262625]">
          <div className="border-b border-white/[0.07] px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-semibold tracking-normal">Active now</h2>
                <p className="mt-1 text-[13px] text-[#bfbfba]">Deadline-first preview from the command center.</p>
              </div>
              <Link href="/dashboard" className="text-[13px] text-[#d97757]">
                View all
              </Link>
            </div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {featured.map((item) => {
              const Icon = categoryIcons[item.category];
              return (
                <article key={item.id} className="px-4 py-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-white/[0.06] text-[#4ade80]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[12px] text-[#bfbfba]">{item.organization}</span>
                        <span className="rounded-[6px] bg-white/[0.06] px-2 py-0.5 text-[11px] text-[#d97757]">{getTimingLabel(item)}</span>
                      </div>
                      <h3 className="mt-1 text-[15px] font-semibold tracking-normal">{item.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[#bfbfba]">
                        <span>{formatOpportunityDate(getOpportunityDate(item))}</span>
                        <span>{item.format}</span>
                        <span>{item.value ?? "Network"}</span>
                      </div>
                    </div>
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 text-[#ceccc5]" aria-label={`Open ${item.title}`}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id as OpportunityCategory];
            const count = opportunities.filter((item) => item.category === category.id).length;
            return (
              <Link key={category.id} href="/dashboard" className="rounded-[12px] border border-white/[0.07] bg-[#262625] px-4 py-4 transition hover:border-[#4ade80]/30">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-white/[0.06] text-[#4ade80]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold">{category.label}</div>
                    <p className="mt-1 text-[13px] leading-5 text-[#bfbfba]">{category.description}</p>
                    <div className="mt-3 text-[12px] text-[#d97757]">{count} tracked</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
