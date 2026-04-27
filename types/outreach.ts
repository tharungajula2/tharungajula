export interface NavLink {
    label: string;
    href: string;
}

export interface HeroData {
    label?: string;
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

export interface SoftCTAData {
    headline: string;
    description: string;
    link?: { label: string; href: string };
    contact?: {
        email?: string;
        linkedin?: string;
    };
}


export interface ProfileTrack {
    label: string;
    title: string;
    body: string;
    tags?: string[];
    buttons?: { label: string; href: string }[];
}

export interface OutreachContent {
    id: string;
    company: string;
    hero: HeroData;
    tracks: {
        label: string;
        intro: string;
        items: ProfileTrack[];
    };
    alignment?: AlignmentData;
    softCTA: SoftCTAData;
    projectLinks?: {
        yukti: string;
        quant: string;
        lifeLab: string;
        portfolio: string;
    };
}

