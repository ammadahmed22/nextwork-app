import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { CategoryGroup, SearchResponse } from "../types/api";

const BASE = "https://learn.nextwork.org";

function parseGroups(data: SearchResponse): CategoryGroup[] {
  return data.results
    .filter((g) => g.type === "course" && g.imageUrl)
    .map((g) => ({
      title: g.title,
      imageUrl: `${BASE}${g.imageUrl}`,
      count: g.entities.length,
    }));
}

export interface UseCategoriesResult {
  allGroups: CategoryGroup[];
  roadmapGroups: CategoryGroup[];
  specialtyGroups: CategoryGroup[];
  toolGroups: CategoryGroup[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useCategories(): UseCategoriesResult {
  const [allGroups, setAllGroups] = useState<CategoryGroup[]>([]);
  const [roadmapGroups, setRoadmapGroups] = useState<CategoryGroup[]>([]);
  const [specialtyGroups, setSpecialtyGroups] = useState<CategoryGroup[]>([]);
  const [toolGroups, setToolGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      api.searchGroups(),
      api.searchGroups("roadmap"),
      api.searchGroups("specialty"),
      api.searchGroups("tool"),
    ])
      .then(([allData, roadmapData, specialtyData, toolData]) => {
        if (!mounted) return;
        setAllGroups(parseGroups(allData));
        setRoadmapGroups(parseGroups(roadmapData));
        setSpecialtyGroups(parseGroups(specialtyData));
        setToolGroups(parseGroups(toolData));
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Failed to load categories");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [tick]);

  return {
    allGroups,
    roadmapGroups,
    specialtyGroups,
    toolGroups,
    loading,
    error,
    refresh: () => setTick((t) => t + 1),
  };
}
