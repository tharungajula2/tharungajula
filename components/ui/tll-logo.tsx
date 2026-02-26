/**
 * TLL Logo — Custom SVG mark for Tharun Learning Lab.
 *
 * Concept: The three strokes of ⅃ T L form a visual "bracket" around 
 * the central vertical T — reading as both the acronym TLL and evoking 
 * the structural idea of a LAB workbench cross-section.
 *
 * Anatomy (left → right):
 *   ⅃  — Flipped-L (mirrored horizontally): the left bracket / entry wall
 *   T  — Tall vertical + horizontal crossbar: the centrepiece / bench
 *   L  — Standard L: the right closing bracket / exit wall
 *
 * The overall silhouette reads loosely as [_T_], a schematic of a lab 
 * workbench top-view; zoomed out it compresses into the monogram "TLL".
 */

interface TllLogoProps {
    /** Total width of the SVG. Height auto-scales (viewBox 0 0 64 48). */
    size?: number;
    className?: string;
}

export function TllLogo({ size = 40, className = "" }: TllLogoProps) {
    // Grid constants — all coordinates on a 64 × 48 canvas
    const STROKE = 4;       // stroke-width
    const CAP = "square";   // stroke-linecap

    return (
        <svg
            width={size}
            height={size * (48 / 64)}
            viewBox="0 0 64 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="TLL – Tharun Learning Lab logo"
        >
            <defs>
                {/* Cyan → white gradient — the "Disha OS" energy colour */}
                <linearGradient id="tll-grad" x1="0" y1="0" x2="64" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#67e8f9" />   {/* cyan-300 */}
                    <stop offset="100%" stopColor="#ffffff" />  {/* white   */}
                </linearGradient>

                {/* Subtle glow filter */}
                <filter id="tll-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g stroke="url(#tll-grad)" strokeWidth={STROKE} strokeLinecap={CAP} filter="url(#tll-glow)">

                {/* ── ⅃  (Flipped-L / Left bracket) ─────────────────────────────
            Vertical: top-right corner going DOWN on the LEFT side
            Horizontal: foot extends rightward (toward centre)           */}
                <line x1="14" y1="6" x2="14" y2="38" />   {/* vertical stem   */}
                <line x1="14" y1="38" x2="24" y2="38" />   {/* bottom foot →   */}

                {/* ── T (Centre mark) ─────────────────────────────────────────────
            Crossbar spans full width; stem drops to bottom              */}
                <line x1="20" y1="10" x2="44" y2="10" />   {/* crossbar         */}
                <line x1="32" y1="10" x2="32" y2="42" />   {/* vertical stem    */}

                {/* ── L (Standard-L / Right bracket) ─────────────────────────────
            Vertical: drops from top-left on the RIGHT side
            Horizontal: foot extends leftward (toward centre)            */}
                <line x1="50" y1="6" x2="50" y2="38" />   {/* vertical stem    */}
                <line x1="40" y1="38" x2="50" y2="38" />   {/* bottom foot ←    */}

            </g>
        </svg>
    );
}
