import { getJournalDrafts, saveJournalDrafts } from './progress-storage.js';
import { downloadJson, parseJsonScript } from './runtime/client-utils.js';

const createEntryId = () => `journal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const sanitize = (value) => String(value || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const entryCardMarkup = (entry, local = false) => {
  const tags = Array.isArray(entry.tags)
    ? entry.tags
    : String(entry.tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

  return `
    <article class="card journal-card" data-tags="${tags.map((tag) => sanitize(tag.toLowerCase())).join('|')}">
      <header class="section-header">
        <div>
          <p class="kicker">${sanitize(entry.date || 'Draft')}</p>
          <h3>${sanitize(entry.sourceName || entry.title || 'Untitled entry')}</h3>
        </div>
        <span class="badge neutral">${sanitize(entry.status || 'Draft')}</span>
      </header>
      ${entry.summary ? `<p><strong>What happened:</strong> ${sanitize(entry.summary)}</p>` : ''}
      ${entry.rootCause ? `<p><strong>Root cause:</strong> ${sanitize(entry.rootCause)}</p>` : ''}
      ${entry.control ? `<p><strong>Control change:</strong> ${sanitize(entry.control)}</p>` : ''}
      <div class="meta">
        ${tags.map((tag) => `<span class="badge accent">${sanitize(tag)}</span>`).join('')}
      </div>
      ${
        entry.sourceUrl
          ? `<p class="small">Source: <a href="${sanitize(entry.sourceUrl)}" target="_blank" rel="noreferrer">${sanitize(entry.sourceUrl)}</a></p>`
          : ''
      }
      ${local ? `<button class="ghost js-delete-entry" data-entry-id="${sanitize(entry.id)}" type="button">Delete draft</button>` : ''}
    </article>
  `;
};

const readForm = () => {
  const tagsRaw = document.querySelector('.js-entry-tags')?.value || '';
  return {
    id: createEntryId(),
    date: document.querySelector('.js-entry-date')?.value || 'Draft',
    sourceName: document.querySelector('.js-entry-source')?.value?.trim() || 'Untitled entry',
    sourceUrl: document.querySelector('.js-entry-source-url')?.value?.trim() || '',
    summary: document.querySelector('.js-entry-summary')?.value?.trim() || '',
    rootCause: document.querySelector('.js-entry-root-cause')?.value?.trim() || '',
    control: document.querySelector('.js-entry-control')?.value?.trim() || '',
    tags: tagsRaw
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    status: document.querySelector('.js-entry-status')?.value || 'Draft'
  };
};

const clearForm = () => {
  document.querySelectorAll('.js-journal-form input, .js-journal-form textarea, .js-journal-form select').forEach((field) => {
    if (field.tagName === 'SELECT') {
      field.selectedIndex = 0;
    } else {
      field.value = '';
    }
  });
};

const applyTagFilter = () => {
  const selectedTag = (document.querySelector('.js-journal-tag-filter')?.value || '').toLowerCase();
  const cards = document.querySelectorAll('.journal-card');
  let visible = 0;

  cards.forEach((card) => {
    const match = !selectedTag || card.dataset.tags.split('|').includes(selectedTag);
    card.hidden = !match;
    if (match) visible += 1;
  });

  const state = document.querySelector('.js-journal-filter-state');
  if (state) {
    state.textContent = `${visible} entr${visible === 1 ? 'y' : 'ies'} shown.`;
  }
};

const renderEntries = () => {
  const data = parseJsonScript('journal-data-json', { seedEntries: [] });
  const seedEntries = data.seedEntries || [];
  const drafts = getJournalDrafts().entries || [];

  const archiveContainer = document.querySelector('.js-journal-entries');
  if (!archiveContainer) return;

  archiveContainer.innerHTML = [
    ...drafts.map((entry) => entryCardMarkup(entry, true)),
    ...seedEntries.map((entry) => entryCardMarkup(entry, false))
  ].join('');

  if (!archiveContainer.innerHTML.trim()) {
    archiveContainer.innerHTML = '<p class="small">No entries yet.</p>';
  }

  archiveContainer.querySelectorAll('.js-delete-entry').forEach((button) => {
    button.addEventListener('click', () => {
      const entryId = button.dataset.entryId;
      const current = getJournalDrafts();
      current.entries = current.entries.filter((entry) => entry.id !== entryId);
      saveJournalDrafts(current);
      renderEntries();
    });
  });

  applyTagFilter();
};

const initForm = () => {
  const form = document.querySelector('.js-journal-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const entry = readForm();

    const drafts = getJournalDrafts();
    drafts.entries = [entry, ...(drafts.entries || [])];
    saveJournalDrafts(drafts);

    const state = document.querySelector('.js-journal-form-state');
    if (state) state.textContent = 'Draft saved locally.';
    clearForm();
    renderEntries();
  });
};

const initTagFilter = () => {
  const filter = document.querySelector('.js-journal-tag-filter');
  if (!filter) return;
  filter.addEventListener('change', applyTagFilter);
};

const exportJournalEntries = () => {
  const data = parseJsonScript('journal-data-json', { seedEntries: [] });
  const seedEntries = data.seedEntries || [];
  const draftEntries = getJournalDrafts().entries || [];

  const payload = {
    exportedAt: new Date().toISOString(),
    version: 'v1',
    draftCount: draftEntries.length,
    seedCount: seedEntries.length,
    drafts: draftEntries,
    seedEntries
  };

  downloadJson('cyber-journal-entries', payload);
};

const initExportControl = () => {
  const exportButton = document.querySelector('.js-export-journal');
  const stateNode = document.querySelector('.js-journal-export-state');
  if (!exportButton) return;

  exportButton.addEventListener('click', () => {
    try {
      exportJournalEntries();
      if (stateNode) stateNode.textContent = 'Journal entries exported as JSON.';
    } catch (error) {
      if (stateNode) stateNode.textContent = `Export failed: ${error.message}`;
    }
  });
};

const boot = () => {
  renderEntries();
  initForm();
  initTagFilter();
  initExportControl();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
