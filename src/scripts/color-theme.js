import {
  COLOR_THEME_STORAGE_KEY as STORAGE_KEY,
  allowedColorThemes as THEMES,
  legacyColorThemeMap as LEGACY_THEME_MAP
} from '../lib/theme-options.js';

const normalizeTheme = (theme) => {
  const next = LEGACY_THEME_MAP[theme] || theme;
  return THEMES.includes(next) ? next : 'default';
};

const applyTheme = (theme) => {
  const next = normalizeTheme(theme);
  if (next === 'default') {
    delete document.documentElement.dataset.colorTheme;
    return next;
  }
  document.documentElement.dataset.colorTheme = next;
  return next;
};

const getStoredTheme = () => {
  try {
    return normalizeTheme(localStorage.getItem(STORAGE_KEY) || 'default');
  } catch {
    return 'default';
  }
};

const storeTheme = (theme) => {
  try {
    const next = normalizeTheme(theme);
    if (next === 'default') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
  } catch {
    // Ignore storage errors.
  }
};

const boot = () => {
  const initial = applyTheme(getStoredTheme());

  document.querySelectorAll('.js-color-theme').forEach((select) => {
    select.value = initial;
    select.addEventListener('change', () => {
      const next = applyTheme(select.value);
      storeTheme(next);
      document.querySelectorAll('.js-color-theme').forEach((other) => {
        other.value = next;
      });
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
