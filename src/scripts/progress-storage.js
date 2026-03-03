export const STORAGE_KEYS = {
  progress: 'cyber-study-progress-v1',
  notes: 'cyber-study-notes-v1',
  journalDrafts: 'cyber-study-journal-drafts-v1'
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

const defaultNotes = () => ({
  dayNotes: {},
  weekNotes: {},
  updatedAt: nowIso()
});

const defaultJournal = () => ({
  entries: [],
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
  progress.weekReflections[weekId] = reflectionText;
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

export const getNotes = () => {
  const raw = loadKey(STORAGE_KEYS.notes, defaultNotes);
  return {
    ...defaultNotes(),
    ...raw,
    dayNotes: { ...(raw.dayNotes || {}) },
    weekNotes: { ...(raw.weekNotes || {}) }
  };
};

export const saveNotes = (notes) => {
  const normalized = {
    ...defaultNotes(),
    ...notes,
    dayNotes: { ...(notes.dayNotes || {}) },
    weekNotes: { ...(notes.weekNotes || {}) },
    updatedAt: nowIso()
  };
  return persist(STORAGE_KEYS.notes, normalized);
};

export const setDayNote = (dayId, noteText) => {
  const notes = getNotes();
  if (noteText) notes.dayNotes[dayId] = noteText;
  else delete notes.dayNotes[dayId];
  return saveNotes(notes);
};

export const setWeekNote = (weekId, noteText) => {
  const notes = getNotes();
  if (noteText) notes.weekNotes[weekId] = noteText;
  else delete notes.weekNotes[weekId];
  return saveNotes(notes);
};

export const getJournalDrafts = () => {
  const raw = loadKey(STORAGE_KEYS.journalDrafts, defaultJournal);
  return {
    ...defaultJournal(),
    ...raw,
    entries: Array.isArray(raw.entries) ? raw.entries : []
  };
};

export const saveJournalDrafts = (drafts) => {
  const normalized = {
    ...defaultJournal(),
    ...drafts,
    entries: Array.isArray(drafts.entries) ? drafts.entries : [],
    updatedAt: nowIso()
  };
  return persist(STORAGE_KEYS.journalDrafts, normalized);
};

export const addJournalEntry = (entry) => {
  const drafts = getJournalDrafts();
  drafts.entries = [entry, ...drafts.entries];
  return saveJournalDrafts(drafts);
};

export const deleteJournalEntry = (entryId) => {
  const drafts = getJournalDrafts();
  drafts.entries = drafts.entries.filter((entry) => entry.id !== entryId);
  return saveJournalDrafts(drafts);
};

export const exportProgressBundle = () => ({
  exportedAt: nowIso(),
  version: 'v1',
  progress: getProgress(),
  notes: getNotes(),
  journalDrafts: getJournalDrafts()
});

export const importProgressBundle = (bundle) => {
  if (!bundle || typeof bundle !== 'object') {
    throw new Error('Invalid JSON payload.');
  }

  if (bundle.progress) saveProgress(bundle.progress);
  if (bundle.notes) saveNotes(bundle.notes);
  if (bundle.journalDrafts) saveJournalDrafts(bundle.journalDrafts);
};

export const resetAllProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.progress);
  localStorage.removeItem(STORAGE_KEYS.notes);
  localStorage.removeItem(STORAGE_KEYS.journalDrafts);
};
