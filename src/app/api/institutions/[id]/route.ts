import { NextResponse } from "next/server";
import { demoContacts, demoInstitutions, demoOutreach } from "@/lib/demo-data";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const institution = demoInstitutions.find((item) => item.id === params.id);

  if (!institution) {
    return NextResponse.json({ error: "Institution not found." }, { status: 404 });
  }

  return NextResponse.json({
    institution,
    contact: demoContacts.find((contact) => contact.id === institution.primaryContactId),
    outreach: demoOutreach.filter((item) => item.institutionId === institution.id),
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const payload = await request.json();
  return NextResponse.json({
    ok: true,
    institution: {
      id: params.id,
      ...payload,
    },
  });
}
