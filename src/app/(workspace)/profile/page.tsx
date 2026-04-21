import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { demoProfile } from "@/lib/demo-data";

const keyStatus = [
  ["TinyFish API", "Configured", "success"],
  ["Supabase", "Pending env", "amber"],
  ["Resend", "Pending env", "amber"],
  ["Google Calendar", "Pending auth", "amber"],
];

export default function ProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="p-6">
        <div className="eyebrow">Profile</div>
        <h1 className="mt-3 text-[40px] font-black text-ink">{demoProfile.startupName}</h1>
        <p className="mt-4 text-base leading-7 text-ink-2">{demoProfile.startupDescription}</p>
        <div className="mt-6 flex gap-3">
          <Chip tone="success">{demoProfile.startupStage}</Chip>
          <Chip>{demoProfile.fullName}</Chip>
        </div>
      </Card>
      <Card className="p-6">
        <div className="eyebrow">API Key Management</div>
        <div className="mt-5 space-y-4">
          {keyStatus.map(([label, status, tone]) => (
            <div key={label} className="flex items-center justify-between rounded-[20px] bg-surface px-4 py-4">
              <div>
                <div className="font-display text-base font-bold text-ink">{label}</div>
                <div className="mt-1 text-sm text-ink-3">Server-side integration status</div>
              </div>
              <Chip tone={tone as "success" | "amber"}>{status}</Chip>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
