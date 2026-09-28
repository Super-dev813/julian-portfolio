import { Magnetic } from "@/components/motion/magnetic";
import { ParticleName } from "@/components/motion/particle-name";
import { Spotlight } from "@/components/motion/spotlight";
import { pillOutline, pillPrimary } from "@/components/pill";
import { DATA } from "@/data/resume";
import { ArrowDown, Mail, MousePointer2 } from "lucide-react";

// Always dark, like the particle canvas it frames. Text entrances are CSS-driven (visible pre-hydration).
export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-name" className="dark relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-background pb-16 pt-28 text-foreground">
      <Spotlight className="-z-10" />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]" />
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="fade-in text-sm text-muted-foreground sm:text-base">
          {DATA.title} in {DATA.location}
        </p>
        <ParticleName id="hero-name" text={DATA.name} className="mt-6 h-[clamp(190px,28vw,340px)] w-full cursor-crosshair" />
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="fade-in max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl" style={{ animationDelay: "500ms" }}>
            {DATA.tagline}
          </p>
          <div className="fade-in flex flex-wrap gap-3" style={{ animationDelay: "650ms" }}>
            <Magnetic>
              <a href={`mailto:${DATA.email}`} className={pillPrimary}>
                <Mail className="size-4" aria-hidden />
                Email Julián
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className={pillOutline}>
                <ArrowDown className="size-4" aria-hidden />
                See selected work
              </a>
            </Magnetic>
          </div>
        </div>
        <p
          aria-hidden
          className="fade-in mt-12 hidden items-center gap-2 text-xs text-muted-foreground pointer-fine:motion-safe:flex"
          style={{ animationDelay: "1.6s" }}
        >
          <MousePointer2 className="size-3.5 text-brand" />
          Move through the name, or click it
        </p>
      </div>
    </section>
  );
}
