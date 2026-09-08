import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { profile, skillGroups, categories } from "@/lib/portfolio-data";
import { ServicesSection } from "@/components/site/sections/ServicesSection";
import { ExperienceSection } from "@/components/site/sections/ExperienceSection";
import { PortfolioSection } from "@/components/site/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/site/sections/TestimonialsSection";
import { ContactSection } from "@/components/site/sections/ContactSection";
import portraitAsset from "@/assets/bryant-francisco-portrait.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bryant Francisco — AI Automation Specialist" },
      {
        name: "description",
        content:
          "Bryant Francisco builds AI and CRM automations with n8n, Zapier, Make, and GoHighLevel to cut manual work and speed up follow-ups.",
      },
      { property: "og:title", content: "Bryant Francisco — AI Automation Specialist" },
      {
        property: "og:description",
        content:
          "AI automation specialist for workflow, CRM, and API integration projects across n8n, Zapier, Make, and GoHighLevel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const projectCount = categories.reduce((n, c) => n + c.projects.length, 0);

  return (
    <>
      <section id="home" className="relative scroll-mt-20 overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-20 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Available for automation projects
            </span>
            <h1 className="mt-6 text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
              Bryant
              <br />
              Francisco<span className="text-primary">.</span>
            </h1>
            <p className="mt-4 font-display text-lg text-muted-foreground">
              {profile.role} <span className="text-primary">/</span> {profile.tagline}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#portfolio"
                className="press inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View my work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="press inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-md border border-border bg-surface shadow-[var(--shadow-hard)]">
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={portraitAsset.url}
                  alt="Bryant Francisco, AI Automation Specialist"
                  className="h-full w-full object-cover object-top"
                  fetchPriority="high"
                />
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-5">
                  <Stat value={`${projectCount}+`} label="Automation builds" />
                  <Stat value="4" label="Platforms mastered" />
                </div>
                <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" /> {profile.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-primary" /> {profile.phone}
                  </p>
                  <p className="flex items-center gap-2 break-all">
                    <Mail className="h-4 w-4 shrink-0 text-primary" /> {profile.email}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Core skills</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              The stack I use to connect systems, automate follow-ups, and put AI to work inside
              real business processes.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 70}>
                <div className="surface-card h-full p-6">
                  <h3 className="font-display text-sm tracking-widest text-primary uppercase">
                    {group.label}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <ExperienceSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
    </div>
  );
}
