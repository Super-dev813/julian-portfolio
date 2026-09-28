import { CopyEmail } from "@/components/copy-email";
import { Icons } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Spotlight } from "@/components/motion/spotlight";
import { pillOutline, pillPrimary } from "@/components/pill";
import { DATA } from "@/data/resume";
import { Mail } from "lucide-react";

const PHRASE = "Let’s build something";

/** The scrolling banner is the visual headline; the real heading stays for assistive tech. */
function Banner() {
  const run = (duplicate: boolean) => (
    <div className={duplicate ? "marquee-dup flex shrink-0" : "flex shrink-0"}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center gap-10 pr-10 font-display text-[clamp(3.5rem,10vw,9.5rem)] font-extrabold leading-none tracking-[-0.035em]">
          <span style={i % 2 ? { color: "transparent", WebkitTextStroke: "1.5px var(--foreground)" } : undefined}>{PHRASE}</span>
          <span className="text-brand">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="marquee-wrap overflow-hidden py-4">
      <div className="marquee" style={{ "--duration": "32s" } as React.CSSProperties}>
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [github, linkedin] = [DATA.social.find((s) => s.name === "GitHub"), DATA.social.find((s) => s.name === "LinkedIn")];
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-border py-28 sm:py-36">
      <Spotlight />
      <h2 id="contact-title" className="sr-only">
        {PHRASE}
      </h2>
      <Banner />
      <div className="relative mx-auto mt-14 max-w-6xl px-6">
        <Reveal>
          <p className="max-w-md text-pretty text-lg text-muted-foreground">Have a role or a product in mind? Email is the fastest way to reach me.</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href={`mailto:${DATA.email}`} className={pillPrimary}>
              <Mail className="size-4" aria-hidden />
              {DATA.email}
            </a>
          </Magnetic>
          <CopyEmail email={DATA.email} />
          {linkedin && (
            <Magnetic>
              <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={pillOutline}>
                <Icons.linkedin className="size-4" />
                LinkedIn
              </a>
            </Magnetic>
          )}
          {github && (
            <Magnetic>
              <a href={github.url} target="_blank" rel="noopener noreferrer" className={pillOutline}>
                <Icons.github className="size-4" />
                GitHub
              </a>
            </Magnetic>
          )}
        </Reveal>
      </div>
    </section>
  );
}
