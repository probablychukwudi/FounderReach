import { ArrowRight, Building2, Inbox, Sparkles } from "lucide-react";
import { PipelineCard } from "@/components/pipeline/pipeline-card";
import { PipelineConnector } from "@/components/pipeline/pipeline-connector";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { agentBlueprints, demoAgentRun, demoInstitutions, demoOutreach } from "@/lib/demo-data";

export default function DashboardPage() {
  const runMetrics = [
    {
      label: "Institutions Found",
      value: String(demoAgentRun.institutionsFound),
      Icon: Building2,
    },
    {
      label: "Qualified Targets",
      value: String(demoAgentRun.institutionsQualified),
      Icon: Sparkles,
    },
    {
      label: "Drafts Created",
      value: String(demoAgentRun.draftsCreated),
      Icon: Inbox,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Run Overview</div>
            <h1 className="mt-3 text-[44px] font-black text-ink">FounderReach Dashboard</h1>
            <p className="mt-4 max-w-[780px] text-base leading-7 text-ink-2">
              This workspace is built around TinyFish browser runs. Each agent stage has explicit browser access, a founder-readable use case, and a measurable pipeline output.
            </p>
          </div>
          <Chip tone="success">Run {demoAgentRun.status}</Chip>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {runMetrics.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-[20px] bg-surface px-5 py-4">
              <Icon className="h-5 w-5 text-green" />
              <div className="mt-4 text-[36px] font-black text-ink">{value}</div>
              <div className="text-sm text-ink-3">{label}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-6 xl:flex-row">
        <PipelineCard agent={agentBlueprints[0]} />
        <PipelineConnector label="institution_list →" />
        <PipelineCard agent={agentBlueprints[1]} />
        <PipelineConnector label="qualified_labs →" />
        <PipelineCard agent={agentBlueprints[2]} />
        <PipelineConnector label="warm_paths →" />
        <PipelineCard agent={agentBlueprints[3]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="eyebrow">Current Top Matches</div>
            <ArrowRight className="h-4 w-4 text-ink-3" />
          </div>
          <div className="mt-5 space-y-4">
            {demoInstitutions.map((institution) => (
              <div key={institution.id} className="rounded-[22px] bg-surface px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-display text-lg font-bold text-ink">{institution.name}</div>
                    <div className="mt-2 text-sm leading-7 text-ink-2">{institution.description}</div>
                  </div>
                  <Chip tone="success">{Math.round(institution.relevanceScore * 100)}%</Chip>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="eyebrow">Awaiting Approval</div>
          <div className="mt-5 space-y-4">
            {demoOutreach.map((outreach) => (
              <div key={outreach.id} className="rounded-[22px] border border-black/6 bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-display text-lg font-bold text-ink">{outreach.subject}</div>
                  <Chip tone={outreach.status === "pending_approval" ? "amber" : "success"}>{outreach.status}</Chip>
                </div>
                <p className="mt-3 text-sm leading-7 text-ink-2">{outreach.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
