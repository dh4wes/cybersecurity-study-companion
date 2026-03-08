import { getProgress, loadProgress, setWeekCompleted } from './progress-storage.js';
import { dispatchProgressChanged, includesToken, initOnReady, parseJsonScript, PROGRESS_EVENT } from './runtime/client-utils.js';

let weeksData = [];

const applyFilters = () => {
  const cards = [...document.querySelectorAll('.js-week-card')];
  const phase = document.querySelector('.js-filter-phase')?.value || '';
  const week = document.querySelector('.js-filter-week')?.value || '';
  const session = document.querySelector('.js-filter-session')?.value || '';
  const laptop = document.querySelector('.js-filter-laptop')?.value || '';
  const tag = document.querySelector('.js-filter-tag')?.value || '';

  let visibleCount = 0;

  cards.forEach((card) => {
    const match =
      (!phase || card.dataset.phase === phase) &&
      (!week || card.dataset.week === week) &&
      includesToken(card.dataset.sessionTypes, session) &&
      includesToken(card.dataset.laptopNeeds, laptop) &&
      includesToken(card.dataset.taskTags, tag);

    card.hidden = !match;
    if (match) visibleCount += 1;
  });

  const resultText = document.querySelector('.js-filter-results');
  if (resultText) {
    resultText.textContent = `${visibleCount} week${visibleCount === 1 ? '' : 's'} shown.`;
  }
};

const updateWeekProgressLabels = () => {
  const weeks = weeksData;
  const progress = getProgress();
  const completeSet = new Set(progress.completedDays || []);
  const completedWeeks = new Set(progress.completedWeeks || []);

  const weekMap = new Map(weeks.map((week) => [week.id, week]));

  document.querySelectorAll('.js-week-progress').forEach((target) => {
    const weekId = target.dataset.weekId;
    const week = weekMap.get(weekId);
    if (!week) return;

    const actionable = week.days.filter((day) => day.session_type !== 'Rest');
    const completed = actionable.filter((day) => completeSet.has(day.id)).length;
    const percent = actionable.length ? Math.round((completed / actionable.length) * 100) : 0;

    target.textContent = `Progress: ${completed}/${actionable.length} actionable days (${percent}%).`;
  });

  document.querySelectorAll('.js-week-card').forEach((card) => {
    const weekId = card.dataset.weekId;
    const isComplete = completedWeeks.has(weekId);
    card.classList.toggle('is-complete', isComplete);

    const toggle = card.querySelector('.js-week-complete-toggle');
    if (toggle) {
      toggle.checked = isComplete;
    }
  });
};

const initWeekCompletionToggles = () => {
  document.querySelectorAll('.js-week-complete-toggle').forEach((toggle) => {
    toggle.addEventListener('change', async () => {
      const weekId = toggle.dataset.weekId;
      if (!weekId) return;
      await setWeekCompleted(weekId, toggle.checked);
      dispatchProgressChanged();
    });
  });
};

const boot = async () => {
  await loadProgress();
  weeksData = parseJsonScript('weeks-data-json', { weeks: [] }).weeks || [];
  const inputs = document.querySelectorAll(
    '.js-filter-phase, .js-filter-week, .js-filter-session, .js-filter-laptop, .js-filter-tag'
  );

  inputs.forEach((input) => {
    input.addEventListener('change', applyFilters);
  });

  const resetButton = document.querySelector('.js-filter-reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      inputs.forEach((input) => {
        input.value = '';
      });
      applyFilters();
    });
  }

  window.addEventListener(PROGRESS_EVENT, updateWeekProgressLabels);

  initWeekCompletionToggles();
  updateWeekProgressLabels();
  applyFilters();
};

initOnReady(boot);
