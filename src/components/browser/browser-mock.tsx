import { Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export function BrowserMock({
  url,
  title,
  body,
}: {
  url: string;
  title: string;
  body: string;
}) {
  return (
    <Card className="overflow-hidden rounded-[20px] bg-white/90">
      <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-dot" />
        </div>
        <div className="flex min-w-0 items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs text-ink-3">
          <Globe className="h-3.5 w-3.5" />
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="h-28 rounded-[18px] bg-gradient-to-br from-grad-top to-grad-bot p-4 text-white">
          <div className="eyebrow !text-white/70">Live TinyFish Browser Run</div>
          <div className="mt-4 max-w-[180px] font-display text-xl font-bold leading-tight">
            {title}
          </div>
        </div>
        <div className="space-y-2 text-sm leading-6 text-ink-2">
          <div className="h-2 rounded-full bg-surface-2" />
          <div className="h-2 w-4/5 rounded-full bg-surface-2" />
          <p>{body}</p>
        </div>
      </div>
    </Card>
  );
}
