import { cn } from "@/lib/utils";

/** Minimal browser chrome around a screenshot or illustration. */
export function BrowserFrame({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_rgb(0_0_0/0.55)]", className)}>
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
          <span className="size-2.5 rounded-full bg-input" />
        </div>
        <span className="mx-auto truncate rounded-md bg-raised px-3 py-0.5 text-xs text-muted-foreground">{label}</span>
        <span aria-hidden className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}
