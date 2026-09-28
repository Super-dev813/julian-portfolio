import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">404</p>
      <h1 className="font-serif text-5xl tracking-tight">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
        <House className="size-4" aria-hidden />
        Back to home
      </Link>
    </main>
  );
}
