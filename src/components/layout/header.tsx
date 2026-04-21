"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, CalendarDays, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { useAppStore } from "@/lib/store/useAppStore";
import { demoSources } from "@/lib/demo-data";
import type { AgentRun } from "@/types";

export function Header() {
  const composer = useAppStore((state) => state.composer);
  const setComposer = useAppStore((state) => state.setComposer);
  const setLatestRun = useAppStore((state) => state.setLatestRun);
  const pushActivity = useAppStore((state) => state.pushActivity);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (!composer.trim()) return;

    setIsRunning(true);

    try {
      const response = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupContext: composer,
          stage: "match",
          sourceIds: demoSources.filter((source) => source.active).map((source) => source.id),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setLatestRun(data.run as AgentRun);
        pushActivity({
          id: crypto.randomUUID(),
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          action: data.message ?? "TinyFish automation kicked off from FounderReach",
        });
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-header items-center justify-between gap-4 border-b border-[#e9e9e9] bg-white/95 px-4 backdrop-blur-sm lg:px-7">
      <div className="flex min-w-[180px] items-center">
        <Link href="/dashboard" aria-label="Go to FounderReach dashboard">
          <FounderReachLogo compact />
        </Link>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center">
        <div className="relative w-full max-w-[423px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-[10.5px] w-[10.5px] text-ink-2" />
          </div>
          <input
            value={composer}
            onChange={(event) => setComposer(event.target.value)}
            placeholder="Describe your startup idea and stage..."
            className="h-10 w-full rounded-full bg-surface-2 pl-10 pr-24 font-display text-sm text-ink outline-none placeholder:text-ink-2"
          />
          <button
            className="absolute inset-y-1 right-1 rounded-full bg-ink px-4 text-xs font-semibold text-white"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? "..." : "Run"}
          </button>
        </div>
      </div>

      <div className="hidden min-w-[220px] items-center justify-end gap-3 lg:flex">
        <Link href="/profile" className="flex items-center gap-1 border-b-2 border-green pb-1 text-sm font-medium text-green">
          Venture 1
          <ChevronDown className="h-3.5 w-3.5" />
        </Link>
        <Link href="/inbox" className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition hover:bg-[#f3f3f4]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-[10px] top-[9px] h-2 w-2 rounded-full bg-[#ba1a1a] ring-2 ring-white" />
        </Link>
        <Link href="/calendar" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition hover:bg-[#f3f3f4]">
          <CalendarDays className="h-4 w-4" />
        </Link>
        <div className="h-6 w-px bg-[#e2e2e2]" />
        <Link href="/profile" className="flex items-center gap-2">
          <div className="overflow-hidden rounded-full border border-[rgba(188,202,187,0.2)]">
            <Image
              src="/assets/figma/dashboard/avatar-profile.png"
              alt="FounderReach profile"
              width={32}
              height={32}
              className="h-8 w-8 object-cover"
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <Link href="/inbox" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f4] text-ink-2">
          <Bell className="h-4 w-4" />
        </Link>
        <Link href="/calendar" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f4] text-ink-2">
          <CalendarDays className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
