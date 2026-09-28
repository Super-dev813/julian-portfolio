import { HeroReel } from "@/components/hero-reel";
import { Magnetic } from "@/components/motion/magnetic";
import { pillOutline, pillPrimary } from "@/components/pill";
import { DATA } from "@/data/resume";
import { ArrowDown, Mail } from "lucide-react";

// Name and actions sit over the video reel. Entrances are CSS-driven, so they show before hydration.
export default function HeroSection() {
  const [firstName, ...rest] = DATA.name.split(" ");
  return (
    <section id="top" aria-labelledby="hero-name">
      <HeroReel
        intro={
          <>
            <p className="fade-in text-sm text-muted-foreground sm:text-base">
              {DATA.title} in {DATA.location}
            </p>
            <h1 id="hero-name" className="mt-5 font-display text-[clamp(3.6rem,9vw,7.75rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              <span className="line-mask block lg:inline-block">
                <span>{firstName}</span>
              </span>{" "}
              <span className="line-mask block lg:inline-block">
                <span style={{ animationDelay: "120ms" }}>{rest.join(" ")}</span>
              </span>
            </h1>
          </>
        }
        actions={
          <div className="fade-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "600ms" }}>
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
        }
      />
    </section>
  );
}
