import { ArrowRight } from "lucide-react";

export function PipelineConnector({ label }: { label: string }) {
  return (
    <div className="hidden items-center gap-3 px-2 xl:flex">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
        {label}
      </div>
      <ArrowRight className="h-4 w-4 text-ink-3" />
    </div>
  );
}
