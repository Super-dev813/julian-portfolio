import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { DATA } from "@/data/resume";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-12 md:py-36">
      <div className="md:col-span-7">
        <RevealText
          id="about-title"
          text="Full stack, end to end — and still there after launch."
          className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
        />
        <div className="mt-10 flex max-w-[62ch] flex-col gap-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          {DATA.about.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.1}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <ul className="self-end border-t border-border md:col-span-5">
        {DATA.facts.map((fact, index) => (
          <Reveal as="li" key={fact.label} delay={index * 0.12} className="flex items-baseline gap-6 border-b border-border py-7">
            <span className="min-w-[3.2ch] font-serif text-6xl leading-none text-brand">
              <CountUp value={fact.value} suffix={fact.suffix} />
            </span>
            <span className="text-sm leading-snug text-muted-foreground">{fact.label}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
