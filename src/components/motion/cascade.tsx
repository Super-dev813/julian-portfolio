"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * A comma-separated list whose items fade up one after another when the list scrolls into view.
 * The starting state never depends on the motion preference (the server can't know it), so SSR
 * and hydration match; reduced motion just makes the change instant.
 */
export function Cascade({ items, className }: { items: readonly string[]; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const show = inView || Boolean(reduceMotion);

  return (
    <motion.dd
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? "show" : "hidden"}
      transition={{ staggerChildren: reduceMotion ? 0 : 0.045 }}
    >
      {items.map((item, index) => (
        <motion.span
          key={item}
          data-reveal=""
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0.7, 0.1, 1] } },
          }}
        >
          {item}
          {index < items.length - 1 ? ", " : ""}
        </motion.span>
      ))}
    </motion.dd>
  );
}
