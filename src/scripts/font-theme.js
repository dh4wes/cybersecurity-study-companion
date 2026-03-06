const STORAGE_KEY = 'cyber-study-typography-theme-v1';
const THEMES = ['default', 'ops-console', 'editor-clean', 'mono-range'];

const normalizeTheme = (theme) => (THEMES.includes(theme) ? theme : 'default');

const applyTheme = (theme) => {
  const next = normalizeTheme(theme);
  if (next === 'default') {
    delete document.documentElement.dataset.fontTheme;
    return next;
  }
  document.documentElement.dataset.fontTheme = next;
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

export const setTypographyTheme = (theme) => {
  const next = applyTheme(theme);
  storeTheme(next);
  document.querySelectorAll('.js-font-theme').forEach((select) => {
    select.value = next;
  });
  return next;
};

const boot = () => {
  const initial = applyTheme(getStoredTheme());
  document.querySelectorAll('.js-font-theme').forEach((select) => {
    select.value = initial;
    select.addEventListener('change', () => {
      setTypographyTheme(select.value);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

if (typeof window !== 'undefined') {
  window.setTypographyTheme = setTypographyTheme;
}
