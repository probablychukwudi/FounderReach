import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const savedOpportunitiesSchema = z.object({
  opportunityIds: z.array(z.string().trim().min(1).max(160)).max(500),
});

async function getSessionUser() {
  const supabase = getSupabaseServerClient();

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
          message: "Sign in to sync saved opportunities.",
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

export async function GET() {
  const { supabase, userId, response } = await getSessionUser();
  if (response) return response;

  const { data, error } = await supabase
    .from("user_saved_opportunities")
    .select("opportunity_id")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });

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
    opportunityIds: (data ?? []).map((item) => item.opportunity_id as string),
  });
}

export async function PUT(request: Request) {
  const parsed = savedOpportunitiesSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Saved opportunities payload is invalid.",
      },
      { status: 400 },
    );
  }

  const { supabase, userId, response } = await getSessionUser();
  if (response) return response;

  const opportunityIds = Array.from(new Set(parsed.data.opportunityIds));
  const { error: deleteError } = await supabase
    .from("user_saved_opportunities")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    return NextResponse.json(
      {
        ok: false,
        message: deleteError.message,
      },
      { status: 503 },
    );
  }

  if (opportunityIds.length) {
    const { error: insertError } = await supabase.from("user_saved_opportunities").insert(
      opportunityIds.map((opportunityId) => ({
        user_id: userId,
        opportunity_id: opportunityId,
      })),
    );

    if (insertError) {
      return NextResponse.json(
        {
          ok: false,
          message: insertError.message,
        },
        { status: 503 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    opportunityIds,
  });
}
