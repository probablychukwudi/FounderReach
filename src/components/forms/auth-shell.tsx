import Link from "next/link";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { Card } from "@/components/ui/card";

export function AuthShell({
  title,
  description,
  footer,
  children,
}: {
  title: string;
  description: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-[576px] p-8 sm:p-10">
        <FounderReachLogo />
        <div className="mt-10">
          <div className="eyebrow">Secure Access</div>
          <h1 className="mt-3 text-[40px] font-black text-ink">{title}</h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-ink-2">{description}</p>
        </div>
        <div className="mt-8">{children}</div>
        <div className="mt-6 text-sm text-ink-3">{footer}</div>
      </Card>
    </main>
  );
}

export function AuthFooterLink({
  prompt,
  cta,
  href,
}: {
  prompt: string;
  cta: string;
  href: string;
}) {
  return (
    <>
      {prompt}{" "}
      <Link href={href} className="font-semibold text-green">
        {cta}
      </Link>
    </>
  );
}
