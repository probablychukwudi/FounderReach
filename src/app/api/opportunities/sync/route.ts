import { NextResponse } from "next/server";
import { getOpportunitySyncPlan, syncOpportunitiesWithTinyFish } from "@/lib/opportunity-sync";
import { persistOpportunitySyncRun } from "@/lib/opportunity-repository";
import type { OpportunityCategory } from "@/types";

export const dynamic = "force-dynamic";

function parseCategories(value: string | null) {
  return value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) as OpportunityCategory[] | undefined;
}

async function handleSync(request: Request) {
  const url = new URL(request.url);
  const categoryIds = parseCategories(url.searchParams.get("categories"));
  const limitPerSource = Number(url.searchParams.get("limit") ?? 5);
  const fetchTopUrls = url.searchParams.get("fetch") !== "false";
  const shouldPersist = url.searchParams.get("persist") === "true";
  const publish = url.searchParams.get("publish") === "true";
  const plan = getOpportunitySyncPlan(categoryIds);

  if (!process.env.TINYFISH_API_KEY) {
    return NextResponse.json({
      mode: "planned",
      message: "Add TINYFISH_API_KEY to run live Search and Fetch. The route is ready and returns this plan until the key is configured.",
      plan,
      env: {
        required: ["TINYFISH_API_KEY"],
        optional: ["TINYFISH_SEARCH_URL", "TINYFISH_FETCH_URL", "NEXT_PUBLIC_LOGO_DEV_TOKEN"],
      },
    });
  }

  try {
    const result = await syncOpportunitiesWithTinyFish({
      categoryIds,
      limitPerSource: Number.isFinite(limitPerSource) ? limitPerSource : 5,
      fetchTopUrls,
    });
    const persistence = shouldPersist
      ? await persistOpportunitySyncRun({
          plan,
          ...result,
          trigger: "manual",
          publish,
        })
      : undefined;

    return NextResponse.json({
      mode: persistence?.ok ? "live-persisted" : "live",
      fetchedAt: new Date().toISOString(),
      plan,
      persistence,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        mode: "error",
        message: "TinyFish opportunity sync failed.",
        error: error instanceof Error ? error.message : "Unknown error",
        plan,
      },
      { status: 502 },
    );
  }
}

export async function GET(request: Request) {
  return handleSync(request);
}

export async function POST(request: Request) {
  return handleSync(request);
}
