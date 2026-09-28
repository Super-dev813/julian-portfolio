"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
}

/** Words rise out of a mask when the line scrolls into view. */
export function RevealText({ text, as: Tag = "h2", id, className }: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const show = inView || reduceMotion;

  return (
    <Tag ref={ref} id={id} className={cn("text-balance", className)}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: show ? "0%" : "105%" }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.85, ease: [0.2, 0.7, 0.1, 1], delay: index * 0.045 }
              }
            >
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
