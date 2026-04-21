import { NextResponse } from "next/server";
import { demoContacts, demoInstitutions } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    institutions: demoInstitutions.map((institution) => ({
      ...institution,
      contact: demoContacts.find((contact) => contact.id === institution.primaryContactId),
    })),
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  return NextResponse.json({
    ok: true,
    institution: {
      id: crypto.randomUUID(),
      ...payload,
    },
  });
}
