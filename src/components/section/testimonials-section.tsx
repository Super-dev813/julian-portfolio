import { RevealText } from "@/components/motion/reveal-text";
import { DATA, type Testimonial } from "@/data/resume";

function Card({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex w-[min(440px,82vw)] shrink-0 flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-8">
      <blockquote className="font-serif text-xl leading-snug text-card-foreground">
        <span aria-hidden className="mr-1 text-brand">“</span>
        {testimonial.quote}
        <span aria-hidden className="ml-0.5 text-brand">”</span>
      </blockquote>
      <figcaption>
        <p className="text-sm text-foreground">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">
          {testimonial.role}, {testimonial.company}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{testimonial.relationship}</p>
      </figcaption>
    </figure>
  );
}

/** Real recommendations only. Renders nothing until DATA.testimonials has entries. */
export default function TestimonialsSection() {
  const { testimonials } = DATA;
  if (testimonials.length === 0) return null;

  const row = (duplicate: boolean) => (
    <div aria-hidden={duplicate || undefined} className={duplicate ? "marquee-dup flex shrink-0 gap-6 pr-6" : "flex shrink-0 flex-wrap gap-6 pr-6"}>
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} testimonial={testimonial} />
      ))}
    </div>
  );

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <RevealText id="testimonials-title" text="Worked with Julián" className="font-serif text-5xl tracking-tight sm:text-6xl" />
      </div>
      <div className="marquee-wrap mt-16 overflow-hidden">
        <div className="marquee" style={{ "--duration": `${Math.max(40, testimonials.length * 14)}s` } as React.CSSProperties}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
