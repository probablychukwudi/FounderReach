import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { agentBlueprints, permissionToggles } from "@/lib/demo-data";

export default function PermissionsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-6">
        <div className="eyebrow">Permissions</div>
        <h1 className="mt-3 text-[40px] font-black text-ink">Control what the agents can see and do.</h1>
        <div className="mt-6 space-y-4">
          {permissionToggles.map((toggle) => (
            <div key={toggle.id} className="flex items-start justify-between gap-4 rounded-[22px] bg-surface px-5 py-4">
              <div>
                <div className="font-display text-base font-bold text-ink">{toggle.label}</div>
                <div className="mt-1 text-sm leading-7 text-ink-3">{toggle.description}</div>
              </div>
              <div className={`mt-1 h-7 w-14 rounded-full p-1 ${toggle.enabled ? "bg-green" : "bg-black/10"}`}>
                <div className={`h-5 w-5 rounded-full bg-white transition ${toggle.enabled ? "translate-x-7" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="eyebrow">TinyFish Browser Access</div>
        <div className="mt-5 space-y-5">
          {agentBlueprints.map((agent) => (
            <div key={agent.id} className="rounded-[22px] bg-surface px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="font-display text-xl font-bold text-ink">{agent.title}</div>
                <Chip tone={agent.status === "complete" ? "success" : agent.status === "running" ? "amber" : "dark"}>
                  {agent.status}
                </Chip>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-2">{agent.useCase}</p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-2">
                {agent.access.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
