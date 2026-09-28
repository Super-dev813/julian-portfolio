"use client";

import { BrowserFrame } from "@/components/browser-frame";
import { PlatformsIllustration } from "@/components/platforms-illustration";
import type { Project } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Pinned horizontal gallery: the section sticks while vertical scrolling slides the projects
 * sideways. Desktop only; the parent shows the vertical list on small screens and reduced motion.
 */
export function ProjectsRail({ projects }: { projects: readonly Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(1);

  // Horizontal travel = track width minus the viewport; the section is that much taller than one screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCurrent(Math.min(projects.length, Math.floor(value * projects.length) + 1));
  });

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-10 pl-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))] pr-[12vw]">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="grid w-[min(1040px,78vw)] shrink-0 grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-10"
            >
              <BrowserFrame label={project.image?.domain ?? "Client portals and internal tools"} className="group/frame">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 600px, 78vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover/frame:scale-[1.04]"
                    />
                  ) : (
                    <PlatformsIllustration />
                  )}
                </div>
              </BrowserFrame>
              <div>
                <p className="flex items-center gap-3 text-sm text-brand">
                  <span className="tabular-nums text-muted-foreground">0{index + 1}</span>
                  {project.context}
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight xl:text-4xl">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.subtitle}</p>
                <p className="mt-5 line-clamp-6 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
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
                    className="mt-6 inline-flex items-center gap-1.5 text-sm underline decoration-brand/40 underline-offset-8 transition-colors hover:text-brand hover:decoration-brand"
                  >
                    Visit {new URL(project.href).hostname.replace(/^www\./, "")}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mx-auto mt-12 flex w-full max-w-6xl items-center gap-6 px-6">
          <span className="text-sm tabular-nums text-muted-foreground">
            <span className="text-foreground">0{current}</span> / 0{projects.length}
          </span>
          <span className="relative h-px flex-1 bg-border">
            <motion.span style={{ width: progress }} className="absolute inset-y-0 left-0 bg-brand" />
          </span>
          <span className="text-sm text-muted-foreground">Scroll</span>
        </div>
      </div>
    </div>
  );
}
