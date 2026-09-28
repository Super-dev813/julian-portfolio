import { RevealText } from "@/components/motion/reveal-text";
import { ProjectShowcase } from "@/components/project-showcase";
import { ProjectsRail } from "@/components/projects-rail";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-28 md:py-36">
      <div className="mx-auto mb-16 flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between">
        <RevealText id="work-title" text="Selected work" className="font-serif text-5xl tracking-tight sm:text-7xl" />
        <p className="max-w-sm text-pretty text-muted-foreground">
          From PeakU&apos;s AI hiring platform to client products delivered at Cognox. Screens show each product&apos;s public site.
        </p>
      </div>
      {/* Desktop: pinned sideways gallery. Phones and reduced motion: the vertical list (pure CSS switch). */}
      <div className="hidden lg:block motion-reduce:!hidden">
        <ProjectsRail projects={DATA.projects} />
      </div>
      <ul className="mx-auto flex max-w-6xl flex-col gap-28 px-6 lg:hidden motion-reduce:!flex">
        {DATA.projects.map((project, index) => (
          <ProjectShowcase key={project.title} project={project} flip={index % 2 === 1} />
        ))}
      </ul>
    </section>
  );
}
