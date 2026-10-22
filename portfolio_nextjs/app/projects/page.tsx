import type { Metadata } from "next";
import { getGithubHistory } from "@/data/github";
import { ProjectHistory } from "@/components/github/ProjectHistory";

export const metadata: Metadata = {
  title: "Projects & Contributions | Dohar Siregar",
  description: "A year-by-year overview of public repositories and verified GitHub activity.",
};

export default async function ProjectsPage() {
  let history = [] as Awaited<ReturnType<typeof getGithubHistory>>;
  let unavailable = false;
  try {
    history = await getGithubHistory();
  } catch {
    unavailable = true;
  }
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16 bg-background text-foreground">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">MY GITHUB JOURNEY</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects <span className="text-accent">&amp; Contributions</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          A year-by-year overview of repositories I&apos;ve worked on, showing the first and last commit dates within
          each year.
        </p>
      </div>
      {unavailable ? (
        <p className="text-muted-foreground">GitHub project history is temporarily unavailable.</p>
      ) : history.length ? (
        <ProjectHistory yearGroups={history} />
      ) : (
        <p className="text-muted-foreground">No public GitHub activity is available right now.</p>
      )}
    </main>
  );
}