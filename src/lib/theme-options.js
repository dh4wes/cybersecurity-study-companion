export const FONT_THEME_STORAGE_KEY = 'cyber-study-typography-theme-v1';
export const COLOR_THEME_STORAGE_KEY = 'cyber-study-color-theme-v1';

export const fontThemeOptions = [
  { value: 'default', label: 'Default' },
  { value: 'ops-console', label: 'Ops Console' },
  { value: 'editor-clean', label: 'Editor Clean' },
  { value: 'mono-range', label: 'Mono Range' }
];

export const colorThemeOptions = [
  { value: 'default', label: 'Shield Blue' },
  { value: 'banner', label: 'Banner' },
  { value: 'inked', label: 'Charcoal' },
  { value: 'woodland', label: 'Red Acrylic' },
  { value: 'cocoa-topaz-noonday', label: 'Ochre' },
  { value: 'pearl', label: 'Parchment' },
  { value: 'graphite', label: 'Bone' }
];

export const allowedFontThemes = fontThemeOptions.map((option) => option.value);
export const allowedColorThemes = colorThemeOptions.map((option) => option.value);

export const legacyColorThemeMap = {
  'amethyst-mint-harmony': 'graphite',
  sorbet: 'woodland',
  'driftwood-pearl-morning': 'inked',
  'jade-pebble-morning': 'default'
};
