import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { categories } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Expand, X } from "lucide-react";

type LightboxImage = { src: string; alt: string };

export function PortfolioSection() {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const shown = active === "all" ? categories : categories.filter((c) => c.id === active);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

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
                        <button
                          type="button"
                          onClick={() =>
                            setLightbox({
                              src: project.image!,
                              alt: project.imageAlt ?? `${project.title} workflow`,
                            })
                          }
                          aria-label={`Enlarge ${project.title} workflow screenshot`}
                          className="group/image relative -mx-7 -mt-7 mb-6 block aspect-[16/9] w-[calc(100%+3.5rem)] cursor-zoom-in overflow-hidden rounded-t-md border-b border-border bg-secondary"
                        >
                          <img
                            src={project.image}
                            alt={project.imageAlt ?? `${project.title} workflow`}
                            className="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-[1.035]"
                            loading="lazy"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/image:bg-black/35">
                            <span className="flex items-center gap-2 border border-white/40 bg-black/55 px-3 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                              <Expand className="h-3.5 w-3.5" />
                              View
                            </span>
                          </span>
                        </button>
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

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close enlarged image"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/60 text-white transition-colors hover:bg-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-full max-w-full border border-white/20 object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
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
