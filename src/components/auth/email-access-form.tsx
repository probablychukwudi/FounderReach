"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, KeyRound, Mail, UserRound } from "lucide-react";
import { Field, TextInput } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import { captureFounderEvent, identifyFounder } from "@/lib/analytics/client";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store/useAppStore";

type AccessIntent = "login" | "signup";
type Step = "email" | "code";

const guestCookie = "founderreach_guest=1; path=/; max-age=2592000; SameSite=Lax";
const clearGuestCookie = "founderreach_guest=; path=/; max-age=0; SameSite=Lax";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function withSecureCookie(value: string) {
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return `${value}; Secure`;
  }

  return value;
}

async function subscribeToNewsletter(email: string, source: string) {
  const response = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });

  if (!response.ok) {
    throw new Error("Newsletter signup failed.");
  }
}

export function EmailAccessForm({ intent }: { intent: AccessIntent }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccount = useAppStore((state) => state.setAccount);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(intent === "signup");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nextPath = useMemo(() => {
    const value = searchParams.get("next");
    if (value?.startsWith("/")) return value;
    return intent === "signup" ? "/step-1" : "/dashboard";
  }, [intent, searchParams]);

  const handleSendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setError("Enter an email address.");
      return;
    }

    setIsLoading(true);

    try {
      if (newsletterOptIn) {
        await subscribeToNewsletter(normalizedEmail, `${intent}-email-access`);
      }

      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        setStep("code");
        setMessage("Development mode: enter 123456 to continue.");
        captureFounderEvent("auth_code_requested", {
          intent,
          newsletter_opt_in: newsletterOptIn,
          auth_provider: "development",
        });
        return;
      }

      const emailRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo,
          shouldCreateUser: true,
          data: {
            newsletter_opt_in: newsletterOptIn,
            access_intent: intent,
          },
        },
      });

      if (otpError) throw otpError;

      setStep("code");
      setMessage("Check your email for the FounderReach link or one-time code.");
      captureFounderEvent("auth_code_requested", {
        intent,
        newsletter_opt_in: newsletterOptIn,
        auth_provider: "supabase",
      });
    } catch (sendError) {
      captureFounderEvent("auth_code_request_failed", {
        intent,
        auth_provider: "supabase",
      });
      setError(sendError instanceof Error ? sendError.message : "Could not send the email link.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const normalizedEmail = normalizeEmail(email);
    const normalizedToken = token.trim();
    if (!normalizedToken) {
      setError("Enter the code from your email.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        if (normalizedToken !== "123456") {
          throw new Error("Use 123456 in development mode.");
        }
      } else {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email: normalizedEmail,
          token: normalizedToken,
          type: "email",
        });

        if (verifyError) throw verifyError;
      }

      document.cookie = withSecureCookie(clearGuestCookie);
      identifyFounder(normalizedEmail, {
        account_mode: "email",
        intent,
        newsletter_opt_in: newsletterOptIn,
      });
      captureFounderEvent("auth_code_verified", {
        intent,
        newsletter_opt_in: newsletterOptIn,
      });
      setAccount({
        mode: "email",
        email: normalizedEmail,
        newsletterOptIn,
        createdAt: new Date().toISOString(),
      });
      router.push(nextPath);
      router.refresh();
    } catch (verifyError) {
      captureFounderEvent("auth_code_verify_failed", {
        intent,
      });
      setError(verifyError instanceof Error ? verifyError.message : "Could not verify that code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = () => {
    document.cookie = withSecureCookie(guestCookie);
    captureFounderEvent("guest_workspace_started", {
      intent,
      next_path: nextPath,
    });
    setAccount({
      mode: "guest",
      newsletterOptIn: false,
      createdAt: new Date().toISOString(),
    });
    router.push(nextPath);
    router.refresh();
  };

  return (
    <div className="space-y-5">
      {step === "email" ? (
        <form className="space-y-4" onSubmit={handleSendCode}>
          <Field label="Email">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
              <TextInput
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@startup.com"
                className="rounded-[10px] pl-10"
                autoComplete="email"
                required
              />
            </div>
          </Field>

          <label className="flex items-start gap-3 rounded-[10px] border border-black/5 bg-[#fbfbf8] px-3 py-3 text-[13px] leading-5 text-ink-2">
            <input
              type="checkbox"
              checked={newsletterOptIn}
              onChange={(event) => setNewsletterOptIn(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-black/20 accent-green"
            />
            <span>Send me weekly founder updates with new accelerators, grants, hackathons, credits, and launch channels.</span>
          </label>

          <Button className="w-full gap-2 rounded-[10px]" disabled={isLoading}>
            {isLoading ? "Sending..." : intent === "signup" ? "Send sign-up link" : "Send sign-in link"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <form className="space-y-4" onSubmit={handleVerifyCode}>
          <Field label="One-time code" hint={`Sent to ${normalizeEmail(email)}`}>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
              <TextInput
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="123456"
                inputMode="numeric"
                className="rounded-[10px] pl-10 tracking-[0.2em]"
                autoComplete="one-time-code"
                required
              />
            </div>
          </Field>
          <Button className="w-full gap-2 rounded-[10px]" disabled={isLoading}>
            {isLoading ? "Checking..." : "Verify and continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <button type="button" onClick={() => setStep("email")} className="text-[13px] font-medium text-green">
            Use a different email
          </button>
        </form>
      )}

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="h-px bg-black/5" />
        <div className="text-center text-[12px] text-ink-3">or</div>
        <div className="h-px bg-black/5" />
      </div>

      <button
        type="button"
        onClick={handleGuest}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-black/10 bg-white text-[14px] font-medium text-ink transition hover:bg-[#fbfbf8]"
      >
        <UserRound className="h-4 w-4 text-green" />
        Continue as guest
      </button>

      {message ? (
        <div role="status" className="rounded-[10px] border border-green/15 bg-green-soft px-3 py-2 text-[13px] leading-5 text-green">
          {message}
        </div>
      ) : null}
      {error ? (
        <div role="alert" className="rounded-[10px] border border-[#ba1a1a]/15 bg-[#fff4f0] px-3 py-2 text-[13px] leading-5 text-[#8f1d10]">
          {error}
        </div>
      ) : null}
    </div>
  );
}
