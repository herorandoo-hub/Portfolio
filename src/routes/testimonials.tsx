import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { testimonials } from "@/lib/portfolio-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Bryant Francisco" },
      {
        name: "description",
        content:
          "What clients say about working with Bryant Francisco on automation, CRM follow-up systems, and AI workflows.",
      },
      { property: "og:title", content: "Testimonials — Bryant Francisco" },
      {
        property: "og:description",
        content: "Client feedback on automation and CRM workflow projects.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-display text-xs tracking-widest text-primary uppercase">Testimonials</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Kind words</h1>
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

      <Reveal className="mt-14 text-center">
        <Link
          to="/contact"
          className="press inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Work with me
        </Link>
      </Reveal>
    </div>
  );
}
