export interface ColorItem {
  hex: string;
  locked: boolean;
  name: string;
}

export type PaletteHarmony = 
  | 'pastel'
  | 'neon'
  | 'vintage'
  | 'warm'
  | 'cool'
  | 'monochromatic'
  | 'complementary'
  | 'analogous'
  | 'ocean'
  | 'sunset';

export interface SavedPalette {
  id: string;
  colors: string[];
  createdAt: string;
}

export interface SavedGradient {
  id: string;
  color1: string;
  color2: string;
  angle: number;
  name: string;
  createdAt: string;
}
