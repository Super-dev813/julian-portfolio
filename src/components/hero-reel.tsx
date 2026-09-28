"use client";

import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/** Rendered from reel/scenes.html; the lines restate résumé facts, nothing more. */
const SLIDES = [
  { id: "build", label: "Build", line: "Services and APIs, designed end to end." },
  { id: "ship", label: "Ship", line: "Tested, containerized, and shipped through CI/CD." },
  { id: "observe", label: "Observe", line: "Watched in production with Datadog and Sentry." },
  { id: "products", label: "Products", line: "Live products for PeakU and Cognox clients." },
] as const;

const INTERVAL_MS = 6500;
const EXPAND_S = 1.15;
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Cole Haan-style reel: full-bleed videos behind the hero, numbered chapters bottom-left, and a
 * preview of the next video bottom-right that expands to fill the screen when the slide changes.
 */
export function HeroReel({ intro, actions }: { intro: React.ReactNode; actions: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set([0, 1]));
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLButtonElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const count = SLIDES.length;
  const next = (active + 1) % count;
  const autoplay = !paused && !reduceMotion && incoming === null;

  const goTo = useCallback(
    (target: number) => {
      if (target === active || incoming !== null) return;
      setLoaded((set) => new Set(set).add(target).add((target + 1) % count));
      const slide = slideRefs.current[target];
      const video = videoRefs.current[target];
      if (video) video.currentTime = 0;
      if (reduceMotion || !slide || !sectionRef.current) {
        setActive(target);
        return;
      }
      // Grow the incoming slide out of the preview card (or the centre, if the card is hidden).
      const box = sectionRef.current.getBoundingClientRect();
      const card = previewRef.current?.getBoundingClientRect();
      const from =
        card && card.width > 0
          ? `inset(${card.top - box.top}px ${box.right - card.right}px ${box.bottom - card.bottom}px ${card.left - box.left}px round 14px)`
          : "inset(45% 45% 45% 45% round 14px)";
      // Set the starting clip before React shows the slide, so it never flashes full-screen.
      slide.style.clipPath = from;
      setIncoming(target);
      animate(slide, { clipPath: [from, "inset(0px 0px 0px 0px round 0px)"] }, { duration: EXPAND_S, ease: EASE }).then(() => {
        setActive(target);
        setIncoming(null);
      });
    },
    [active, incoming, count, reduceMotion]
  );

  // Autoplay: each chapter gets a full turn; the timer restarts on every change.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => goTo(next), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, next, goTo]);

  // Only the visible videos play; everything stops when paused or for reduced motion.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      const visible = index === active || index === incoming;
      if (visible && !paused && !reduceMotion) void video.play().catch(() => {});
      else video.pause();
    });
  }, [active, incoming, paused, reduceMotion, loaded]);

  const shown = incoming ?? active;

  return (
    <div ref={sectionRef} className="dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background text-foreground">
      {/* Videos: decorative, so hidden from assistive tech. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="absolute inset-0"
            style={{
              zIndex: index === incoming ? 2 : index === active ? 1 : 0,
              visibility: index === active || index === incoming ? "visible" : "hidden",
            }}
          >
            <video
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              src={loaded.has(index) ? `/reel/${slide.id}.mp4` : undefined}
              poster={`/reel/${slide.id}.webp`}
              muted
              loop
              playsInline
              preload={loaded.has(index) ? "auto" : "none"}
              className="h-full w-full scale-105 object-cover blur-[1.5px] brightness-[0.8]"
            />
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background from-10% via-background/85 via-50% to-background/35" />
        <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-background/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-40 pt-32">
        {intro}
        <div aria-live={paused ? "polite" : "off"} className="mt-7 min-h-[4.5rem] max-w-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={SLIDES[shown].id}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
              className="flex items-start gap-3 text-2xl leading-snug text-foreground sm:text-3xl"
            >
              <span aria-hidden className="mt-3 size-2.5 shrink-0 bg-brand sm:mt-3.5" />
              {SLIDES[shown].line}
            </motion.p>
          </AnimatePresence>
        </div>
        {actions}
      </div>

      {/* Bottom bar: chapters, pause, and the next-up preview. */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6 pb-8">
          <div className="flex items-center gap-5" role="group" aria-label="Reel chapters">
            <ol className="flex items-end gap-5 sm:gap-7">
              {SLIDES.map((slide, index) => {
                const isOn = index === shown;
                return (
                  <li key={slide.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isOn}
                      aria-label={`Chapter ${index + 1}: ${slide.label}`}
                      className={cn("group flex flex-col items-start gap-2 text-left transition-colors", isOn ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                    >
                      <span className="text-xs tabular-nums">0{index + 1}</span>
                      <span className="hidden text-sm sm:block">{slide.label}</span>
                      <span className="relative h-px w-10 overflow-hidden bg-border sm:w-16">
                        {isOn && (
                          <span
                            key={`${active}-${autoplay}`}
                            className={cn("absolute inset-y-0 left-0 bg-brand", autoplay ? "carousel-progress" : "w-full")}
                            style={{ animationDuration: `${INTERVAL_MS}ms` }}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {!reduceMotion && (
              <button
                type="button"
                aria-label={paused ? "Play the reel" : "Pause the reel"}
                onClick={() => setPaused((value) => !value)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
              </button>
            )}
          </div>

          <button
            ref={previewRef}
            type="button"
            onClick={() => goTo(next)}
            aria-label={`Next: ${SLIDES[next].label}`}
            className="group hidden w-56 overflow-hidden rounded-[14px] border border-border bg-card text-left shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] transition-transform duration-500 hover:-translate-y-1 md:block"
          >
            <span className="relative block aspect-[16/9] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny poster; next/image adds nothing here */}
              <img
                src={`/reel/${SLIDES[next].id}.webp`}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="flex items-center justify-between px-3 py-2 text-xs">
              <span className="text-muted-foreground">Next</span>
              <span className="text-foreground">{SLIDES[next].label}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
