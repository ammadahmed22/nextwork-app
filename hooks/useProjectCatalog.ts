import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { CatalogProject, SearchMetadataItem, SearchResponse } from "../types/api";

export interface UseProjectCatalogResult {
  projects: CatalogProject[];
  categories: string[];
  projectCounts: Record<string, number>;
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

function parseResponse(data: SearchResponse): CatalogProject[] {
  const seen = new Map<string, CatalogProject>();

  for (const group of data.results) {
    // Only process course-type groups (skip individual project entries)
    if (group.type !== "course") continue;

    for (const entity of group.entities) {
      if (entity.type !== "project") continue;

      const m = parseMeta(entity.metadata);
      const project: CatalogProject = {
        id: entity.id,
        title: String(m.title ?? entity.id),
        // Use group title as category so detail-screen filtering is accurate
        category: group.title,
        plan: m.plan === "paid" ? "paid" : "free",
        status: m.status === "COMPLETE" ? "COMPLETE" : "INCOMPLETE",
        progress: Number(m.progress ?? 0),
        completions: Number(m.completions ?? 0),
        completedBy: Array.isArray(m.completedBy) ? (m.completedBy as string[]) : [],
        part: Number(m.part ?? 1),
      };

      const existing = seen.get(entity.id);
      if (!existing || project.completions > existing.completions) {
        seen.set(entity.id, project);
      }
    }
  }

  return Array.from(seen.values()).sort((a, b) => b.completions - a.completions);
}

function deriveCategories(projects: CatalogProject[]): {
  categories: string[];
  counts: Record<string, number>;
} {
  const counts: Record<string, number> = {};
  for (const p of projects) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  const categories = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => cat);
  return { categories, counts };
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

    // Use correct endpoint: ?q= (empty) returns all groups with imageUrls and titles
    api
      .searchGroups()
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

  const { categories: derived, counts } = deriveCategories(projects);
  const categories = ["All", ...derived];

  return {
    projects,
    categories,
    projectCounts: counts,
    loading,
    error,
    refresh: () => setTick((t) => t + 1),
  };
}
