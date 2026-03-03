const STORAGE_KEY = 'cyber-study-font-theme-v1';
const THEMES = ['default', 'help-me', 'digitag', 'jo-wrote-a-lovesong', 'pinkend'];

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

const boot = () => {
  const initial = applyTheme(getStoredTheme());

  document.querySelectorAll('.js-font-theme').forEach((select) => {
    select.value = initial;
    select.addEventListener('change', () => {
      const next = applyTheme(select.value);
      storeTheme(next);
      document.querySelectorAll('.js-font-theme').forEach((other) => {
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
