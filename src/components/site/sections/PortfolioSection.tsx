import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { categories } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? categories : categories.filter((c) => c.id === active);

  return (
    <section id="portfolio" className="scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="font-display text-xs tracking-widest text-primary uppercase">Portfolio</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Automation projects</h2>
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

        <div className="mt-16 space-y-20">
          {shown.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <Reveal className="border-l-4 border-primary pl-5">
                <h3 className="text-3xl font-bold">{category.label}</h3>
                <p className="mt-2 font-display text-sm text-primary">{category.headline}</p>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{category.intro}</p>
              </Reveal>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {category.projects.map((project, i) => (
                  <Reveal key={project.title} delay={i * 70}>
                    <article className="surface-card h-full p-7">
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
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );
}
