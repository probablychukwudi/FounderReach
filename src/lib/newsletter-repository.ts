import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export type NewsletterPersistenceResult =
  | {
      persisted: true;
      mode: "service-role" | "public-insert" | "already-subscribed";
    }
  | {
      persisted: false;
      mode: "not-configured" | "supabase-error";
      message: string;
    };

function getPublicInsertClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function persistNewsletterSubscription({
  email,
  source,
}: {
  email: string;
  source?: string;
}): Promise<NewsletterPersistenceResult> {
  const admin = getSupabaseAdminClient();
  const now = new Date().toISOString();

  if (admin) {
    const { error } = await admin.from("newsletter_subscriptions").upsert(
      {
        email,
        source: source ?? null,
        subscribed: true,
        last_seen_at: now,
        updated_at: now,
      },
      { onConflict: "email" },
    );

    if (!error) {
      return { persisted: true, mode: "service-role" };
    }

    return {
      persisted: false,
      mode: "supabase-error",
      message: error.message,
    };
  }

  const publicClient = getPublicInsertClient();

  if (!publicClient) {
    return {
      persisted: false,
      mode: "not-configured",
      message: "Supabase is not configured for newsletter persistence.",
    };
  }

  const { error } = await publicClient.from("newsletter_subscriptions").insert({
    email,
    source: source ?? null,
    subscribed: true,
    last_seen_at: now,
    updated_at: now,
  });

  if (!error) {
    return { persisted: true, mode: "public-insert" };
  }

  if (error.code === "23505") {
    return { persisted: true, mode: "already-subscribed" };
  }

  return {
    persisted: false,
    mode: "supabase-error",
    message: error.message,
  };
}
