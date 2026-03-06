import {
  loadProgress,
  getProgress,
  exportProgressBundle,
  importProgressBundle,
  resetAllProgress
} from './progress-storage.js';
import { computeProgressMetrics, formatNextTask } from './progress-metrics.js';
import {
  PROGRESS_EVENT,
  appendChildren,
  clearNode,
  createElement,
  dispatchProgressChanged,
  downloadJson,
  getErrorMessage,
  initOnReady,
  parseJsonScript
} from './runtime/client-utils.js';

let progressWeeks = [];

const createTrack = (percent) => {
  const track = createElement('div', { className: 'track', attrs: { 'aria-hidden': 'true' } });
  const fill = createElement('span');
  fill.style.width = `${percent}%`;
  track.appendChild(fill);
  return track;
};

const renderNextDeliverable = (target, metrics) => {
  if (!target) return;
  clearNode(target);

  if (!metrics.nextDeliverableWeek) {
    target.textContent = 'All week deliverables marked complete.';
    return;
  }

  const week = metrics.nextDeliverableWeek;
  const link = createElement('a', {
    text: `Week ${String(week.week).padStart(2, '0')}`,
    attrs: { href: week.href || week.slug }
  });
  target.appendChild(link);
  target.append(`: ${week.deliverable}`);
};

const renderPhaseProgress = (container, metrics) => {
  if (!container) return;
  clearNode(container);

  metrics.progressByPhase.forEach((phase) => {
    const percent = phase.total ? Math.round((phase.completed / phase.total) * 100) : 0;
    const card = createElement('article', { className: 'card phase-card' });
    appendChildren(card, [
      createElement('h3', { text: phase.phase }),
      createElement('p', { text: `${phase.completed}/${phase.total} actionable days (${percent}%)` }),
      createTrack(percent)
    ]);
    container.appendChild(card);
  });
};

const renderWeekProgress = (container, metrics) => {
  if (!container) return;
  clearNode(container);

  metrics.progressByWeek.forEach((week) => {
    const card = createElement('article', { className: 'card week-row' });
    const kicker = createElement('p', {
      className: 'kicker',
      text: `Week ${String(week.week).padStart(2, '0')} • ${week.phase}`
    });
    const deliverableRow = createElement('p');
    deliverableRow.appendChild(
      createElement('a', {
        text: week.deliverable,
        attrs: { href: week.href || week.slug }
      })
    );
    const meta = createElement('p', {
      className: 'small',
      text: `${week.completed}/${week.total} actionable days complete (${week.percent}%).`
    });

    appendChildren(card, [kicker, deliverableRow, meta, createTrack(week.percent)]);
    container.appendChild(card);
  });
};

const renderBlockedItems = (container, metrics) => {
  if (!container) return;
  clearNode(container);

  if (!metrics.blockedItems.length) {
    container.appendChild(createElement('p', { className: 'small', text: 'No blocked items.' }));
    return;
  }

  metrics.blockedItems.forEach((item) => {
    const row = createElement('li');
    row.appendChild(
      createElement('a', {
        text: item.label,
        attrs: { href: `${item.weekSlug}#${item.dayId}` }
      })
    );
    row.append(` - ${item.objective}`);
    container.appendChild(row);
  });
};

const render = () => {
  const weeks = progressWeeks;

  const progress = getProgress();
  const metrics = computeProgressMetrics(weeks, progress);

  const totalPercent = document.querySelector('.js-total-percent');
  if (totalPercent) totalPercent.textContent = `${metrics.totalPercent}%`;

  const totalBar = document.querySelector('.js-total-bar');
  if (totalBar) totalBar.style.width = `${metrics.totalPercent}%`;

  const nextTaskTarget = document.querySelector('.js-next-task-global');
  if (nextTaskTarget) nextTaskTarget.textContent = formatNextTask(metrics.nextTask);

  const nextDeliverable = document.querySelector('.js-next-deliverable');
  renderNextDeliverable(nextDeliverable, metrics);

  document.querySelectorAll('[data-progress-summary]').forEach((summary) => {
    const studyTarget = summary.querySelector('.js-completed-study');
    const reviewTarget = summary.querySelector('.js-completed-review');
    const weeksTarget = summary.querySelector('.js-completed-weeks');
    const nextTaskSummary = summary.querySelector('.js-next-task');

    if (studyTarget) studyTarget.textContent = String(metrics.completedStudyDays);
    if (reviewTarget) reviewTarget.textContent = String(metrics.completedReviewDays);
    if (weeksTarget) weeksTarget.textContent = String(metrics.completedWeeks);
    if (nextTaskSummary) nextTaskSummary.textContent = formatNextTask(metrics.nextTask);
  });

  renderPhaseProgress(document.querySelector('.js-phase-progress'), metrics);
  renderWeekProgress(document.querySelector('.js-week-progress-list'), metrics);
  renderBlockedItems(document.querySelector('.js-blocked-items'), metrics);
};

const initExportImportControls = () => {
  const stateNode = document.querySelector('.js-import-export-state');

  const exportButton = document.querySelector('.js-export-progress');
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      const bundle = exportProgressBundle();
      downloadJson('cyber-study-progress', bundle);
      if (stateNode) stateNode.textContent = 'Progress exported.';
    });
  }

  const importInput = document.querySelector('.js-import-progress');
  if (importInput) {
    importInput.addEventListener('change', async () => {
      const file = importInput.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        await importProgressBundle(parsed);
        if (stateNode) stateNode.textContent = 'Progress imported.';
        dispatchProgressChanged();
      } catch (error) {
        if (stateNode) stateNode.textContent = `Import failed: ${getErrorMessage(error)}`;
      } finally {
        importInput.value = '';
      }
    });
  }

  const resetButton = document.querySelector('.js-reset-progress');
  if (resetButton) {
    resetButton.addEventListener('click', async () => {
      const confirmed = window.confirm(
        'Reset all progress data from this browser? This cannot be undone.'
      );
      if (!confirmed) return;
      await resetAllProgress();
      if (stateNode) stateNode.textContent = 'Progress reset.';
      dispatchProgressChanged();
    });
  }
};

const boot = async () => {
  await loadProgress();
  progressWeeks = parseJsonScript('progress-data-json', { weeks: [] }).weeks || [];
  render();
  initExportImportControls();
  window.addEventListener(PROGRESS_EVENT, render);
};

initOnReady(boot);
