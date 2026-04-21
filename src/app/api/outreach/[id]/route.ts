import { NextResponse } from "next/server";
import { demoOutreach } from "@/lib/demo-data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const outreach = demoOutreach.find((item) => item.id === params.id);

  if (!outreach) {
    return NextResponse.json({ error: "Outreach not found." }, { status: 404 });
  }

  return NextResponse.json({ outreach });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const payload = await request.json();
  return NextResponse.json({
    ok: true,
    outreach: {
      id: params.id,
      ...payload,
    },
  });
}
