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
    { id: "core", name: "Tharun Gajula", group: 0, val: 25, description: "A 0-1 Systems Architect and Quantitative Modeler." },
    { id: "analytics", name: "Analytics & Quant", group: 1, val: 15, description: "Clinical-grade quantitative portfolio proving deep fluency in credit-risk math and ML workflow discipline." },
    { id: "product", name: "Product OS", group: 2, val: 15, description: "Proprietary, AI-native operating systems that transform complex logic into premium, mobile-first product moats." },
    { id: "foundation", name: "Systems Foundation", group: 3, val: 12, description: "Institutional credit-risk foundation, strict validation, and operational architecture." },
    
    // Analytics Projects
    { id: "lending", name: "Lending Club Masterclass", group: 1, val: 8, description: "End-to-end retail credit risk workflow covering PD, LGD, EAD, and Expected Loss scorecards.", link: "https://github.com/tharungajula2/Portfolio" },
    { id: "churn", name: "Bank Churn NN", group: 1, val: 8, description: "Neural network classification focusing explicitly on optimizing the recall-vs-accuracy trade-off for highly imbalanced data." },
    { id: "cartpole", name: "CartPole RL", group: 1, val: 8, description: "Advanced algorithmic intelligence covering REINFORCE, PPO, DQN, and Actor-Critic architectures." },
    
    // Product Projects
    { id: "yukti", name: "Yukti OS", group: 2, val: 8, description: "Context-first geriatric care companion linking daily habit logs to clinical data using an empathetic AI persona.", link: "https://yukti-os.vercel.app" },
    { id: "quantos", name: "Quant OS", group: 2, val: 8, description: "Spatial learning environment and quantitative knowledge graph built on a 2D physics engine.", link: "https://quant-os.vercel.app" },
    { id: "curiosity", name: "Curiosity OS", group: 2, val: 8, description: "Teacher operating system and learning layer built on an immutable 147-node atomic knowledge graph.", link: "https://curiosity-os.vercel.app" },
    { id: "mila", name: "Mila", group: 2, val: 8, description: "Psychology-backed dating ecosystem using a custom 80-profile MECE matrix and 3-Layer Matching Algorithm." }
  ],
  links: [
    { source: "core", target: "analytics" }, { source: "core", target: "product" }, { source: "core", target: "foundation" },
    { source: "analytics", target: "lending" }, { source: "analytics", target: "churn" }, { source: "analytics", target: "cartpole" },
    { source: "product", target: "yukti" }, { source: "product", target: "quantos" }, { source: "product", target: "curiosity" }, { source: "product", target: "mila" }
  ]
};
