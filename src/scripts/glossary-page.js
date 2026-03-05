const includesToken = (value, token) => {
  if (!token) return true;
  const hay = String(value || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
  return hay.includes(token);
};

const matchesCategory = (itemCategory, selectedCategory) => {
  if (!selectedCategory) return true;
  return String(itemCategory || '').trim() === String(selectedCategory).trim();
};

const applyFilters = () => {
  const search = (document.querySelector('.js-glossary-search')?.value || '').trim().toLowerCase();
  const category = document.querySelector('.js-glossary-category-filter')?.value || '';
  const phase = document.querySelector('.js-glossary-phase')?.value || '';
  const week = document.querySelector('.js-glossary-week')?.value || '';
  const tag = document.querySelector('.js-glossary-tag')?.value || '';
  const exam = document.querySelector('.js-glossary-exam')?.value || '';

  let visibleCount = 0;

  document.querySelectorAll('.js-glossary-item').forEach((item) => {
    const termText = String(item.dataset.termText || '').toLowerCase();
    const definitionText = String(item.dataset.definitionText || '').toLowerCase();
    const searchText = String(item.dataset.searchText || `${termText} ${definitionText}`).toLowerCase();

    const matches =
      (!search || searchText.includes(search) || termText.includes(search) || definitionText.includes(search)) &&
      matchesCategory(item.dataset.category, category) &&
      includesToken(item.dataset.phaseRefs, phase) &&
      includesToken(item.dataset.weekRefs, week) &&
      includesToken(item.dataset.tags, tag) &&
      (!exam || String(item.dataset.exam || '').toLowerCase() === exam.toLowerCase());

    item.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  let visibleCategoryCount = 0;
  document.querySelectorAll('.js-glossary-category').forEach((section) => {
    const visibleItems = section.querySelectorAll('.js-glossary-item:not([hidden])').length;
    section.hidden = visibleItems === 0;

    const badge = section.querySelector('.js-glossary-category-count');
    if (badge) {
      badge.textContent = String(visibleItems);
    }

    if (visibleItems > 0) {
      visibleCategoryCount += 1;
    }
  });

  const state = document.querySelector('.js-glossary-filter-state');
  if (state) {
    state.textContent = `${visibleCount} term${visibleCount === 1 ? '' : 's'} shown across ${visibleCategoryCount} categor${visibleCategoryCount === 1 ? 'y' : 'ies'}.`;
  }
};

const boot = () => {
  const controls = document.querySelectorAll(
    '.js-glossary-search, .js-glossary-category-filter, .js-glossary-phase, .js-glossary-week, .js-glossary-tag, .js-glossary-exam'
  );

  controls.forEach((control) => {
    control.addEventListener('input', applyFilters);
    control.addEventListener('change', applyFilters);
  });

  const reset = document.querySelector('.js-glossary-reset');
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
