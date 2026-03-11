import {
  getProgress,
  loadProgress,
  setDayBlocked,
  setDayCompleted
} from './progress-storage.js';
import { getCurrentLecture } from '../lib/current-lecture.js';
import {
  PROGRESS_EVENT,
  appendChildren,
  clearNode,
  createElement,
  dispatchProgressChanged,
  getErrorMessage,
  initOnReady,
  parseJsonScript
} from './runtime/client-utils.js';

let lectureDays = [];
let lecturesByDayId = {};
let glossaryById = {};
let routes = {};

const selectors = {
  root: '.js-lecture-root',
  loading: '.js-lecture-loading',
  status: '.js-lecture-status'
};

const splitParagraphs = (text = '') =>
  String(text || '')
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

const notesHrefForDay = (day) => `${routes.notesBase}?week=${day.week}&day=${day.day}&tab=day`;

const setStatus = (message = '', tone = 'neutral') => {
  const node = document.querySelector(selectors.status);
  if (!node) return;
  node.textContent = message;
  node.dataset.tone = tone;
  node.hidden = !message;
};

const renderTextSection = (title, text) => {
  const section = createElement('section', { className: 'lecture-section' });
  appendChildren(section, [
    createElement('h2', { text: title }),
    ...splitParagraphs(text).map((paragraph) => createElement('p', { text: paragraph }))
  ]);
  return section;
};

const renderListSection = (title, items = []) => {
  const section = createElement('section', { className: 'lecture-section' });
  const list = createElement('ul', { className: 'lecture-list' });
  appendChildren(
    list,
    (items || []).map((item) => createElement('li', { text: item }))
  );
  appendChildren(section, [createElement('h2', { text: title }), list]);
  return section;
};

const renderLectureBody = (lecture) => {
  const section = createElement('section', { className: 'lecture-section lecture-prose' });
  appendChildren(section, [
    createElement('h2', { text: 'Lecture' }),
    ...splitParagraphs(lecture.mini_lecture_markdown).map((paragraph) => createElement('p', { text: paragraph }))
  ]);
  return section;
};

const renderExamPanel = (lecture, day) => {
  const section = createElement('section', { className: 'lecture-section lecture-side-panel' });
  const meta = createElement('div', { className: 'lecture-meta-stack' });
  appendChildren(meta, [
    createElement('p', { className: 'lecture-mini-kicker', text: 'Primary track' }),
    createElement('p', { className: 'lecture-compact-strong', text: lecture.primary_exam }),
    lecture.secondary_exam ? createElement('p', { className: 'lecture-mini-kicker', text: 'Secondary track' }) : null,
    lecture.secondary_exam ? createElement('p', { text: lecture.secondary_exam }) : null,
    createElement('p', { className: 'lecture-mini-kicker', text: 'Competency area' }),
    createElement('p', { text: `${day.phase} • ${lecture.objective}` })
  ]);

  appendChildren(section, [
    createElement('h2', { text: 'Exam relevance' }),
    meta,
    ...splitParagraphs(lecture.exam_relevance_markdown).map((paragraph) => createElement('p', { text: paragraph }))
  ]);
  return section;
};

const renderTerms = (lecture) => {
  const section = createElement('section', { className: 'lecture-section' });
  const grid = createElement('div', { className: 'lecture-terms-grid' });

  appendChildren(
    grid,
    (lecture.glossary_ids || []).slice(0, 6).map((id) => {
      const term = glossaryById[id];
      if (!term) return null;
      const card = createElement('article', { className: 'lecture-term-card' });
      appendChildren(card, [
        createElement('h3', { text: term.term }),
        createElement('p', { text: term.definition || '' }),
        term.mechanism ? createElement('p', { className: 'small', text: term.mechanism }) : null
      ]);
      return card;
    })
  );

  appendChildren(section, [createElement('h2', { text: 'Key terms for today' }), grid]);
  return section;
};

const renderFollowThrough = (lecture, day) => {
  const section = createElement('section', { className: 'lecture-section' });
  const list = createElement('ul', { className: 'lecture-list' });

  appendChildren(
    list,
    (lecture.resource_anchors || []).slice(0, 4).map((resource) => {
      const item = createElement('li');
      const link = createElement('a', {
        text: resource.label,
        attrs: {
          href: resource.url || '#',
          target: resource.url ? '_blank' : null,
          rel: resource.url ? 'noreferrer' : null
        }
      });
      item.appendChild(link);
      if (resource.type) {
        item.append(` (${resource.type})`);
      }
      return item;
    })
  );

  const nextSteps = [
    `Finish the reading, then complete the day tasks tied to ${day.label}.`,
    'Open the week page for the full daily plan, glossary subset, and flashcards.',
    'Capture your own explanation or weak spots in the notes tool before you move on.'
  ];

  appendChildren(section, [
    createElement('h2', { text: 'Recommended follow-through' }),
    list,
    createElement('p', { text: nextSteps.join(' ') })
  ]);
  return section;
};

const renderControls = ({ day, target }) => {
  const section = createElement('section', { className: 'lecture-section lecture-controls' });
  const actions = createElement('div', { className: 'lecture-control-row' });
  const message = createElement('p', { className: 'small js-lecture-action-state' });

  const completeButton = createElement('button', {
    className: 'btn',
    text: target.isComplete ? 'Mark incomplete' : 'Mark complete',
    attrs: { type: 'button' }
  });
  const blockButton = createElement('button', {
    className: 'btn secondary',
    text: target.isBlocked ? 'Unblock' : 'Mark blocked',
    attrs: { type: 'button' }
  });
  const weekLink = createElement('a', {
    className: 'btn secondary',
    text: 'Open week page',
    attrs: { href: day.weekHref }
  });
  const notesLink = createElement('a', {
    className: 'btn secondary',
    text: 'Open notes',
    attrs: { href: notesHrefForDay(day) }
  });

  completeButton.addEventListener('click', async () => {
    await setDayCompleted(day.id, !target.isComplete);
    message.textContent = target.isComplete ? 'Lecture marked incomplete.' : 'Lecture marked complete. Advancing...';
    dispatchProgressChanged();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await renderCurrentLecture();
  });

  blockButton.addEventListener('click', async () => {
    await setDayBlocked(day.id, !target.isBlocked);
    message.textContent = target.isBlocked ? 'Lecture unblocked.' : 'Lecture marked blocked.';
    dispatchProgressChanged();
    await renderCurrentLecture();
  });

  appendChildren(actions, [completeButton, blockButton, weekLink, notesLink]);
  appendChildren(section, [createElement('h2', { text: 'Completion controls' }), actions, message]);
  return section;
};

const renderFallback = ({ day, target, message }) => {
  const section = createElement('section', { className: 'lecture-section' });
  appendChildren(section, [
    createElement('h2', { text: 'Lecture not available' }),
    createElement('p', {
      text: message || 'This day is your current study target, but its lecture content is not available yet.'
    }),
    createElement('p', {
      text: `Week ${String(target.currentWeekNumber).padStart(2, '0')} Day ${String(target.currentDayNumber).padStart(2, '0')} remains your current target.`
    })
  ]);
  return appendChildren(createElement('div'), [section, renderControls({ day, target })]);
};

async function renderCurrentLecture() {
  const root = document.querySelector(selectors.root);
  const loading = document.querySelector(selectors.loading);

  if (!root || !loading) return;

  loading.hidden = false;
  root.hidden = true;

  try {
    const progress = getProgress();
    const target = getCurrentLecture({
      days: lectureDays,
      progressState: progress,
      lecturesByDayId
    });

    clearNode(root);

    if (!target.currentDay || !target.currentDayId) {
      setStatus('No lecture target is available yet.', 'neutral');
      const section = createElement('section', { className: 'lecture-section' });
      appendChildren(section, [createElement('h2', { text: 'No lecture target available' }), createElement('p', { text: 'No lecture target is available yet.' })]);
      root.appendChild(section);
      root.hidden = false;
      loading.hidden = true;
      return;
    }

    const day = target.currentDay;
    const lecture = target.lecture;

    if (target.isCourseComplete) {
      setStatus("You're fully caught up. All available lectures are marked complete.", 'success');
    } else if (target.isBlocked) {
      setStatus('This lecture is currently marked blocked. Keep the reading view open, but resolve the block before moving on.', 'warn');
    } else {
      setStatus('', 'neutral');
    }

    const header = createElement('header', { className: 'lecture-header' });
    const metaRow = createElement('div', { className: 'lecture-meta-row' });
    appendChildren(metaRow, [
      createElement('span', { className: 'lecture-meta-chip', text: `Week ${String(day.week).padStart(2, '0')}` }),
      createElement('span', { className: 'lecture-meta-chip', text: `Day ${String(day.day).padStart(2, '0')}` }),
      createElement('span', { className: 'lecture-meta-chip', text: day.phase }),
      lecture?.estimated_read_minutes
        ? createElement('span', { className: 'lecture-meta-chip', text: `${lecture.estimated_read_minutes} min read` })
        : null
    ]);

    appendChildren(header, [
      metaRow,
      createElement('h1', { text: lecture?.title || `Week ${String(day.week).padStart(2, '0')} ${day.label}` }),
      createElement('p', { className: 'lecture-subtitle', text: lecture?.objective || day.session_objective || '' })
    ]);

    root.appendChild(header);

    if (!lecture) {
      root.appendChild(
        renderFallback({
          day,
          target,
          message: 'This day is your current study target, but its lecture content is not available yet.'
        })
      );
      root.hidden = false;
      loading.hidden = true;
      return;
    }

    root.appendChild(renderTextSection('Why this matters', lecture.plain_language_intro || lecture.summary || ''));
    root.appendChild(renderLectureBody(lecture));
    root.appendChild(renderExamPanel(lecture, day));
    root.appendChild(renderTerms(lecture));
    root.appendChild(renderFollowThrough(lecture, day));
    root.appendChild(renderListSection('Key distinctions and common confusions', lecture.key_distinctions || []));
    root.appendChild(renderTextSection('Concrete mental model', lecture.mental_model_markdown || ''));
    root.appendChild(renderListSection('If you can explain this, you understand it', lecture.self_check_prompts || []));
    root.appendChild(renderTextSection('Quick recap', lecture.quick_recap || ''));
    root.appendChild(renderControls({ day, target }));

    root.hidden = false;
  } catch (error) {
    clearNode(root);
    setStatus(getErrorMessage(error, 'Unable to load your current lecture.'), 'warn');
    root.appendChild(
      createElement('p', {
        text: 'Unable to load your current lecture. Try refreshing the page and keep using the week pages if the problem persists.'
      })
    );
    root.hidden = false;
  } finally {
    loading.hidden = true;
  }
}

const boot = async () => {
  await loadProgress();
  const data = parseJsonScript('todays-lecture-data-json', {
    days: [],
    lecturesByDayId: {},
    glossaryById: {},
    routes: {}
  });
  lectureDays = data.days || [];
  lecturesByDayId = data.lecturesByDayId || {};
  glossaryById = data.glossaryById || {};
  routes = data.routes || {};
  await renderCurrentLecture();
  window.addEventListener(PROGRESS_EVENT, renderCurrentLecture);
};

initOnReady(boot);
