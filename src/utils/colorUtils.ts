import { ColorItem, PaletteHarmony } from '../types';

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function getColorName(hex: string): { ar: string; en: string } {
  const { h, s, l } = hexToHsl(hex);
  
  if (s < 8) {
    if (l > 88) return { ar: 'أبيض ناصع', en: 'Crisp White' };
    if (l < 12) return { ar: 'أسود فاحم', en: 'Obsidian Black' };
    if (l > 55) return { ar: 'فضي لامع', en: 'Platinum Gray' };
    return { ar: 'رمادي حجري', en: 'Stone Gray' };
  }

  // Hue matching
  if (h >= 345 || h < 15) {
    if (l > 75) return { ar: 'وردي ناعم', en: 'Soft Pink' };
    if (l < 35) return { ar: 'أحمر داكن', en: 'Wine Crimson' };
    if (s < 40) return { ar: 'وردي ترابي', en: 'Dusty Rose' };
    return { ar: 'أحمر قرمزي', en: 'Scarlet Red' };
  }
  
  if (h >= 15 && h < 45) {
    if (l < 35) return { ar: 'بني دافئ', en: 'Terracotta Brown' };
    if (l > 75) return { ar: 'خوخي باهت', en: 'Soft Peach' };
    return { ar: 'برتقالي شمسي', en: 'Sunset Orange' };
  }

  if (h >= 45 && h < 70) {
    if (l > 75) return { ar: 'أصفر زبدة', en: 'Cream Yellow' };
    if (l < 45) return { ar: 'عسلي غامق', en: 'Warm Amber' };
    return { ar: 'أصفر ليموني', en: 'Golden Yellow' };
  }

  if (h >= 70 && h < 155) {
    if (l > 75) return { ar: 'أخضر نعناعي', en: 'Soft Mint' };
    if (l < 35) return { ar: 'أخضر غابات', en: 'Forest Green' };
    if (s < 35) return { ar: 'أخضر ميرمية', en: 'Sage Green' };
    return { ar: 'أخضر زمردي', en: 'Emerald Green' };
  }

  if (h >= 155 && h < 195) {
    if (l > 75) return { ar: 'أزرق جليدي', en: 'Ice Blue' };
    if (l < 35) return { ar: 'نيلي غامق', en: 'Dark Teal' };
    return { ar: 'فيروزي مائي', en: 'Nordic Teal' };
  }

  if (h >= 195 && h < 250) {
    if (l > 75) return { ar: 'سماوي رقيق', en: 'Sky Blue' };
    if (l < 35) return { ar: 'كحلي ملكي', en: 'Deep Navy' };
    if (s < 45) return { ar: 'أزرق ضبابي', en: 'Slate Blue' };
    return { ar: 'أزرق زاهي', en: 'Cobalt Blue' };
  }

  if (h >= 250 && h < 295) {
    if (l > 75) return { ar: 'خزامى ناعم', en: 'Lavender Mist' };
    if (l < 35) return { ar: 'بنفسجي ملكي', en: 'Imperial Plum' };
    return { ar: 'أرجواني جذاب', en: 'Vibrant Orchid' };
  }

  // 295 - 345
  if (l > 75) return { ar: 'وردي فاقع', en: 'Cotton Candy' };
  if (s < 45) return { ar: 'توتي كلاسيكي', en: 'Heather Berry' };
  return { ar: 'فوشيا مثير', en: 'Electric Magenta' };
}

// Generate an individual random color with constraints for beautiful output
function getRandomHsl(type: PaletteHarmony, index: number, baseHue: number): { h: number; s: number; l: number } {
  let h = Math.round(Math.random() * 360);
  let s = 70;
  let l = 50;

  switch (type) {
    case 'pastel':
      h = Math.round(Math.random() * 360);
      s = 70 + Math.round(Math.random() * 30); // 70-100 (more saturated)
      l = 80 + Math.round(Math.random() * 10); // 80-90 (high lightness)
      break;

    case 'neon':
      h = Math.round(Math.random() * 360);
      s = 90 + Math.round(Math.random() * 10); // 90-100
      l = 55 + Math.round(Math.random() * 10); // 55-65 (brighter)
      break;

    case 'vintage':
      h = Math.round(Math.random() * 360);
      s = 30 + Math.round(Math.random() * 20); // 30-50
      l = 45 + Math.round(Math.random() * 25); // 45-70
      break;

    case 'warm':
      const warmHues = [350, 10, 25, 40, 50, 340];
      const selectedHue = warmHues[index % warmHues.length];
      h = (selectedHue + Math.round(Math.random() * 20 - 10) + 360) % 360;
      s = 75 + Math.round(Math.random() * 20); // 75-95
      l = 55 + Math.round(Math.random() * 15); // 55-70
      break;

    case 'cool':
      const coolHues = [160, 180, 200, 220, 240, 260];
      const selectedCoolHue = coolHues[index % coolHues.length];
      h = (selectedCoolHue + Math.round(Math.random() * 20 - 10) + 360) % 360;
      s = 70 + Math.round(Math.random() * 25); // 70-95
      l = 50 + Math.round(Math.random() * 20); // 50-70
      break;

    case 'monochromatic':
      h = baseHue;
      s = 60 + Math.round(Math.random() * 30); // 60-90
      l = 20 + (index * 15) + Math.round(Math.random() * 5); // 20, 35, 50, 65, 80
      break;

    case 'complementary':
      if (index < 3) {
        h = baseHue;
        s = 75 + Math.round(Math.random() * 20);
        l = 40 + (index * 15); // 40, 55, 70
      } else {
        h = (baseHue + 180) % 360;
        s = 85;
        l = 45 + (index - 3) * 25; // 45, 70
      }
      break;

    case 'analogous':
      h = (baseHue + (index - 2) * 30 + 360) % 360;
      s = 75 + Math.round(Math.random() * 20);
      l = 50 + Math.round(Math.random() * 20);
      break;

    case 'ocean':
      h = 180 + Math.round(Math.random() * 50); // 180-230
      s = 70 + Math.round(Math.random() * 25);
      l = 30 + (index * 12); // 30, 42, 54, 66, 78
      break;

    case 'sunset':
      const sunHues = [330, 350, 10, 30, 45];
      h = sunHues[index];
      s = 80 + Math.round(Math.random() * 20);
      l = 50 + Math.round(Math.random() * 15);
      break;

    default:
      h = Math.round(Math.random() * 360);
      s = 70 + Math.round(Math.random() * 25);
      l = 45 + Math.round(Math.random() * 25);
  }

  return { h, s, l };
}

export function generateHarmoniousPalette(
  harmony: PaletteHarmony = 'analogous', 
  currentColors?: ColorItem[]
): ColorItem[] {
  // If there are existing colors, check if there's a locked base hue we can extract
  let baseHue = Math.round(Math.random() * 360);
  if (currentColors) {
    const lockedColor = currentColors.find(c => c.locked);
    if (lockedColor) {
      baseHue = hexToHsl(lockedColor.hex).h;
    }
  }

  const newPalette: ColorItem[] = [];

  for (let i = 0; i < 5; i++) {
    // If we have currentColors and this one is locked, retain it
    if (currentColors && currentColors[i] && currentColors[i].locked) {
      newPalette.push(currentColors[i]);
    } else {
      const { h, s, l } = getRandomHsl(harmony, i, baseHue);
      const hex = hslToHex(h, s, l);
      const nameObj = getColorName(hex);
      newPalette.push({
        hex,
        locked: false,
        name: `${nameObj.ar} / ${nameObj.en}`
      });
    }
  }

  return newPalette;
}

// Simple color dictionaries list to pick initial beautiful colors for gradients
export const popularGradients = [
  { nameAr: 'غسق المحيط', nameEn: 'Ocean Dusk', color1: '#12c2e9', color2: '#c471ed', angle: 135 },
  { nameAr: 'شروق أورورا', nameEn: 'Aurora Sunrise', color1: '#FA8BFF', color2: '#2BD2FF', angle: 45 },
  { nameAr: 'نعناع مجمد', nameEn: 'Frozen Mint', color1: '#a8ff78', color2: '#78ffd6', angle: 90 },
  { nameAr: 'توت الغابة', nameEn: 'Wild Berry', color1: '#3a7bd5', color2: '#3a6073', angle: 180 },
  { nameAr: 'نار دافئة', nameEn: 'Warm Flame', color1: '#ff9966', color2: '#ff5e62', angle: 120 },
  { nameAr: 'شفق ملكي', nameEn: 'Royal Twilight', color1: '#f857a6', color2: '#ff5858', angle: 45 },
  { nameAr: 'زمرد عميق', nameEn: 'Deep Emerald', color1: '#0575E6', color2: '#00F260', angle: 135 },
  { nameAr: 'كوزموس بنفسجي', nameEn: 'Cosmic Violet', color1: '#8A2387', color2: '#E94057', angle: 60 }
];
