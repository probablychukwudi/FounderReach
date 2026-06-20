"use client";

import { useEffect } from "react";
import { identifyFounder, resetFounderAnalytics } from "@/lib/analytics/client";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store/useAppStore";

const clearGuestCookie = "founderreach_guest=; path=/; max-age=0; SameSite=Lax";

function withSecureCookie(value: string) {
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return `${value}; Secure`;
  }

  return value;
}

export function AuthStateBridge() {
  const setAccount = useAppStore((state) => state.setAccount);
  const clearAccount = useAppStore((state) => state.clearAccount);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const applyUser = (email?: string) => {
      if (email) {
        document.cookie = withSecureCookie(clearGuestCookie);
        identifyFounder(email, {
          account_mode: "email",
          source: "supabase_session",
        });
        setAccount({
          mode: "email",
          email,
          newsletterOptIn: Boolean(useAppStore.getState().account?.newsletterOptIn),
          createdAt: useAppStore.getState().account?.createdAt ?? new Date().toISOString(),
        });
        return;
      }

      if (useAppStore.getState().account?.mode === "email") {
        resetFounderAnalytics();
        clearAccount();
      }
    };

    supabase.auth.getUser().then(({ data }) => applyUser(data.user?.email));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applyUser(session?.user.email);
    });

    return () => subscription.unsubscribe();
  }, [clearAccount, setAccount]);

  return null;
}
