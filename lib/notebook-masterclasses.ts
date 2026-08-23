export interface NotebookMasterclass {
  id: string;
  category: string;
  title: string;
  question: string;
  flow: string[];
  facts: string[];
  href: string;
}

export const NOTEBOOK_MASTERCLASSES: NotebookMasterclass[] = [
  {
    id: "credit-risk",
    category: "DOMAIN + MODELLING",
    title: "Retail Credit Risk",
    question: "How does historical borrower behaviour become PD, expected loss, provisioning, regulatory capital and portfolio monitoring?",
    flow: ["Default", "PD", "Validation", "LGD / EAD", "ECL", "RWA", "Monitoring"],
    facts: ["466,285 loans", "$278.48M IFRS 9-style ECL", "$2.295B IRB RWA"],
    href: "/notebook/apps/portfolio-masterclasses/credit-risk",
  },
  {
    id: "churn",
    category: "APPLIED ANALYTICS",
    title: "Bank Customer Churn",
    question: "How does a neural network identify likely churners when missing the positive class can be costly?",
    flow: ["Data", "Neural Network", "Probability", "SMOTE", "Threshold", "Confusion Matrix", "Decision"],
    facts: ["10,000 customers", "0.48 → 0.75 recall", "0.51 SMOTE precision"],
    href: "/notebook/apps/portfolio-masterclasses/churn",
  },
  {
    id: "time-series",
    category: "APPLIED ANALYTICS",
    title: "Time Series Forecasting",
    question: "How do we forecast a seasonal monthly series without leaking future information?",
    flow: ["Series", "Stationarity", "Differencing", "SARIMA", "Residuals", "Future Holdout"],
    facts: ["204 monthly observations", "625 SARIMA candidates", "12.69% → 7.90% MAPE"],
    href: "/notebook/apps/portfolio-masterclasses/time-series",
  },
  {
    id: "nifty",
    category: "PORTFOLIO ANALYTICS",
    title: "NIFTY Portfolio",
    question: "How do multiple assets combine into a portfolio-level return/risk trade-off?",
    flow: ["Prices", "Returns", "Covariance", "Weights", "Portfolio Risk", "Risk / Return"],
    facts: ["82 usable stocks", "10,000 sampled portfolios", "0.7707 simplified return/volatility score"],
    href: "/notebook/apps/portfolio-masterclasses/nifty",
  },
  {
    id: "client-equity",
    category: "PORTFOLIO IMPLEMENTATION",
    title: "Client Equity Framework",
    question: "How do cross-sectional signals become a controlled and testable portfolio implementation?",
    flow: ["Universe", "Signals", "Ranking", "Sector Control", "Portfolio", "Turnover", "Robustness"],
    facts: ["CRSP 500 · US", "10-year backtest span", "4 core scripts"],
    href: "/notebook/apps/portfolio-masterclasses/client-equity",
  },
  {
    id: "loc-iq",
    category: "PRODUCT + SYSTEMS",
    title: "LOC-IQ",
    question: "How do multiple digital location signals become an explainable evidence graph for underwriting or fraud review?",
    flow: ["Identifiers", "Sources", "Fields", "Signals", "Weighted Evidence", "Candidate Locations"],
    facts: ["6 identifiers", "46 mapped source types", "42 defined fields"],
    href: "/notebook/apps/portfolio-masterclasses/loc-iq",
  },
  {
    id: "build",
    category: "PRODUCT + SYSTEMS",
    title: "How I Build",
    question: "How does a vague problem become a testable analytical or product system?",
    flow: ["Frame", "Map", "Ground Data", "Choose Method", "Thin Slice", "Evidence", "Interface"],
    facts: ["Decision first", "Data meaning before method", "Evidence before polish"],
    href: "/notebook/apps/portfolio-masterclasses/build",
  },
  {
    id: "recall",
    category: "MEMORY",
    title: "Rapid Recall",
    question: "How do I recover formulas, distinctions, traps and project flows quickly after learning the full material?",
    flow: ["Search", "Recall", "Compare", "Reconstruct"],
    facts: ["Searchable concepts", "Formula mode", "X vs Y + traps"],
    href: "/notebook/apps/portfolio-masterclasses/recall",
  },
];
