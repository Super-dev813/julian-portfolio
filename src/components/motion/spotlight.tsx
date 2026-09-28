"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/** A soft gold light that follows the mouse across its parent section. */
export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const area = light?.parentElement;
    if (!light || !area || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !light || !area) return;
      const box = area.getBoundingClientRect();
      light.style.setProperty("--x", `${event.clientX - box.left}px`);
      light.style.setProperty("--y", `${event.clientY - box.top}px`);
      light.style.opacity = "1";
    }
    function hide() {
      if (light) light.style.opacity = "0";
    }

    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", hide);
    return () => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700", className)}
      style={{
        background: "radial-gradient(640px circle at var(--x, 50%) var(--y, 40%), rgb(var(--glow) / 0.1), transparent 45%)",
      }}
    />
  );
}
