import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Database, Rocket, Sparkles } from "lucide-react";
import { opportunityStats } from "@/lib/opportunities";

export default function CompletePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#2e2e2b] px-6 py-12 text-[#f7f4eb]">
      <div className="w-full max-w-[860px]">
        <div className="mx-auto flex w-fit items-center gap-2">
          <Image src="/assets/brand/founderreach-logo-mark.svg" alt="FounderReach" width={28} height={31} className="h-auto w-7" />
          <div className="text-[20px] font-semibold tracking-normal">FounderReach</div>
        </div>

        <section className="mt-6 rounded-[16px] border border-white/[0.08] bg-[#262625] px-6 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0b6b3a]">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="mt-6 text-[42px] font-semibold leading-tight tracking-normal">Your founder graph is ready.</h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-7 text-[#ceccc5]">
            Start with active hackathons, accelerators, funding, conferences, launch channels, talent, mentors, and trusted source notes.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              [Database, opportunityStats.activeItems.toString(), "Resources tracked"],
              [Rocket, opportunityStats.hacklistActiveCount.toString(), "Active hackathons"],
              [CalendarDays, "Jun 20", "Last refreshed"],
            ].map(([Icon, value, label]) => {
              const LucideIcon = Icon as typeof Database;
              return (
                <div key={String(label)} className="rounded-[12px] border border-white/[0.07] bg-[#2b2b28] px-4 py-4">
                  <LucideIcon className="mx-auto h-4 w-4 text-[#4ade80]" />
                  <div className="mt-3 text-[22px] font-semibold">{String(value)}</div>
                  <div className="mt-1 text-[12px] text-[#bfbfba]">{String(label)}</div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="inline-flex rounded-[8px] bg-[#f7f4eb] px-6 py-3 text-[14px] font-medium text-[#191919]">
            Enter command center
          </Link>
        </div>
      </div>
    </main>
  );
}
