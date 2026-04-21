import { NextResponse } from "next/server";
import { demoContacts, demoInstitutions, demoOutreach } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    outreach: demoOutreach.map((item) => ({
      ...item,
      institution: demoInstitutions.find((institution) => institution.id === item.institutionId),
      contact: demoContacts.find((contact) => contact.id === item.contactId),
    })),
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  return NextResponse.json({
    ok: true,
    outreach: {
      id: crypto.randomUUID(),
      status: "pending_approval",
      ...payload,
    },
  });
}
