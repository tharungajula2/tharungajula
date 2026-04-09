export interface LifeLabModule {
  id: string; // Internal unique ID
  slug: string;
  title: string;
  order: number;
  moduleNumber: number;
  readingTime: number;
  summary: string;
  status: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isPublic: boolean;
  content: string;
  universe: string;
  createdAt: string;
  updatedAt: string;
}

export interface LifeLabUniverse {
  id: string;
  title: string;
  description: string;
  moduleCount: number;
  contentType: string;
  status: "live" | "locked" | "planned";
  universeClass: string; // Made dynamic for naming flexibility
  sectionGrouping: string;
  badge?: string;
  order: number;
  hasLiveContent: boolean;
  
  // CHARTER FIELDS
  domainGroup: string;
  learningMode: string;
  contentStyle: string;
  charterSummary: string;
  futureIntent: string;
  currentState: string;
  isSequential: boolean;
  isFlagship: boolean;
  teaserTopics: string[];
  legacyIds?: string[];
}
