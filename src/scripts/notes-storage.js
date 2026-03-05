export const NOTES_STORAGE_KEYS = {
  notes: 'cyber-study-notes-v2',
  exportMeta: 'cyber-study-note-export-meta-v1'
};

const nowIso = () => new Date().toISOString();

const defaultNotes = () => ({
  version: 'v2',
  dayNotes: {},
  weekReflections: {},
  securityJournalEntries: [],
  updatedAt: nowIso()
});

const defaultExportMeta = () => ({
  lastMarkdownExportAt: '',
  lastJsonExportAt: '',
  updatedAt: nowIso()
});

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {
    // Ignore malformed values and return fallback.
  }
  return fallback;
};

const loadKey = (key, fallbackFactory) => safeParse(localStorage.getItem(key), fallbackFactory());
const persist = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

const normalizeDayNote = (value = {}) => ({
  status: value.status || 'Not started',
  tags: Array.isArray(value.tags)
    ? value.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : String(value.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
  notes: String(value.notes || ''),
  questions: String(value.questions || ''),
  reflection: String(value.reflection || ''),
  updatedAt: value.updatedAt || nowIso()
});

const normalizeWeekReflection = (value = {}) => ({
  reflection: String(value.reflection || ''),
  artifact_link: String(value.artifact_link || ''),
  updatedAt: value.updatedAt || nowIso()
});

const normalizeJournalEntry = (entry = {}) => ({
  id: String(entry.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
  title: String(entry.title || '').trim(),
  source: String(entry.source || '').trim(),
  technical_summary: String(entry.technical_summary || '').trim(),
  management_summary: String(entry.management_summary || '').trim(),
  prevention_ideas: String(entry.prevention_ideas || '').trim(),
  week_ref: String(entry.week_ref || '').trim(),
  updatedAt: nowIso(),
  createdAt: entry.createdAt || nowIso()
});

export const getNotesData = () => {
  const raw = loadKey(NOTES_STORAGE_KEYS.notes, defaultNotes);

  const dayNotes = {};
  Object.entries(raw.dayNotes || {}).forEach(([key, value]) => {
    dayNotes[key] = normalizeDayNote(value);
  });

  const weekReflections = {};
  Object.entries(raw.weekReflections || {}).forEach(([key, value]) => {
    weekReflections[key] = normalizeWeekReflection(value);
  });

  const securityJournalEntries = Array.isArray(raw.securityJournalEntries)
    ? raw.securityJournalEntries.map((entry) => normalizeJournalEntry(entry))
    : [];

  return {
    ...defaultNotes(),
    ...raw,
    dayNotes,
    weekReflections,
    securityJournalEntries
  };
};

export const saveNotesData = (value) => {
  const normalized = {
    ...defaultNotes(),
    ...value,
    dayNotes: {},
    weekReflections: {},
    securityJournalEntries: [],
    updatedAt: nowIso()
  };

  Object.entries(value.dayNotes || {}).forEach(([key, dayNote]) => {
    normalized.dayNotes[key] = normalizeDayNote(dayNote);
  });

  Object.entries(value.weekReflections || {}).forEach(([key, weekReflection]) => {
    normalized.weekReflections[key] = normalizeWeekReflection(weekReflection);
  });

  normalized.securityJournalEntries = Array.isArray(value.securityJournalEntries)
    ? value.securityJournalEntries.map((entry) => normalizeJournalEntry(entry))
    : [];

  normalized.securityJournalEntries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return persist(NOTES_STORAGE_KEYS.notes, normalized);
};

export const setDayNote = (dayId, payload) => {
  const notes = getNotesData();
  const normalized = normalizeDayNote(payload);

  const hasContent =
    normalized.notes || normalized.questions || normalized.reflection || normalized.tags.length;

  if (!hasContent && normalized.status === 'Not started') {
    delete notes.dayNotes[dayId];
  } else {
    notes.dayNotes[dayId] = normalized;
  }

  return saveNotesData(notes);
};

export const setWeekReflection = (weekId, payload) => {
  const notes = getNotesData();
  const normalized = normalizeWeekReflection(payload);

  if (!normalized.reflection && !normalized.artifact_link) {
    delete notes.weekReflections[weekId];
  } else {
    notes.weekReflections[weekId] = normalized;
  }

  return saveNotesData(notes);
};

export const upsertJournalEntry = (payload) => {
  const notes = getNotesData();
  const normalized = normalizeJournalEntry(payload);

  notes.securityJournalEntries = notes.securityJournalEntries.filter((entry) => entry.id !== normalized.id);
  notes.securityJournalEntries.unshift(normalized);

  return saveNotesData(notes);
};

export const deleteJournalEntry = (entryId) => {
  const notes = getNotesData();
  notes.securityJournalEntries = notes.securityJournalEntries.filter((entry) => entry.id !== entryId);
  return saveNotesData(notes);
};

export const exportNotesBundle = () => ({
  exportedAt: nowIso(),
  version: 'notes-v2',
  notes: getNotesData()
});

export const importNotesBundle = (bundle) => {
  if (!bundle || typeof bundle !== 'object') {
    throw new Error('Invalid JSON payload.');
  }

  if (bundle.notes) {
    saveNotesData(bundle.notes);
    return;
  }

  if (bundle.dayNotes || bundle.weekReflections || bundle.securityJournalEntries) {
    saveNotesData(bundle);
    return;
  }

  throw new Error('Import payload did not include notes data.');
};

export const getExportMeta = () => {
  const raw = loadKey(NOTES_STORAGE_KEYS.exportMeta, defaultExportMeta);
  return {
    ...defaultExportMeta(),
    ...raw
  };
};

export const setExportMeta = (nextValue) => {
  const merged = {
    ...getExportMeta(),
    ...nextValue,
    updatedAt: nowIso()
  };
  return persist(NOTES_STORAGE_KEYS.exportMeta, merged);
};

const markdownEscape = (value) => String(value || '').replace(/\r/g, '');

const sortedKeys = (obj) => Object.keys(obj || {}).sort();

const weekFromDayId = (dayId) => {
  const match = String(dayId || '').match(/week-(\d+)-day-(\d+)/);
  if (!match) return null;
  return {
    week: Number(match[1]),
    day: Number(match[2])
  };
};

export const exportNotesMarkdown = ({ weeks = [], dayMetaById = {} } = {}) => {
  const notes = getNotesData();
  const lines = [];

  lines.push('# Cybersecurity Study Notes');
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);
  lines.push('');
  lines.push('## Overview');
  lines.push('- Program: 32-week cybersecurity roadmap');
  lines.push('- Exported from: local notes tool');
  lines.push('');

  const weekMap = new Map(weeks.map((week) => [week.id, week]));

  const dayKeys = sortedKeys(notes.dayNotes);
  let currentWeek = null;

  for (const dayId of dayKeys) {
    const marker = weekFromDayId(dayId);
    const dayEntry = notes.dayNotes[dayId];
    const meta = dayMetaById[dayId] || {};
    if (!marker) continue;

    const weekId = `week-${String(marker.week).padStart(2, '0')}`;
    const week = weekMap.get(weekId);

    if (currentWeek !== marker.week) {
      currentWeek = marker.week;
      lines.push(`## Week ${marker.week} - ${week?.phase || 'Roadmap Phase'}`);
    }

    lines.push(`### Day ${marker.day} - ${meta.label || 'Study Session'}`);
    lines.push(`**Status:** ${dayEntry.status || 'Not started'}`);
    lines.push(`**Tags:** ${(dayEntry.tags || []).join(', ') || 'none'}`);
    lines.push('');
    lines.push('#### Notes');
    lines.push(markdownEscape(dayEntry.notes) || '_No notes._');
    lines.push('');
    lines.push('#### Questions');
    lines.push(markdownEscape(dayEntry.questions) || '_No questions._');
    lines.push('');
    lines.push('#### Reflection');
    lines.push(markdownEscape(dayEntry.reflection) || '_No reflection._');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  const weekKeys = sortedKeys(notes.weekReflections);
  for (const weekId of weekKeys) {
    const marker = String(weekId).match(/week-(\d+)/);
    const week = weekMap.get(weekId);
    const weekEntry = notes.weekReflections[weekId];

    lines.push(`## Week ${marker ? Number(marker[1]) : weekId} Reflection`);
    lines.push(markdownEscape(weekEntry.reflection) || '_No reflection._');
    if (weekEntry.artifact_link) {
      lines.push('');
      lines.push(`Artifact Link: ${weekEntry.artifact_link}`);
    }
    if (week?.weekly_focus) {
      lines.push('');
      lines.push(`Focus: ${week.weekly_focus}`);
    }
    lines.push('');
  }

  lines.push('## Security Journal');
  if (!notes.securityJournalEntries.length) {
    lines.push('_No security journal entries._');
  } else {
    notes.securityJournalEntries.forEach((entry) => {
      lines.push(`### Entry - ${entry.title || 'Untitled'}`);
      lines.push(`**Source:** ${entry.source || 'n/a'}`);
      lines.push(`**Management Summary:** ${markdownEscape(entry.management_summary) || 'n/a'}`);
      lines.push(`**Prevention Ideas:** ${markdownEscape(entry.prevention_ideas) || 'n/a'}`);
      lines.push('');
      lines.push('#### Technical Summary');
      lines.push(markdownEscape(entry.technical_summary) || '_No technical summary._');
      lines.push('');
    });
  }

  return lines.join('\n').trimEnd() + '\n';
};

export const resetNotesData = () => {
  localStorage.removeItem(NOTES_STORAGE_KEYS.notes);
  localStorage.removeItem(NOTES_STORAGE_KEYS.exportMeta);
};
