import { RevealText } from "@/components/motion/reveal-text";
import { Showreel } from "@/components/showreel";

export default function ShowreelSection() {
  return (
    <section id="showreel" aria-labelledby="showreel-title">
      <Showreel
        intro={
          <>
            <p className="text-sm text-muted-foreground">Showreel</p>
            <RevealText
              id="showreel-title"
              text="How the work flows"
              className="mt-4 font-display text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            />
          </>
        }
      />
    </section>
  );
}
