"use client";

import { useRouter } from "next/navigation";
import { AuthFooterLink, AuthShell } from "@/components/forms/auth-shell";
import { Field, TextInput } from "@/components/forms/field";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthShell
      title="Log in to FounderReach"
      description="Sign in to your workspace to continue running live founder partnership research, approvals, and meeting workflows."
      footer={<AuthFooterLink prompt="Need an account?" cta="Create one" href="/signup" />}
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/dashboard");
        }}
      >
        <Field label="Work Email">
          <TextInput type="email" placeholder="you@startup.com" required />
        </Field>
        <Field label="Password">
          <TextInput type="password" placeholder="••••••••" required />
        </Field>
        <Button className="w-full">Continue</Button>
      </form>
    </AuthShell>
  );
}
