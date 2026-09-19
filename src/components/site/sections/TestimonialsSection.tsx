import { Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { testimonials } from "@/lib/portfolio-data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <Reveal variant="left">
          <p className="section-index font-display">05</p>
          <p className="font-display text-xs tracking-widest text-primary uppercase">
            Testimonials
          </p>
          <h2 className="section-title mt-3 text-5xl font-bold italic sm:text-7xl">Kind words</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Feedback from the people whose day-to-day work got a little lighter.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} variant={i % 2 === 0 ? "left" : "right"}>
              <figure className="testimonial-card h-full border-t border-border p-8 lg:p-10">
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
