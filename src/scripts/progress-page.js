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
  dispatchProgressChanged,
  downloadJson,
  parseJsonScript
} from './runtime/client-utils.js';

const render = () => {
  const data = parseJsonScript('progress-data-json', { weeks: [] });
  const weeks = data.weeks || [];

  const progress = getProgress();
  const metrics = computeProgressMetrics(weeks, progress);

  const totalPercent = document.querySelector('.js-total-percent');
  if (totalPercent) totalPercent.textContent = `${metrics.totalPercent}%`;

  const totalBar = document.querySelector('.js-total-bar');
  if (totalBar) totalBar.style.width = `${metrics.totalPercent}%`;

  const nextTaskTarget = document.querySelector('.js-next-task-global');
  if (nextTaskTarget) nextTaskTarget.textContent = formatNextTask(metrics.nextTask);

  const nextDeliverable = document.querySelector('.js-next-deliverable');
  if (nextDeliverable) {
    if (metrics.nextDeliverableWeek) {
      const week = metrics.nextDeliverableWeek;
      nextDeliverable.innerHTML = `<a href="${week.href || week.slug}">Week ${String(week.week).padStart(2, '0')}</a>: ${week.deliverable}`;
    } else {
      nextDeliverable.textContent = 'All week deliverables marked complete.';
    }
  }

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

  const phaseContainer = document.querySelector('.js-phase-progress');
  if (phaseContainer) {
    phaseContainer.innerHTML = metrics.progressByPhase
      .map((phase) => {
        const percent = phase.total ? Math.round((phase.completed / phase.total) * 100) : 0;
        return `
          <article class="card phase-card">
            <h3>${phase.phase}</h3>
            <p>${phase.completed}/${phase.total} actionable days (${percent}%)</p>
            <div class="track" aria-hidden="true"><span style="width:${percent}%"></span></div>
          </article>
        `;
      })
      .join('');
  }

  const weekContainer = document.querySelector('.js-week-progress-list');
  if (weekContainer) {
    weekContainer.innerHTML = metrics.progressByWeek
      .map(
        (week) => `
          <article class="card week-row">
            <p class="kicker">Week ${String(week.week).padStart(2, '0')} • ${week.phase}</p>
            <p><a href="${week.href || week.slug}">${week.deliverable}</a></p>
            <p class="small">${week.completed}/${week.total} actionable days complete (${week.percent}%).</p>
            <div class="track" aria-hidden="true"><span style="width:${week.percent}%"></span></div>
          </article>
        `
      )
      .join('');
  }

  const blockedContainer = document.querySelector('.js-blocked-items');
  if (blockedContainer) {
    if (!metrics.blockedItems.length) {
      blockedContainer.innerHTML = '<p class="small">No blocked items.</p>';
    } else {
      blockedContainer.innerHTML = metrics.blockedItems
        .map(
          (item) =>
            `<li><a href="${item.weekSlug}#${item.dayId}">${item.label}</a> - ${item.objective}</li>`
        )
        .join('');
    }
  }
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
        if (stateNode) stateNode.textContent = `Import failed: ${error.message}`;
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
  render();
  initExportImportControls();
  window.addEventListener(PROGRESS_EVENT, render);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
