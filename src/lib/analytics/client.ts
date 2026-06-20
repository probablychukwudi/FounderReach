"use client";

import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
let posthogInitialized = false;

type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

export function ensurePostHog() {
  if (!posthogKey || typeof window === "undefined") return null;

  if (!posthogInitialized) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      defaults: "2026-05-30",
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
      request_batching: false,
      loaded: (client) => {
        if (process.env.NODE_ENV === "development") {
          client.debug();
        }
      },
    });
    posthogInitialized = true;
  }

  return posthog;
}

export function captureFounderEvent(event: string, properties?: AnalyticsProperties) {
  const client = ensurePostHog();
  if (!client) return;

  client.capture(event, {
    app: "founderreach",
    ...properties,
  });
}

export function identifyFounder(email?: string, properties?: AnalyticsProperties) {
  if (!email) return;
  const client = ensurePostHog();
  if (!client) return;

  client.identify(email, {
    email,
    ...properties,
  });
}

export function resetFounderAnalytics() {
  const client = ensurePostHog();
  if (!client) return;

  client.reset();
}

export { posthog };
