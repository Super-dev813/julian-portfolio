"use client";

import { BrowserFrame } from "@/components/browser-frame";
import { Reveal } from "@/components/motion/reveal";
import { PlatformsIllustration } from "@/components/platforms-illustration";
import type { Project } from "@/data/resume";
import { cn, slugify } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const TILT = 5;

export function ProjectShowcase({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();

  // Parallax: the picture drifts inside its frame as the row crosses the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-2.5%", "2.5%"]);

  // Tilt: the frame leans toward a hovering mouse.
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    // Glare follows the pointer across the picture.
    event.currentTarget.style.setProperty("--gx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--gy", `${event.clientY - box.top}px`);
    rotateY.set(((event.clientX - box.left) / box.width - 0.5) * TILT * 2);
    rotateX.set(-((event.clientY - box.top) / box.height - 0.5) * TILT * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const frameLabel = project.image?.domain ?? "Client portals and internal tools";

  return (
    <li ref={ref} id={`project-${slugify(project.title)}`} className="relative scroll-mt-28 grid items-center gap-10 md:grid-cols-12 md:gap-14">
      <div className={cn("md:col-span-7", flip && "md:order-2")} style={{ perspective: 1400 }}>
        <Reveal variant="wipe">
          <motion.div style={{ rotateX, rotateY }} onPointerMove={handleMove} onPointerLeave={reset} className="group/frame" data-cursor={project.href ? "Visit" : undefined}>
            <BrowserFrame label={frameLabel} className="transition-colors duration-500 group-hover/frame:border-brand/40">
              <div className="relative aspect-[16/9] overflow-hidden">
                <motion.div style={{ y: drift, scale: 1.06 }} className="absolute inset-0">
                  {project.image ? (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <PlatformsIllustration />
                  )}
                </motion.div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/frame:opacity-100"
                  style={{ background: "radial-gradient(380px circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.16), transparent 50%)" }}
                />
                {project.href && (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden className="absolute inset-0" />
                )}
              </div>
            </BrowserFrame>
          </motion.div>
        </Reveal>
      </div>
      <Reveal delay={0.15} className={cn("md:col-span-5", flip && "md:order-1")}>
        <p className="text-sm text-brand">{project.context}</p>
        <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.subtitle}</p>
        <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80">
              {tech}
            </li>
          ))}
        </ul>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm underline decoration-brand/40 underline-offset-8 transition-colors hover:text-brand hover:decoration-brand"
          >
            Visit {new URL(project.href).hostname.replace(/^www\./, "")}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </Reveal>
    </li>
  );
}
