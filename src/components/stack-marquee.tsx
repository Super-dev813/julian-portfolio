import { Cloud } from "lucide-react";
import {
  siAndroid,
  siAngular,
  siApachekafka,
  siCypress,
  siDatadog,
  siDjango,
  siDocker,
  siDotnet,
  siFastapi,
  siGithubactions,
  siGraphql,
  siJest,
  siKotlin,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSentry,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from "simple-icons";

interface Tech {
  title: string;
  path?: string;
}

const PRODUCT: Tech[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siVuedotjs,
  siAngular,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siPython,
  siDjango,
  siFastapi,
  siGraphql,
  { title: "React Native", path: siReact.path },
];

const PLATFORM: Tech[] = [
  { title: "AWS" },
  siPostgresql,
  siRedis,
  siMongodb,
  siApachekafka,
  siDocker,
  siGithubactions,
  { title: "Java", path: siOpenjdk.path },
  siKotlin,
  siAndroid,
  siDotnet,
  siJest,
  siCypress,
  siDatadog,
  siSentry,
];

function Row({ items, reverse, duration }: { items: Tech[]; reverse?: boolean; duration: string }) {
  const list = (duplicate: boolean) => (
    <ul aria-hidden={duplicate || undefined} className={duplicate ? "marquee-dup flex shrink-0" : "flex shrink-0 flex-wrap"}>
      {items.map((tech) => (
        <li key={tech.title} className="flex items-center gap-3 px-7 py-3 text-muted-foreground transition-colors hover:text-foreground">
          {tech.path ? (
            <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden>
              <path d={tech.path} />
            </svg>
          ) : (
            <Cloud className="size-6 shrink-0" aria-hidden />
          )}
          <span className="whitespace-nowrap text-base">{tech.title}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap overflow-hidden">
      <div className={reverse ? "marquee marquee-reverse" : "marquee"} style={{ "--duration": duration } as React.CSSProperties}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/** Two counter-scrolling rows of the tools behind the work; pauses on hover. */
export function StackMarquee() {
  return (
    <section aria-label="Technologies Julián works with" className="border-y border-border py-6">
      <Row items={PRODUCT} duration="55s" />
      <Row items={PLATFORM} duration="60s" reverse />
    </section>
  );
}
