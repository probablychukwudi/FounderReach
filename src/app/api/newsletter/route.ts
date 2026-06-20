import { NextResponse } from "next/server";
import { z } from "zod";
import { persistNewsletterSubscription } from "@/lib/newsletter-repository";
import { sendNewsletterConfirmation, sendNewsletterNotification } from "@/lib/resend/client";

export const dynamic = "force-dynamic";

const newsletterSchema = z.object({
  email: z.string().trim().email(),
  source: z.string().trim().max(80).optional(),
});

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const hasEmailProvider = Boolean(process.env.RESEND_API_KEY);
  const persistence = await persistNewsletterSubscription({
    email,
    source: parsed.data.source,
  });

  if (hasEmailProvider) {
    await Promise.allSettled([
      sendNewsletterConfirmation({ to: email }),
      sendNewsletterNotification({ subscriberEmail: email, source: parsed.data.source }),
    ]);
  }

  return NextResponse.json({
    ok: true,
    mode: hasEmailProvider
      ? "email-confirmed"
      : persistence.persisted
        ? "captured"
        : "accepted-unpersisted",
    persistence,
    email,
  });
}
