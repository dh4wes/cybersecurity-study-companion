import {
  loadProgress,
  getProgress,
  setDayCompleted,
  setDayBlocked,
  setWeekCompleted,
  setWeekReflection,
  setWeekArtifactLink
} from './progress-storage.js';
import { buildAnkiTsv, downloadTextFile } from '../lib/anki-export.js';
import { dispatchProgressChanged, getDateToken, initOnReady, parseJsonScript } from './runtime/client-utils.js';

const applyDayVisualState = (card, isComplete, isBlocked) => {
  card.classList.toggle('is-complete', isComplete);
  card.classList.toggle('is-blocked', isBlocked);
};

const pad2 = (value) => String(Number(value) || 0).padStart(2, '0');

const initDayCards = (weekId) => {
  const progress = getProgress();

  const cards = document.querySelectorAll('.js-day-card');

  cards.forEach((card) => {
    const dayId = card.dataset.dayId;
    if (!dayId) return;

    const completeToggle = card.querySelector('.js-complete-toggle');
    const blockedToggle = card.querySelector('.js-block-toggle');
    const stateText = card.querySelector('.js-day-state');

    const isComplete = progress.completedDays.includes(dayId);
    const isBlocked = progress.blockedDays.includes(dayId);

    completeToggle.checked = isComplete;
    blockedToggle.textContent = isBlocked ? 'Unblock day' : 'Mark blocked';

    applyDayVisualState(card, isComplete, isBlocked);

    completeToggle.addEventListener('change', async () => {
      const next = await setDayCompleted(dayId, completeToggle.checked);
      const currentlyBlocked = next.blockedDays.includes(dayId);
      blockedToggle.textContent = currentlyBlocked ? 'Unblock day' : 'Mark blocked';
      applyDayVisualState(card, completeToggle.checked, currentlyBlocked);
      stateText.textContent = completeToggle.checked ? 'Marked complete.' : 'Marked incomplete.';
      dispatchProgressChanged();
    });

    blockedToggle.addEventListener('click', async () => {
      const shouldBlock = !getProgress().blockedDays.includes(dayId);
      const next = await setDayBlocked(dayId, shouldBlock);
      const nowBlocked = next.blockedDays.includes(dayId);
      const nowComplete = next.completedDays.includes(dayId);
      completeToggle.checked = nowComplete;
      blockedToggle.textContent = nowBlocked ? 'Unblock day' : 'Mark blocked';
      applyDayVisualState(card, nowComplete, nowBlocked);
      stateText.textContent = nowBlocked ? 'Day marked blocked.' : 'Day unblocked.';
      dispatchProgressChanged();
    });
  });

  const weekCompleteToggle = document.querySelector('.js-week-complete');
  if (weekCompleteToggle) {
    weekCompleteToggle.checked = progress.completedWeeks.includes(weekId);
    weekCompleteToggle.addEventListener('change', async () => {
      await setWeekCompleted(weekId, weekCompleteToggle.checked);
      const status = document.querySelector('.js-week-complete-state');
      if (status) {
        status.textContent = weekCompleteToggle.checked ? 'Week marked complete.' : 'Week marked incomplete.';
      }
      dispatchProgressChanged();
    });
  }

  const reflection = document.querySelector('.js-week-reflection');
  const saveReflection = document.querySelector('.js-save-reflection');
  const reflectionState = document.querySelector('.js-reflection-state');
  if (reflection && saveReflection) {
    reflection.value = progress.weekReflections[weekId] || '';
    saveReflection.addEventListener('click', async () => {
      await setWeekReflection(weekId, reflection.value.trim());
      reflectionState.textContent = 'Reflection saved.';
      dispatchProgressChanged();
    });
  }

  const artifact = document.querySelector('.js-artifact-url');
  const saveArtifact = document.querySelector('.js-save-artifact');
  const artifactState = document.querySelector('.js-artifact-state');
  if (artifact && saveArtifact) {
    artifact.value = progress.artifactLinks[weekId] || '';
    saveArtifact.addEventListener('click', async () => {
      await setWeekArtifactLink(weekId, artifact.value.trim());
      artifactState.textContent = 'Artifact link saved.';
      dispatchProgressChanged();
    });
  }

};

const initWeekAnkiExport = (weekData) => {
  const weekNumber = Number(weekData.weekNumber);
  const phaseNumber = Number(weekData.phaseNumber) || Math.max(1, Math.ceil(weekNumber / 8));
  const weekCards = Array.isArray(weekData.weekFlashcards) ? weekData.weekFlashcards : [];
  const dayFlashcards = Array.isArray(weekData.dayFlashcards) ? weekData.dayFlashcards : [];
  const dayMap = new Map(dayFlashcards.map((entry) => [entry.dayId, entry]));

  const stateNode = document.querySelector('.js-week-anki-export-state');
  const weekDeckName = `CyberStudy::Phase ${phaseNumber}::Week ${pad2(weekNumber)}`;

  const exportWeekButton = document.querySelector('.js-export-week-anki');
  if (exportWeekButton) {
    exportWeekButton.disabled = weekCards.length === 0;
    exportWeekButton.addEventListener('click', () => {
      if (!weekCards.length) {
        if (stateNode) stateNode.textContent = 'No week flashcards available.';
        return;
      }

      const tsv = buildAnkiTsv({
        cards: weekCards,
        deckBase: 'CyberStudy',
        granularity: 'week',
        includeDayTags: true,
        forceDeckName: weekDeckName,
        forceWeek: weekNumber,
        forcePhaseNumber: phaseNumber
      });

      downloadTextFile({
        filename: `anki-week-${pad2(weekNumber)}-${getDateToken()}.tsv`,
        content: tsv,
        mime: 'text/tab-separated-values;charset=utf-8'
      });

      if (stateNode) {
        stateNode.textContent = `Exported ${weekCards.length} week card${weekCards.length === 1 ? '' : 's'}.`;
      }
    });
  }

  document.querySelectorAll('.js-export-day-anki').forEach((button) => {
    button.addEventListener('click', () => {
      const dayId = button.dataset.dayId;
      if (!dayId) return;

      const dayEntry = dayMap.get(dayId);
      const dayCards = Array.isArray(dayEntry?.cards) ? dayEntry.cards : [];

      if (!dayCards.length) {
        if (stateNode) stateNode.textContent = 'No day flashcards available.';
        return;
      }

      const dayNumber =
        Number(dayEntry?.dayNumber) ||
        Number((/^week-\d+-day-(\d+)$/i.exec(dayId)?.[1] || '').trim()) ||
        0;
      const dayDeckName = `${weekDeckName}::Day ${pad2(dayNumber)}`;

      const tsv = buildAnkiTsv({
        cards: dayCards,
        deckBase: 'CyberStudy',
        granularity: 'week',
        includeDayTags: true,
        forceDeckName: dayDeckName,
        forceWeek: weekNumber,
        forcePhaseNumber: phaseNumber
      });

      downloadTextFile({
        filename: `anki-week-${pad2(weekNumber)}-day-${pad2(dayNumber)}-${getDateToken()}.tsv`,
        content: tsv,
        mime: 'text/tab-separated-values;charset=utf-8'
      });

      if (stateNode) {
        stateNode.textContent = `Exported ${dayCards.length} card${dayCards.length === 1 ? '' : 's'} for Day ${pad2(dayNumber)}.`;
      }
    });
  });
};

const boot = async () => {
  await loadProgress();
  const data = parseJsonScript('week-data-json', {});
  if (!data.weekId) return;
  initDayCards(data.weekId);
  initWeekAnkiExport(data);
};

initOnReady(boot);
