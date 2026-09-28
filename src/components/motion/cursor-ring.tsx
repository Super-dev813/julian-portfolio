"use client";

import { cn } from "@/lib/utils";
import { motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A gold ring that trails the mouse, grows over anything clickable, and names the action
 * where an element sets data-cursor ("Drag", "Visit"). The native cursor stays visible;
 * CSS hides the ring on touch screens and for reduced motion.
 */
export function CursorRing() {
  const spring = { stiffness: 520, damping: 42, mass: 0.35 };
  const x = useSpring(-100, spring);
  const y = useSpring(-100, spring);
  const [label, setLabel] = useState<string | null>(null);
  const [overTarget, setOverTarget] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest("[data-cursor]");
      const interactive = target?.closest("a, button, [role='button'], input, textarea");
      setLabel(labelled?.getAttribute("data-cursor") ?? null);
      setOverTarget(Boolean(interactive));
    }
    function leave() {
      setVisible(false);
    }
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div aria-hidden style={{ x, y }} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[70]">
      <div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-medium tracking-wide transition-[width,height,background-color,border-color,opacity] duration-300 ease-out",
          visible ? "opacity-100" : "opacity-0",
          label
            ? "size-[72px] border-brand bg-brand text-brand-foreground"
            : overTarget
              ? "size-11 border-brand bg-brand/10"
              : "size-7 border-brand/50"
        )}
      >
        {label}
      </div>
    </motion.div>
  );
}
