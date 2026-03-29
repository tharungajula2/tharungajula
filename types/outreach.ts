export interface NavLink {
    label: string;
    href: string;
}

export interface HeroData {
    headline: string;
    subheadline: string;
    ctas: { label: string; href: string; variant?: "primary" | "secondary" }[];
}

export interface AlignmentCard {
    title: string;
    description: string;
    icon?: string;
}

export interface AlignmentData {
    title: string;
    leftSide: {
        title: string;
        cards: AlignmentCard[];
    };
    rightSide: {
        title: string;
        cards: AlignmentCard[];
    };
}

export interface ProjectCard {
    title: string;
    description: string;
}

export interface ProjectBridgeData {
    title: string;
    premise: string;
    highlights: ProjectCard[];
    relevance: string;
}

export interface ProofPoint {
    label: string;
    description: string;
    tags?: string[];
}

export interface ProofStackData {
    title: string;
    points: ProofPoint[];
}

export interface OperatingPrinciple {
    title: string;
    description: string;
}

export interface ContributionZone {
    title: string;
    description: string;
}

export interface SoftCTAData {
    headline: string;
    description: string;
    link: { label: string; href: string };
    contact?: {
        email?: string;
        linkedin?: string;
    };
}


export interface OutreachContent {
    id: string;
    company: string;
    hero: HeroData;
    alignment: AlignmentData;
    projectBridge: ProjectBridgeData;
    proofStack: ProofStackData;
    principles: OperatingPrinciple[];
    contributions: ContributionZone[];
    softCTA: SoftCTAData;
    projectLinks?: {
        yukti: string;
        quant: string;
        curiosity: string;
        portfolio: string;
    };
}

