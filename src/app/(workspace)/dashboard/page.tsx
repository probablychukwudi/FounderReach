"use client";

import { useEffect, useRef } from "react";
import { PipelineCard } from "@/components/pipeline/pipeline-card";
import { agentBlueprints, demoAgentRun } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store/useAppStore";

export default function DashboardPage() {
  const latestRun = useAppStore((state) => state.latestRun);
  const activeStage = latestRun?.stage ?? demoAgentRun.stage;
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const target = cardRefs.current[activeStage];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeStage]);

  return (
    <div className="px-6 py-8 xl:px-14 xl:py-8">
      <div className="max-w-[618px]">
        <p className="text-[18px] leading-[1.55] text-ink-2 xl:text-[19px]">
          Orchestrating platform indexing, relevance analysis, and personalized outreach in a high-fidelity digital studio.
        </p>
      </div>

      <div className="mt-10 overflow-hidden">
        <div className="scrollbar-none flex gap-6 overflow-x-auto pb-6 pt-2 xl:min-h-[620px]">
          {agentBlueprints.map((agent) => (
            <div
              key={agent.id}
              ref={(node) => {
                cardRefs.current[agent.id] = node;
              }}
              className="shrink-0 snap-center"
            >
              <PipelineCard agent={agent} active={agent.id === activeStage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
