import { Suspense } from "react";
import { EmailAccessForm } from "@/components/auth/email-access-form";
import { NewsletterSignup } from "@/components/auth/newsletter-signup";
import { AuthFooterLink, AuthShell } from "@/components/forms/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Log in to FounderReach"
      description="Use your email to open a saved workspace with your calendar, saved opportunities, alerts, and founder preferences."
      footer={<AuthFooterLink prompt="Need an account?" cta="Create one" href="/signup" />}
    >
      <div className="space-y-4">
        <Suspense fallback={<div className="h-44 rounded-[10px] bg-[#fbfbf8]" />}>
          <EmailAccessForm intent="login" />
        </Suspense>
        <NewsletterSignup />
      </div>
    </AuthShell>
  );
}
