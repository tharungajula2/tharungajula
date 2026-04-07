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
  status: "live" | "locked" | "planned";
  universeClass: "sequential_core" | "parallel_wing";
  sectionGrouping: "Core Health Ladder" | "Parallel Auxiliary Universes";
  badge?: string;
  order: number;
  hasLiveContent: boolean;
  
  // NEW CHARTER FIELDS
  domainGroup: "health" | "cognition" | "puzzle" | "sandbox";
  learningMode: "sequential" | "flexible" | "daily" | "exploratory";
  contentStyle: "masterclass" | "lab" | "drills" | "exploratory_archive";
  charterSummary: string;
  futureIntent: string;
  currentState: string; // Human-readable content state
  isSequential: boolean;
  isFlagship: boolean;
  teaserTopics: string[];
  legacyIds?: string[]; // Transitional field for folder mapping
}
