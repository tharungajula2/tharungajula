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
    { id: "core", name: "Tharun Gajula", group: 0, val: 25, description: "AI Product Manager & Zero-to-One Builder. Works at the intersection of fintech product design, analytics, systems workflow architecture, and AI prototyping." },
    { id: "analytics", name: "Analytics & Quant", group: 1, val: 15, description: "8 end-to-end quantitative systems covering credit risk, neural networks, RL, NLP, time-series, and portfolio theory." },
    { id: "lending", name: "Lending Club Classifier", group: 1, val: 8, description: "Feature engineering and probability default modeling using logistic regression and gradient boosting.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "churn", name: "Bank Churn NN", group: 1, val: 8, description: "Predictive neural network modeling customer attrition patterns on retail transaction data.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "retention", name: "Employee Retention", group: 1, val: 7, description: "Attrition risk modeling using logistic regression, decision trees, and random forest classifiers.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "socioeconomic", name: "Socio-Economic Engine", group: 1, val: 7, description: "Household classification from noisy census data incorporating PCA, SMOTE, and XGBoost pipelines.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "twitter", name: "Twitter Sentiment", group: 1, val: 7, description: "NLP text classification pipeline evaluating dynamic sentiment metrics from raw stream text.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "cartpole", name: "CartPole RL Comparison", group: 1, val: 8, description: "Comparative reinforcement learning analysis evaluating 7 discrete policy algorithms.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "antidiabetic", name: "Antidiabetic Forecast", group: 1, val: 7, description: "SARIMA time-series model forecasting pharmaceutical demand pipelines with rolling validation.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "nifty", name: "NIFTY 100 Portfolio", group: 1, val: 7, description: "Modern Portfolio Theory quantitative optimizer structuring efficient frontier risk-return ratios.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "lab90", name: "The 90-Day Lab", group: 2, val: 12, description: "6 functional concept prototypes shipped to master AI orchestration, Next.js interfaces, and dense logical rulesets." },
    { id: "trellis", name: "Therapy Matching OS", group: 2, val: 2, description: "Functional concept prototype: Clinical therapy matching engine mapping ORS/SRS feedback loops and a 58-point clinical alliance matrix.", link: "https://therapy-matching-os.vercel.app" },
    { id: "parentshealth", name: "Parents Health OS", group: 2, val: 2, description: "Functional concept prototype: Geriatric care longevity companion integrating 15-question clinical matrices, 175-point health indices, and RAG document summaries.", link: "https://parents-health-os.vercel.app" },
    { id: "quantos", name: "Quant OS", group: 2, val: 2, description: "Functional concept prototype: Spatial learning environment mapping quantitative models onto a 2D physics-based interactive graph.", link: "https://quant-os.vercel.app" },
    { id: "curiosity", name: "Curiosity OS", group: 2, val: 2, description: "Functional concept prototype: Teacher pedagogy workspace mapping 147 atomic knowledge nodes across 381 semantic connections.", link: "https://curiosity-os.vercel.app" },
    { id: "mila", name: "Relational Matching OS", group: 2, val: 2, description: "Functional concept prototype: High-intent relationship matching utilizing a 3-layer matching algorithm and custom 80 MECE psychology profiles.", link: "https://relational-matching-os.vercel.app" },
    { id: "pause", name: "FMCG Whitespace OS", group: 2, val: 2, description: "Functional concept prototype: FMCG strategic framework mapping P&L waterfalls and occasion fit with cinematic scroll animation.", link: "https://fmcg-whitespace-os.vercel.app" },
    { id: "foundation", name: "Product & Workflows", group: 3, val: 12, description: "Institutional product ownership and workflow architecture in B2B banking systems." },
    { id: "jana", name: "Jana Small Finance Bank", group: 3, val: 7, description: "Internal Product Owner — loan products, credit risk frameworks, and loan product workflows, reducing turnaround time by 30%." },
    { id: "lentra", name: "Lentra AI", group: 3, val: 7, description: "Workflow Architect — managed PRDs and mapped B2B loan origination workflows across 12+ bank integrations." },
    { id: "iisc", name: "IISc Bangalore", group: 3, val: 6, description: "PG Executive Programme in Deep Learning (Grade: 92%) — RNNs, CNNs, Transformers, and Reinforcement Learning." },
    { id: "nibm", name: "NIBM Pune", group: 3, val: 6, description: "PGDM Banking & Finance at an RBI institution — specializing in credit risk management and quantitative analytics." },
    { id: "adaptive", name: "Adaptive Craft", group: 4, val: 12, description: "Translating abstract technical features into premium user journeys, cinematic storytelling walkthroughs, and crisp interfaces." },
    { id: "agentic", name: "Agentic Engineering", group: 5, val: 30, description: "Exploring cognitive architectures, task loops, and multi-agent coordination frameworks through a Product Manager lens.", link: "https://github.com/tharungajula2/Portfolio" },
  ],
  links: [
    { source: "core", target: "agentic" },
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
