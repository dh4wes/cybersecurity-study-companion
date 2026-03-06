const STORAGE_KEY = 'cyber-study-color-theme-v1';
const THEMES = [
  'default',
  'inked',
  'amethyst-mint-harmony',
  'woodland',
  'jade-pebble-morning',
  'cocoa-topaz-noonday',
  'sorbet',
  'pearl',
  'driftwood-pearl-morning',
  'graphite'
];

const normalizeTheme = (theme) => (THEMES.includes(theme) ? theme : 'default');

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
