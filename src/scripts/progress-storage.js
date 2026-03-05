export const STORAGE_KEYS = {
  progress: 'cyber-study-progress-v1'
};

const nowIso = () => new Date().toISOString();

const defaultProgress = () => ({
  completedDays: [],
  completedWeeks: [],
  blockedDays: [],
  artifactLinks: {},
  weekReflections: {},
  updatedAt: nowIso()
});

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    // Ignore malformed JSON and reset to fallback.
  }
  return fallback;
};

const loadKey = (key, fallbackFactory) => safeParse(localStorage.getItem(key), fallbackFactory());

const persist = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

const uniqueArray = (items) => [...new Set((items || []).filter(Boolean))];

export const getProgress = () => {
  const raw = loadKey(STORAGE_KEYS.progress, defaultProgress);
  return {
    ...defaultProgress(),
    ...raw,
    completedDays: uniqueArray(raw.completedDays),
    completedWeeks: uniqueArray(raw.completedWeeks),
    blockedDays: uniqueArray(raw.blockedDays),
    artifactLinks: { ...(raw.artifactLinks || {}) },
    weekReflections: { ...(raw.weekReflections || {}) }
  };
};

export const saveProgress = (nextProgress) => {
  const normalized = {
    ...defaultProgress(),
    ...nextProgress,
    completedDays: uniqueArray(nextProgress.completedDays),
    completedWeeks: uniqueArray(nextProgress.completedWeeks),
    blockedDays: uniqueArray(nextProgress.blockedDays),
    artifactLinks: { ...(nextProgress.artifactLinks || {}) },
    weekReflections: { ...(nextProgress.weekReflections || {}) },
    updatedAt: nowIso()
  };

  return persist(STORAGE_KEYS.progress, normalized);
};

export const toggleArrayValue = (arr, value, shouldInclude) => {
  const set = new Set(arr || []);
  if (shouldInclude) set.add(value);
  else set.delete(value);
  return [...set];
};

export const setDayCompleted = (dayId, completed) => {
  const progress = getProgress();
  progress.completedDays = toggleArrayValue(progress.completedDays, dayId, completed);
  if (completed) {
    progress.blockedDays = toggleArrayValue(progress.blockedDays, dayId, false);
  }
  return saveProgress(progress);
};

export const setDayBlocked = (dayId, blocked) => {
  const progress = getProgress();
  progress.blockedDays = toggleArrayValue(progress.blockedDays, dayId, blocked);
  if (blocked) {
    progress.completedDays = toggleArrayValue(progress.completedDays, dayId, false);
  }
  return saveProgress(progress);
};

export const setWeekCompleted = (weekId, completed) => {
  const progress = getProgress();
  progress.completedWeeks = toggleArrayValue(progress.completedWeeks, weekId, completed);
  return saveProgress(progress);
};

export const setWeekReflection = (weekId, reflectionText) => {
  const progress = getProgress();
  if (reflectionText) {
    progress.weekReflections[weekId] = reflectionText;
  } else {
    delete progress.weekReflections[weekId];
  }
  return saveProgress(progress);
};

export const setWeekArtifactLink = (weekId, artifactUrl) => {
  const progress = getProgress();
  if (artifactUrl) {
    progress.artifactLinks[weekId] = artifactUrl;
  } else {
    delete progress.artifactLinks[weekId];
  }
  return saveProgress(progress);
};

export const exportProgressBundle = () => ({
  exportedAt: nowIso(),
  version: 'v1-progress-only',
  progress: getProgress()
});

export const importProgressBundle = (bundle) => {
  if (!bundle || typeof bundle !== 'object') {
    throw new Error('Invalid JSON payload.');
  }

  if (bundle.progress) {
    saveProgress(bundle.progress);
    return;
  }

  // Accept legacy payloads where progress fields were at the root.
  const maybeLegacyProgress = {
    completedDays: bundle.completedDays,
    completedWeeks: bundle.completedWeeks,
    blockedDays: bundle.blockedDays,
    artifactLinks: bundle.artifactLinks,
    weekReflections: bundle.weekReflections
  };

  if (Array.isArray(bundle.completedDays) || Array.isArray(bundle.completedWeeks)) {
    saveProgress(maybeLegacyProgress);
    return;
  }

  throw new Error('Import payload did not include progress data.');
};

export const resetAllProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.progress);
};
