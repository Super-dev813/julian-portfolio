"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

/** Nudges its child toward a hovering mouse pointer; inert for touch and reduced motion. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const spring = { stiffness: 200, damping: 16, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function handleMove(event: React.PointerEvent) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={handleMove} onPointerLeave={reset} className="inline-block">
      {children}
    </motion.div>
  );
}
