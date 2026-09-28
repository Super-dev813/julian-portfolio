"use client";

import { BrowserFrame } from "@/components/browser-frame";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { DATA, type Picture, type Work } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useId, useRef, useState } from "react";

function Pictures({ pictures, caption }: { pictures: readonly Picture[]; caption?: string }) {
  return (
    <figure className="mt-7">
      <Reveal variant="wipe" className={cn("grid gap-4", pictures.length > 1 ? "sm:grid-cols-2" : "max-w-lg")}>
        {pictures.map((picture) => (
          <BrowserFrame key={picture.src} label={picture.label}>
            <div className="relative aspect-[16/9]">
              <Image src={picture.src} alt={picture.alt} fill sizes="(min-width: 768px) 34vw, 90vw" className="object-cover" />
            </div>
          </BrowserFrame>
        ))}
      </Reveal>
      {caption && <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

function TimelineDot({ muted = false }: { muted?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      ref={ref}
      aria-hidden
      initial={false}
      animate={reached && !reduceMotion ? { scale: [1, 1.6, 1] } : { scale: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
      className={cn(
        "absolute left-0 top-2 size-[15px] rounded-full border transition-[background-color,border-color,box-shadow] duration-500",
        reached ? "border-brand bg-brand shadow-[0_0_0_6px_rgb(var(--glow)/0.15)]" : muted ? "border-input bg-background" : "border-brand bg-background"
      )}
    />
  );
}

function Role({ work, defaultOpen }: { work: Work; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  return (
    <li className="relative pb-20 pl-12 last:pb-0">
      <TimelineDot />
      <Reveal>
      <p className="flex flex-wrap gap-x-5 text-sm tabular-nums text-muted-foreground">
        <span>
          {work.start} – {work.end}
        </span>
        <span>{work.location}</span>
      </p>
      <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
        <a href={work.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-2 transition-colors hover:text-brand">
          {work.company}
          <ArrowUpRight className="size-5 opacity-40 transition-opacity group-hover:opacity-100" aria-hidden />
        </a>
      </h3>
      <p className="mt-1 text-foreground/90">{work.title}</p>
      <p className="mt-4 max-w-[60ch] text-pretty leading-relaxed text-muted-foreground">{work.summary}</p>
      </Reveal>
      <Pictures
        pictures={work.pictures}
        caption={work.pictures.length > 1 ? "Client products Julián built for at Cognox" : undefined}
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="mt-5 inline-flex items-center gap-2 text-sm text-brand"
      >
        <Plus className={`size-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden />
        {open ? "Hide highlights" : `Show ${work.highlights.length} highlights`}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-6 flex max-w-[64ch] flex-col gap-4 border-l border-border pl-6">
              {work.highlights.map((highlight) => (
                <li key={highlight.label} className="text-pretty leading-relaxed text-muted-foreground">
                  <span className="text-foreground">{highlight.label}.</span> {highlight.text}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const education = DATA.education[0];

  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-12 md:py-36">
      <div className="self-start md:sticky md:top-28 md:col-span-4">
        <RevealText id="experience-title" text="Experience" className="font-serif text-5xl tracking-tight sm:text-6xl" />
        <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          Eight years across product and consultancy teams, remote-first since 2021.
        </p>
        {DATA.social
          .filter((social) => social.name === "LinkedIn")
          .map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex text-sm underline decoration-brand/40 underline-offset-8 transition-colors hover:text-brand hover:decoration-brand"
            >
              Full history on LinkedIn
            </a>
          ))}
      </div>
      <ol ref={listRef} className="relative md:col-span-8">
        <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
        {/* Scroll-drawn line; reduced motion shows it fully drawn via CSS (no server/client branch). */}
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-brand motion-reduce:transform-none!"
        />
        {DATA.work.map((work, index) => (
          <Role key={work.company} work={work} defaultOpen={index === 0} />
        ))}
        <li className="relative pl-12">
          <TimelineDot muted />
          <Reveal>
          <p className="flex flex-wrap gap-x-5 text-sm tabular-nums text-muted-foreground">
            <span>
              {education.start} – {education.end}
            </span>
            <span>{education.location}</span>
          </p>
          <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            <a href={education.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-2 transition-colors hover:text-brand">
              {education.school}
              <ArrowUpRight className="size-5 opacity-40 transition-opacity group-hover:opacity-100" aria-hidden />
            </a>
          </h3>
          <p className="mt-1 text-foreground/90">{education.degree}</p>
          </Reveal>
          <Pictures pictures={[education.picture]} />
        </li>
      </ol>
    </section>
  );
}
