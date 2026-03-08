import { getProgress, loadProgress, setWeekCompleted } from './progress-storage.js';
import { dispatchProgressChanged, initOnReady, parseJsonScript, PROGRESS_EVENT } from './runtime/client-utils.js';

let weeksData = [];

const updateRoadmapCards = () => {
  const progress = getProgress();
  const completedDaySet = new Set(progress.completedDays || []);
  const completedWeekSet = new Set(progress.completedWeeks || []);
  const weekMap = new Map(weeksData.map((week) => [week.id, week]));

  document.querySelectorAll('.js-week-card').forEach((card) => {
    const weekId = card.dataset.weekId;
    const week = weekMap.get(weekId);
    if (!week) return;

    const isComplete = completedWeekSet.has(weekId);
    card.classList.toggle('is-complete', isComplete);

    const progressLabel = card.querySelector('.js-week-progress');
    if (progressLabel) {
      const actionable = week.days.filter((day) => day.session_type !== 'Rest');
      const completed = actionable.filter((day) => completedDaySet.has(day.id)).length;
      const percent = actionable.length ? Math.round((completed / actionable.length) * 100) : 0;
      progressLabel.textContent = `Progress: ${completed}/${actionable.length} actionable days (${percent}%).`;
    }

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
  weeksData = parseJsonScript('roadmap-data-json', { weeks: [] }).weeks || [];
  initWeekCompletionToggles();
  updateRoadmapCards();
  window.addEventListener(PROGRESS_EVENT, updateRoadmapCards);
};

initOnReady(boot);
