import contentModel from '../data/content/study-companion-v2.json';
import glossaryData from '../data/content/glossary.json';
import flashcardsData from '../data/content/flashcards.json';
import workbookEnrichment from '../data/workbook-enrichment.json';
import daySourceLinks from '../data/day-source-links.json';

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const toWeekId = (weekNumber) => `week-${String(weekNumber).padStart(2, '0')}`;
const toDayId = (weekNumber, dayNumber) => `${toWeekId(weekNumber)}-day-${String(dayNumber).padStart(2, '0')}`;

const cleanSlug = (slug) => String(slug || '').trim().replace(/(^\/|\/$)/g, '');
const withBase = (path = '/') => {
  if (!path) return baseUrl;
  const value = String(path);
  if (/^[a-z]+:\/\//i.test(value) || value.startsWith('#')) return value;
  if (value.startsWith(baseUrl)) return value;
  return `${baseUrl}${value.replace(/^\/+/, '')}`;
};

const titleCase = (value) =>
  String(value || '')
    .split('-')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');

const REQUIRED_MODEL_KEYS = [
  'components',
  'process',
  'contrasts_with',
  'common_confusions',
  'exam_traps'
];

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function ensureModelShape(modelMaybe) {
  const model = isPlainObject(modelMaybe) ? { ...modelMaybe } : {};
  for (const key of REQUIRED_MODEL_KEYS) {
    if (!Array.isArray(model[key])) model[key] = [];
    model[key] = model[key].filter((value) => typeof value === 'string').map((value) => value.trim()).filter(Boolean);
  }
  return model;
}

export function normalizeGlossaryEntry(entry) {
  if (!isPlainObject(entry)) return entry;

  const bullets =
    Array.isArray(entry.bullets) && entry.bullets.length === 3 && entry.bullets.every((bullet) => typeof bullet === 'string')
      ? entry.bullets
      : null;

  let definition = typeof entry.definition === 'string' ? entry.definition : '';
  let purpose = typeof entry.purpose === 'string' ? entry.purpose : '';
  let mechanism = typeof entry.mechanism === 'string' ? entry.mechanism : '';

  if (bullets) {
    definition = bullets[0];
    purpose = bullets[1];
    mechanism = bullets[2];
  }

  return {
    ...entry,
    definition,
    purpose,
    mechanism,
    model: ensureModelShape(entry.model),
    bullets: [definition, purpose, mechanism]
  };
}

const canonicalData = {
  site: contentModel.site,
  core_pages: contentModel.core_pages,
  resources: contentModel.resources,
  weeks: contentModel.weeks,
  days: contentModel.days,
  security_journal_prompts: contentModel.security_journal_prompts,
  portfolio_outputs: contentModel.portfolio_outputs,
  review_decks: contentModel.review_decks,
  metadata: contentModel.metadata
};

const dayById = new Map(
  canonicalData.days.map((day) => {
    const normalizedDay = {
      ...day,
      todoList: Array.isArray(day.todo) ? day.todo : String(day.todo || '').split(/\s*;\s*/).filter(Boolean),
      taskTagList: Array.isArray(day.task_mode_tags)
        ? day.task_mode_tags.map((tag) => titleCase(tag))
        : String(day.task_mode_tags || '')
            .split('+')
            .map((tag) => tag.trim())
            .filter(Boolean),
      sourceLinks: daySourceLinks[day.id] || []
    };
    return [day.id, normalizedDay];
  })
);

const portfolioOutputByWeek = new Map(
  canonicalData.portfolio_outputs.map((output) => [Number(output.week), output])
);

const reviewDeckByWeek = new Map(canonicalData.review_decks.map((deck) => [Number(deck.week), deck]));

const weeks = canonicalData.weeks
  .map((week) => {
    const weekNumber = Number(week.week);
    const weekId = week.id || toWeekId(weekNumber);
    const weekDays = (week.day_ids || []).map((dayId) => dayById.get(dayId)).filter(Boolean);
    const portfolio = portfolioOutputByWeek.get(weekNumber);
    const legacySlug = String(week.slug || '').trim() || `/weeks/${weekId}/`;
    const legacySlugPath = cleanSlug(legacySlug);
    const slug = `/weeks/${weekId}/`;
    const slugPath = cleanSlug(slug);

    return {
      ...week,
      id: weekId,
      week: weekNumber,
      slug,
      href: withBase(slug),
      slugPath,
      legacySlug,
      legacyHref: withBase(legacySlug),
      legacySlugPath,
      page: portfolio,
      reviewDeck: reviewDeckByWeek.get(weekNumber),
      days: weekDays,
      glossary_ids: Array.isArray(week.glossary_ids) ? week.glossary_ids : [],
      flashcard_ids: Array.isArray(week.flashcard_ids) ? week.flashcard_ids : []
    };
  })
  .sort((a, b) => a.week - b.week);

const weekBySlugPath = new Map(
  weeks.flatMap((week) => {
    const entries = [[week.slugPath, week]];
    if (week.legacySlugPath && week.legacySlugPath !== week.slugPath) {
      entries.push([week.legacySlugPath, week]);
    }
    return entries;
  })
);
const weekByNumber = new Map(weeks.map((week) => [week.week, week]));
const weekPagesByWeek = new Map(
  canonicalData.portfolio_outputs.map((output) => [Number(output.week), output])
);

const phaseOrder = [...new Set(weeks.map((week) => week.phase))];

const uniquePhases = [...phaseOrder];
const uniqueSessionTypes = [
  ...new Set(weeks.flatMap((week) => week.days.map((day) => day.session_type)))
].sort();
const uniqueLaptopNeeds = [
  ...new Set(weeks.flatMap((week) => week.days.map((day) => day.laptop_needed)))
]
  .filter(Boolean)
  .sort();
const uniqueTaskTags = [
  ...new Set(weeks.flatMap((week) => week.days.flatMap((day) => day.taskTagList)))
].sort();

const groupedWeeksByPhase = uniquePhases.map((phase) => ({
  phase,
  weeks: weeks.filter((week) => week.phase === phase)
}));

const workloadRows = workbookEnrichment.workload_model.filter((row) => {
  const phase = String(row.phase || '').trim();
  return uniquePhases.includes(phase);
});

const journalSeedRows = workbookEnrichment.journal_template.seed_rows || [];
const journalTemplateHeaders = workbookEnrichment.journal_template.headers || [];
const journalSuggestedTags = workbookEnrichment.journal_template.suggested_tags || [];

const securityJournalPrompts = canonicalData.security_journal_prompts || [];

const corePageBySlug = new Map(canonicalData.core_pages.map((page) => [page.slug, page]));

const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
const totalStudyDays = weeks.reduce(
  (sum, week) => sum + week.days.filter((day) => day.session_type === 'Study').length,
  0
);
const totalReviewDays = weeks.reduce(
  (sum, week) => sum + week.days.filter((day) => day.session_type === 'Review').length,
  0
);

const glossaryUsageById = canonicalData.days.reduce((acc, day) => {
  const phase = day.phase || weekByNumber.get(Number(day.week))?.phase || '';
  const week = Number(day.week);

  for (const glossaryId of day.glossary_ids || []) {
    if (!acc.has(glossaryId)) {
      acc.set(glossaryId, {
        phase_refs: new Set(),
        week_refs: new Set(),
        day_refs: new Set()
      });
    }

    const usage = acc.get(glossaryId);
    if (phase) usage.phase_refs.add(phase);
    if (Number.isFinite(week)) usage.week_refs.add(week);
    if (day.id) usage.day_refs.add(day.id);
  }

  return acc;
}, new Map());

const flashcardUsageById = canonicalData.days.reduce((acc, day) => {
  const phase = day.phase || weekByNumber.get(Number(day.week))?.phase || '';
  const week = Number(day.week);

  for (const flashcardId of day.flashcard_ids || []) {
    if (!acc.has(flashcardId)) {
      acc.set(flashcardId, {
        phase_refs: new Set(),
        week_refs: new Set(),
        day_refs: new Set()
      });
    }

    const usage = acc.get(flashcardId);
    if (phase) usage.phase_refs.add(phase);
    if (Number.isFinite(week)) usage.week_refs.add(week);
    if (day.id) usage.day_refs.add(day.id);
  }

  return acc;
}, new Map());

const clientWeeksLite = weeks.map((week) => ({
  id: week.id,
  week: week.week,
  phase: week.phase,
  slug: week.slug,
  href: week.href,
  weekly_focus: week.weekly_focus,
  deliverable: week.deliverable,
  checkpoint: week.checkpoint,
  days: week.days.map((day) => ({
    id: day.id,
    label: day.label,
    session_type: day.session_type,
    laptop_needed: day.laptop_needed,
    taskTagList: day.taskTagList
  }))
}));

const clientWeeksProgress = weeks.map((week) => ({
  id: week.id,
  week: week.week,
  phase: week.phase,
  slug: week.slug,
  href: week.href,
  weekly_focus: week.weekly_focus,
  deliverable: week.deliverable,
  checkpoint: week.checkpoint,
  days: week.days.map((day) => ({
    id: day.id,
    label: day.label,
    session_type: day.session_type,
    laptop_needed: day.laptop_needed,
    taskTagList: day.taskTagList,
    session_objective: day.session_objective
  }))
}));

const glossaryEntries = glossaryData.map((rawEntry) => {
  const entry = normalizeGlossaryEntry(rawEntry);
  const usage = glossaryUsageById.get(entry.id);
  const phase_refs = usage
    ? [...usage.phase_refs].sort((a, b) => phaseOrder.indexOf(a) - phaseOrder.indexOf(b))
    : [];
  const week_refs = usage ? [...usage.week_refs].sort((a, b) => a - b) : [];
  const day_refs = usage ? [...usage.day_refs].sort() : [];

  return {
    ...entry,
    phase_refs,
    week_refs,
    day_refs
  };
});

const glossaryById = new Map(glossaryEntries.map((entry) => [entry.id, entry]));

const flashcardEntries = flashcardsData.map((entry) => {
  const usage = flashcardUsageById.get(entry.id);
  const phase_refs = usage
    ? [...usage.phase_refs].sort((a, b) => phaseOrder.indexOf(a) - phaseOrder.indexOf(b))
    : [];
  const week_refs = usage ? [...usage.week_refs].sort((a, b) => a - b) : [];
  const day_refs = usage ? [...usage.day_refs].sort() : [];

  return {
    ...entry,
    phase_refs,
    week_refs,
    day_refs
  };
});

const flashcardById = new Map(flashcardEntries.map((entry) => [entry.id, entry]));

const glossaryPhaseOptions = [...new Set(glossaryEntries.flatMap((entry) => entry.phase_refs || []))].sort();
const glossaryWeekOptions = [...new Set(glossaryEntries.flatMap((entry) => entry.week_refs || []))].sort(
  (a, b) => a - b
);
const glossaryCategoryOptions = [...new Set(glossaryEntries.map((entry) => entry.category || ''))]
  .filter(Boolean)
  .sort();
const glossaryTagOptions = [];
const glossaryExamOptions = [];

const flashcardPhaseOptions = [...new Set(flashcardEntries.flatMap((card) => card.phase_refs || []))].sort();
const flashcardWeekOptions = [...new Set(flashcardEntries.flatMap((card) => card.week_refs || []))].sort(
  (a, b) => a - b
);
const flashcardDayOptions = [...new Set(flashcardEntries.flatMap((card) => card.day_refs || []))].sort();
const flashcardTypeOptions = [...new Set(flashcardEntries.map((card) => card.type || ''))]
  .filter(Boolean)
  .sort();
const flashcardDifficultyOptions = [...new Set(flashcardEntries.map((card) => card.difficulty || ''))]
  .filter(Boolean)
  .sort();

export {
  canonicalData,
  workbookEnrichment,
  phaseOrder,
  weeks,
  weekByNumber,
  weekBySlugPath,
  weekPagesByWeek,
  groupedWeeksByPhase,
  uniquePhases,
  uniqueSessionTypes,
  uniqueLaptopNeeds,
  uniqueTaskTags,
  workloadRows,
  journalSeedRows,
  journalTemplateHeaders,
  journalSuggestedTags,
  securityJournalPrompts,
  corePageBySlug,
  totalDays,
  totalStudyDays,
  totalReviewDays,
  clientWeeksLite,
  clientWeeksProgress,
  glossaryEntries,
  flashcardEntries,
  glossaryById,
  flashcardById,
  glossaryPhaseOptions,
  glossaryWeekOptions,
  glossaryCategoryOptions,
  glossaryTagOptions,
  glossaryExamOptions,
  flashcardPhaseOptions,
  flashcardWeekOptions,
  flashcardDayOptions,
  flashcardTypeOptions,
  flashcardDifficultyOptions,
  withBase,
  toWeekId,
  toDayId
};
