import Link from "next/link";
import { FounderReachLogo } from "@/components/brand/founderreach-logo";
import { Card } from "@/components/ui/card";

const steps = ["Account", "Startup", "Sources", "Ready"];

export function OnboardingShell({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-[576px] p-8 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <FounderReachLogo />
          <Link href="/dashboard" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
            Skip to demo
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {steps.map((label, index) => {
            const active = index <= step;
            return (
              <div key={label} className="space-y-2">
                <div className={`h-1 rounded-full ${active ? "bg-green" : "bg-black/8"}`} />
                <div className={`font-mono text-[11px] uppercase tracking-[0.2em] ${active ? "text-ink" : "text-ink-3"}`}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <div className="eyebrow">Set Up Your Workspace</div>
          <h1 className="mt-3 text-[40px] font-black text-ink">{title}</h1>
          <p className="mt-4 text-base leading-7 text-ink-2">{description}</p>
        </div>
        <div className="mt-8">{children}</div>
      </Card>
    </main>
  );
}
