import type { Project } from "@/content/site";
import { projects } from "@/content/site";
import { BrowserFrame, PhoneFrame } from "./Mockups";

const KIND_LABEL: Record<Project["kind"], string> = {
  web: "Web app",
  mobile: "Mobile app",
  ai: "AI tool",
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isMobile = project.kind === "mobile";

  const media = (
    <div className={isMobile ? "rounded-xl bg-sunk py-6" : ""}>
      {isMobile ? (
        <PhoneFrame label={project.title} image={project.image} />
      ) : (
        <BrowserFrame
          url={project.liveUrl}
          label={project.title}
          image={project.image}
        />
      )}
    </div>
  );

  return (
    // min-w-0 stops the grid item from being sized by its widest unbreakable
    // child (the project URL), which otherwise pushes the page sideways.
    <article className="group flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-6">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          // The title below links to the same place. Taking this one out of
          // the tab order stops screen readers and keyboards hitting the same
          // destination twice.
          tabIndex={-1}
          aria-hidden="true"
          className="group/media relative block overflow-hidden rounded-xl"
        >
          {media}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover/media:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-[var(--shadow-card)]">
              Visit site
              <ArrowIcon className="size-3.5" />
            </span>
          </span>
        </a>
      ) : (
        media
      )}

      <div className="mt-5 flex items-center gap-2">
        <span className="eyebrow">{KIND_LABEL[project.kind]}</span>
        <span className="text-line" aria-hidden="true">
          /
        </span>
        <span className="eyebrow">{project.year}</span>

        {project.isLive && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-signal/10 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-signal uppercase">
            <span className="size-1.5 rounded-full bg-signal" />
            Live
          </span>
        )}

        {project.draft && (
          <span className="ml-auto rounded-full border border-dashed border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-muted uppercase">
            Draft
          </span>
        )}
      </div>

      <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-baseline gap-1.5 transition-colors hover:text-violet"
          >
            {project.title}
            <ArrowIcon className="size-3.5 translate-y-px text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet" />
          </a>
        ) : (
          project.title
        )}
      </h3>

      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
        {project.summary}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted/85">
        {project.detail}
      </p>

      {/* mt-auto drops the chips to the bottom so they line up across cards
          whose descriptions differ in length. */}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-sunk px-2 py-1 font-mono text-[0.6875rem] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.context || project.repoUrl) && (
        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-sm">
          {project.context && (
            <span className="text-muted">{project.context}</span>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto font-medium text-ink hover:underline"
            >
              View code
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <p className="eyebrow">Selected work</p>
        <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3rem)] leading-tight font-semibold tracking-[-0.02em]">
          Things I have built and shipped.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
