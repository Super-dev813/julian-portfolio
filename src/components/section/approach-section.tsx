import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { PrincipleArt } from "@/components/principle-art";
import { DATA } from "@/data/resume";

export default function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <RevealText id="approach-title" text="How I work" className="font-serif text-5xl tracking-tight sm:text-6xl" />
        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {DATA.principles.map((principle, index) => (
            <li key={principle.title} className="bg-background">
              <Reveal delay={index * 0.08} className="flex h-full flex-col p-8 sm:p-12">
                <PrincipleArt art={principle.art} />
                <h3 className="mt-8 font-serif text-2xl tracking-tight sm:text-3xl">{principle.title}</h3>
                <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-muted-foreground">{principle.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
