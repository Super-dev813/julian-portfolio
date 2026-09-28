"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline of gold under the header that fills as the visitor reads down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-40 h-px origin-left bg-brand"
    />
  );
}
