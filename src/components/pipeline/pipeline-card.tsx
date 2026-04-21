import { BrowserMock } from "@/components/browser/browser-mock";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import type { AgentBlueprint } from "@/types";

export function PipelineCard({ agent }: { agent: AgentBlueprint }) {
  const statusTone =
    agent.status === "complete"
      ? "success"
      : agent.status === "running"
        ? "amber"
        : agent.status === "ready"
          ? "dark"
          : "default";

  return (
    <Card className="flex w-full min-w-[320px] flex-col gap-4 p-5 xl:max-w-[328px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="eyebrow">{agent.title}</div>
          <h3 className="mt-2 text-[24px] font-bold text-ink">{agent.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-2">{agent.description}</p>
        </div>
        <Chip tone={statusTone}>{agent.status}</Chip>
      </div>
      <BrowserMock url={agent.primaryUrl} title={agent.useCase} body={agent.access[0]} />
      <div className="flex items-center justify-between rounded-[18px] bg-surface px-4 py-3">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Count
          </div>
          <div className="mt-1 font-display text-lg font-bold text-ink">{agent.countLabel}</div>
        </div>
        <div className="max-w-[130px] text-right text-xs leading-5 text-ink-3">
          {agent.useCase}
        </div>
      </div>
    </Card>
  );
}
