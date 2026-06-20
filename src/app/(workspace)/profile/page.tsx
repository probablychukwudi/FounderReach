"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Mail, Rocket, ShieldCheck, Star } from "lucide-react";
import { NewsletterSignup } from "@/components/auth/newsletter-signup";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store/useAppStore";

export default function ProfilePage() {
  const router = useRouter();
  const account = useAppStore((state) => state.account);
  const savedOpportunityIds = useAppStore((state) => state.savedOpportunityIds);
  const calendarPreferences = useAppStore((state) => state.calendarPreferences);
  const clearAccount = useAppStore((state) => state.clearAccount);
  const displayEmail = account?.email ?? "Guest workspace";
  const displayName = account?.mode === "email" ? "FounderReach member" : "Guest founder";

  const handleSignOut = async () => {
    await getSupabaseBrowserClient()?.auth.signOut();
    document.cookie = `founderreach_guest=; path=/; max-age=0; SameSite=Lax${
      window.location.protocol === "https:" ? "; Secure" : ""
    }`;
    clearAccount();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-full bg-surface px-8 py-5 text-ink">
      <div className="mx-auto max-w-[900px]">
        <div className="flex flex-col gap-5 border-b border-black/5 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px] border border-black/5 bg-white">
              <Image src="/assets/brand/founderreach-logo-mark.svg" alt="FounderReach" width={42} height={45} className="h-auto w-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[13px] text-green">
                <Rocket className="h-4 w-4" />
                Founder profile
              </div>
              <h1 className="mt-1 text-[30px] font-semibold tracking-normal">{displayName}</h1>
              <div className="mt-2 flex items-center gap-2 text-[14px] text-ink-2">
                <Mail className="h-4 w-4" />
                {displayEmail}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {account?.mode === "email" ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-black/10 bg-white px-3 text-[13px] font-medium text-ink transition hover:bg-[#fbfbf8]"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            ) : (
              <Link
                href="/signup"
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-green px-3 text-[13px] font-medium text-white transition hover:bg-green-deep"
              >
                <Mail className="h-4 w-4" />
                Save with email
              </Link>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <section className="rounded-[14px] border border-black/5 bg-white px-4 py-4">
            <h2 className="text-[17px] font-semibold">Workspace</h2>
            <div className="mt-4 space-y-4">
              {[
                ["Access", account?.mode === "email" ? "Email sign-in" : "Guest mode"],
                ["Saved opportunities", `${savedOpportunityIds.length} saved`],
                [
                  "Calendar",
                  account?.mode === "email"
                    ? `${calendarPreferences.defaultView} view synced`
                    : "Local guest calendar",
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-[11px] uppercase tracking-[0.06em] text-ink-3">{label}</label>
                  <div className="mt-2 rounded-[8px] border border-black/5 bg-[#f4efe8] px-3 py-3 text-[14px] leading-6 text-ink">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[14px] border border-black/5 bg-white px-4 py-4">
            <h2 className="text-[17px] font-semibold">Preferences</h2>
            <div className="mt-4 space-y-3">
              {[
                ["Default location", "Global / online first"],
                ["Best opportunities", "Free, non-dilutive, credits, community"],
                ["Alerts", `Deadlines inside ${calendarPreferences.savedDeadlineWindowDays} days, saved source changes`],
                ["Newsletter", account?.newsletterOptIn ? "Subscribed" : "Not subscribed"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start gap-3 rounded-[10px] border border-black/5 bg-[#fbfbf8] px-3 py-3">
                  {label === "Alerts" ? <Bell className="mt-0.5 h-4 w-4 text-[#8b5a00]" /> : label === "Newsletter" ? <Mail className="mt-0.5 h-4 w-4 text-green" /> : <ShieldCheck className="mt-0.5 h-4 w-4 text-green" />}
                  <div>
                    <div className="text-[13px] font-medium">{label}</div>
                    <div className="mt-1 text-[13px] leading-5 text-ink-2">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-[14px] border border-black/5 bg-white px-4 py-4">
            <h2 className="text-[17px] font-semibold">Saved stack</h2>
            <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-black/5 bg-[#fbfbf8] px-3 py-3">
              <Star className="h-4 w-4 text-green" />
              <div>
                <div className="text-[13px] font-medium">{savedOpportunityIds.length} saved items</div>
                <div className="mt-1 text-[13px] leading-5 text-ink-2">Saved cards show up in the sidebar and deadline views.</div>
              </div>
            </div>
          </section>

          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
