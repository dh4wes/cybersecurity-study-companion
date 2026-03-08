import { getProgress, loadProgress, setWeekCompleted } from './progress-storage.js';
import { buildSequentialWeekUnlocks, buildWeekDayIndex, isWeekComplete } from './progress-metrics.js';
import { dispatchProgressChanged, initOnReady, parseJsonScript, PROGRESS_EVENT } from './runtime/client-utils.js';

let weeksData = [];

const updateRoadmapCards = () => {
  const progress = getProgress();
  const completedDaySet = new Set(progress.completedDays || []);
  const completedWeekSet = new Set(progress.completedWeeks || []);
  const indexedWeeks = buildWeekDayIndex(weeksData);
  const weekMap = new Map(indexedWeeks.map((week) => [week.id, week]));
  const unlockByWeekId = buildSequentialWeekUnlocks(weeksData, progress);

  document.querySelectorAll('.js-week-card').forEach((card) => {
    const weekId = card.dataset.weekId;
    const week = weekMap.get(weekId);
    if (!week) return;

    const isComplete = isWeekComplete(week, completedDaySet, completedWeekSet);
    const isUnlocked = unlockByWeekId.get(weekId) ?? week.week === 1;
    card.classList.toggle('is-complete', isComplete);
    card.classList.toggle('is-locked', !isUnlocked);

    const progressLabel = card.querySelector('.js-week-progress');
    if (progressLabel) {
      const actionable = week.days.filter((day) => day.session_type !== 'Rest');
      const completed = actionable.filter((day) => completedDaySet.has(day.id)).length;
      const percent = actionable.length ? Math.round((completed / actionable.length) * 100) : 0;
      progressLabel.textContent = isUnlocked
        ? `Progress: ${completed}/${actionable.length} actionable days (${percent}%).`
        : 'Locked until the previous week is complete.';
    }

    const toggle = card.querySelector('.js-week-complete-toggle');
    if (toggle) {
      toggle.checked = isComplete;
      toggle.disabled = !isUnlocked;
    }

    const openLink = card.querySelector('.js-week-open-link');
    if (openLink) {
      openLink.setAttribute('aria-disabled', String(!isUnlocked));
      openLink.setAttribute('tabindex', isUnlocked ? '0' : '-1');
      if (isUnlocked) {
        openLink.setAttribute('href', week.href || week.slug);
      } else {
        openLink.removeAttribute('href');
      }
    }

    const lockCopy = card.querySelector('.js-week-lock-copy');
    if (lockCopy) {
      lockCopy.hidden = isUnlocked;
    }
  });
};

const initWeekCompletionToggles = () => {
  document.querySelectorAll('.js-week-complete-toggle').forEach((toggle) => {
    toggle.addEventListener('change', async () => {
      const weekId = toggle.dataset.weekId;
      if (!weekId) return;
      if (toggle.disabled) return;
      await setWeekCompleted(weekId, toggle.checked);
      dispatchProgressChanged();
    });
  });
};

const boot = async () => {
  await loadProgress();
  weeksData = parseJsonScript('roadmap-data-json', { weeks: [] }).weeks || [];
  initWeekCompletionToggles();
  updateRoadmapCards();
  window.addEventListener(PROGRESS_EVENT, updateRoadmapCards);
};

initOnReady(boot);
