import { NextResponse } from "next/server";
import { demoContacts, demoInstitutions, demoOutreach } from "@/lib/demo-data";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  const { id } = await context.params;
  const institution = demoInstitutions.find((item) => item.id === id);

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
  context: RouteContext,
) {
  const { id } = await context.params;
  const payload = await request.json();
  return NextResponse.json({
    ok: true,
    institution: {
      id,
      ...payload,
    },
  });
}
