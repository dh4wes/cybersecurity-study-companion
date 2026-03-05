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

    return {
      ...week,
      id: weekId,
      week: weekNumber,
      slug: week.slug,
      href: withBase(week.slug),
      slugPath: cleanSlug(week.slug),
      page: portfolio,
      reviewDeck: reviewDeckByWeek.get(weekNumber),
      days: weekDays,
      glossary_ids: Array.isArray(week.glossary_ids) ? week.glossary_ids : [],
      flashcard_ids: Array.isArray(week.flashcard_ids) ? week.flashcard_ids : []
    };
  })
  .sort((a, b) => a.week - b.week);

const weekBySlugPath = new Map(weeks.map((week) => [week.slugPath, week]));
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

const glossaryById = new Map(glossaryData.map((entry) => [entry.id, entry]));
const flashcardById = new Map(flashcardsData.map((entry) => [entry.id, entry]));

const glossaryEntries = glossaryData;
const flashcardEntries = flashcardsData;

const glossaryPhaseOptions = [...new Set(glossaryEntries.flatMap((entry) => entry.phase_refs || []))].sort();
const glossaryWeekOptions = [...new Set(glossaryEntries.flatMap((entry) => entry.week_refs || []))].sort(
  (a, b) => a - b
);
const glossaryTagOptions = [...new Set(glossaryEntries.flatMap((entry) => entry.tags || []))].sort();
const glossaryExamOptions = [...new Set(glossaryEntries.map((entry) => entry.exam_relevance || ''))]
  .filter(Boolean)
  .sort();

const flashcardPhaseOptions = [...new Set(flashcardEntries.flatMap((card) => card.phase_refs || []))].sort();
const flashcardWeekOptions = [...new Set(flashcardEntries.flatMap((card) => card.week_refs || []))].sort(
  (a, b) => a - b
);
const flashcardDayOptions = [...new Set(flashcardEntries.flatMap((card) => card.day_refs || []))].sort();
const flashcardTypeOptions = [...new Set(flashcardEntries.map((card) => card.card_type || ''))]
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
