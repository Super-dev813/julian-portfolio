"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "rise" glides content up; "wipe" uncovers a picture from the bottom like a curtain. */
  variant?: "rise" | "wipe";
  as?: "div" | "li";
}

const EASE = [0.2, 0.7, 0.1, 1] as const;

/** Gentle entrance as content scrolls into view. Short distances only, so nobody feels dizzy. */
export function Reveal({ children, className, delay = 0, variant = "rise", as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const show = inView || reduceMotion;
  const Component = as === "li" ? motion.li : motion.div;

  // The wipe's resting clip extends past every edge so shadows and hover tilt are never cut off.
  const hidden =
    variant === "wipe" ? { clipPath: "inset(100% -12% -12% -12%)", scale: 1.03 } : { opacity: 0, y: 24 };
  const visible =
    variant === "wipe" ? { clipPath: "inset(-12% -12% -12% -12%)", scale: 1 } : { opacity: 1, y: 0 };

  return (
    <Component
      ref={ref}
      data-reveal=""
      className={className}
      initial={hidden}
      animate={show ? visible : hidden}
      transition={reduceMotion ? { duration: 0 } : { duration: variant === "wipe" ? 1.1 : 0.8, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}
