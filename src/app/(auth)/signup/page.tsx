"use client";

import { useRouter } from "next/navigation";
import { AuthFooterLink, AuthShell } from "@/components/forms/auth-shell";
import { Field, TextInput } from "@/components/forms/field";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthShell
      title="Create your FounderReach account"
      description="Set up a secure workspace for startup context, research sources, and approval-gated outreach."
      footer={<AuthFooterLink prompt="Already have an account?" cta="Log in" href="/login" />}
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/step-1");
        }}
      >
        <Field label="Work Email">
          <TextInput type="email" placeholder="you@startup.com" required />
        </Field>
        <Field label="Password">
          <TextInput type="password" placeholder="Create a password" required />
        </Field>
        <Button className="w-full">Continue</Button>
      </form>
    </AuthShell>
  );
}
