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
    title: "Architected single-page OS interface containing a 3D Spline container, dynamic 2D neural graph, and interactive timeline components.",
    learned: "Managing client-side state across high-fidelity views using a unified activeTab controller prevents standard client-server layout shifts.",
    tags: ["Next.js 16", "Spline 3D", "Architecture"],
    date: "2026-04-15",
  },
  {
    day: 2,
    title: "Engineered responsive 2D physics-based capability graph representing data projects, operational experience, and core domains.",
    learned: "Force graph physics engines require precise charge and link tuning to balance dense information layouts with readable user interaction.",
    tags: ["D3 Force", "Data Viz", "UI/UX"],
    date: "2026-04-18",
  },
  {
    day: 3,
    title: "Structured static data layer replacing dynamic markdown parsers to increase site speed and provide robust type-safe content management.",
    learned: "Decoupling dynamic markdown processing from client renders dramatically reduces Largest Contentful Paint (LCP) scores.",
    tags: ["TypeScript", "Performance", "Clean Architecture"],
    date: "2026-04-28",
  },
  {
    day: 4,
    title: "Integrated direct Gemini REST API stream on Edge Runtime to power conversational chat queries.",
    learned: "Deploying SSE stream endpoints on Vercel Edge Runtime bypasses standard Vercel serverless function timeouts completely.",
    tags: ["Gemini API", "Edge Runtime", "Streaming"],
    date: "2026-05-01",
  },
  {
    day: 5,
    title: "Refined global product positioning, streamlined layouts, and established type-safe daily logs to track workspace progression.",
    learned: "Interface labels must pass a rapid visual test—reducing ambiguous terminology directly increases user interaction rates.",
    tags: ["UX", "Product Design", "Polish"],
    date: "2026-05-02",
  },
];
