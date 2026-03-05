const includesToken = (value, token) => {
  if (!token) return true;
  const hay = String(value || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
  return hay.includes(token);
};

const applyFilters = () => {
  const search = (document.querySelector('.js-glossary-search')?.value || '').trim().toLowerCase();
  const phase = document.querySelector('.js-glossary-phase')?.value || '';
  const week = document.querySelector('.js-glossary-week')?.value || '';
  const tag = document.querySelector('.js-glossary-tag')?.value || '';
  const exam = document.querySelector('.js-glossary-exam')?.value || '';

  let visibleCount = 0;

  document.querySelectorAll('.js-glossary-item').forEach((item) => {
    const termText = String(item.dataset.termText || '').toLowerCase();
    const definitionText = String(item.dataset.definitionText || '').toLowerCase();

    const matches =
      (!search || termText.includes(search) || definitionText.includes(search)) &&
      includesToken(item.dataset.phaseRefs, phase) &&
      includesToken(item.dataset.weekRefs, week) &&
      includesToken(item.dataset.tags, tag) &&
      (!exam || String(item.dataset.exam || '').toLowerCase() === exam.toLowerCase());

    item.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  const state = document.querySelector('.js-glossary-filter-state');
  if (state) {
    state.textContent = `${visibleCount} term${visibleCount === 1 ? '' : 's'} shown.`;
  }
};

const boot = () => {
  const controls = document.querySelectorAll(
    '.js-glossary-search, .js-glossary-phase, .js-glossary-week, .js-glossary-tag, .js-glossary-exam'
  );
  controls.forEach((control) => {
    control.addEventListener('input', applyFilters);
    control.addEventListener('change', applyFilters);
  });

  const reset = document.querySelector('.js-glossary-reset');
  if (reset) {
    reset.addEventListener('click', () => {
      controls.forEach((control) => {
        if (control.tagName === 'SELECT') {
          control.value = '';
        } else {
          control.value = '';
        }
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
