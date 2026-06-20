import { NextResponse } from "next/server";
import { demoOutreach } from "@/lib/demo-data";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  const { id } = await context.params;
  const outreach = demoOutreach.find((item) => item.id === id);

  if (!outreach) {
    return NextResponse.json({ error: "Outreach not found." }, { status: 404 });
  }

  return NextResponse.json({ outreach });
}

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  const { id } = await context.params;
  const payload = await request.json();
  return NextResponse.json({
    ok: true,
    outreach: {
      id,
      ...payload,
    },
  });
}
