import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-display text-lg font-bold">
            BRYANT<span className="text-primary">.</span>FRANCISCO
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a className="press hover:text-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a
            className="press hover:text-primary"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="#contact" className="press hover:text-primary">
            Contact
          </a>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bryant Francisco. All rights reserved.
      </div>
    </footer>
  );
}
