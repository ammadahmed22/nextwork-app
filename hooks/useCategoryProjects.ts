import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { CatalogProject, SearchMetadataItem } from "../types/api";

const BASE = "https://nextwork.ai";

function parseMeta(
  metadata: SearchMetadataItem[]
): Record<string, string | number | string[]> {
  const out: Record<string, string | number | string[]> = {};
  for (const m of metadata) {
    out[m.key] = m.value;
  }
  return out;
}

export interface UseCategoryProjectsResult {
  projects: CatalogProject[];
  imageUrl: string;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useCategoryProjects(categoryTitle: string): UseCategoryProjectsResult {
  const [projects, setProjects] = useState<CatalogProject[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!categoryTitle) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    api
      .searchGroups()
      .then((data) => {
        if (!mounted) return;

        const group = data.results.find((g) => g.title === categoryTitle);
        if (!group) {
          setProjects([]);
          setImageUrl("");
          return;
        }

        if (group.imageUrl) {
          setImageUrl(`${BASE}${group.imageUrl}`);
        }

        const parsed: CatalogProject[] = group.entities
          .filter((e) => e.type === "project")
          .map((e) => {
            const m = parseMeta(e.metadata);
            return {
              id: e.id,
              title: String(m.title ?? e.id),
              category: categoryTitle,
              plan: m.plan === "paid" ? "paid" : "free",
              status: m.status === "COMPLETE" ? "COMPLETE" : "INCOMPLETE",
              progress: Number(m.progress ?? 0),
              completions: Number(m.completions ?? 0),
              completedBy: Array.isArray(m.completedBy)
                ? (m.completedBy as string[])
                : [],
              part: Number(m.part ?? 1),
            };
          });

        setProjects(parsed);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Failed to load projects");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [categoryTitle, tick]);

  return {
    projects,
    imageUrl,
    loading,
    error,
    refresh: () => setTick((t) => t + 1),
  };
}
