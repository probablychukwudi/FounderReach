"use client";

import { useRouter } from "next/navigation";
import { Field, TextInput } from "@/components/forms/field";
import { OnboardingShell } from "@/components/forms/onboarding-shell";
import { Button } from "@/components/ui/button";

export default function StepOnePage() {
  const router = useRouter();

  return (
    <OnboardingShell
      step={0}
      title="Create your account"
      description="Start with the founder identity that will anchor each outreach message and approval flow."
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/step-2");
        }}
      >
        <Field label="Work Email">
          <TextInput type="email" placeholder="founder@startup.com" required />
        </Field>
        <Field label="Password">
          <TextInput type="password" placeholder="Create a password" required />
        </Field>
        <Button className="w-full">Continue</Button>
      </form>
    </OnboardingShell>
  );
}
