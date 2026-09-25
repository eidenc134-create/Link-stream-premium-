export type Duration =
  | "1 mes"
  | "3 meses"
  | "6 meses"
  | "9 meses"
  | "12 meses";

export type PriceOption = {
  normal?: number;
  offer?: number;
  offerLabel?: string;
  offerHours?: number;
};

export type ProductPricing = Partial<Record<Duration, PriceOption>>;

export type ComboDiscountRule = {
  platforms: number;
  discount: number;
};

export const durations: Duration[] = [
  "1 mes",
  "3 meses",
  "6 meses",
  "9 meses",
  "12 meses",
];

export const productPricing: Record<string, ProductPricing> = {
  Netflix: {
    "1 mes": { normal: 60 },
    "3 meses": { normal: 160 },
    "6 meses": { normal: 300 },
    "9 meses": { normal: 420 },
    "12 meses": { normal: 520 },
  },

  "Disney+": {
    "1 mes": { normal: 50 },
    "3 meses": { normal: 135 },
    "6 meses": { normal: 250 },
    "9 meses": { normal: 350 },
    "12 meses": { normal: 440 },
  },

  "HBO Max": {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 105 },
    "6 meses": { normal: 200 },
    "9 meses": { normal: 280 },
    "12 meses": { normal: 350 },
  },

  "Paramount+": {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 105 },
    "6 meses": { normal: 200 },
    "9 meses": { normal: 280 },
    "12 meses": { normal: 350 },
  },

  "Prime Video": {
    "1 mes": { normal: 45 },
    "3 meses": { normal: 120 },
    "6 meses": { normal: 220 },
    "9 meses": { normal: 310 },
    "12 meses": { normal: 390 },
  },

  "ViX": {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 105 },
    "6 meses": { normal: 200 },
    "9 meses": { normal: 280 },
    "12 meses": { normal: 350 },
  },

  "Crunchyroll": {
    "1 mes": { normal: 30 },
    "3 meses": { normal: 80 },
    "6 meses": { normal: 150 },
    "9 meses": { normal: 210 },
    "12 meses": { normal: 260 },
  },

  "Apple TV": {
    "1 mes": { normal: 60 },
    "3 meses": { normal: 160 },
    "6 meses": { normal: 300 },
    "9 meses": { normal: 420 },
    "12 meses": { normal: 520 },
  },

  Spotify: {
    "1 mes": { normal: 80 },
    "3 meses": { normal: 210 },
    "6 meses": { normal: 400 },
    "9 meses": { normal: 560 },
    "12 meses": { normal: 700 },
  },

  IPTV: {
    "1 mes": { normal: 50 },
    "3 meses": { normal: 135 },
    "6 meses": { normal: 250 },
    "9 meses": { normal: 350 },
    "12 meses": { normal: 440 },
  },

  "Claro Video": {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 105 },
    "6 meses": { normal: 200 },
    "9 meses": { normal: 280 },
    "12 meses": { normal: 350 },
  },

  MUBI: {
    "1 mes": { normal: 50 },
    "3 meses": { normal: 135 },
    "6 meses": { normal: 250 },
    "9 meses": { normal: 350 },
    "12 meses": { normal: 440 },
  },

  "Universal+": {
    "1 mes": { normal: 50 },
    "3 meses": { normal: 135 },
    "6 meses": { normal: 250 },
    "9 meses": { normal: 350 },
    "12 meses": { normal: 440 },
  },

  Viki: {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 105 },
    "6 meses": { normal: 200 },
    "9 meses": { normal: 280 },
    "12 meses": { normal: 350 },
  },

  DGO: {
    "1 mes": { normal: 70 },
    "3 meses": { normal: 190 },
    "6 meses": { normal: 350 },
    "9 meses": { normal: 490 },
    "12 meses": { normal: 610 },
  },

  ESPN: {
    "1 mes": { normal: 70 },
    "3 meses": { normal: 190 },
    "6 meses": { normal: 350 },
    "9 meses": { normal: 490 },
    "12 meses": { normal: 610 },
  },

  DAZN: {
    "1 mes": { normal: 30 },
    "3 meses": { normal: 90 },
    "6 meses": { normal: 180 },
    "9 meses": { normal: 270 },
    "12 meses": { normal: 360 },
  },

  Xbox: {
    "1 mes": { normal: 50 },
    "3 meses": { normal: 150 },
    "6 meses": { normal: 300 },
    "9 meses": { normal: 450 },
    "12 meses": { normal: 600 },
  },

  PlayStation: {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 120 },
    "6 meses": { normal: 240 },
    "9 meses": { normal: 360 },
    "12 meses": { normal: 480 },
  },

  DramaBox: {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 120 },
    "6 meses": { normal: 240 },
    "9 meses": { normal: 360 },
    "12 meses": { normal: 480 },
  },

  iQIYI: {
    "1 mes": { normal: 45 },
    "3 meses": { normal: 135 },
    "6 meses": { normal: 270 },
    "9 meses": { normal: 405 },
    "12 meses": { normal: 540 },
  },

  WeTV: {
    "1 mes": { normal: 40 },
    "3 meses": { normal: 120 },
    "6 meses": { normal: 240 },
    "9 meses": { normal: 360 },
    "12 meses": { normal: 480 },
  },
};

export const comboDiscountRules: ComboDiscountRule[] = [
  { platforms: 1, discount: 0 },
  { platforms: 2, discount: 0.05 },
  { platforms: 3, discount: 0.10 },
  { platforms: 4, discount: 0.15 },
  { platforms: 5, discount: 0.20 },
  { platforms: 6, discount: 0.22 },
  { platforms: 7, discount: 0.24 },
  { platforms: 8, discount: 0.25 },
];

export function getComboDiscount(platformCount: number): number {
  if (platformCount <= 0) return 0;

  const applicableRule = [...comboDiscountRules]
    .reverse()
    .find((rule) => platformCount >= rule.platforms);

  return applicableRule?.discount ?? 0;
}

export function calculateCustomCombo(
  platforms: string[],
  duration: Duration = "1 mes",
) {
  const uniquePlatforms = [...new Set(platforms)];

  const subtotal = uniquePlatforms.reduce((total, platform) => {
    const price = productPricing[platform]?.[duration]?.normal ?? 0;
    return total + price;
  }, 0);

  const discountRate = getComboDiscount(uniquePlatforms.length);
  const discount = Math.round(subtotal * discountRate);
  const total = subtotal - discount;

  return {
    platforms: uniquePlatforms,
    duration,
    platformCount: uniquePlatforms.length,
    subtotal,
    discountRate,
    discount,
    total,
  };
}
