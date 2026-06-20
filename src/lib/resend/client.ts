import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  return new Resend(apiKey);
}

export async function sendOutreachEmail(params: {
  to: string;
  subject: string;
  body: string;
  fromName: string;
}) {
  const resend = getResendClient();

  return resend.emails.send({
    from: `${params.fromName} <outreach@founderreach.app>`,
    to: params.to,
    subject: params.subject,
    text: params.body,
  });
}

export async function sendNewsletterConfirmation(params: { to: string }) {
  const resend = getResendClient();
  const from = process.env.NEWSLETTER_FROM_EMAIL ?? "FounderReach <updates@founderreach.app>";

  return resend.emails.send({
    from,
    to: params.to,
    subject: "You are on the FounderReach updates list",
    text:
      "You are signed up for FounderReach updates. We will send useful founder opportunities: accelerators, hackathons, grants, startup credits, launch channels, and ecosystem signals.",
  });
}

export async function sendNewsletterNotification(params: { subscriberEmail: string; source?: string }) {
  const notifyEmail = process.env.NEWSLETTER_NOTIFY_EMAIL;

  if (!notifyEmail) {
    return null;
  }

  const resend = getResendClient();
  const from = process.env.NEWSLETTER_FROM_EMAIL ?? "FounderReach <updates@founderreach.app>";

  return resend.emails.send({
    from,
    to: notifyEmail,
    subject: "New FounderReach newsletter signup",
    text: `New subscriber: ${params.subscriberEmail}\nSource: ${params.source ?? "unknown"}`,
  });
}
