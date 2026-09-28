import { RevealText } from "@/components/motion/reveal-text";
import { ProjectShowcase } from "@/components/project-showcase";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="mb-20 flex flex-col gap-6 md:mb-28 md:flex-row md:items-end md:justify-between">
        <RevealText id="work-title" text="Selected work" className="font-serif text-5xl tracking-tight sm:text-7xl" />
        <p className="max-w-sm text-pretty text-muted-foreground">
          From PeakU&apos;s AI hiring platform to client products delivered at Cognox. Screens show each product&apos;s public site.
        </p>
      </div>
      <ul className="flex flex-col gap-28 md:gap-36">
        {DATA.projects.map((project, index) => (
          <ProjectShowcase key={project.title} project={project} flip={index % 2 === 1} />
        ))}
      </ul>
    </section>
  );
}
