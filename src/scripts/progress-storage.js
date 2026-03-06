export const STORAGE_KEYS = {
  progress: 'cyber-study-progress-v1'
};

import { canUseIdb, delKV, getKV, setKV } from './idb-kv.js';
import { migrationReady } from './storage-migrate.js';

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

const uniqueArray = (items) => [...new Set((items || []).filter(Boolean))];

const normalizeProgress = (raw = {}) => ({
  ...defaultProgress(),
  ...raw,
  completedDays: uniqueArray(raw.completedDays),
  completedWeeks: uniqueArray(raw.completedWeeks),
  blockedDays: uniqueArray(raw.blockedDays),
  artifactLinks: { ...(raw.artifactLinks || {}) },
  weekReflections: { ...(raw.weekReflections || {}) },
  updatedAt: raw.updatedAt || nowIso()
});

let progressState = defaultProgress();
let loadPromise;
let persistPromise = Promise.resolve();

const persistState = async () => {
  if (canUseIdb()) {
    await setKV('progress', progressState);
  } else {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progressState));
  }
  return progressState;
};

export const loadProgress = async () => {
  if (!loadPromise) {
    loadPromise = (async () => {
      await migrationReady.catch(() => false);
      const raw = canUseIdb()
        ? await getKV('progress')
        : safeParse(localStorage.getItem(STORAGE_KEYS.progress), defaultProgress());
      progressState = normalizeProgress(raw || defaultProgress());
      return progressState;
    })();
  }
  return loadPromise;
};

export const getProgressState = () => progressState;
export const getProgress = () => getProgressState();

export const saveProgress = async (nextProgress) => {
  progressState = {
    ...defaultProgress(),
    ...nextProgress,
    completedDays: uniqueArray(nextProgress.completedDays),
    completedWeeks: uniqueArray(nextProgress.completedWeeks),
    blockedDays: uniqueArray(nextProgress.blockedDays),
    artifactLinks: { ...(nextProgress.artifactLinks || {}) },
    weekReflections: { ...(nextProgress.weekReflections || {}) },
    updatedAt: nowIso()
  };

  persistPromise = persistPromise.then(persistState, persistState);
  await persistPromise;
  return progressState;
};

export const toggleArrayValue = (arr, value, shouldInclude) => {
  const set = new Set(arr || []);
  if (shouldInclude) set.add(value);
  else set.delete(value);
  return [...set];
};

export const setDayCompleted = async (dayId, completed) => {
  const progress = getProgress();
  progress.completedDays = toggleArrayValue(progress.completedDays, dayId, completed);
  if (completed) {
    progress.blockedDays = toggleArrayValue(progress.blockedDays, dayId, false);
  }
  return saveProgress(progress);
};

export const setDayBlocked = async (dayId, blocked) => {
  const progress = getProgress();
  progress.blockedDays = toggleArrayValue(progress.blockedDays, dayId, blocked);
  if (blocked) {
    progress.completedDays = toggleArrayValue(progress.completedDays, dayId, false);
  }
  return saveProgress(progress);
};

export const setWeekCompleted = async (weekId, completed) => {
  const progress = getProgress();
  progress.completedWeeks = toggleArrayValue(progress.completedWeeks, weekId, completed);
  return saveProgress(progress);
};

export const setWeekReflection = async (weekId, reflectionText) => {
  const progress = getProgress();
  if (reflectionText) {
    progress.weekReflections[weekId] = reflectionText;
  } else {
    delete progress.weekReflections[weekId];
  }
  return saveProgress(progress);
};

export const setWeekArtifactLink = async (weekId, artifactUrl) => {
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

export const importProgressBundle = async (bundle) => {
  if (!bundle || typeof bundle !== 'object') {
    throw new Error('Invalid JSON payload.');
  }

  if (bundle.progress) {
    await saveProgress(bundle.progress);
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
    await saveProgress(maybeLegacyProgress);
    return;
  }

  throw new Error('Import payload did not include progress data.');
};

export const resetAllProgress = async () => {
  progressState = defaultProgress();
  loadPromise = Promise.resolve(progressState);
  if (canUseIdb()) {
    await delKV('progress');
  }
  localStorage.removeItem(STORAGE_KEYS.progress);
};
