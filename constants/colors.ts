export const colors = {
  bg: "#F7F5F3",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  cardAlt: "#EEEAE6",
  accent: "#1B1918",
  text: "#1B1918",
  textSecondary: "#6A6A6A",
  border: "#E6E6E6",
  borderStrong: "#D0CCC8",
  green: "#9CA3AF",
  error: "#FF3B30",
  nav: "#1B1918",
} as const;

/** Maps broad static project categories → accent color (used by ProjectCard) */
export const categoryColors: Record<string, string> = {
  AI: "#8B5CF6",
  DevOps: "#3B82F6",
  Frontend: "#10B981",
  Backend: "#F59E0B",
  Data: "#EC4899",
  Cloud: "#06B6D4",
};

/** Maps catalog project category names → accent color */
export const CATEGORY_COLORS: Record<string, string> = {
  "Amazon VPC": "#06B6D4",
  "Cloud Beginner Challenge": "#10B981",
  Security: "#F59E0B",
  Databases: "#8B5CF6",
  Kubernetes: "#3B82F6",
  Claude: "#EC4899",
  "Claude Code": "#EC4899",
  "6 Day DevOps Challenge": "#F97316",
  "Amazon Lex Chatbot": "#6366F1",
  DevOps: "#F97316",
  "Three-Tier": "#06B6D4",
  "Generative AI Developer": "#8B5CF6",
  "AI Tooling": "#10B981",
  "AI Second Brain": "#EC4899",
  "Build with OpenClaw": "#06B6D4",
  Archived: "#9CA3AF",
};

/** Returns color for a catalog category name */
export function categoryColor(name: string): string {
  return CATEGORY_COLORS[name] ?? "#6A6A6A";
}

/** Maps a portfolio project slug → display label + color */
export function categoryFromSlug(slug: string): { label: string; color: string } {
  if (slug.includes("compute")) return { label: "Compute", color: "#3B82F6" };
  if (slug.includes("networks")) return { label: "Networking", color: "#06B6D4" };
  if (slug.includes("security")) return { label: "Security", color: "#F59E0B" };
  if (slug.includes("databases")) return { label: "Databases", color: "#8B5CF6" };
  if (slug.includes("analytics")) return { label: "Analytics", color: "#EC4899" };
  return { label: "Cloud", color: "#10B981" };
}
