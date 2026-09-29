import type { DistrictId } from '../types';

/** One district's lesson, in the Loud Recall cheatsheet format: a surface read and an optional deeper layer. */
export interface Lesson {
  district: DistrictId;
  /** The one idea to carry away, in one bold sentence. */
  idea: string;
  /** Minutes to read the surface layer. */
  minutes: number;
  /** Markdown (GFM tables, inline SVG, ```formula blocks). */
  surface: string;
  deeper: string;
  /** False until checked line by line against primary sources. */
  verified: boolean;
}
