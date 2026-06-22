import { SESSION_TOKEN } from "../constants/auth";
import type {
  MyProjectsResponse,
  Portfolio,
  SearchResponse,
  SelectedProject,
} from "../types/api";

const BASE = "https://learn.nextwork.org";

// Cookie header works on native (iOS/Android). On web the browser blocks
// setting Cookie directly — API calls fall back to seed data in that case.
function authHeaders(): HeadersInit {
  return {
    Accept: "application/json",
    Cookie: `auth-session=${SESSION_TOKEN}`,
    Referer: "https://learn.nextwork.org/explore/learnlists/all",
  };
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: authHeaders(),
    credentials: "include",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} — ${text.slice(0, 120)}`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    // Server returned HTML (likely a login redirect) instead of JSON
    throw new Error(`Not JSON (got ${res.status}) — session may be expired`);
  }
}

export const api = {
  /** Full project catalog — 336+ projects with per-user completion status */
  searchProjects: (q: string, type?: string) => {
    const params = new URLSearchParams({ q });
    if (type) params.set("type", type);
    return get<SearchResponse>(`/search?${params.toString()}`);
  },

  /** Ammad's completed portfolio projects */
  getPortfolio: () => get<Portfolio>("/portfolio"),

  /** NextWork's featured/selected project slugs */
  getSelectedProjects: () => get<SelectedProject[]>("/projects?selected=true"),

  /** User's in-progress projects */
  getMyProjects: () =>
    get<MyProjectsResponse>("/api/v1/me/projects?source=selected"),

  /** Validations checklist for a specific project */
  getValidations: (slug: string) =>
    get<{ id: string; title: string; status: string }[]>(
      `/projects/${slug}/validations`
    ),
};
