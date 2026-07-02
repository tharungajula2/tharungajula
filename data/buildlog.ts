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
    title: "Architected single-page OS interface: 3D Spline container, dynamic 2D neural graph, interactive timeline.",
    learned: "A unified activeTab controller prevents layout shifts across high-fidelity views.",
    tags: ["Next.js 16", "Spline 3D", "Architecture"],
    date: "2026-04-15",
  },
  {
    day: 2,
    title: "Engineered responsive 2D physics-based capability graph.",
    learned: "Force graphs need precise charge and link tuning to stay readable.",
    tags: ["D3 Force", "Data Viz", "UI/UX"],
    date: "2026-04-18",
  },
  {
    day: 3,
    title: "Replaced dynamic markdown parsing with a static, type-safe data layer.",
    learned: "Decoupling markdown from client renders dramatically improves LCP.",
    tags: ["TypeScript", "Performance", "Clean Architecture"],
    date: "2026-04-28",
  },
  {
    day: 4,
    title: "Integrated Gemini REST API stream on Edge Runtime for chat.",
    learned: "SSE on Vercel Edge bypasses serverless timeouts.",
    tags: ["Gemini API", "Edge Runtime", "Streaming"],
    date: "2026-05-01",
  },
  {
    day: 5,
    title: "Refined positioning, streamlined layouts, established type-safe daily logs.",
    learned: "Labels must pass a rapid visual test — less ambiguity, more interaction.",
    tags: ["UX", "Product Design", "Polish"],
    date: "2026-05-02",
  },
];
