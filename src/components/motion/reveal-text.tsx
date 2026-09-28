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

const MAX_STAGGER_S = 0.7;

/**
 * Letters rise out of a mask, one after another, when the line scrolls into view. Words stay whole
 * so lines wrap naturally; the total stagger is capped so long headings don't drag.
 */
export function RevealText({ text, as: Tag = "h2", id, className }: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const show = inView || reduceMotion;
  const words = text.split(" ");
  const letters = text.replace(/ /g, "").length;
  const step = Math.min(0.03, MAX_STAGGER_S / Math.max(1, letters));
  let index = 0;

  return (
    <Tag ref={ref} id={id} aria-label={text} className={cn("text-balance", className)}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} aria-hidden>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((letter, l) => {
              const delay = index++ * step;
              return (
                <span key={l} className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    data-reveal=""
                    className="inline-block"
                    initial={{ y: "110%", rotate: 6 }}
                    animate={show ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 6 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.2, 0.7, 0.1, 1], delay }}
                  >
                    {letter}
                  </motion.span>
                </span>
              );
            })}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
