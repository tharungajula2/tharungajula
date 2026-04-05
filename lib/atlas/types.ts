export interface AtlasModule {
  id: string; // Internal unique ID (e.g. M01)
  slug: string;
  title: string;
  order: number; // For sorting
  moduleNumber: number; // Display number
  readingTime: number; // In minutes
  summary: string;
  status: string; // e.g. "evergreen"
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isPublic: boolean;
  content: string; // The markdown body
  universe: string; // Universe ID
  createdAt: string;
  updatedAt: string;
}

export interface AtlasUniverse {
  id: string;
  title: string;
  description: string;
  moduleCount: number;
  contentType: string; // e.g. "Scientific Masterclass"
  status: "active" | "archived" | "in-development";
}
