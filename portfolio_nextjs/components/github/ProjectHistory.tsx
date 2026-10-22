import { Calendar, ExternalLink, GitCommitHorizontal } from "lucide-react";
import type { ProjectHistoryYear } from "@/data/github";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );

export function ProjectHistory({ yearGroups }: { yearGroups: ProjectHistoryYear[] }) {
  return (
    <div className="relative space-y-12">
      <span
        className="absolute bottom-2 left-[5px] top-2 hidden w-px bg-line md:block"
        aria-hidden="true"
      />
      {yearGroups.map((group, groupIndex) => (
        <section
          key={group.year}
          className="relative grid grid-cols-1 gap-5 md:grid-cols-[130px_minmax(0,1fr)] md:gap-8"
        >
          <div className="relative md:pl-8">
            <span
              className={`absolute left-0 top-2 mt-1 hidden size-3 rounded-full ring-4 md:block ${groupIndex === 0 ? "bg-accent ring-accent/15" : "bg-muted-foreground ring-muted-foreground/15"}`}
              aria-hidden="true"
            />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{group.year}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {group.repositories.length} {group.repositories.length === 1 ? "repository" : "repositories"}
            </p>
          </div>
          <div className="space-y-4">
            {group.repositories.map(({ repository, activity }) => (
              <article
                key={`${repository.id}-${activity.year}`}
                className="rounded-2xl border border-line bg-card p-5 transition hover:border-muted-foreground sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <GitCommitHorizontal aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{repository.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{repository.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {repository.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-muted-surface px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 border-t border-line pt-4 text-sm text-muted-foreground lg:min-w-56 lg:border-0 lg:pt-1">
                    <span className="inline-flex items-center gap-2">
                      <GitCommitHorizontal size={14} aria-hidden="true" />
                      {activity.commitCount} {activity.commitCount === 1 ? "commit" : "commits"} in {activity.year}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} aria-hidden="true" />
                      {formatDate(activity.firstCommitDate)}
                      {activity.firstCommitDate !== activity.lastCommitDate && (
                        <>
                          {" "}
                          <span aria-hidden="true">→</span> {formatDate(activity.lastCommitDate)}
                        </>
                      )}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <a
                        className="inline-flex w-fit items-center gap-1 text-xs font-medium text-accent transition hover:text-hover-text"
                        href={repository.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View repository <ExternalLink size={12} aria-hidden="true" />
                      </a>
                      {repository.deploymentUrl && (
                        <a
                          className="inline-flex w-fit items-center gap-1 text-xs font-medium text-accent transition hover:text-hover-text"
                          href={repository.deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View live site <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
