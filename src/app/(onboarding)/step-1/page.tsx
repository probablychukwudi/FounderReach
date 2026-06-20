"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function OnboardingStepper({ labels, active }: { labels: string[]; active: number }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {labels.map((label, index) => (
        <div key={label} className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${index <= active ? "bg-[#4ade80] text-green-deep" : "bg-[#ededed] text-ink-3"}`}>
              {index + 1}
            </div>
            <div className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${index === active ? "text-green" : "text-ink-2"}`}>{label}</div>
          </div>
          {index !== labels.length - 1 ? <div className="h-px w-16 bg-[#e2e2e2]" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function StepOnePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[420px] text-center">
        <div className="mx-auto flex w-fit items-center gap-2">
          <Image src="/assets/brand/founderreach-logo-mark.svg" alt="FounderReach" width={28} height={31} className="h-auto w-7" />
          <div className="text-[20px] font-semibold tracking-normal text-ink">FounderReach</div>
        </div>
        <div className="mt-3 text-base text-ink-2">Set up your workspace</div>

        <div className="mt-8">
          <OnboardingStepper labels={["Account", "Startup", "Sources", "Ready"]} active={0} />
        </div>

        <h1 className="mt-10 text-[42px] font-bold tracking-normal text-ink">Create your account</h1>
        <p className="mt-3 text-base text-ink-2">Join FounderReach to accelerate your outreach.</p>

        <form
          className="mt-8 space-y-5 text-left"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/step-2");
          }}
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink">Work Email</label>
            <input defaultValue="" placeholder="founder@startup.com" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm outline-none placeholder:text-[#a2a8a6]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.06em] text-ink">Password</label>
            <input defaultValue="••••••••" type="password" className="mt-2 h-10 w-full rounded-[6px] bg-surface px-3 text-sm outline-none" />
          </div>
          <button className="w-full rounded-[6px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] py-3 text-base font-bold text-white">
            Continue
          </button>
        </form>

        <p className="mt-4 text-sm text-ink-2">
          Already have an account? <Link href="/login" className="font-medium text-green">Log in</Link>
        </p>
      </div>
    </main>
  );
}
