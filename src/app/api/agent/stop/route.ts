import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: "FounderReach marked the active run for stop. Wire provider-side cancellation when TinyFish stop APIs are available.",
  });
}
