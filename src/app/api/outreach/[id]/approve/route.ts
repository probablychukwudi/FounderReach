import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({
    ok: true,
    outreach: {
      id: params.id,
      status: "approved",
      approvedAt: new Date().toISOString(),
    },
  });
}
