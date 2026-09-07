import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bryant Francisco, AI Automation Specialist" },
      {
        name: "description",
        content:
          "Get in touch with Bryant Francisco to automate lead follow-ups, support, reporting, and internal workflows.",
      },
      { property: "og:title", content: "Contact — Bryant Francisco" },
      {
        property: "og:description",
        content: "Reach out about automation, CRM, and AI workflow projects.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Automation enquiry from ${name || "your website"}`,
  )}&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <p className="font-display text-xs tracking-widest text-primary uppercase">Contact</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Let's automate it</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tell me about the process that's slowing you down and I'll come back with a plan.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="surface-card h-full p-8">
            <h2 className="text-xl font-bold">Details</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a className="press hover:text-primary" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a className="press hover:text-primary" href={`tel:${profile.phone}`}>
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-primary" />
                <a
                  className="press hover:text-primary"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/bryntfrncsc
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {profile.location}
              </li>
            </ul>
            <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
              Languages: English (Fluent) · Tagalog (Native)
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            className="surface-card p-8"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="you@company.com"
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="What would you like to automate?">
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="Describe your current process..."
                />
              </Field>
            </div>
            <button
              type="submit"
              className="press mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send message <Send className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              This opens your email app with the message ready to send.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
