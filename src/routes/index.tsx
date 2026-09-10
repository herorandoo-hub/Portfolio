import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { profile, skillGroups, categories } from "@/lib/portfolio-data";
import { ServicesSection } from "@/components/site/sections/ServicesSection";
import { ExperienceSection } from "@/components/site/sections/ExperienceSection";
import { PortfolioSection } from "@/components/site/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/site/sections/TestimonialsSection";
import { ContactSection } from "@/components/site/sections/ContactSection";
import { Button } from "@/components/ui/button";
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
      <section id="home" className="hero-stage relative scroll-mt-20 overflow-hidden">
        <div className="hero-monogram" aria-hidden="true">BF</div>
        <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl gap-16 px-5 py-16 lg:grid-cols-12 lg:items-center lg:px-8">
          <Reveal className="relative z-10 lg:col-span-7">
            <span className="eyebrow inline-flex items-center gap-3 text-xs font-bold text-primary uppercase">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Available for automation projects
            </span>
            <h1 className="hero-title mt-7 text-[clamp(4.25rem,10vw,9rem)] leading-[0.82] font-bold italic">
              Bryant
              <br />
              <span className="ml-[0.08em] text-primary not-italic">Francisco.</span>
            </h1>
            <p className="mt-8 font-display text-sm font-bold tracking-widest text-foreground uppercase">
              {profile.role} <span className="text-primary">/</span> {profile.tagline}
            </p>
            <p className="mt-7 max-w-xl border-l border-primary pl-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="press rounded-none px-8 uppercase tracking-widest">
                <a href="#portfolio">View my work <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="press rounded-none px-8 uppercase tracking-widest">
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative lg:col-span-5">
            <div className="portrait-frame group relative mx-auto max-w-md">
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={portraitAsset.url}
                  alt="Bryant Francisco, AI Automation Specialist"
                  className="portrait-image h-full w-full object-cover object-top"
                  fetchPriority="high"
                />
              </div>
              <div className="portrait-meta p-6">
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
              <div className="portrait-index" aria-hidden="true"><span>01</span><small>Principal</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="editorial-band scroll-mt-20 border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <h2 className="section-title text-5xl font-bold italic sm:text-7xl">Core skills</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              The stack I use to connect systems, automate follow-ups, and put AI to work inside
              real business processes.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 70}>
                <div className="editorial-cell h-full p-7 lg:p-9">
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
