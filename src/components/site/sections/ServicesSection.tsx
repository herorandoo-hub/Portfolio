import { Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/portfolio-data";

export function ServicesSection() {
  return (
    <section id="services" className="editorial-dark scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <Reveal variant="left">
          <p className="section-index font-display">02</p>
          <p className="font-display text-xs tracking-widest text-primary uppercase">Services</p>
          <h2 className="section-title mt-3 text-5xl font-bold italic sm:text-7xl">What I build</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Practical automation that removes manual steps, keeps leads moving, and connects the
            tools your business already runs on.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 70} variant={i % 2 === 0 ? "left" : "right"}>
              <article className={`step-card group ${i % 2 === 0 ? "step-card--cream" : "step-card--wine"}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="pt-1 text-lg font-bold">{service.title}</h3>
                </div>
                <p className="step-body mt-3">{service.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((p) => (
                    <li key={p} className="step-body flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
