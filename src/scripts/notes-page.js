import {
  loadNotes,
  getNotesData,
  setDayNote,
  setWeekReflection,
  upsertJournalEntry,
  deleteJournalEntry,
  exportNotesBundle,
  importNotesBundle,
  exportNotesMarkdown,
  resetNotesData,
  getExportMeta,
  setExportMeta
} from './notes-storage.js';
import { parseJsonScript, downloadJson } from './runtime/client-utils.js';

const toWeekId = (weekNumber) => `week-${String(Number(weekNumber)).padStart(2, '0')}`;

const downloadText = (filename, payload, mimeType = 'text/plain') => {
  const blob = new Blob([payload], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const buildDayLookup = (weeks) => {
  const lookup = {};
  weeks.forEach((week) => {
    (week.days || []).forEach((day) => {
      lookup[day.id] = {
        ...day,
        weekId: week.id,
        week: week.week,
        phase: week.phase
      };
    });
  });
  return lookup;
};

const applyTab = (tab) => {
  document.querySelectorAll('.js-notes-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tab);
  });

  document.querySelectorAll('.js-notes-panel').forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== tab;
  });
};

const populateDaySelect = (week, select) => {
  const days = week?.days || [];
  select.innerHTML = days
    .map(
      (day) =>
        `<option value="${day.id}">Day ${String(day.day).padStart(2, '0')} - ${day.label || day.session_type}</option>`
    )
    .join('');
};

const renderDayForm = (notes, dayId) => {
  const entry = notes.dayNotes[dayId] || {
    status: 'Not started',
    tags: [],
    notes: '',
    questions: '',
    reflection: ''
  };

  const status = document.querySelector('.js-day-status');
  const tags = document.querySelector('.js-day-tags');
  const notesField = document.querySelector('.js-day-notes');
  const questions = document.querySelector('.js-day-questions');
  const reflection = document.querySelector('.js-day-reflection');

  if (status) status.value = entry.status || 'Not started';
  if (tags) tags.value = (entry.tags || []).join(', ');
  if (notesField) notesField.value = entry.notes || '';
  if (questions) questions.value = entry.questions || '';
  if (reflection) reflection.value = entry.reflection || '';
};

const renderWeekForm = (notes, weekId) => {
  const entry = notes.weekReflections[weekId] || { reflection: '', artifact_link: '' };

  const reflection = document.querySelector('.js-week-reflection-input');
  const artifact = document.querySelector('.js-week-artifact-input');

  if (reflection) reflection.value = entry.reflection || '';
  if (artifact) artifact.value = entry.artifact_link || '';
};

const renderJournalEntries = (notes, stateNode) => {
  const list = document.querySelector('.js-journal-entry-list');
  if (!list) return;

  if (!notes.securityJournalEntries.length) {
    list.innerHTML = '<p class="small">No journal notes yet.</p>';
    return;
  }

  list.innerHTML = notes.securityJournalEntries
    .map(
      (entry) => `
        <article class="card journal-entry-row" data-entry-id="${entry.id}">
          <p class="kicker">${entry.week_ref || 'General'} • ${new Date(entry.createdAt).toISOString().slice(0, 10)}</p>
          <h3>${entry.title || 'Untitled entry'}</h3>
          <p><strong>Source:</strong> ${entry.source || 'n/a'}</p>
          <p><strong>Management summary:</strong> ${entry.management_summary || 'n/a'}</p>
          <p><strong>Prevention ideas:</strong> ${entry.prevention_ideas || 'n/a'}</p>
          <div class="entry-actions">
            <button class="danger js-delete-journal-entry" type="button" data-entry-id="${entry.id}">Delete</button>
          </div>
        </article>
      `
    )
    .join('');

  list.querySelectorAll('.js-delete-journal-entry').forEach((button) => {
    button.addEventListener('click', async () => {
      const entryId = button.dataset.entryId;
      if (!entryId) return;
      const confirmed = window.confirm('Delete this journal entry?');
      if (!confirmed) return;
      await deleteJournalEntry(entryId);
      renderJournalEntries(getNotesData(), stateNode);
      if (stateNode) stateNode.textContent = 'Journal entry deleted.';
    });
  });
};

const boot = async () => {
  await loadNotes();
  const data = parseJsonScript('notes-data-json', { weeks: [] });
  const weeks = data.weeks || [];
  const dayMetaById = buildDayLookup(weeks);

  const stateNode = document.querySelector('.js-notes-state');

  const tabButtons = document.querySelectorAll('.js-notes-tab');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab || 'day';
      applyTab(tab);
      const next = new URL(window.location.href);
      next.searchParams.set('tab', tab);
      window.history.replaceState({}, '', next);
    });
  });

  const search = new URL(window.location.href).searchParams;
  applyTab(search.get('tab') || 'day');

  const dayWeekSelect = document.querySelector('.js-day-week-select');
  const daySelect = document.querySelector('.js-day-select');

  const initialWeek = search.get('week') ? Number(search.get('week')) : weeks[0]?.week;
  const initialWeekId = toWeekId(initialWeek || 1);

  if (dayWeekSelect) {
    dayWeekSelect.value = initialWeekId;
  }

  const findWeek = () => weeks.find((week) => week.id === dayWeekSelect?.value) || weeks[0];

  const syncDayOptions = () => {
    const selectedWeek = findWeek();
    if (!selectedWeek || !daySelect) return;
    populateDaySelect(selectedWeek, daySelect);

    const dayParam = search.get('day');
    const requestedDayId = dayParam
      ? `${selectedWeek.id}-day-${String(Number(dayParam)).padStart(2, '0')}`
      : selectedWeek.days?.[0]?.id;

    const hasRequestedDay = selectedWeek.days?.some((day) => day.id === requestedDayId);
    daySelect.value = hasRequestedDay ? requestedDayId : selectedWeek.days?.[0]?.id;

    renderDayForm(getNotesData(), daySelect.value);

    const weekReflectionSelect = document.querySelector('.js-week-reflection-week');
    if (weekReflectionSelect) {
      weekReflectionSelect.value = selectedWeek.id;
      renderWeekForm(getNotesData(), selectedWeek.id);
    }
  };

  if (dayWeekSelect) {
    dayWeekSelect.addEventListener('change', () => {
      syncDayOptions();
      const selectedWeek = findWeek();
      const next = new URL(window.location.href);
      next.searchParams.set('week', selectedWeek.week);
      window.history.replaceState({}, '', next);
    });
  }

  if (daySelect) {
    daySelect.addEventListener('change', () => {
      renderDayForm(getNotesData(), daySelect.value);
      const marker = String(daySelect.value || '').match(/day-(\d+)/);
      if (marker) {
        const next = new URL(window.location.href);
        next.searchParams.set('day', Number(marker[1]));
        window.history.replaceState({}, '', next);
      }
    });
  }

  syncDayOptions();

  const saveDay = document.querySelector('.js-save-day-note');
  if (saveDay && daySelect) {
    saveDay.addEventListener('click', async () => {
      const dayId = daySelect.value;
      if (!dayId) return;

      await setDayNote(dayId, {
        status: document.querySelector('.js-day-status')?.value || 'Not started',
        tags: document.querySelector('.js-day-tags')?.value || '',
        notes: document.querySelector('.js-day-notes')?.value || '',
        questions: document.querySelector('.js-day-questions')?.value || '',
        reflection: document.querySelector('.js-day-reflection')?.value || ''
      });

      if (stateNode) stateNode.textContent = 'Day note saved.';
    });
  }

  const weekReflectionWeek = document.querySelector('.js-week-reflection-week');
  if (weekReflectionWeek) {
    weekReflectionWeek.addEventListener('change', () => {
      renderWeekForm(getNotesData(), weekReflectionWeek.value);
    });
  }

  const saveWeekReflection = document.querySelector('.js-save-week-reflection');
  if (saveWeekReflection && weekReflectionWeek) {
    saveWeekReflection.addEventListener('click', async () => {
      const weekId = weekReflectionWeek.value;
      await setWeekReflection(weekId, {
        reflection: document.querySelector('.js-week-reflection-input')?.value || '',
        artifact_link: document.querySelector('.js-week-artifact-input')?.value || ''
      });

      if (stateNode) stateNode.textContent = 'Week reflection saved.';
    });
  }

  const journalForm = document.querySelector('.js-journal-entry-form');
  if (journalForm) {
    journalForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const payload = {
        title: document.querySelector('.js-journal-title')?.value || '',
        source: document.querySelector('.js-journal-source')?.value || '',
        technical_summary: document.querySelector('.js-journal-technical')?.value || '',
        management_summary: document.querySelector('.js-journal-management')?.value || '',
        prevention_ideas: document.querySelector('.js-journal-prevention')?.value || '',
        week_ref: document.querySelector('.js-journal-week')?.value || ''
      };

      if (!payload.title && !payload.management_summary && !payload.technical_summary) {
        if (stateNode) stateNode.textContent = 'Add at least a title or summary before saving.';
        return;
      }

      await upsertJournalEntry(payload);
      journalForm.reset();
      renderJournalEntries(getNotesData(), stateNode);
      if (stateNode) stateNode.textContent = 'Security journal note saved.';
    });
  }

  renderJournalEntries(getNotesData(), stateNode);

  const exportMarkdown = document.querySelector('.js-export-notes-md');
  if (exportMarkdown) {
    exportMarkdown.addEventListener('click', async () => {
      const markdown = exportNotesMarkdown({ weeks, dayMetaById });
      const dateToken = new Date().toISOString().slice(0, 10);
      downloadText(`cyber-study-notes-${dateToken}.md`, markdown, 'text/markdown');
      await setExportMeta({ lastMarkdownExportAt: new Date().toISOString() });
      if (stateNode) stateNode.textContent = 'Markdown export complete.';
    });
  }

  const exportJson = document.querySelector('.js-export-notes-json');
  if (exportJson) {
    exportJson.addEventListener('click', async () => {
      downloadJson('cyber-study-notes', exportNotesBundle());
      await setExportMeta({ lastJsonExportAt: new Date().toISOString() });
      if (stateNode) stateNode.textContent = 'JSON export complete.';
    });
  }

  const importInput = document.querySelector('.js-import-notes-json');
  if (importInput) {
    importInput.addEventListener('change', async () => {
      const file = importInput.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        await importNotesBundle(JSON.parse(text));
        syncDayOptions();
        renderJournalEntries(getNotesData(), stateNode);
        if (stateNode) stateNode.textContent = 'Notes JSON imported.';
      } catch (error) {
        if (stateNode) stateNode.textContent = `Import failed: ${error.message}`;
      } finally {
        importInput.value = '';
      }
    });
  }

  const resetButton = document.querySelector('.js-reset-notes');
  if (resetButton) {
    resetButton.addEventListener('click', async () => {
      const confirmed = window.confirm('Reset all local notes data? This cannot be undone.');
      if (!confirmed) return;
      await resetNotesData();
      syncDayOptions();
      renderJournalEntries(getNotesData(), stateNode);
      if (stateNode) stateNode.textContent = 'All notes reset.';
    });
  }

  const exportMeta = getExportMeta();
  const metaTarget = document.querySelector('.js-export-meta');
  if (metaTarget) {
    const markdownDate = exportMeta.lastMarkdownExportAt
      ? exportMeta.lastMarkdownExportAt.slice(0, 10)
      : 'never';
    const jsonDate = exportMeta.lastJsonExportAt ? exportMeta.lastJsonExportAt.slice(0, 10) : 'never';
    metaTarget.textContent = `Last exports - Markdown: ${markdownDate}, JSON: ${jsonDate}`;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
