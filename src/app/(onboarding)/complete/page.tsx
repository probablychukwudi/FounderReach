import Image from "next/image";
import Link from "next/link";
import { PipelineCard } from "@/components/pipeline/pipeline-card";
import { agentBlueprints } from "@/lib/demo-data";

export default function CompletePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[1040px] text-center">
        <div className="mx-auto flex w-fit items-center gap-2">
          <Image src="/assets/brand/founderreach-logo-mark.png" alt="FounderReach" width={28} height={31} className="h-auto w-7" />
          <div className="text-[20px] font-black tracking-[-0.05em] text-ink">FounderReach</div>
        </div>

        <div className="mt-6 rounded-[16px] border border-[#ededed] bg-white px-6 py-8 shadow-[0px_20px_60px_rgba(26,28,28,0.08)]">
          <h1 className="font-display text-[64px] font-black leading-[0.95] tracking-[-0.06em] text-ink">Meet Your Agents</h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {agentBlueprints.map((agent) => (
              <PipelineCard key={agent.id} agent={{ ...agent, status: "complete", countLabel: "312 institutions scanned" }} compact />
            ))}
          </div>
        </div>

        <h2 className="mt-10 font-display text-[64px] font-black leading-[0.95] tracking-[-0.06em] text-ink">You&apos;re all set, Alex!</h2>
        <p className="mx-auto mt-4 max-w-[420px] text-[18px] leading-8 text-ink-2">
          Your agents are configured and ready to start scouting data sources.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-[8px] bg-[linear-gradient(166deg,#0b8f48_0%,#4ade80_100%)] px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white"
        >
          Enter Dashboard →
        </Link>
      </div>
    </main>
  );
}
