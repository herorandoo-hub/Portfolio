import { Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { testimonials } from "@/lib/portfolio-data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="font-display text-xs tracking-widest text-primary uppercase">
            Testimonials
          </p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Kind words</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Feedback from the people whose day-to-day work got a little lighter.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="surface-card h-full p-8">
                <Quote className="h-7 w-7 text-primary" />
                <blockquote className="mt-4 text-base leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
