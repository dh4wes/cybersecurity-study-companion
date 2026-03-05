export const PROGRESS_EVENT = 'cyber-progress-changed';

const ensureTrailingSlash = (value) => String(value || '/').replace(/\/?$/, '/');

const baseUrl = ensureTrailingSlash(import.meta.env.BASE_URL || '/');

export const withBase = (path = '/') => {
  if (!path) return baseUrl;
  if (/^[a-z]+:\/\//i.test(path) || path.startsWith('#')) return path;
  if (path.startsWith(baseUrl)) return path;
  return `${baseUrl}${String(path).replace(/^\/+/, '')}`;
};

export const parseJsonScript = (id, fallback = {}) => {
  const node = document.getElementById(id);
  if (!node) return fallback;

  try {
    return JSON.parse(node.textContent || '{}');
  } catch {
    return fallback;
  }
};

export const includesToken = (value, token) => {
  if (!token) return true;
  const hay = String(value || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
  return hay.includes(token);
};

export const getDateToken = () => new Date().toISOString().slice(0, 10);

export const downloadJson = (filenamePrefix, payload) => {
  const content = JSON.stringify(payload, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateToken = getDateToken();

  link.href = url;
  link.download = `${filenamePrefix}-${dateToken}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const dispatchProgressChanged = () => {
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
};
