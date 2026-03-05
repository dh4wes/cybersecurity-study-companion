import { buildAnkiTsv, downloadTextFile } from '../lib/anki-export.js';
import { getDateToken, includesToken, parseJsonScript } from './runtime/client-utils.js';

const applyFilters = () => {
  const search = (document.querySelector('.js-flashcards-search')?.value || '').trim().toLowerCase();
  const phase = document.querySelector('.js-flashcards-phase')?.value || '';
  const week = document.querySelector('.js-flashcards-week')?.value || '';
  const day = document.querySelector('.js-flashcards-day')?.value || '';
  const cardType = document.querySelector('.js-flashcards-type')?.value || '';
  const difficulty = document.querySelector('.js-flashcards-difficulty')?.value || '';

  let visibleCount = 0;

  document.querySelectorAll('.js-flashcard-item').forEach((item) => {
    const front = String(item.dataset.front || '').toLowerCase();
    const back = String(item.dataset.back || '').toLowerCase();

    const matches =
      (!search || front.includes(search) || back.includes(search)) &&
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

  const visibleExport = document.querySelector('.js-export-anki-visible');
  if (visibleExport) {
    visibleExport.disabled = visibleCount === 0;
  }

  return visibleCount;
};

const getExportSettings = () => ({
  deckBase: document.querySelector('.js-anki-deck-base')?.value || 'CyberStudy',
  granularity: document.querySelector('.js-anki-granularity')?.value || 'week',
  includeDayTags: document.querySelector('.js-anki-include-day-tags')?.checked ?? true
});

const exportCards = ({ cards, filenamePrefix, context, stateNode }) => {
  if (!cards.length) {
    if (stateNode) stateNode.textContent = 'No flashcards available for export.';
    return;
  }

  const settings = getExportSettings();
  const tsv = buildAnkiTsv({
    cards,
    deckBase: settings.deckBase,
    granularity: settings.granularity,
    includeDayTags: settings.includeDayTags,
    weekToPhaseNumber: context.weekToPhaseNumber || {},
    phaseRefToNumber: context.phaseRefToNumber || {}
  });

  downloadTextFile({
    filename: `${filenamePrefix}-${getDateToken()}.tsv`,
    content: tsv,
    mime: 'text/tab-separated-values;charset=utf-8'
  });

  if (stateNode) {
    stateNode.textContent = `Exported ${cards.length} card${cards.length === 1 ? '' : 's'} to TSV.`;
  }
};

const boot = () => {
  const data = parseJsonScript('flashcards-data-json', {
    cards: [],
    weekToPhaseNumber: {},
    phaseRefToNumber: {}
  });

  const cards = Array.isArray(data.cards) ? data.cards : [];
  const cardById = new Map(cards.map((card) => [card.id, card]));
  const stateNode = document.querySelector('.js-anki-export-state');

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

  const exportAll = document.querySelector('.js-export-anki-all');
  if (exportAll) {
    exportAll.addEventListener('click', () => {
      exportCards({
        cards,
        filenamePrefix: 'anki-export-all',
        context: data,
        stateNode
      });
    });
  }

  const exportVisible = document.querySelector('.js-export-anki-visible');
  if (exportVisible) {
    exportVisible.addEventListener('click', () => {
      const visibleCardIds = [...document.querySelectorAll('.js-flashcard-item:not([hidden])')]
        .map((node) => node.dataset.cardId)
        .filter(Boolean);

      const visibleCards = visibleCardIds.map((cardId) => cardById.get(cardId)).filter(Boolean);

      exportCards({
        cards: visibleCards,
        filenamePrefix: 'anki-export-filtered',
        context: data,
        stateNode
      });
    });
  }

  applyFilters();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
