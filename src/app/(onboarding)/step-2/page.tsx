"use client";

import { useRouter } from "next/navigation";
import { Field, TextArea, TextInput } from "@/components/forms/field";
import { OnboardingShell } from "@/components/forms/onboarding-shell";
import { Button } from "@/components/ui/button";

export default function StepTwoPage() {
  const router = useRouter();

  return (
    <OnboardingShell
      step={1}
      title="Describe your startup"
      description="This becomes the core context every TinyFish agent uses to match, qualify, and personalize."
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/step-3");
        }}
      >
        <Field label="Startup Name">
          <TextInput placeholder="FounderReach" required />
        </Field>
        <Field label="One-line Description">
          <TextArea placeholder="FounderReach helps founders identify and activate research, grant, and investor partnerships." required />
        </Field>
        <Field label="Stage">
          <TextInput placeholder="Seed" required />
        </Field>
        <Button className="w-full">Continue</Button>
      </form>
    </OnboardingShell>
  );
}
