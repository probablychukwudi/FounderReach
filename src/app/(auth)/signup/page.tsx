import { Suspense } from "react";
import { EmailAccessForm } from "@/components/auth/email-access-form";
import { NewsletterSignup } from "@/components/auth/newsletter-signup";
import { AuthFooterLink, AuthShell } from "@/components/forms/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your FounderReach account"
      description="Start with email access. FounderReach will keep your saved opportunities, calendar, newsletter preferences, and founder context attached to your workspace."
      footer={<AuthFooterLink prompt="Already have an account?" cta="Log in" href="/login" />}
    >
      <div className="space-y-4">
        <Suspense fallback={<div className="h-44 rounded-[10px] bg-[#fbfbf8]" />}>
          <EmailAccessForm intent="signup" />
        </Suspense>
        <NewsletterSignup />
      </div>
    </AuthShell>
  );
}
