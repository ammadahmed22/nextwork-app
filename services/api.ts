import type {
  MeResponse,
  MyProjectsResponse,
  Portfolio,
  SearchResponse,
  SelectedProject,
} from "../types/api";

const BASE = "https://nextwork.ai";

// Mutable session token — set by AuthContext after login/restore
let _sessionToken = "";

export function setSessionToken(token: string) {
  _sessionToken = token;
}

function authHeaders(): HeadersInit {
  return {
    Accept: "application/json",
    Cookie: `auth-session=${_sessionToken}`,
    Referer: "https://nextwork.ai/explore/learnlists/all",
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
    throw new Error(`Not JSON (got ${res.status}) — session may be expired`);
  }
}

export const api = {
  searchProjects: (q: string, type?: string) => {
    const params = new URLSearchParams({ q });
    if (type) params.set("type", type);
    return get<SearchResponse>(`/search?${params.toString()}`);
  },

  searchGroups: (type?: "roadmap" | "specialty" | "tool") => {
    const params = new URLSearchParams({ q: "" });
    if (type) params.set("type", type);
    return get<SearchResponse>(`/search?${params.toString()}`);
  },

  getPortfolio: () => get<Portfolio>("/portfolio"),

  getSelectedProjects: () => get<SelectedProject[]>("/projects?selected=true"),

  getMyProjects: () =>
    get<MyProjectsResponse>("/api/v1/me/projects?source=selected"),

  getMe: () => get<MeResponse>("/api/v1/me"),

  getValidations: (slug: string) =>
    get<{ id: string; title: string; status: string }[]>(
      `/projects/${slug}/validations`
    ),
};
