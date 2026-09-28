"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts from zero once visible. The server HTML carries the final number (for crawlers and
 * no-JS); the animation writes to the DOM node directly so React never re-renders per frame.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion || started.current) return;
    if (!inView) {
      node.textContent = `0${suffix}`;
      return;
    }
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.1, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
