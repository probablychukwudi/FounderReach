import { NextResponse } from "next/server";
import { opportunities as seedOpportunities } from "@/lib/opportunities";
import { getReviewedOpportunities, mergeOpportunities } from "@/lib/opportunity-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  const reviewed = await getReviewedOpportunities();
  const opportunities = mergeOpportunities(seedOpportunities, reviewed.items);

  return NextResponse.json({
    ok: true,
    mode: reviewed.mode,
    count: opportunities.length,
    persistedCount: reviewed.items.length,
    warning: reviewed.warning,
    opportunities,
  });
}
