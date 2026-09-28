import { CopyEmail } from "@/components/copy-email";
import { Icons } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { RevealText } from "@/components/motion/reveal-text";
import { Spotlight } from "@/components/motion/spotlight";
import { pillOutline, pillPrimary } from "@/components/pill";
import { DATA } from "@/data/resume";
import { Mail } from "lucide-react";

export default function ContactSection() {
  const [github, linkedin] = [DATA.social.find((s) => s.name === "GitHub"), DATA.social.find((s) => s.name === "LinkedIn")];
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-border">
      <Spotlight />
      <div className="relative mx-auto max-w-6xl px-6 py-32 sm:py-44">
        <Reveal>
          <p className="text-muted-foreground sm:text-lg">Have a role or a product in mind?</p>
        </Reveal>
        <RevealText
          id="contact-title"
          text="Let’s build something."
          className="mt-6 font-serif text-[clamp(3.25rem,10vw,8.5rem)] leading-[0.95] tracking-[-0.02em]"
        />
        <Reveal delay={0.3} className="mt-14 flex flex-wrap items-center gap-3">
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
