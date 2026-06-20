import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(
  _request: Request,
  context: RouteContext,
) {
  const { id } = await context.params;

  return NextResponse.json({
    ok: true,
    outreach: {
      id,
      status: "approved",
      approvedAt: new Date().toISOString(),
    },
  });
}
