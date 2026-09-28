import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { DATA } from "@/data/resume";

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:grid-cols-12 md:py-36">
      <div className="md:col-span-4">
        <RevealText id="skills-title" text="Toolbox" className="font-serif text-5xl tracking-tight sm:text-6xl" />
        <p className="mt-6 max-w-xs text-pretty leading-relaxed text-muted-foreground">
          The languages, frameworks, and platforms behind the work above.
        </p>
      </div>
      <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 md:col-span-8">
        {DATA.skills.map((group, index) => (
          <Reveal key={group.group} delay={(index % 2) * 0.08} className="border-t border-border pt-5">
            <dt className="text-sm text-brand">{group.group}</dt>
            <dd className="mt-3 text-pretty leading-relaxed text-foreground/90">{group.items.join(", ")}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
