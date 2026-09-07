import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { experience } from "@/lib/portfolio-data";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Work Experience — Bryant Francisco" },
      {
        name: "description",
        content:
          "Hands-on automation experience, education, and certifications in n8n, Make, Zapier, and GoHighLevel.",
      },
      { property: "og:title", content: "Work Experience — Bryant Francisco" },
      {
        property: "og:description",
        content:
          "Automation projects, API integration work, education, and platform certifications.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <Reveal>
        <p className="font-display text-xs tracking-widest text-primary uppercase">Experience</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Work & background</h1>
        <p className="mt-4 text-muted-foreground">
          Hands-on automation work, formal education, and platform certifications.
        </p>
      </Reveal>

      <div className="relative mt-14 border-l border-border pl-8">
        {experience.map((item, i) => (
          <Reveal key={item.title} delay={i * 90} className="relative pb-12 last:pb-0">
            <span className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-background bg-primary" />
            <p className="font-display text-xs tracking-widest text-primary uppercase">
              {item.period}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.org}</p>
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
