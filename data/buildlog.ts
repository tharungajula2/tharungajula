export interface BuildLogEntry {
  day: number;
  date: string;
  title: string;
  learned: string;
  tags: string[];
}

export const buildLog: BuildLogEntry[] = [
  {
    day: 1,
    title: "Architected portfolio as an OS-style single-screen application with 3D Spline avatar, neural knowledge graph, and evolution timeline.",
    learned: "Learned to manage complex client-side state across multiple view modules using a single activeTab state pattern within a 100svh shell.",
    tags: ["Next.js 16", "Spline 3D", "Architecture"],
    date: "2026-04-15",
  },
  {
    day: 2,
    title: "Built interactive 3D neural knowledge graph with react-force-graph-3d, mapping 22 professional nodes across products, analytics, experience, and education.",
    learned: "Three.js sprite rendering for node labels requires manual canvas texture creation. Force graph physics need careful charge and center force tuning for readable layouts.",
    tags: ["Three.js", "Force Graph", "Data Viz"],
    date: "2026-04-18",
  },
  {
    day: 3,
    title: "Compiled full professional brain — 31 wiki pages from raw source data into structured entities, projects, concepts, and syntheses.",
    learned: "LLM Wiki pattern: raw source files compiled into structured interlinked knowledge base. The wiki is only as good as the raw input quality.",
    tags: ["LLM Wiki", "Knowledge Architecture"],
    date: "2026-04-28",
  },
  {
    day: 4,
    title: "Integrated AI chatbot with Gemini 2.5 Flash Lite streaming on Edge Runtime. Portfolio now has a conversational AI assistant.",
    learned: "Edge Runtime on Vercel requires direct fetch to Gemini API instead of SDK. Preview models have tighter rate limits than stable models.",
    tags: ["Gemini API", "Edge Runtime", "Streaming"],
    date: "2026-05-01",
  },
  {
    day: 5,
    title: "Final polish pass — renamed navigation for clarity, added conversational robot CTA, built the daily build log system.",
    learned: "Every label on a portfolio site must pass the 2-second test: can a stranger understand what it means without thinking?",
    tags: ["UX", "Navigation", "Polish"],
    date: "2026-05-02",
  },
];
