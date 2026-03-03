import {
  getProgress,
  getNotes,
  setDayCompleted,
  setDayBlocked,
  setDayNote,
  setWeekCompleted,
  setWeekReflection,
  setWeekArtifactLink,
  setWeekNote
} from './progress-storage.js';
import { dispatchProgressChanged, parseJsonScript } from './runtime/client-utils.js';

const applyDayVisualState = (card, isComplete, isBlocked) => {
  card.classList.toggle('is-complete', isComplete);
  card.classList.toggle('is-blocked', isBlocked);
};

const initDayCards = (weekId) => {
  const progress = getProgress();
  const notes = getNotes();

  const cards = document.querySelectorAll('.js-day-card');

  cards.forEach((card) => {
    const dayId = card.dataset.dayId;
    if (!dayId) return;

    const completeToggle = card.querySelector('.js-complete-toggle');
    const blockedToggle = card.querySelector('.js-block-toggle');
    const noteField = card.querySelector('.js-note-field');
    const noteSave = card.querySelector('.js-note-save');
    const stateText = card.querySelector('.js-day-state');

    const isComplete = progress.completedDays.includes(dayId);
    const isBlocked = progress.blockedDays.includes(dayId);
    const savedNote = notes.dayNotes[dayId] || '';

    completeToggle.checked = isComplete;
    blockedToggle.textContent = isBlocked ? 'Unblock day' : 'Mark blocked';
    noteField.value = savedNote;

    applyDayVisualState(card, isComplete, isBlocked);

    completeToggle.addEventListener('change', () => {
      const next = setDayCompleted(dayId, completeToggle.checked);
      const currentlyBlocked = next.blockedDays.includes(dayId);
      blockedToggle.textContent = currentlyBlocked ? 'Unblock day' : 'Mark blocked';
      applyDayVisualState(card, completeToggle.checked, currentlyBlocked);
      stateText.textContent = completeToggle.checked ? 'Marked complete.' : 'Marked incomplete.';
      dispatchProgressChanged();
    });

    blockedToggle.addEventListener('click', () => {
      const shouldBlock = !getProgress().blockedDays.includes(dayId);
      const next = setDayBlocked(dayId, shouldBlock);
      const nowBlocked = next.blockedDays.includes(dayId);
      const nowComplete = next.completedDays.includes(dayId);
      completeToggle.checked = nowComplete;
      blockedToggle.textContent = nowBlocked ? 'Unblock day' : 'Mark blocked';
      applyDayVisualState(card, nowComplete, nowBlocked);
      stateText.textContent = nowBlocked ? 'Day marked blocked.' : 'Day unblocked.';
      dispatchProgressChanged();
    });

    noteSave.addEventListener('click', () => {
      setDayNote(dayId, noteField.value.trim());
      stateText.textContent = 'Day note saved.';
    });
  });

  const weekCompleteToggle = document.querySelector('.js-week-complete');
  if (weekCompleteToggle) {
    weekCompleteToggle.checked = progress.completedWeeks.includes(weekId);
    weekCompleteToggle.addEventListener('change', () => {
      setWeekCompleted(weekId, weekCompleteToggle.checked);
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
    saveReflection.addEventListener('click', () => {
      setWeekReflection(weekId, reflection.value.trim());
      reflectionState.textContent = 'Reflection saved.';
      dispatchProgressChanged();
    });
  }

  const artifact = document.querySelector('.js-artifact-url');
  const saveArtifact = document.querySelector('.js-save-artifact');
  const artifactState = document.querySelector('.js-artifact-state');
  if (artifact && saveArtifact) {
    artifact.value = progress.artifactLinks[weekId] || '';
    saveArtifact.addEventListener('click', () => {
      setWeekArtifactLink(weekId, artifact.value.trim());
      artifactState.textContent = 'Artifact link saved.';
      dispatchProgressChanged();
    });
  }

  const weekNotesField = document.querySelector('.js-week-notes-field');
  const weekNotesSave = document.querySelector('.js-save-week-notes');
  const weekNotesState = document.querySelector('.js-week-notes-state');
  if (weekNotesField && weekNotesSave) {
    weekNotesField.value = notes.weekNotes[weekId] || '';
    weekNotesSave.addEventListener('click', () => {
      setWeekNote(weekId, weekNotesField.value.trim());
      weekNotesState.textContent = 'Week notes saved.';
    });
  }
};

const boot = () => {
  const data = parseJsonScript('week-data-json', {});
  if (!data.weekId) return;
  initDayCards(data.weekId);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
