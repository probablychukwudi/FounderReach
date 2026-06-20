"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import type { CalendarPreferences, Opportunity } from "@/types";

type OpportunitiesResponse = {
  ok: boolean;
  opportunities?: Opportunity[];
};

type SavedResponse = {
  ok: boolean;
  opportunityIds?: string[];
};

type CalendarResponse = {
  ok: boolean;
  preferences?: CalendarPreferences;
};

export function OpportunityHydrator() {
  const account = useAppStore((state) => state.account);
  const savedOpportunityIds = useAppStore((state) => state.savedOpportunityIds);
  const setOpportunities = useAppStore((state) => state.setOpportunities);
  const setSavedOpportunityIds = useAppStore((state) => state.setSavedOpportunityIds);
  const setCalendarPreferences = useAppStore((state) => state.setCalendarPreferences);
  const savedReadyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/opportunities", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: OpportunitiesResponse | null) => {
        if (!cancelled && payload?.ok && payload.opportunities?.length) {
          setOpportunities(payload.opportunities);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [setOpportunities]);

  useEffect(() => {
    if (account?.mode !== "email") {
      savedReadyRef.current = false;
      return;
    }

    let cancelled = false;
    savedReadyRef.current = false;

    Promise.allSettled([
      fetch("/api/me/saved-opportunities", { cache: "no-store" }).then((response) =>
        response.ok ? response.json() : null,
      ),
      fetch("/api/me/calendar-preferences", { cache: "no-store" }).then((response) =>
        response.ok ? response.json() : null,
      ),
    ]).then(([savedResult, calendarResult]) => {
      if (cancelled) return;

      if (savedResult.status === "fulfilled") {
        const savedPayload = savedResult.value as SavedResponse | null;
        if (savedPayload?.ok && savedPayload.opportunityIds) {
          setSavedOpportunityIds(savedPayload.opportunityIds);
        }
      }

      if (calendarResult.status === "fulfilled") {
        const calendarPayload = calendarResult.value as CalendarResponse | null;
        if (calendarPayload?.ok && calendarPayload.preferences) {
          setCalendarPreferences(calendarPayload.preferences);
        }
      }

      savedReadyRef.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, [account?.mode, setCalendarPreferences, setSavedOpportunityIds]);

  useEffect(() => {
    if (account?.mode !== "email" || !savedReadyRef.current) return;

    const timeout = window.setTimeout(() => {
      fetch("/api/me/saved-opportunities", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityIds: savedOpportunityIds }),
      }).catch(() => undefined);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [account?.mode, savedOpportunityIds]);

  return null;
}
