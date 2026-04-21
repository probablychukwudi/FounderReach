"use client";

import { useRouter } from "next/navigation";
import { OnboardingShell } from "@/components/forms/onboarding-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoSources } from "@/lib/demo-data";

export default function StepThreePage() {
  const router = useRouter();

  return (
    <OnboardingShell
      step={2}
      title="Choose your browser sources"
      description="FounderReach uses these live surfaces to power each TinyFish agent. Toggle the ones you want in the run plan."
    >
      <div className="space-y-4">
        {demoSources.map((source) => (
          <Card key={source.id} className="flex items-start justify-between gap-4 p-4">
            <div>
              <div className="font-display text-base font-bold text-ink">{source.label}</div>
              <div className="mt-1 text-sm leading-7 text-ink-3">{source.useCase}</div>
            </div>
            <div className={`mt-1 h-7 w-14 rounded-full p-1 ${source.active ? "bg-green" : "bg-black/10"}`}>
              <div className={`h-5 w-5 rounded-full bg-white ${source.active ? "translate-x-7" : ""}`} />
            </div>
          </Card>
        ))}
        <Button className="w-full" onClick={() => router.push("/complete")}>
          Continue
        </Button>
      </div>
    </OnboardingShell>
  );
}
