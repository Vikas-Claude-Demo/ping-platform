/**
 * Ping Design System — Fintech Grade
 * Inspired by Wise, PayPal, and Revolut's clean, trustworthy aesthetic
 */

export const Colors = {
  // Core brand
  brand: '#003087',       // Deep navy — authority & trust (PayPal-inspired)
  brandLight: '#0070E0',  // Bright blue — primary CTA
  brandAccent: '#00C2A8', // Teal — success states & money-in

  // Backgrounds
  bgBase: '#F5F7FA',      // Very light cool grey — main background
  bgWhite: '#FFFFFF',     // Pure white for cards
  bgSubtle: '#EEF2F7',    // Subtle dividers / fields

  // Text
  textPrimary: '#0D1421',   // Near-black — headings
  textSecondary: '#4A5568', // Slate grey — labels
  textMuted: '#A0AEBA',     // Light grey — placeholders

  // Semantic
  success: '#00875A',       // Money green — confirmed
  successBg: '#E3FCEF',
  warning: '#FF8B00',       // Amber — pending
  warningBg: '#FFF4E5',
  error: '#DE350B',         // Red — failed
  errorBg: '#FFEBE6',

  // Border
  border: '#DDE3EB',
  borderFocus: '#0070E0',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};

export const Typography = {
  hero: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.5 },
  h1: { fontSize: 24, fontWeight: '700' as const },
  h2: { fontSize: 20, fontWeight: '600' as const },
  h3: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 0.2 },
  caption: { fontSize: 12, fontWeight: '400' as const },
};
