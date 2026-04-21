"use client";

import { Bell, CalendarDays, Search } from "lucide-react";
import { useState } from "react";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useAppStore } from "@/lib/store/useAppStore";
import { initials } from "@/lib/utils";
import { demoProfile, demoSources } from "@/lib/demo-data";
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
    <header className="sticky top-0 z-30 flex h-header items-center gap-4 border-b border-black/5 bg-surface/80 px-5 backdrop-blur-sm lg:px-7">
      <FounderReachLogo compact />
      <div className="flex flex-1 items-center gap-3 rounded-full bg-surface-2 px-4 py-2">
        <Search className="h-4 w-4 text-ink-3" />
        <input
          value={composer}
          onChange={(event) => setComposer(event.target.value)}
          placeholder="Describe your startup idea and stage..."
          className="h-9 flex-1 border-0 bg-transparent font-body text-sm text-ink outline-none placeholder:text-ink-3"
        />
        <Button className="h-10 px-5" onClick={handleRun} disabled={isRunning}>
          {isRunning ? "Running" : "Run"}
        </Button>
      </div>
      <Chip tone="success">TinyFish Core</Chip>
      <button className="rounded-full bg-white/70 p-2 text-ink-3">
        <Bell className="h-4 w-4" />
      </button>
      <button className="rounded-full bg-white/70 p-2 text-ink-3">
        <CalendarDays className="h-4 w-4" />
      </button>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
        {initials(demoProfile.fullName)}
      </div>
    </header>
  );
}
