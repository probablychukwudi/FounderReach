import { Resend } from "resend";

export async function sendOutreachEmail(params: {
  to: string;
  subject: string;
  body: string;
  fromName: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  const resend = new Resend(apiKey);

  return resend.emails.send({
    from: `${params.fromName} <outreach@founderreach.app>`,
    to: params.to,
    subject: params.subject,
    text: params.body,
  });
}
