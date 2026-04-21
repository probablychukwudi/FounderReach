"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

function StepProgress() {
  const steps = [
    { symbol: "✓", label: "Basics", active: true },
    { symbol: "2", label: "Details", active: true },
    { symbol: "3", label: "Team", active: false },
  ];

  return (
    <div className="flex items-center justify-center gap-7">
      {steps.map(({ symbol, label, active }, index) => (
        <div key={label} className="flex items-center gap-7">
          <div className="flex flex-col items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${active ? "bg-green text-white" : "bg-[#ededed] text-ink-3"}`}>
              {symbol}
            </div>
            <div className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${label === "Details" ? "text-green" : "text-ink-2"}`}>{label}</div>
          </div>
          {index !== 2 ? <div className="h-px w-20 bg-[#e2e2e2]" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function StepTwoPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[472px] rounded-[12px] bg-white px-8 py-8 shadow-[0px_20px_60px_rgba(26,28,28,0.08)]">
        <div className="mx-auto flex w-fit items-center gap-2">
          <Image src="/assets/brand/founderreach-logo-mark.png" alt="FounderReach" width={28} height={31} className="h-auto w-7" />
          <div className="text-[20px] font-black tracking-[-0.05em] text-ink">FounderReach</div>
        </div>

        <div className="mt-8">
          <StepProgress />
        </div>

        <h1 className="mt-10 text-center text-[42px] font-bold tracking-[-0.04em] text-ink">Startup Details</h1>
        <p className="mt-3 text-center text-base text-ink-2">Tell us a bit more about what you&apos;re building.</p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/step-3");
          }}
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink">Startup Name</label>
            <input placeholder="e.g. Acme Corp" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm outline-none placeholder:text-[#a2a8a6]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink">Industry</label>
            <input placeholder="e.g. B2B SaaS, FinTech, HealthTech" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm outline-none placeholder:text-[#a2a8a6]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink">Current Stage</label>
            <div className="relative mt-2">
              <input placeholder="Select your stage" className="h-10 w-full rounded-[6px] bg-surface px-3 text-sm outline-none placeholder:text-ink" />
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink">Short Description</label>
            <textarea placeholder="What problem are you solving in one sentence?" className="mt-2 min-h-[68px] w-full rounded-[6px] bg-surface px-3 py-3 text-sm outline-none placeholder:text-[#a2a8a6]" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button type="button" onClick={() => router.push("/step-1")} className="rounded-[8px] bg-surface py-3 text-sm font-semibold text-ink">
              Back
            </button>
            <button className="rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] py-3 text-sm font-semibold text-white">
              Continue →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
