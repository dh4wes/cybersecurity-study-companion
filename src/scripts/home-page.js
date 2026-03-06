import { getProgress, loadProgress } from './progress-storage.js';
import { computeProgressMetrics, formatNextTask } from './progress-metrics.js';
import { initOnReady, parseJsonScript, withBase, PROGRESS_EVENT } from './runtime/client-utils.js';

let homeWeeks = [];

const renderHome = () => {
  const weeks = homeWeeks;
  const progress = getProgress();
  const metrics = computeProgressMetrics(weeks, progress);

  document.querySelectorAll('[data-progress-summary]').forEach((summary) => {
    const studyTarget = summary.querySelector('.js-completed-study');
    const reviewTarget = summary.querySelector('.js-completed-review');
    const weeksTarget = summary.querySelector('.js-completed-weeks');
    const nextTaskTarget = summary.querySelector('.js-next-task');

    if (studyTarget) studyTarget.textContent = String(metrics.completedStudyDays);
    if (reviewTarget) reviewTarget.textContent = String(metrics.completedReviewDays);
    if (weeksTarget) weeksTarget.textContent = String(metrics.completedWeeks);
    if (nextTaskTarget) nextTaskTarget.textContent = formatNextTask(metrics.nextTask);
  });

  const currentWeek = metrics.nextDeliverableWeek || weeks[weeks.length - 1];
  const currentPhaseEl = document.querySelector('.js-current-phase');
  const currentWeekEl = document.querySelector('.js-current-week');
  if (currentPhaseEl && currentWeek) currentPhaseEl.textContent = currentWeek.phase;
  if (currentWeekEl && currentWeek) currentWeekEl.textContent = `Week ${String(currentWeek.week).padStart(2, '0')}`;

  const currentWeekLink = document.querySelector('.js-current-week-link');
  if (currentWeekLink && currentWeek) {
    currentWeekLink.setAttribute('href', currentWeek.href || withBase(currentWeek.slug));
    currentWeekLink.textContent = `Open Week ${String(currentWeek.week).padStart(2, '0')} page`;
  }

  const currentFocus = document.querySelector('.js-current-focus');
  const currentDeliverable = document.querySelector('.js-current-deliverable');
  const currentCheckpoint = document.querySelector('.js-current-checkpoint');
  if (currentFocus && currentWeek) currentFocus.textContent = currentWeek.weekly_focus;
  if (currentDeliverable && currentWeek) currentDeliverable.textContent = currentWeek.deliverable;
  if (currentCheckpoint && currentWeek) currentCheckpoint.textContent = currentWeek.checkpoint;

  const todayLink = document.querySelector('.js-today-link');
  if (todayLink) {
    if (metrics.nextTask) {
      const href = `${metrics.nextTask.week.href || withBase(metrics.nextTask.week.slug)}#${metrics.nextTask.day.id}`;
      todayLink.setAttribute('href', href);
      todayLink.textContent = `Today's study block: Week ${String(metrics.nextTask.week.week).padStart(2, '0')} ${metrics.nextTask.day.label}`;
    } else {
      todayLink.setAttribute('href', withBase('/progress/'));
      todayLink.textContent = 'All tasks complete. Review progress';
    }
  }
};

const boot = async () => {
  await loadProgress();
  homeWeeks = parseJsonScript('home-data-json', { weeks: [] }).weeks || [];
  renderHome();
  window.addEventListener(PROGRESS_EVENT, renderHome);
};

initOnReady(boot);
