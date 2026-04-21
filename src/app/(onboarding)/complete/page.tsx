import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { OnboardingShell } from "@/components/forms/onboarding-shell";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  return (
    <OnboardingShell
      step={3}
      title="Your agent is ready"
      description="Describe your startup idea and hit Run. FounderReach will open the configured sources, build your institution graph, and tee up outreach for review."
    >
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-soft">
          <CheckCircle2 className="h-10 w-10 text-green" />
        </div>
        <Link href="/dashboard">
          <Button className="w-full">Go to Dashboard</Button>
        </Link>
      </div>
    </OnboardingShell>
  );
}
