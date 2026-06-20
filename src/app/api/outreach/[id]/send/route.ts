import { NextResponse } from "next/server";
import { demoContacts, demoOutreach, demoProfile } from "@/lib/demo-data";
import { sendOutreachEmail } from "@/lib/resend/client";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(
  _request: Request,
  context: RouteContext,
) {
  const { id } = await context.params;
  const outreach = demoOutreach.find((item) => item.id === id);

  if (!outreach) {
    return NextResponse.json({ error: "Outreach not found." }, { status: 404 });
  }

  const contact = demoContacts.find((item) => item.id === outreach.contactId);

  if (!contact) {
    return NextResponse.json({ error: "Contact not found." }, { status: 404 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "staged",
      message: "Resend is not configured yet, so FounderReach kept the send in staged mode.",
      outreach: {
        ...outreach,
        status: "approved",
      },
    });
  }

  const providerResponse = await sendOutreachEmail({
    to: contact.email,
    subject: outreach.subject,
    body: outreach.body,
    fromName: demoProfile.fullName,
  });

  return NextResponse.json({
    ok: true,
    mode: "live",
    providerResponse,
    outreach: {
      ...outreach,
      status: "sent",
      sentAt: new Date().toISOString(),
    },
  });
}
