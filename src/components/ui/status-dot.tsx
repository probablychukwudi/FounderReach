import { cn } from "@/lib/utils";

export function StatusDot({
  tone = "neutral",
  pulse = false,
}: {
  tone?: "neutral" | "success" | "warning" | "danger";
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-2.5 w-2.5 rounded-full",
        tone === "neutral" && "bg-sage",
        tone === "success" && "bg-green-dot",
        tone === "warning" && "bg-amber",
        tone === "danger" && "bg-red-500",
        pulse && "animate-pulse",
      )}
    />
  );
}
