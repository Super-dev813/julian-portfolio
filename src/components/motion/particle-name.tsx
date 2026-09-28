"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ParticleNameProps {
  text: string;
  id?: string;
  className?: string;
}

const GOLD = "#c9a96e";
const IVORY = "#ece6da";
const TRAIL = "rgba(0, 0, 0, 0.3)"; // erased each frame, so trails fade to transparent over any background
const SPRING = 0.012;
const DAMPING = 0.86;
const REFORM_EVERY_S = 12;
const SCATTER_FOR_S = 1.1;

/**
 * The name drawn by particles that swarm into place, flee the pointer, burst on click/tap, and
 * re-form every so often. The heading stays real text (visible until the canvas is ready, and
 * always for reduced motion); the canvas is decorative.
 */
export function ParticleName({ text, id, className }: ParticleNameProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    let x = new Float32Array(0), y = new Float32Array(0), vx = new Float32Array(0), vy = new Float32Array(0);
    let tx = new Float32Array(0), ty = new Float32Array(0);
    let count = 0, dpr = 1, width = 0, height = 0, size = 2;
    let frame = 0, running = false, visible = true, cancelled = false;
    const pointer = { x: -1e5, y: -1e5 };
    const burst = { x: 0, y: 0, until: 0 };
    const start = performance.now();

    function fontFamily() {
      const family = getComputedStyle(document.body).getPropertyValue("--font-name").trim();
      return family || "sans-serif";
    }

    /** Rasterise the name off-screen and sample its pixels into particle targets. */
    function layout() {
      const box = wrap!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = Math.round(box.width * dpr);
      height = Math.round(box.height * dpr);
      canvas!.width = width;
      canvas!.height = height;

      const family = fontFamily();
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const o = off.getContext("2d")!;
      const narrow = box.width < 640;
      const lines = narrow ? text.split(" ") : [text];
      o.font = `800 100px ${family}`;
      const widest = Math.max(...lines.map((line) => o.measureText(line).width));
      const fontPx = Math.min((width * 0.98 * 100) / widest, (height / lines.length) * 0.82);
      o.font = `800 ${fontPx}px ${family}`;
      o.fillStyle = "#fff";
      o.textBaseline = "middle";
      const lineHeight = fontPx * 1.02;
      const top = height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, i) => o.fillText(line, 0, top + i * lineHeight));

      const step = Math.max(3, Math.round(fontPx / (narrow ? 16 : 24)));
      size = Math.max(1.8 * dpr, step * 0.55); // particle side; at this size squares read as dots
      const data = o.getImageData(0, 0, width, height).data;
      const nx: number[] = [], ny: number[] = [];
      for (let py = 0; py < height; py += step)
        for (let px = 0; px < width; px += step) if (data[(py * width + px) * 4 + 3] > 140) { nx.push(px); ny.push(py); }

      const next = nx.length;
      const px2 = new Float32Array(next), py2 = new Float32Array(next);
      for (let i = 0; i < next; i++) {
        // Keep existing particles where they are; newcomers start scattered.
        px2[i] = i < count ? x[i] : Math.random() * width;
        py2[i] = i < count ? y[i] : Math.random() * height;
      }
      x = px2; y = py2;
      vx = new Float32Array(next); vy = new Float32Array(next);
      tx = Float32Array.from(nx); ty = Float32Array.from(ny);
      count = next;
    }

    function tick(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;
      const scattering = t > 3 && t % REFORM_EVERY_S < SCATTER_FOR_S;
      const bursting = now < burst.until;
      const radius = 110 * dpr, radius2 = radius * radius;
      const cx = width / 2, cy = height / 2;

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = TRAIL;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
      const near: number[] = [];
      ctx.fillStyle = GOLD;
      for (let i = 0; i < count; i++) {
        let ax = (tx[i] - x[i]) * SPRING, ay = (ty[i] - y[i]) * SPRING;
        if (scattering) {
          ax = (x[i] - cx) * 0.004 + (Math.random() - 0.5) * 1.6 * dpr;
          ay = (y[i] - cy) * 0.004 + (Math.random() - 0.5) * 1.6 * dpr;
        }
        if (bursting) {
          const bx = x[i] - burst.x, by = y[i] - burst.y, bd = bx * bx + by * by + 400;
          ax += (bx / bd) * 900 * dpr; ay += (by / bd) * 900 * dpr;
        }
        const dx = x[i] - pointer.x, dy = y[i] - pointer.y, d2 = dx * dx + dy * dy;
        if (d2 < radius2) {
          const force = (1 - d2 / radius2) * 1.4 * dpr;
          const d = Math.sqrt(d2) || 1;
          ax += (dx / d) * force; ay += (dy / d) * force;
          near.push(i);
        }
        vx[i] = (vx[i] + ax) * DAMPING; vy[i] = (vy[i] + ay) * DAMPING;
        x[i] += vx[i]; y[i] += vy[i];
        ctx.fillRect(x[i], y[i], size, size);
      }
      if (near.length) {
        ctx.fillStyle = IVORY;
        for (const i of near) ctx.fillRect(x[i], y[i], size, size);
      }
      frame = requestAnimationFrame(tick);
    }

    function play() {
      if (running || !visible || cancelled) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function toCanvas(event: PointerEvent) {
      const box = canvas!.getBoundingClientRect();
      return { px: (event.clientX - box.left) * dpr, py: (event.clientY - box.top) * dpr };
    }
    function onMove(event: PointerEvent) {
      const { px, py } = toCanvas(event);
      pointer.x = px; pointer.y = py;
    }
    function onLeave() {
      pointer.x = pointer.y = -1e5;
    }
    function onDown(event: PointerEvent) {
      const { px, py } = toCanvas(event);
      burst.x = px; burst.y = py; burst.until = performance.now() + 260;
    }

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else stop();
    });
    let resizeTimer = 0;
    const resize = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(layout, 120);
    });

    document.fonts.ready.then(() => {
      if (cancelled) return;
      layout();
      setReady(true);
      visibility.observe(wrap);
      resize.observe(wrap);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      wrap.addEventListener("pointerdown", onDown);
      play();
    });

    return () => {
      cancelled = true;
      stop();
      visibility.disconnect();
      resize.disconnect();
      window.clearTimeout(resizeTimer);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerdown", onDown);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className={cn("relative touch-pan-y select-none", className)}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <h1
        id={id}
        className={cn(
          "flex h-full items-center font-display text-[clamp(3.4rem,11vw,9.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] transition-opacity duration-700",
          ready && "opacity-0"
        )}
      >
        {text}
      </h1>
    </div>
  );
}
