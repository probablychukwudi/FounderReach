"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PipelineCard } from "@/components/pipeline/pipeline-card";
import { agentBlueprints, demoAgentRun } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/useAppStore";

const canvas = {
  width: 1500,
  height: 760,
  inset: 48,
};

const cardSize = {
  width: 328,
  height: 571,
};

const stagePositions = {
  match: { x: 0, y: 74 },
  qualify: { x: 372, y: 74 },
  outreach: { x: 744, y: 74 },
  book: { x: 1116, y: 74 },
} as const;

const connectorLabels = [
  { label: "institution_list", x: 332 },
  { label: "qualified_targets", x: 704 },
  { label: "approval_queue", x: 1076 },
];

const ZOOM_MIN = 0.54;
const ZOOM_MAX = 1.24;
const DEFAULT_ZOOM = 0.62;

function clampZoom(nextZoom: number) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number(nextZoom.toFixed(2))));
}

export default function DashboardPage() {
  const latestRun = useAppStore((state) => state.latestRun);
  const activeStage = latestRun?.stage ?? demoAgentRun.stage;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const focusStage = useCallback(
    (stage: keyof typeof stagePositions, nextZoom = zoom) => {
      const container = containerRef.current;
      if (!container) return;

      const position = stagePositions[stage];
      const midpointX = (position.x + cardSize.width / 2 + canvas.inset) * nextZoom;
      const midpointY = (position.y + cardSize.height / 2 + canvas.inset) * nextZoom;
      const nextLeft = Math.max(0, midpointX - container.clientWidth / 2);
      const nextTop = Math.max(0, midpointY - container.clientHeight / 2);

      container.scrollTo({
        left: nextLeft,
        top: nextTop,
        behavior: "smooth",
      });
    },
    [zoom],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      focusStage(activeStage);
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [activeStage, focusStage]);

  const updateZoom = (nextZoom: number, stage: keyof typeof stagePositions = activeStage) => {
    const clamped = clampZoom(nextZoom);
    setZoom(clamped);
    window.requestAnimationFrame(() => {
      focusStage(stage, clamped);
    });
  };

  return (
    <div className="h-full bg-[#f5f1ea] px-5 py-6 xl:px-8 xl:py-6">
      <div className="mx-auto flex h-full max-w-[1400px] min-h-0 flex-col rounded-[28px] border border-[rgba(188,202,187,0.24)] bg-[rgba(255,255,255,0.68)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm xl:p-7">
        <div className="flex shrink-0 flex-col gap-5 border-b border-[rgba(188,202,187,0.22)] pb-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[18px] leading-[1.55] text-ink-2 xl:text-[19px]">
              Orchestrating platform indexing, relevance analysis, and personalized outreach in a high-fidelity digital studio.
            </p>
            <p className="mt-3 text-sm leading-6 text-ink-3">
              Scroll to pan across the four-agent system, zoom out to see the full handoff, or focus on the stage that is actively running.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[rgba(188,202,187,0.3)] bg-white px-2 py-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              {agentBlueprints.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => updateZoom(agent.id === activeStage ? 0.96 : 0.82, agent.id)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition",
                    agent.id === activeStage ? "bg-ink text-white" : "text-ink-2 hover:bg-surface",
                  )}
                >
                  {agent.title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-full border border-[rgba(188,202,187,0.3)] bg-white p-1 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <button
                type="button"
                onClick={() => updateZoom(zoom - 0.1)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-surface"
              >
                –
              </button>
              <button
                type="button"
                onClick={() => updateZoom(DEFAULT_ZOOM)}
                className="rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-2 transition hover:bg-surface"
              >
                Fit
              </button>
              <button
                type="button"
                onClick={() => updateZoom(zoom + 0.1)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-surface"
              >
                +
              </button>
              <span className="pl-2 pr-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 min-h-0 flex-1 rounded-[24px] border border-[rgba(188,202,187,0.22)] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95)_0%,_rgba(245,241,234,0.98)_50%,_rgba(240,234,225,1)_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] xl:p-5">
          <div
            ref={containerRef}
            onWheel={(event) => {
              if (!(event.metaKey || event.ctrlKey)) return;
              event.preventDefault();
              updateZoom(zoom + (event.deltaY > 0 ? -0.08 : 0.08));
            }}
            className="scrollbar-none relative h-full overflow-auto rounded-[20px] border border-[rgba(188,202,187,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(247,243,236,0.92)_100%)]"
          >
            <div
              className="relative"
              style={{
                width: canvas.width * zoom + canvas.inset * 2,
                height: canvas.height * zoom + canvas.inset * 2,
              }}
            >
              <div
                className="absolute left-0 top-0"
                style={{
                  width: canvas.width,
                  height: canvas.height,
                  transform: `translate(${canvas.inset}px, ${canvas.inset}px) scale(${zoom})`,
                  transformOrigin: "top left",
                }}
              >
                {connectorLabels.map((connector) => (
                  <div key={connector.label} className="absolute top-[322px]" style={{ left: connector.x }}>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-[rgba(188,202,187,0.3)] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                        {connector.label}
                      </span>
                      <div className="h-px w-10 bg-[#d5d0c6]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">handoff</span>
                    </div>
                  </div>
                ))}

                {agentBlueprints.map((agent) => (
                  <div
                    key={agent.id}
                    className="absolute"
                    style={{
                      left: stagePositions[agent.id].x,
                      top: stagePositions[agent.id].y,
                    }}
                  >
                    <PipelineCard agent={agent} active={agent.id === activeStage} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="text-[11px] uppercase tracking-[0.08em] text-ink-3">
              Scroll to pan the studio. Hold <span className="font-semibold text-ink">Ctrl</span> or <span className="font-semibold text-ink">Cmd</span> while scrolling to zoom.
            </div>
            <div className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-2 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              Active handoff: {activeStage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
