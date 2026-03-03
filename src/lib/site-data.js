import canonicalData from '../../cybersecurity_study_companion_data.json';
import workbookEnrichment from '../data/workbook-enrichment.json';

const phaseOrder = ['Foundation', 'Networking', 'Security', 'GRC / Application', 'Buffer / Final Review'];
const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

const toWeekId = (weekNumber) => `week-${String(weekNumber).padStart(2, '0')}`;
const toDayId = (weekNumber, dayNumber) => `${toWeekId(weekNumber)}-day-${String(dayNumber).padStart(2, '0')}`;

const cleanSlug = (slug) => slug.trim().replace(/(^\/|\/$)/g, '');
const withBase = (path = '/') => {
  if (!path) return baseUrl;
  const value = String(path);
  if (/^[a-z]+:\/\//i.test(value) || value.startsWith('#')) return value;
  if (value.startsWith(baseUrl)) return value;
  return `${baseUrl}${value.replace(/^\/+/, '')}`;
};

const weekPagesByWeek = new Map(canonicalData.week_pages.map((page) => [Number(page.week), page]));

const weeks = canonicalData.weeks.map((week) => {
  const weekNumber = Number(week.week);
  const weekId = toWeekId(weekNumber);
  const weekPage = weekPagesByWeek.get(weekNumber);
  const checkpoint =
    workbookEnrichment.checkpoints_by_week[weekId] ||
    weekPage?.portfolio_angle ||
    week.days.find((day) => day.session_type === 'Review')?.deliverable_or_checkpoint ||
    '';
  const slug = weekPage?.slug || `/weeks/${weekId}/`;

  return {
    ...week,
    week: weekNumber,
    id: weekId,
    checkpoint,
    page: weekPage,
    slug,
    href: withBase(slug),
    slugPath: cleanSlug(slug),
    days: week.days.map((day) => ({
      ...day,
      day: Number(day.day),
      id: toDayId(weekNumber, Number(day.day)),
      phase: week.phase,
      taskTagList: String(day.task_mode_tags || '')
        .split('+')
        .map((tag) => tag.trim())
        .filter(Boolean)
    }))
  };
});

const weekBySlugPath = new Map(weeks.map((week) => [week.slugPath, week]));
const weekByNumber = new Map(weeks.map((week) => [week.week, week]));

const uniquePhases = phaseOrder.filter((phase) => weeks.some((week) => week.phase === phase));
const uniqueSessionTypes = [...new Set(weeks.flatMap((week) => week.days.map((day) => day.session_type)))].sort();
const uniqueLaptopNeeds = [...new Set(weeks.flatMap((week) => week.days.map((day) => day.laptop_needed)))].sort();
const uniqueTaskTags = [...new Set(weeks.flatMap((week) => week.days.flatMap((day) => day.taskTagList)))].sort();

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

const corePageBySlug = new Map(canonicalData.core_pages.map((page) => [page.slug, page]));

const totalDays = weeks.reduce((sum, week) => sum + week.days.length, 0);
const totalStudyDays = weeks.reduce((sum, week) => sum + week.days.filter((day) => day.session_type === 'Study').length, 0);
const totalReviewDays = weeks.reduce((sum, week) => sum + week.days.filter((day) => day.session_type === 'Review').length, 0);
const clientWeeks = weeks.map((week) => ({
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
  corePageBySlug,
  totalDays,
  totalStudyDays,
  totalReviewDays,
  clientWeeks,
  withBase,
  toWeekId,
  toDayId
};
