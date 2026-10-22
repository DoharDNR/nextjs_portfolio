import "server-only";
import { getVercelDeployments } from "@/data/vercel";

export type RepositoryActivity = {
  year: number;
  commitCount: number;
  firstCommitDate: string;
  lastCommitDate: string;
};

export type GithubProject = {
  id: number;
  name: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
  pushedAt: string;
  createdAt: string;
  activities: RepositoryActivity[];
  deploymentUrl?: string;
};

export type ProjectHistoryYear = {
  year: number;
  repositories: Array<{ repository: GithubProject; activity: RepositoryActivity }>;
};

type GithubRepository = { id: number; name: string; html_url: string; description: string | null; archived: boolean; fork: boolean; private: boolean; created_at: string; pushed_at: string | null; languages_url: string };
type GithubCommit = { commit?: { author?: { date?: string; email?: string } } };
const api = "https://api.github.com";
const headers = () => ({ Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) });

async function github<T>(path: string): Promise<T> {
  const response = await fetch(`${api}${path}`, { headers: headers(), next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);
  return response.json() as Promise<T>;
}

async function githubPages<T>(path: string, maxPages = 10): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const batch = await github<T[]>(`${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`);
    items.push(...batch);
    if (batch.length < 100) break;
  }
  return items;
}

export async function getGithubHistory(): Promise<ProjectHistoryYear[]> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return [];
  const repositories = await githubPages<GithubRepository>(`/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated`);
  const visible = repositories.filter((repo) => !repo.private && !repo.archived && !repo.fork);
  const email = process.env.GITHUB_AUTHOR_EMAIL?.trim().toLowerCase();
  const deployments = await getVercelDeployments();
  const projects = await Promise.all(visible.map(async (repo): Promise<GithubProject | null> => {
    const commits = await githubPages<GithubCommit>(`/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/commits`);
    const authored = email ? commits.filter((item) => item.commit?.author?.email?.toLowerCase() === email) : commits;
    const dates = authored.map((item) => item.commit?.author?.date).filter((date): date is string => Boolean(date));
    if (!dates.length) return null;
    const byYear = new Map<number, string[]>();
    dates.forEach((value) => { const year = new Date(value).getUTCFullYear(); const list = byYear.get(year) ?? []; list.push(value); byYear.set(year, list); });
    const languages = repo.languages_url ? await github<Record<string, number>>(repo.languages_url.replace(api, "")) : {};
    const activities = [...byYear.entries()].map(([year, values]) => { const sorted = values.sort(); return { year, commitCount: sorted.length, firstCommitDate: sorted[0], lastCommitDate: sorted.at(-1) ?? sorted[0] }; });
    return { id: repo.id, name: repo.name, title: repo.name.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), description: repo.description || "No description provided.", url: repo.html_url, technologies: Object.keys(languages).slice(0, 5), pushedAt: repo.pushed_at || repo.created_at, createdAt: repo.created_at, activities, deploymentUrl: deployments.get(`${username}/${repo.name}`.toLowerCase()) ?? deployments.get(repo.name.toLowerCase()) };
  }));
  const groups = new Map<number, ProjectHistoryYear>();
  projects.filter((project): project is GithubProject => project !== null).forEach((repository) => repository.activities.forEach((activity) => { const group = groups.get(activity.year) ?? { year: activity.year, repositories: [] }; group.repositories.push({ repository, activity }); groups.set(activity.year, group); }));
  return [...groups.values()].sort((a, b) => b.year - a.year).map((group) => ({ ...group, repositories: group.repositories.sort((a, b) => b.activity.lastCommitDate.localeCompare(a.activity.lastCommitDate)) }));
}

export const getGithubProjects = getGithubHistory;
