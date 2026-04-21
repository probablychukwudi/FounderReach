import Image from "next/image";
import { ChevronDown, Mail, Rocket } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="px-6 py-8 xl:px-10 xl:py-8">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
        <Image
          src="/assets/figma/dashboard/avatar-voxel.png"
          alt="Alex Mercer"
          width={92}
          height={92}
          className="h-[92px] w-[92px] rounded-full object-cover"
        />
        <div>
          <h1 className="text-[26px] font-bold tracking-[-0.04em] text-ink">Alex Mercer</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-ink-2">
            <Mail className="h-4 w-4" />
            alex.mercer@founderreach.com
          </div>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Founder</span>
            <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Admin</span>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-[760px] space-y-10">
        <section className="rounded-[12px] bg-white px-5 py-5 shadow-[0px_1px_2px_rgba(26,28,28,0.05)]">
          <div className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.03em] text-ink">
            <span className="text-green">◌</span>
            User Details
          </div>
          <div className="mt-6 space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Full Name</label>
              <input defaultValue="Alex Mercer" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Email Address</label>
              <input defaultValue="alex.mercer@founderreach.com" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Role</label>
              <div className="relative mt-2">
                <input defaultValue="Founder" className="h-10 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-5 py-5 shadow-[0px_1px_2px_rgba(26,28,28,0.05)]">
          <div className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.03em] text-ink">
            <Rocket className="h-4 w-4 text-green" />
            Startup Context
          </div>
          <div className="mt-6 space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Startup Name</label>
              <input defaultValue="FounderReach" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Stage</label>
              <div className="relative mt-2">
                <input defaultValue="Seed" className="h-10 w-full rounded-[6px] bg-surface px-3 text-sm text-ink outline-none" />
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">Description</label>
              <textarea
                defaultValue="Architectural Studio leveraging AI agents to automate early-stage networking and outreach."
                className="mt-2 min-h-[110px] w-full rounded-[6px] bg-surface px-3 py-3 text-sm leading-6 text-ink outline-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-[12px] bg-white px-5 py-5 shadow-[0px_1px_2px_rgba(26,28,28,0.05)]">
          <div className="flex items-center gap-2 text-[18px] font-bold tracking-[-0.03em] text-ink">
            <span className="text-green">⌘</span>
            Platform Integrations
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["LinkedIn", "Connected as Alex Mercer", "in"],
              ["Twitter / X", "Connected as @alexm", "X"],
              ["Crunchbase", "Syncing startup data", "cb"],
            ].map(([title, subtitle, badge]) => (
              <div key={title} className="flex items-center justify-between rounded-[8px] bg-[#f3f3f4] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-[4px] ${badge === "in" ? "bg-white text-[#0a66c2]" : badge === "X" ? "bg-black text-white" : "bg-[#2563eb] text-white"}`}>
                    <span className="text-sm font-bold">{badge}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{title}</div>
                    <div className="text-xs text-ink-2">{subtitle}</div>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-green-dot" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
