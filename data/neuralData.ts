export interface NeuralNode {
    id: string;
    name: string;
    group: number;
    val: number;
    description?: string;
    link?: string;
}

export interface NeuralLink {
    source: string;
    target: string;
}

export interface NeuralData {
    nodes: NeuralNode[];
    links: NeuralLink[];
}

export const neuralData: NeuralData = {
  nodes: [
    { id: "core", name: "Tharun Gajula", group: 0, val: 25, description: "Builder targeting Founder's Office roles. Works across product, analytics, systems design, and AI prototyping." },
    { id: "analytics", name: "Analytics & Quant", group: 1, val: 15, description: "8 end-to-end analytics projects covering credit risk, neural networks, RL, NLP, time-series, and portfolio theory." },
    { id: "lending", name: "Lending Club", group: 1, val: 8, description: "End-to-end credit risk model. Feature engineering, logistic regression, gradient boosting — raw loans to default probability.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "churn", name: "Bank Churn NN", group: 1, val: 8, description: "Neural network predicting bank customer churn. Feature engineering on transaction patterns, production-ready accuracy.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "retention", name: "Employee Retention", group: 1, val: 7, description: "Predicting which employees leave using logistic regression, decision trees, and random forests. Human capital as a measurable signal.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "socioeconomic", name: "Socio-Economic", group: 1, val: 7, description: "Household classification from noisy survey data. Heavy preprocessing, PCA, SMOTE, and XGBoost.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "twitter", name: "Twitter Sentiment", group: 1, val: 7, description: "Classifying tweet sentiment using NLP preprocessing and ML classifiers. Full pipeline from raw text to prediction.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "cartpole", name: "CartPole RL", group: 1, val: 8, description: "Reinforcement learning on CartPole — 7 algorithms compared. Learned RL by actually implementing it.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "antidiabetic", name: "Antidiabetic Forecast", group: 1, val: 7, description: "Time-series forecasting for medicine demand. SARIMA on real pharmaceutical data with rolling validation.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "nifty", name: "NIFTY 100 Portfolio", group: 1, val: 7, description: "Modern Portfolio Theory on NIFTY 100 stocks. Efficient frontier, Sharpe ratios, risk-return analysis.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "lab90", name: "90-Day Product Lab", group: 2, val: 12, description: "6 concept prototypes built in a 90-day sprint to master the modern AI stack." },
    { id: "trellis", name: "Therapy Matching OS", group: 2, val: 2, description: "Concept prototype: clinical matching engine for therapy. 58 clinical data points, PCOMS integration (ORS/SRS), C-NIP preferences. Matches users to therapists based on alliance probability.", link: "https://therapy-matching-os.vercel.app" },
    { id: "parentshealth", name: "Parents Health OS", group: 2, val: 2, description: "Geriatric care system. 15-question clinical matrix, 175-point health index, AI document synthesis. Privacy-first.", link: "https://parents-health-os.vercel.app" },
    { id: "quantos", name: "Quant OS", group: 2, val: 2, description: "Knowledge graph making the analytics portfolio navigable. 14-pillar architecture as a physics-based 2D map.", link: "https://quant-os.vercel.app" },
    { id: "curiosity", name: "Curiosity OS", group: 2, val: 2, description: "Learning system for teachers. 147-node knowledge graph, 381 connections, 4-wing curriculum, 6-stage loop.", link: "https://curiosity-os.vercel.app" },
    { id: "mila", name: "Relational Matching OS", group: 2, val: 2, description: "Psychology-backed relational matching prototype. 3-layer matching algorithm, 80 MECE profiles, explained matching. Built in 5 days.", link: "https://relational-matching-os.vercel.app" },
    { id: "pause", name: "FMCG Whitespace OS", group: 2, val: 2, description: "FMCG growth framework. Unit economics, protein quality scoring, product-occasion fit with cinematic scroll.", link: "https://fmcg-whitespace-os.vercel.app" },
    { id: "foundation", name: "Foundation", group: 3, val: 12, description: "Institutional experience — how financial products actually work in production, not theory." },
    { id: "jana", name: "Jana Small Finance Bank", group: 3, val: 7, description: "Credit risk analytics across Retail and SME portfolios. Scoring models that cut decisioning turnaround by 30%." },
    { id: "lentra", name: "Lentra AI", group: 3, val: 7, description: "B2B loan origination systems. Translated between what banks needed and what the tech could do across 12+ integrations." },
    { id: "iisc", name: "IISc Bangalore", group: 3, val: 6, description: "Deep Learning programme — 92%. CNNs, RNNs, GANs, reinforcement learning, computer vision." },
    { id: "nibm", name: "NIBM Pune", group: 3, val: 6, description: "PGDM Banking & Finance at an RBI institution. Credit risk, portfolio management, regulatory lending." },
    { id: "adaptive", name: "Adaptive Craft", group: 4, val: 12, description: "Visual design, video, web — whatever the problem needs, learned on the spot. Fills the gap between backend code and the market." },
    { id: "ethos", name: "Ethos Life (Health OS)", group: 5, val: 30, description: "Production-grade PWA. A context-first personal health OS on the Obsidian model. Designed to help users take one small action daily.", link: "https://github.com/tharungajula2/Portfolio" },
  ],
  links: [
    { source: "core", target: "ethos" },
    { source: "core", target: "analytics" },
    { source: "core", target: "lab90" },
    { source: "core", target: "foundation" },
    { source: "core", target: "adaptive" },
    { source: "analytics", target: "lending" },
    { source: "analytics", target: "churn" },
    { source: "analytics", target: "retention" },
    { source: "analytics", target: "socioeconomic" },
    { source: "analytics", target: "twitter" },
    { source: "analytics", target: "cartpole" },
    { source: "analytics", target: "antidiabetic" },
    { source: "analytics", target: "nifty" },
    { source: "lab90", target: "parentshealth" },
    { source: "lab90", target: "quantos" },
    { source: "lab90", target: "curiosity" },
    { source: "lab90", target: "mila" },
    { source: "lab90", target: "pause" },
    { source: "lab90", target: "trellis" },
    { source: "foundation", target: "jana" },
    { source: "foundation", target: "lentra" },
    { source: "foundation", target: "iisc" },
    { source: "foundation", target: "nibm" },
    { source: "lending", target: "jana" },
    { source: "cartpole", target: "iisc" },
    { source: "churn", target: "iisc" },
    { source: "nifty", target: "nibm" },
    { source: "quantos", target: "lending" },
    { source: "quantos", target: "cartpole" },
    { source: "curiosity", target: "quantos" },
  ]
};
