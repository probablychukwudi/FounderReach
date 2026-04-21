import { NextResponse } from "next/server";
import { demoBookings } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ bookings: demoBookings });
}

export async function POST(request: Request) {
  const payload = await request.json();

  return NextResponse.json({
    ok: true,
    booking: {
      id: crypto.randomUUID(),
      status: "pending",
      ...payload,
    },
  });
}
