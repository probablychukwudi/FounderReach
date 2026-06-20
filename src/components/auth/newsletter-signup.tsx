"use client";

import { useState } from "react";
import { MailPlus } from "lucide-react";
import { captureFounderEvent, identifyFounder } from "@/lib/analytics/client";
import { useAppStore } from "@/lib/store/useAppStore";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function NewsletterSignup() {
  const account = useAppStore((state) => state.account);
  const setAccount = useAppStore((state) => state.setAccount);
  const [email, setEmail] = useState(account?.email ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("Get founder opportunity updates by email.");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, source: "newsletter-form" }),
      });

      if (!response.ok) {
        throw new Error("Newsletter signup failed.");
      }

      setStatus("success");
      setMessage("You are on the newsletter list.");
      identifyFounder(normalizedEmail, {
        newsletter_opt_in: true,
      });
      captureFounderEvent("newsletter_joined", {
        source: "profile_newsletter_form",
        account_mode: account?.mode ?? "unknown",
      });
      if (account) {
        setAccount({
          ...account,
          email: account.email ?? normalizedEmail,
          newsletterOptIn: true,
        });
      }
    } catch {
      captureFounderEvent("newsletter_join_failed", {
        source: "profile_newsletter_form",
        account_mode: account?.mode ?? "unknown",
      });
      setStatus("error");
      setMessage("Could not save this email yet. Try again in a moment.");
    }
  };

  return (
    <section className="rounded-[12px] border border-black/5 bg-[#fbfbf8] px-3 py-3">
      <div className="flex items-center gap-2 text-[13px] font-medium text-ink">
        <MailPlus className="h-4 w-4 text-green" />
        FounderReach newsletter
      </div>
      <p role={status === "error" ? "alert" : "status"} className="mt-1 text-[13px] leading-5 text-ink-2">
        {message}
      </p>
      <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@startup.com"
          className="h-10 min-w-0 flex-1 rounded-[8px] border border-black/10 bg-white px-3 text-[16px] text-ink outline-none placeholder:text-ink-3 focus:border-green/35 sm:text-[13px]"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-10 rounded-[8px] bg-green px-4 text-[13px] font-medium text-white transition hover:bg-green-deep disabled:opacity-60"
        >
          {status === "loading" ? "Joining..." : "Join"}
        </button>
      </form>
    </section>
  );
}
