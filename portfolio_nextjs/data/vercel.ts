import "server-only";

const api = "https://api.vercel.com";

type VercelProject = { id?: string; link?: { type?: string; repo?: string } };
type VercelDeployment = { url?: string; target?: string | string[]; readyState?: string; state?: string };

async function vercel<T>(path: string): Promise<T> {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return {} as T;
  const teamId = process.env.VERCEL_TEAM_ID;
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${api}${path}${teamId ? `${separator}teamId=${encodeURIComponent(teamId)}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`Vercel request failed (${response.status})`);
  return response.json() as Promise<T>;
}

function usableUrl(url: string | undefined) {
  if (!url) return;
  const value = url.startsWith("http") ? url : `https://${url}`;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function getVercelDeployments() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return new Map<string, string>();
  try {
    const { projects = [] } = await vercel<{ projects?: VercelProject[] }>("/v9/projects?limit=100");
    const matches = new Map<string, string>();
    for (const project of projects) {
      const repository = project.link?.repo;
      if (project.link?.type !== "github" || !repository || !project.id) continue;
      const { deployments = [] } = await vercel<{ deployments?: VercelDeployment[] }>(`/v6/deployments?projectId=${encodeURIComponent(project.id)}&target=production&limit=5`);
      const deployment = deployments.find((item) => (item.readyState === "READY" || item.state === "READY") && usableUrl(item.url));
      const url = usableUrl(deployment?.url);
      if (!url) continue;
      const key = repository.toLowerCase();
      matches.set(key, url);
      matches.set(key.split("/").pop() ?? key, url);
    }
    return matches;
  } catch {
    return new Map<string, string>();
  }
}
