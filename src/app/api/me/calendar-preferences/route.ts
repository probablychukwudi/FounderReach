import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { CalendarPreferences } from "@/types";

export const dynamic = "force-dynamic";

const calendarPreferencesSchema = z.object({
  timezone: z.string().trim().min(1).max(80).optional(),
  defaultView: z.enum(["month", "week", "list"]).optional(),
  digestFrequency: z.enum(["off", "daily", "weekly"]).optional(),
  savedDeadlineWindowDays: z.number().int().min(1).max(90).optional(),
});

const defaultPreferences: CalendarPreferences = {
  timezone: "America/New_York",
  defaultView: "month",
  digestFrequency: "weekly",
  savedDeadlineWindowDays: 14,
};

async function getSessionUser() {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return {
      supabase: null,
      userId: null,
      response: NextResponse.json(
        {
          ok: false,
          message: "Supabase is not configured.",
        },
        { status: 503 },
      ),
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      userId: null,
      response: NextResponse.json(
        {
          ok: false,
          message: "Sign in to sync calendar preferences.",
        },
        { status: 401 },
      ),
    };
  }

  return {
    supabase,
    userId: user.id,
    response: null,
  };
}

function fromRow(row: Record<string, unknown> | null): CalendarPreferences {
  if (!row) return defaultPreferences;

  return {
    timezone: String(row.timezone ?? defaultPreferences.timezone),
    defaultView: (row.default_view as CalendarPreferences["defaultView"]) ?? defaultPreferences.defaultView,
    digestFrequency:
      (row.digest_frequency as CalendarPreferences["digestFrequency"]) ?? defaultPreferences.digestFrequency,
    savedDeadlineWindowDays:
      Number(row.saved_deadline_window_days ?? defaultPreferences.savedDeadlineWindowDays),
  };
}

export async function GET() {
  const { supabase, userId, response } = await getSessionUser();
  if (response) return response;

  const { data, error } = await supabase
    .from("calendar_preferences")
    .select("timezone,default_view,digest_frequency,saved_deadline_window_days")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    preferences: fromRow(data),
  });
}

export async function PUT(request: Request) {
  const parsed = calendarPreferencesSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Calendar preferences payload is invalid.",
      },
      { status: 400 },
    );
  }

  const { supabase, userId, response } = await getSessionUser();
  if (response) return response;

  const next = {
    ...defaultPreferences,
    ...parsed.data,
  };

  const { error } = await supabase.from("calendar_preferences").upsert(
    {
      user_id: userId,
      timezone: next.timezone,
      default_view: next.defaultView,
      digest_frequency: next.digestFrequency,
      saved_deadline_window_days: next.savedDeadlineWindowDays,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error.message,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    preferences: next,
  });
}
