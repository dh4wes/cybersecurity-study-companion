const includesToken = (value, token) => {
  if (!token) return true;
  const hay = String(value || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
  return hay.includes(token);
};

const applyFilters = () => {
  const search = (document.querySelector('.js-flashcards-search')?.value || '').trim().toLowerCase();
  const phase = document.querySelector('.js-flashcards-phase')?.value || '';
  const week = document.querySelector('.js-flashcards-week')?.value || '';
  const day = document.querySelector('.js-flashcards-day')?.value || '';
  const cardType = document.querySelector('.js-flashcards-type')?.value || '';
  const difficulty = document.querySelector('.js-flashcards-difficulty')?.value || '';

  let visibleCount = 0;

  document.querySelectorAll('.js-flashcard-item').forEach((item) => {
    const question = String(item.dataset.question || '').toLowerCase();
    const answer = String(item.dataset.answer || '').toLowerCase();

    const matches =
      (!search || question.includes(search) || answer.includes(search)) &&
      includesToken(item.dataset.phaseRefs, phase) &&
      includesToken(item.dataset.weekRefs, week) &&
      includesToken(item.dataset.dayRefs, day) &&
      (!cardType || String(item.dataset.cardType || '').toLowerCase() === cardType.toLowerCase()) &&
      (!difficulty ||
        String(item.dataset.difficulty || '').toLowerCase() === difficulty.toLowerCase());

    item.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  const state = document.querySelector('.js-flashcards-filter-state');
  if (state) {
    state.textContent = `${visibleCount} card${visibleCount === 1 ? '' : 's'} shown.`;
  }
};

const boot = () => {
  const controls = document.querySelectorAll(
    '.js-flashcards-search, .js-flashcards-phase, .js-flashcards-week, .js-flashcards-day, .js-flashcards-type, .js-flashcards-difficulty'
  );

  controls.forEach((control) => {
    control.addEventListener('input', applyFilters);
    control.addEventListener('change', applyFilters);
  });

  const reset = document.querySelector('.js-flashcards-reset');
  if (reset) {
    reset.addEventListener('click', () => {
      controls.forEach((control) => {
        control.value = '';
      });
      applyFilters();
    });
  }

  applyFilters();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
