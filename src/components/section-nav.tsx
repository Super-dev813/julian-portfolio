"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Section {
  href: string;
  label: string;
}

/** Header links that follow the reader: the section in the middle of the screen gets a gold underline. */
export function SectionNav({ sections }: { sections: readonly Section[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((section) => document.querySelector(section.href))
      .filter((node): node is Element => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const target of targets) observer.observe(target);
    const top = document.getElementById("top");
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(null);
    }, { rootMargin: "-45% 0px -50% 0px" });
    if (top) heroObserver.observe(top);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [sections]);

  return (
    <nav aria-label="Sections" className="hidden items-center gap-9 text-sm md:flex">
      {sections.map((section) => {
        const isActive = active === section.href;
        return (
          <a
            key={section.href}
            href={section.href}
            aria-current={isActive ? "location" : undefined}
            className={cn("relative py-1 transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {section.label}
            {isActive && (
              <motion.span
                layoutId="section-underline"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-x-0 -bottom-0.5 h-px bg-brand"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
