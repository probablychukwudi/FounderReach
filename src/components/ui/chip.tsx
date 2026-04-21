import { cn } from "@/lib/utils";

export function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "amber" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em]",
        tone === "default" && "bg-surface-2 text-ink-2",
        tone === "success" && "border border-green/20 bg-green-soft text-green",
        tone === "amber" && "bg-amber/10 text-amber",
        tone === "dark" && "bg-ink text-white",
      )}
    >
      {children}
    </span>
  );
}
