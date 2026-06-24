// ── Search / Catalog ────────────────────────────────────────────────────────

export interface SearchMetadataItem {
  key: string;
  value: string | number | string[];
}

export interface SearchEntity {
  id: string;
  type: "project" | "roadmap" | "specialty" | "tool";
  metadata: SearchMetadataItem[];
}

export interface SearchResultGroup {
  title: string;
  description: string;
  imageUrl: string | null;
  type: string;
  entities: SearchEntity[];
}

/** A parsed category tile for the Explore grid */
export interface CategoryGroup {
  title: string;
  imageUrl: string;
  count: number;
}

export interface SearchResponse {
  results: SearchResultGroup[];
}

/** Parsed, flat project object derived from a SearchEntity */
export interface CatalogProject {
  id: string;
  title: string;
  category: string;
  plan: "free" | "paid";
  /** COMPLETE = this user has finished it */
  status: "COMPLETE" | "INCOMPLETE";
  progress: number;
  completions: number;
  completedBy: string[];
  part: number;
}

// ── Portfolio ────────────────────────────────────────────────────────────────

export interface PortfolioDocument {
  id: string;
  title: string;
  type: "PROJECT" | "NOTE";
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    storageName: string;
  };
}

export interface Portfolio {
  description: string;
  documents: PortfolioDocument[];
  ownerName?: string;
  ownerPicture?: string;
  title?: string;
}

export interface SelectedProject {
  id: string;
  completedBy: string[];
}

export interface MyProject {
  id: string;
  projectId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyProjectsResponse {
  items: MyProject[];
  pagination: { hasMore: boolean };
}

// ── Auth / Profile ───────────────────────────────────────────────────────────

export interface MeResponse {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
  avatar?: string;
  bio?: string;
}
