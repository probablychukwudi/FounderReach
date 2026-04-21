import { NextResponse } from "next/server";
import { TINYFISH_AGENT_ACCESS } from "@/lib/tinyfish/client";

export async function GET() {
  return NextResponse.json({
    ok: true,
    provider: "tinyfish",
    configured: Boolean(process.env.TINYFISH_API_KEY),
    browserAccess: TINYFISH_AGENT_ACCESS,
  });
}
