/**
 * Backward-compat re-export from the canonical Theme.ts
 * Old components that import from '@/constants/theme' will still work.
 */
export * from './Theme';

// Shim for old collapsible/use-theme-color that expect Colors.light / Colors.dark
import { Colors as PingColors } from './Theme';

export const Colors = {
  ...PingColors,
  // legacy shape for old scaffold components
  light: {
    text: PingColors.textPrimary,
    background: PingColors.bgWhite,
    tint: PingColors.brand,
    icon: PingColors.textSecondary,
    tabIconDefault: PingColors.textMuted,
    tabIconSelected: PingColors.brand,
  },
  dark: {
    text: PingColors.textPrimary,
    background: PingColors.bgWhite,
    tint: PingColors.brand,
    icon: PingColors.textSecondary,
    tabIconDefault: PingColors.textMuted,
    tabIconSelected: PingColors.brand,
  },
};

// Shim for Fonts used in old explore.tsx
import { Platform } from 'react-native';
export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: 'normal',
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
