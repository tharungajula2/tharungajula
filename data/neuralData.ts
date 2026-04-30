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
    // ─── GROUP 0: CORE ───────────────────────────────────
    { id: "core", name: "Tharun Gajula", group: 0, val: 25, description: "A 0-1 Systems Architect and Quantitative Modeler. Transforms high-friction domains into premium, AI-native product moats." },

    // ─── GROUP 1: ANALYTICS & QUANT ──────────────────────
    { id: "analytics", name: "Analytics & Quant", group: 1, val: 15, description: "Clinical-grade quantitative portfolio proving deep fluency in credit-risk math, ML workflow discipline, and statistical model translation." },
    { id: "lending", name: "Lending Club Masterclass", group: 1, val: 8, description: "End-to-end retail credit risk workflow covering PD, LGD, EAD, Expected Loss scorecards, CECL, and stress testing.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "churn", name: "Bank Churn NN", group: 1, val: 8, description: "Neural network classification optimizing the recall-vs-accuracy trade-off for highly imbalanced banking data with SMOTE and dropout." },
    { id: "retention", name: "Employee Retention", group: 1, val: 7, description: "Non-linear behavioral modeling treating human capital as a quantifiable asset using logistic regression, decision trees, and random forests." },
    { id: "socioeconomic", name: "Socio-Economic Classification", group: 1, val: 7, description: "Large-scale tabular data engineering masterclass with PCA, SMOTE, XGBoost, and aggressive preprocessing on noisy real-world data." },
    { id: "twitter", name: "Twitter Sentiment NLP", group: 1, val: 7, description: "Multi-class NLP sentiment classification using TF-IDF/CountVectorizer pipelines and Random Forest with class-wise evaluation." },
    { id: "cartpole", name: "CartPole RL", group: 1, val: 8, description: "Advanced RL masterclass comparing 7 algorithms: REINFORCE, PPO, DQN, Actor-Critic, SAC, and Twin-Q with reward-shaping ablation." },
    { id: "antidiabetic", name: "Antidiabetic Forecast", group: 1, val: 7, description: "Time-series forecasting using STL decomposition, SARIMA model selection, and rolling forecast validation against naive baselines." },
    { id: "nifty", name: "NIFTY 100 Portfolio", group: 1, val: 7, description: "Markowitz portfolio optimization with Monte Carlo simulation, efficient frontier mapping, and Sharpe-ratio maximization on Indian equities." },

    // ─── GROUP 2: PRODUCT OS ─────────────────────────────
    { id: "product", name: "Product OS", group: 2, val: 15, description: "Proprietary, AI-native operating systems that transform complex domain logic into premium, mobile-first product moats." },
    { id: "yukti", name: "Yukti OS", group: 2, val: 8, description: "Context-first geriatric care companion. 15-question clinical matrix, 175-point health index, Gemini-powered document synthesis.", link: "https://yukti-os.vercel.app" },
    { id: "quantos", name: "Quant OS", group: 2, val: 8, description: "Spatial learning environment and quantitative knowledge graph. 14-pillar architecture with physics-based 2D rendering.", link: "https://quant-os.vercel.app" },
    { id: "curiosity", name: "Curiosity OS", group: 2, val: 8, description: "Teacher operating system built on an immutable 147-node knowledge graph with 381 edges and a 6-stage pedagogical loop.", link: "https://curiosity-os.vercel.app" },
    { id: "mila", name: "Mila", group: 2, val: 8, description: "Psychology-backed dating ecosystem with a 3-Layer Matching Algorithm, 80-profile MECE matrix, and anti-engagement Red Lines.", link: "https://meetmila.vercel.app" },
    { id: "pause", name: "Pause", group: 2, val: 7, description: "FMCG/D2C growth framework mapping economic waterfalls, protein quality matrices, and product-occasion fit.", link: "https://pause-lac.vercel.app" },

    // ─── GROUP 3: SYSTEMS FOUNDATION ─────────────────────
    { id: "foundation", name: "Systems Foundation", group: 3, val: 12, description: "Institutional credit-risk foundation, strict validation discipline, and operational architecture." },
    { id: "jana", name: "Jana Small Finance Bank", group: 3, val: 7, description: "Manager — Credit Risk Analytics. SQL/KNIME automation, BCBS 239 governance, scorecard prototyping." },
    { id: "lentra", name: "Lentra AI", group: 3, val: 7, description: "Business Analyst. Loan Origination System coordination, BRD/FRD documentation, API testing." },
    { id: "iisc", name: "IISc Bangalore", group: 3, val: 6, description: "PG Executive Programme in Deep Learning (92%). Reinforcement learning, computer vision, AI applications." },
    { id: "nibm", name: "NIBM Pune", group: 3, val: 6, description: "PGDM Banking & Finance. Credit risk, portfolio management, institutional lending frameworks." },
  ],
  links: [
    // Core → Clusters
    { source: "core", target: "analytics" },
    { source: "core", target: "product" },
    { source: "core", target: "foundation" },

    // Analytics → Projects
    { source: "analytics", target: "lending" },
    { source: "analytics", target: "churn" },
    { source: "analytics", target: "retention" },
    { source: "analytics", target: "socioeconomic" },
    { source: "analytics", target: "twitter" },
    { source: "analytics", target: "cartpole" },
    { source: "analytics", target: "antidiabetic" },
    { source: "analytics", target: "nifty" },

    // Product → Projects
    { source: "product", target: "yukti" },
    { source: "product", target: "quantos" },
    { source: "product", target: "curiosity" },
    { source: "product", target: "mila" },
    { source: "product", target: "pause" },

    // Foundation → Entities
    { source: "foundation", target: "jana" },
    { source: "foundation", target: "lentra" },
    { source: "foundation", target: "iisc" },
    { source: "foundation", target: "nibm" },

    // Cross-Cluster Links (Knowledge Bridges)
    { source: "lending", target: "jana" },        // Credit risk methodology
    { source: "cartpole", target: "iisc" },        // RL from IISc programme
    { source: "churn", target: "iisc" },           // NN from IISc programme
    { source: "nifty", target: "nibm" },           // Finance from NIBM
    { source: "quantos", target: "lending" },      // Quant OS renders credit risk
    { source: "quantos", target: "cartpole" },     // Quant OS renders RL
    { source: "curiosity", target: "quantos" },    // Parallel knowledge graph arch
  ]
};
