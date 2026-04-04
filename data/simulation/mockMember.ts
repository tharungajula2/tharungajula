import { SimulationState } from "../../types/simulation";

export const mockMember: SimulationState = {
  lastUpdated: "2026-04-03T10:30:00Z",
  member: {
    id: "M101",
    name: "Arjun Mehta",
    role: "Senior Portfolio Manager",
    age: 44,
    location: "Mumbai / Remote",
    summary: "Senior professional presenting with early metabolic drift and high chronic stress load. Primary focus is on stabilizing glycemic variance and optimizing particle density for long-term vascular protection.",
    lastConsult: "2026-03-28",
    nextClinicalAction: "Cardiac Calcium Scoring (CAC)",
    adherencePercentage: 82,
    retestDays: 14,
    recentChange: "ApoB elevation (+12%) confirmed via recent lab informatics.",
    pendingReview: "Correlation between 24h glycemic drift and sleep architecture.",
    openQuestion: "Preference on early AM vs. post-work Zone 2 windows.",
    nextDecision: "Low-dose statin therapy initiation vs. high-intensity lifestyle shift."
  },
  
  timeline: [
    {
      id: "T1",
      date: "2026-03-28",
      title: "Initial Care Intake",
      description: "Baseline review of medical history and existing diagnostic data. Goals established for lipodensity and glycemic control.",
      category: "clinical",
      status: "verified"
    },
    {
      id: "T2",
      date: "2026-03-15",
      title: "Diagnostic: Elevated Fasting Glucose",
      description: "Result of 106 mg/dL noted during routine screening. Action deferred by GP; now prioritized for active management.",
      category: "diagnostic",
      source: "Apollo Hospitals Informatics",
      status: "verified"
    },
    {
      id: "T3",
      date: "2025-11-20",
      title: "Wearable Sync: Deep Sleep Decline",
      description: "Significant 24-month trend showing Deep Sleep stages falling below 45 minutes on average. Inverse correlation with high market volatility periods.",
      category: "lifestyle",
      source: "Oura Health Cloud",
      status: "verified"
    },
    {
      id: "T4",
      date: "2024-06-12",
      title: "Historical: Appendectomy",
      description: "Routine laparoscopic procedure. Full recovery confirmed.",
      category: "clinical",
      status: "verified"
    }
  ],

  biomarkers: [
    {
      id: "B1",
      label: "ApoB",
      value: "108",
      unit: "mg/dL",
      range: "< 90",
      severity: "action",
      trend: "declining",
      interpretation: "Primary driver of future ASCVD risk. Requires active modulation for long-term vascular protection.",
      category: "cardiovascular"
    },
    {
      id: "B2",
      label: "hs-CRP",
      value: "2.4",
      unit: "mg/L",
      range: "< 1.0",
      severity: "monitor",
      trend: "stable",
      interpretation: "Moderate systemic inflammation. Grounded in chronic stress levels and variable sleep architecture.",
      category: "metabolic"
    },
    {
      id: "B3",
      label: "HbA1c",
      value: "5.7",
      unit: "%",
      range: "< 5.6",
      severity: "monitor",
      trend: "declining",
      interpretation: "Early pre-diabetic drift. Suggests transient post-prandial excursions during high-stress periods.",
      category: "metabolic"
    },
    {
      id: "B4",
      label: "Omega-3 Index",
      value: "4.2",
      unit: "%",
      range: "> 8.0",
      severity: "action",
      trend: "stable",
      interpretation: "Deficient. Impacts recovery, focus, and baseline systemic anti-inflammatory capacity.",
      category: "longevity"
    }
  ],

  clusters: [
    {
      id: "C1",
      title: "Vascular Foundation",
      biomarkers: ["B1", "B4"],
      severity: "action",
      description: "Elevated atherogenic particle density combined with low anti-inflammatory fatty acid levels. Priority #1 for optimization."
    },
    {
      id: "C2",
      title: "Metabolic Resilience",
      biomarkers: ["B2", "B3"],
      severity: "monitor",
      description: "Glycemic drift fueled by high-stress professional cycles and sub-optimal sleep recovery."
    }
  ],

  plan: [
    {
      id: "P1",
      title: "ApoB Modulation",
      category: "clinical",
      frequency: "Daily",
      rationale: "Targeting sub-60 mg/dL for absolute protection against atherogenesis.",
      metric: "Post-retest ApoB absolute value",
      reviewDate: "2026-04-18",
      status: "active",
      priority: "high"
    },
    {
      id: "P2",
      title: "Metabolic Offset: Zone 2 (15m)",
      category: "movement",
      frequency: "Daily: Post-Dinner",
      rationale: "Optimizes glycemic clearance following the evening meal.",
      metric: "Dexcom G7 2h variance",
      reviewDate: "2026-04-18",
      status: "active",
      priority: "medium"
    },
    {
      id: "P3",
      title: "Precision Supplementation: Omega-3 (4g)",
      category: "supplementation",
      frequency: "Daily",
      rationale: "Systemic repair of the Omega-3 index to support vascular endothelial health.",
      metric: "Omega-3 Index % (Retest)",
      reviewDate: "2026-04-18",
      status: "active",
      priority: "high"
    },
    {
      id: "P4",
      title: "Sleep Recovery Protocol",
      category: "lifestyle",
      frequency: "Nightly: Pre-Bed",
      rationale: "Enhancing deep sleep stage duration through temperature and light modulation.",
      metric: "Oura Deep Sleep avg (7-day)",
      reviewDate: "2026-04-18",
      status: "active",
      priority: "medium"
    }
  ],

  adherence: [
    {
      date: "2026-04-03",
      completedTasks: ["P1", "P3", "P4"],
      totalTasks: 4,
      notes: "Missed Zone 2 due to Mumbai market volatility and late professional commitments."
    },
    {
      date: "2026-04-02",
      completedTasks: ["P1", "P2", "P3", "P4"],
      totalTasks: 4
    }
  ],

  insights: [
    {
      id: "I1",
      type: "synthesis",
      title: "Longitudinal Case Synthesis",
      content: "Arjun's data indicates a high-functioning baseline that is being eroded by high-stress professional cycles. 2015 historical labs show a 32% lower ApoB baseline, confirming the recent elevation is cumulative and lifestyle-linked.",
      inputs: ["Historical Labs", "Wearables", "Intake Notes"],
      confidence: 0.92,
      impact: "high"
    },
    {
      id: "I2",
      type: "risk",
      title: "Operational Adherence Analysis",
      content: "Zone 2 movement consistently falls on high-volatility trading days. Recommendation: Transition Zone 2 to early AM window (6 AM) to reduce professional interference.",
      inputs: ["Check-in Logs", "Professional Calendar", "Oura Readiness"],
      confidence: 0.85,
      impact: "medium"
    },
    {
      id: "I3",
      type: "brief",
      title: "Next Decision Framework",
      content: "Arjun prefers non-pharmacological paths where possible. Use the Q2 retest results (ApoB/CRP) to demonstrate the efficacy (or limitation) of current supplementation before escalating to low-dose statin discussion.",
      inputs: ["Member Sentiment", "Trend Matrix", "Clinical Guidelines"],
      confidence: 0.95,
      impact: "high"
    }
  ]
};
