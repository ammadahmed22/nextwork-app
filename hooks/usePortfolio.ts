import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { PortfolioDocument } from "../types/api";

interface UsePortfolioResult {
  projects: PortfolioDocument[];
  loading: boolean;
  error: string | null;
}

export function usePortfolio(): UsePortfolioResult {
  const [projects, setProjects] = useState<PortfolioDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getPortfolio()
      .then((portfolio) => {
        if (!cancelled) {
          const docs = portfolio.documents.filter((d) => d.type === "PROJECT");
          setProjects(docs);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}
