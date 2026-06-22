import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { CatalogProject, SearchEntity, SearchMetadataItem } from "../types/api";

export interface UseProjectCatalogResult {
  projects: CatalogProject[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

function parseMeta(
  metadata: SearchMetadataItem[]
): Record<string, string | number | string[]> {
  const out: Record<string, string | number | string[]> = {};
  for (const m of metadata) {
    out[m.key] = m.value;
  }
  return out;
}

function toProject(entity: SearchEntity): CatalogProject {
  const m = parseMeta(entity.metadata);
  return {
    id: entity.id,
    title: String(m.title ?? entity.id),
    category: String(m.category ?? "Other"),
    plan: m.plan === "paid" ? "paid" : "free",
    status: m.status === "COMPLETE" ? "COMPLETE" : "INCOMPLETE",
    progress: Number(m.progress ?? 0),
    completions: Number(m.completions ?? 0),
    completedBy: Array.isArray(m.completedBy) ? (m.completedBy as string[]) : [],
    part: Number(m.part ?? 1),
  };
}

function parseResponse(data: Awaited<ReturnType<typeof api.searchProjects>>): CatalogProject[] {
  const seen = new Map<string, CatalogProject>();

  for (const group of data.results) {
    for (const entity of group.entities) {
      if (entity.type !== "project") continue;

      const project = toProject(entity);
      const existing = seen.get(entity.id);

      // Keep entry with highest completion count (same project appears in multiple groups)
      if (!existing || project.completions > existing.completions) {
        seen.set(entity.id, project);
      }
    }
  }

  return Array.from(seen.values()).sort((a, b) => b.completions - a.completions);
}

function deriveCategories(projects: CatalogProject[]): string[] {
  const counts: Record<string, number> = {};
  for (const p of projects) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([cat]) => cat);
}

export function useProjectCatalog(): UseProjectCatalogResult {
  const [projects, setProjects] = useState<CatalogProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    api
      .searchProjects("all")
      .then((data) => {
        if (!mounted) return;
        setProjects(parseResponse(data));
        setError(null);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Failed to load catalog");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [tick]);

  const categories = ["All", ...deriveCategories(projects)];

  return {
    projects,
    categories,
    loading,
    error,
    refresh: () => setTick((t) => t + 1),
  };
}
