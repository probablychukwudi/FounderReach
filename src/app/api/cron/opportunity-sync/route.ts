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

function clampLimit(value: string | null) {
  const parsed = Number(value ?? 2);
  if (!Number.isFinite(parsed)) return 2;
  return Math.max(1, Math.min(8, parsed));
}

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("authorization") === `Bearer ${secret}`;
}

async function handleCron(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unauthorized cron request.",
      },
      { status: 401 },
    );
  }

  const url = new URL(request.url);
  const categoryIds = parseCategories(url.searchParams.get("categories"));
  const limitPerSource = clampLimit(url.searchParams.get("limit"));
  const fetchTopUrls = url.searchParams.get("fetch") !== "false";
  const publish = url.searchParams.get("publish") !== "false";
  const plan = getOpportunitySyncPlan(categoryIds);

  if (!process.env.TINYFISH_API_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "planned",
      message: "Add TINYFISH_API_KEY before the cron job can search live sources.",
      plan,
    });
  }

  try {
    const result = await syncOpportunitiesWithTinyFish({
      categoryIds,
      limitPerSource,
      fetchTopUrls,
    });
    const persistence = await persistOpportunitySyncRun({
      plan,
      ...result,
      trigger: "cron",
      publish,
    });

    return NextResponse.json({
      ok: true,
      mode: persistence.ok ? "live-persisted" : "live-no-persistence",
      fetchedAt: new Date().toISOString(),
      publish,
      plan,
      candidateCount: result.candidates.length,
      fetchedCount: result.fetched.length,
      errorCount: result.errors.length,
      persistence,
      candidates: result.candidates,
      errors: result.errors,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        mode: "error",
        message: "Scheduled opportunity sync failed.",
        error: error instanceof Error ? error.message : "Unknown error",
        plan,
      },
      { status: 502 },
    );
  }
}

export async function GET(request: Request) {
  return handleCron(request);
}

export async function POST(request: Request) {
  return handleCron(request);
}
