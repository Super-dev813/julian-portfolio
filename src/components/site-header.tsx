import { ModeToggle } from "@/components/mode-toggle";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SectionNav } from "@/components/section-nav";
import { DATA } from "@/data/resume";

const SECTIONS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            aria-label={`${DATA.name}, back to top`}
            className="font-signature text-[2.1rem] leading-none transition-colors hover:text-brand"
          >
            {DATA.name}
          </a>
          <SectionNav sections={SECTIONS} />
          <div className="flex items-center gap-1">
            <a
              href={`mailto:${DATA.email}`}
              className="hidden h-9 items-center rounded-full border border-input px-4 text-sm transition-colors hover:border-brand hover:text-brand sm:inline-flex"
            >
              Get in touch
            </a>
            <ModeToggle />
          </div>
        </div>
      </header>
      <ScrollProgress />
    </>
  );
}
