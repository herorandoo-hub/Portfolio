import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { categories } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PortfolioSection() {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? categories : categories.filter((c) => c.id === active);

  return (
    <section id="portfolio" className="editorial-dark scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <Reveal>
          <p className="font-display text-xs tracking-widest text-primary uppercase">Portfolio</p>
          <h2 className="section-title mt-3 text-5xl font-bold italic sm:text-7xl">Automation projects</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Organized into four categories by the platform each solution was built on.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex flex-wrap gap-2">
          <FilterButton
            label="All projects"
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {categories.map((c) => (
            <FilterButton
              key={c.id}
              label={c.label}
              active={active === c.id}
              onClick={() => setActive(c.id)}
            />
          ))}
        </Reveal>

        <div className="mt-20 space-y-28">
          {shown.map((category, categoryIndex) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <Reveal className="grid gap-5 border-t border-border pt-7 lg:grid-cols-[auto_1fr_1fr] lg:items-start">
                <span className="font-display text-5xl font-bold text-primary/45">{String(categoryIndex + 1).padStart(2, "0")}</span>
                <div>
                <h3 className="text-3xl font-bold">{category.label}</h3>
                <p className="mt-2 font-display text-sm text-primary">{category.headline}</p>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{category.intro}</p>
              </Reveal>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {category.projects.map((project, i) => (
                  <Reveal key={project.title} delay={i * 70}>
                     <article className="project-card group h-full border border-border bg-card p-7">
                      {project.image ? (
                        <div className="-mx-7 -mt-7 mb-6 aspect-[16/9] overflow-hidden rounded-t-md border-b border-border bg-secondary">
                          <img
                            src={project.image}
                            alt={project.imageAlt ?? `${project.title} workflow`}
                             className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-[1.035]"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <span className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                        {category.label}
                      </span>
                      <h4 className="mt-2 text-xl font-bold">{project.title}</h4>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className={cn(
        "press rounded-none border px-4 py-2 text-xs font-bold uppercase transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </Button>
  );
}
