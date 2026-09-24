import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-20 sm:px-8">
      <header className="mb-16">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-ink-faint">
          Data science portfolio
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-medium leading-tight text-ink sm:text-5xl">
          Applied ML projects, built end to end.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Each project below is a full pipeline — data, a model, an
          evaluated agent or forecast, and a working dashboard — not a
          notebook.
        </p>
      </header>

      <ol className="flex flex-col divide-y divide-border border-y border-border">
        {PROJECTS.map((project, i) => (
          <li key={project.slug}>
            <ProjectRow index={i + 1} project={project} />
          </li>
        ))}
      </ol>

      <footer className="mt-16 font-mono text-[12px] text-ink-faint">
        Manhattan Labs
      </footer>
    </main>
  );
}

function ProjectRow({ index, project }: { index: number; project: Project }) {
  const isLive = project.status === "live";
  const content = (
    <div className="group flex items-baseline gap-5 py-7">
      <span className="font-mono text-[13px] text-ink-faint">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            className={`font-[family-name:var(--font-display)] text-xl font-medium text-ink ${
              isLive ? "group-hover:text-accent" : ""
            }`}
          >
            {project.name}
          </h2>
          {!isLive && (
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              In progress
            </span>
          )}
        </div>
        <p className="mt-1 text-[14px] text-ink-soft">{project.tagline}</p>
        <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-ink-faint">
          {project.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-ink-faint">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      {isLive && (
        <span className="self-center font-mono text-[13px] text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
          →
        </span>
      )}
    </div>
  );

  if (!isLive) {
    return <div className="cursor-default opacity-70">{content}</div>;
  }

  return (
    <Link href={`/${project.slug}`} className="block">
      {content}
    </Link>
  );
}
