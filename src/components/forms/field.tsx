import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
        {label}
      </span>
      <div>{children}</div>
      {hint ? <p className="text-xs text-ink-3">{hint}</p> : null}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-12 w-full rounded-[18px] border border-black/8 bg-white px-4 font-body text-[16px] text-ink outline-none transition focus:border-green/30 focus:ring-4 focus:ring-green/10 sm:text-sm",
        props.className,
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-[120px] w-full rounded-[18px] border border-black/8 bg-white px-4 py-3 font-body text-[16px] text-ink outline-none transition focus:border-green/30 focus:ring-4 focus:ring-green/10 sm:text-sm",
        props.className,
      )}
    />
  );
}
