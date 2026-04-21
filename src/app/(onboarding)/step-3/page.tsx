"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const sources = [
  {
    label: "Professional Networks",
    items: [
      { name: "LinkedIn", subtitle: "Profiles & Companies", enabled: true, badge: "in", tone: "text-[#0a66c2]" },
      { name: "X (Twitter)", subtitle: "Signals & Sentiment", enabled: true, badge: "@" , tone: "text-ink" },
    ],
  },
  {
    label: "Financial & Data",
    items: [
      { name: "Crunchbase", subtitle: "Funding Data", enabled: false, badge: "cb", tone: "text-[#2563eb]" },
      { name: "PitchBook", subtitle: "Private Markets", enabled: false, badge: "pb", tone: "text-[#f59e0b]" },
    ],
  },
  {
    label: "Academic & Research",
    items: [{ name: "Google Scholar", subtitle: "Publications", enabled: false, badge: "◈", tone: "text-[#4f83ff]" }],
  },
];

export default function StepThreePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[520px] rounded-[16px] bg-white px-8 py-8 shadow-[0px_20px_60px_rgba(26,28,28,0.08)]">
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="flex flex-1 items-center gap-4">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${step <= 3 ? "bg-green text-white" : "bg-[#ededed] text-ink-3"}`}>
                {step < 3 ? "✓" : step}
              </div>
              {index !== 3 ? <div className={`h-[2px] flex-1 ${step < 3 ? "bg-[#4ade80]" : "bg-[#e2e2e2]"}`} /> : null}
            </div>
          ))}
        </div>

        <h1 className="mt-8 text-[42px] font-bold tracking-[-0.04em] text-ink">Connect Sources</h1>
        <p className="mt-3 text-base text-ink-2">Select the platforms you want FounderReach to monitor for startup intelligence.</p>

        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input placeholder="Search platforms..." className="h-10 w-full rounded-[8px] bg-surface px-11 text-sm outline-none placeholder:text-[#a2a8a6]" />
        </div>

        <div className="mt-6 space-y-6">
          {sources.map((section) => (
            <section key={section.label}>
              <div className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">{section.label}</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-[12px] border border-[#e8e8e8] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#eef5ff]">
                        <span className={`text-sm font-bold ${item.tone}`}>{item.badge}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink">{item.name}</div>
                        <div className="text-xs text-ink-2">{item.subtitle}</div>
                      </div>
                    </div>
                    <span className={`flex h-6 w-8 items-center rounded-full p-0.5 ${item.enabled ? "bg-green" : "bg-[#d9d9d9]"}`}>
                      <span className={`h-5 w-5 rounded-full bg-white transition ${item.enabled ? "translate-x-3" : ""}`} />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#e8e8e8] pt-5">
          <button type="button" onClick={() => router.push("/step-2")} className="text-sm text-ink-2">
            Back
          </button>
          <button onClick={() => router.push("/complete")} className="rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] px-4 py-2.5 text-sm font-semibold text-white">
            Continue to Sync
          </button>
        </div>
      </div>
    </main>
  );
}
