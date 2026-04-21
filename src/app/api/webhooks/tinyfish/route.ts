import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const secret = process.env.TINYFISH_WEBHOOK_SECRET;
  const headerSecret = request.headers.get("x-webhook-secret");

  if (secret && headerSecret !== secret) {
    return NextResponse.json({ error: "Invalid webhook secret." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    received: payload,
  });
}
