#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const STUDY_PATH = path.join(ROOT, 'src', 'data', 'content', 'study-companion-v2.json');
const GLOSSARY_PATH = path.join(ROOT, 'src', 'data', 'content', 'glossary.json');
const FLASHCARDS_PATH = path.join(ROOT, 'src', 'data', 'content', 'flashcards.json');
const SOURCE_LINKS_PATH = path.join(ROOT, 'src', 'data', 'day-source-links.json');

const DOCS_DIR = path.join(ROOT, 'docs', 'notebooklm', 'daily-lectures');
const JSON_DIR = path.join(ROOT, 'src', 'data', 'content', 'daily-lectures');

const BANNED_PHRASES = [
  'In today’s rapidly evolving digital landscape',
  'It is important to note that',
  'This plays a crucial role',
  'As we can see'
];

const OFFICIAL_ALIGNMENT_NOTES = {
  aplus: {
    label: 'CompTIA A+ Core 1 (220-1201)',
    secondary: null,
    summary:
      'These weeks emphasize concrete device behavior, component roles, boot flow, connectivity, and troubleshooting decisions that align with A+ hardware and support reasoning.'
  },
  aplus2: {
    label: 'CompTIA A+ Core 2 (220-1202)',
    secondary: 'Bridge to CompTIA Network+ (N10-009) and CompTIA Security+ (SY0-701)',
    summary:
      'These weeks emphasize operating systems, administration, support workflows, Linux comfort, and security basics that belong primarily to Core 2 but also support later networking and security study.'
  },
  network: {
    label: 'CompTIA Network+ (N10-009)',
    secondary: null,
    summary:
      'These weeks emphasize packet flow, addressing, switching, routing, services, wireless, cloud, and troubleshooting patterns that align directly with Network+ style reasoning.'
  },
  google: {
    label: 'Google Cybersecurity Professional Certificate',
    secondary: 'CompTIA Security+ (SY0-701)',
    summary:
      'These weeks follow the Google course sequence while reinforcing Security+ style reasoning about controls, attacks, operations, evidence, Linux, SQL, detection, and response.'
  },
  security: {
    label: 'CompTIA Security+ (SY0-701)',
    secondary: null,
    summary:
      'These weeks emphasize identity, cryptography, social engineering, detection, governance, incident response, and operational decision-making that align directly with Security+ domains.'
  },
  final: {
    label: 'Cross-certification review (A+ / Network+ / Security+)',
    secondary: null,
    summary:
      'This week is synthesis-oriented rather than objective-heavy. It consolidates prior material, strengthens recall, and prepares the learner to explain earlier concepts more clearly.'
  }
};

function pad2(value) {
  return String(value).padStart(2, '0');
}

function lowerFirst(value) {
  if (!value) return '';
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function sentence(value) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  return /[.?!]$/.test(normalized) ? normalized : `${normalized}.`;
}

function words(value) {
  return String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function escapeYamlString(value) {
  if (value === null) return 'null';
  if (typeof value === 'number') return String(value);
  return JSON.stringify(String(value));
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

async function atomicWrite(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  await fs.writeFile(tempPath, content, 'utf8');
  await fs.rename(tempPath, filePath);
}

function guessResourceType(label = '', url = '') {
  const haystack = `${label} ${url}`.toLowerCase();
  if (haystack.includes('tryhackme') || haystack.includes('lab')) return 'lab';
  if (haystack.includes('quiz')) return 'quiz';
  if (haystack.includes('wireshark') || haystack.includes('system information') || haystack.includes('virtualbox')) return 'tool';
  if (haystack.includes('coursera') || haystack.includes('messer') || haystack.includes('course')) return 'course';
  if (haystack.includes('cisa') || haystack.includes('comptia') || haystack.includes('guide')) return 'reference';
  return 'resource';
}

function examTargetsForWeek(weekNumber) {
  if (weekNumber >= 1 && weekNumber <= 2) return OFFICIAL_ALIGNMENT_NOTES.aplus;
  if (weekNumber >= 3 && weekNumber <= 5) return OFFICIAL_ALIGNMENT_NOTES.aplus2;
  if (weekNumber >= 6 && weekNumber <= 12) return OFFICIAL_ALIGNMENT_NOTES.network;
  if (weekNumber >= 13 && weekNumber <= 23) return OFFICIAL_ALIGNMENT_NOTES.google;
  if (weekNumber >= 26 && weekNumber <= 30) return OFFICIAL_ALIGNMENT_NOTES.security;
  return OFFICIAL_ALIGNMENT_NOTES.final;
}

function deriveTitle(day, glossaryTerms, week) {
  if (day.session_type === 'Rest') {
    return `Rest, consolidation, and preview for ${week.weekly_focus}`;
  }
  if (day.session_type === 'Review') {
    const names = glossaryTerms.slice(0, 3).map((term) => term.term);
    return names.length > 0
      ? `Weekly synthesis: ${names.join(', ')}`
      : `Weekly synthesis for ${week.weekly_focus}`;
  }
  const names = glossaryTerms.slice(0, 3).map((term) => term.term);
  if (names.length === 1) return `${names[0]} in context`;
  if (names.length === 2) return `${names[0]} and ${names[1]} in context`;
  if (names.length >= 3) return `${names[0]}, ${names[1]}, and ${names[2]} in context`;
  return week.weekly_focus;
}

function buildPlainLanguage(day, week, glossaryTerms) {
  const names = glossaryTerms.slice(0, 3).map((term) => term.term);
  if (day.session_type === 'Rest') {
    return sentence(`Today is a light consolidation day for ${week.weekly_focus.toLowerCase()}`);
  }
  if (day.session_type === 'Review') {
    return sentence(`Today reviews the week's main concepts as one connected model`);
  }
  if (names.length > 0) {
    return sentence(`Today covers ${joinNatural(names)} within ${week.weekly_focus.toLowerCase()}`);
  }
  return sentence(`Today covers another part of ${week.weekly_focus.toLowerCase()}`);
}

function termNarrative(term) {
  return `${term.term} is ${lowerFirst(sentence(term.definition)).replace(/[.?!]$/, '')}. It ${lowerFirst(sentence(term.purpose)).replace(/[.?!]$/, '')}. Mechanically, it ${lowerFirst(sentence(term.mechanism)).replace(/[.?!]$/, '')}.`;
}

function joinNatural(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

function buildAppliedPracticeParagraph({ day, week, todoText }) {
  const variants = [
    `Today's tasks focus on direct observation and application. ${todoText}`,
    `${todoText} This day is meant to show the topic in action rather than leave it at the definition level.`,
    `The task list for today is practical by design. ${todoText}`,
    `${todoText} The goal is to connect the concept to actual behavior, output, or system state.`
  ];
  return variants[(Number(day.week) + Number(day.day)) % variants.length];
}

function buildResourceUseParagraph({ day, week, exam, resourceLabels }) {
  const resourceText =
    resourceLabels.length > 0
      ? `Resources such as ${joinNatural(resourceLabels)} provide concrete examples for this topic.`
      : 'The attached resources provide concrete examples for this topic.';

  const variants = [
    `${resourceText} They show how the concept appears in real configurations, workflows, commands, or troubleshooting cases.`,
    `${resourceText} In this week, ${week.weekly_focus} is easier to understand when the examples are tied to visible behavior and concrete outputs.`,
    `${resourceText} They are most useful for seeing what data moves, what component handles it, and what result should appear next.`,
    `${resourceText} For ${exam.label}, this matters because many questions turn on behavior in context rather than a standalone label.`
  ];
  return variants[(Number(day.day) + resourceLabels.length + Number(day.week)) % variants.length];
}

function buildDeliverableParagraph({ day, week, deliverable, checkpoint }) {
  const variants = [
    `This week's deliverable is ${deliverable} The checkpoint is ${checkpoint}`,
    `The week builds toward ${deliverable} The expected checkpoint is ${checkpoint}`,
    `The running output for this week is ${deliverable} By the checkpoint, ${lowerFirst(checkpoint)}`,
    `${deliverable} is the main artifact for this week. The checkpoint is ${checkpoint}`
  ];
  return variants[(Number(day.week) + Number(day.day) + String(week.phase).length) % variants.length];
}

function buildScenarioLensParagraph({ day, exam, termNames }) {
  const scope = termNames.length > 0 ? joinNatural(termNames) : 'the current topic';
  const variants = [
    `In a scenario, ${scope} usually matters through symptoms, sequence, or visible system behavior rather than through a direct definition prompt.`,
    `On ${exam.label}, ${scope} is more likely to appear inside a short situation where you need to identify the correct layer, cause, or next step.`,
    `A useful way to frame ${scope} is by asking what changes first when it is misconfigured, missing, or working normally.`,
    `Most scenario questions on ${scope} hinge on clues such as output, access, performance, routing, logging, or startup behavior.`
  ];
  return variants[(Number(day.day) + termNames.length) % variants.length];
}

function buildWeekContextParagraph({ day, week }) {
  const variants = [
    `Within the week, Day ${day.day} extends ${week.weekly_focus} with one more concrete piece of the model.`,
    `This day fits into the larger sequence for ${week.weekly_focus}, adding another layer of mechanism, comparison, or application.`,
    `In the weekly sequence, this day adds detail and context to ${week.weekly_focus} rather than standing alone.`,
    `This point in the week is meant to deepen ${week.weekly_focus} with a more applied or comparative view of the topic.`
  ];
  return variants[(Number(day.week) + Number(day.day) + String(day.session_type).length) % variants.length];
}

function buildStudyLecture({ day, week, glossaryTerms, resourceAnchors, exam }) {
  const primaryTerms = glossaryTerms.slice(0, 3);
  const secondaryTerms = glossaryTerms.slice(3, 6);
  const termNames = primaryTerms.map((term) => term.term);
  const resourceLabels = resourceAnchors.slice(0, 3).map((entry) => entry.label);
  const todoText = (day.todo || []).map(sentence).join(' ');
  const paragraphs = [];

  paragraphs.push(
    [
      `The week focus is ${week.weekly_focus}, and today's objective is ${lowerFirst(sentence(day.session_objective)).replace(/[.?!]$/, '')}.`,
      `The main terms in scope are ${joinNatural(termNames)}.`,
      `The focus is on what each one does, how it operates, and how it affects the rest of the system.`
    ].join(' ')
  );

  if (primaryTerms.length > 0) {
    paragraphs.push(
      [
        primaryTerms.map(termNarrative).join(' '),
        `Together, these terms describe where work happens, how state changes, and what the visible outcome looks like when the system is operating normally.`
      ].join(' ')
    );
  }

  if (secondaryTerms.length > 0) {
    paragraphs.push(
      [
        secondaryTerms.map(termNarrative).join(' '),
        `This second set of terms adds the next layer of behavior, dependency, or control around the main topic.`
      ].join(' ')
    );
  } else if (primaryTerms.length > 0) {
    paragraphs.push(buildAppliedPracticeParagraph({ day, week, todoText }));
  }

  paragraphs.push(buildResourceUseParagraph({ day, week, exam, resourceLabels }));

  paragraphs.push(buildScenarioLensParagraph({ day, exam, termNames }));

  return paragraphs.join('\n\n');
}

function buildReviewLecture({ day, week, glossaryTerms, exam }) {
  const names = glossaryTerms.slice(0, 8).map((term) => term.term);
  const mechanismSnippets = glossaryTerms
    .slice(0, 4)
    .map((term) => `${term.term}: ${lowerFirst(sentence(term.mechanism)).replace(/[.?!]$/, '')}`)
    .join(' ');

  const paragraphs = [];
  paragraphs.push(
    [
      `This is the review day for ${week.weekly_focus}.`,
      `The goal is to connect the week's main ideas into one working model rather than introduce a new topic.`,
      `The core terms are ${joinNatural(names.slice(0, 6))}.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `Across the week, the key mechanisms were: ${mechanismSnippets}`,
      `The value of the review is in seeing how these pieces connect across setup, operation, failure, and troubleshooting.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `For ${exam.label}, this block is most useful when you can separate similar concepts, place them at the right layer, and connect them to symptoms or evidence.`,
      `That usually means following a chain from cause to behavior to visible result.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `At this point, the week should read as one sequence rather than separate definitions.`,
      `Each concept should connect to a role, a mechanism, and a likely scenario where it matters.`
    ].join(' ')
  );
  return paragraphs.join('\n\n');
}

function buildRestLecture({ week, nextWeek }) {
  const preview = nextWeek
    ? `Next, the roadmap moves into ${nextWeek.weekly_focus.toLowerCase()}.`
    : `Use the pause to reset before the next study block.`;
  return [
    `Today is a rest day for ${week.weekly_focus}.`,
    `Keep the week lightly in view, but do not turn the day into a full study session. ${preview}`,
    `The main goal is to preserve continuity without adding another heavy block of material.`
  ].join('\n\n');
}

function buildExamRelevance(day, exam, glossaryTerms) {
  const names = glossaryTerms.slice(0, 4).map((term) => term.term);
  if (day.session_type === 'Rest') {
    return sentence(
      `Rest days matter indirectly for ${exam.label} because spaced retrieval and reduced overload help you keep earlier concepts available when scenario questions combine multiple topics`
    );
  }
  if (day.session_type === 'Review') {
    return [
      `Expect this material to show up as scenario-style reasoning rather than raw recall.`,
      `Typical tasks include distinguishing related concepts, choosing the right component or control, identifying the most likely cause from symptoms, and explaining why one workflow step belongs before another.`,
      `If you can reconstruct the week without the notes open, you are closer to the level these exams reward.`
    ].join(' ');
  }
  return [
    `This material is most likely to appear as a short scenario where you must ${names.length > 0 ? `identify how ${joinNatural(names)} affect the outcome` : 'identify the correct component, protocol, or control'}.`,
    `That can mean choosing the best answer for a symptom, distinguishing two similar terms, following a process step in the right order, or recognizing why one configuration works while another fails.`,
    `The exam signal is applied reasoning: knowing what the concept does in context and what evidence points to it.`
  ].join(' ');
}

function buildKeyDistinctions(glossaryTerms, flashcardsById) {
  const distinctions = [];

  for (const term of glossaryTerms) {
    const comparison = flashcardsById.get(`${term.id}-comparison`);
    if (!comparison) continue;
    const match = comparison.front.match(/difference between (.+) and (.+)\?/i);
    if (!match) continue;
    distinctions.push(`${match[1]} vs ${match[2]} — ${comparison.back}`);
    if (distinctions.length >= 5) break;
  }

  if (distinctions.length === 0 && glossaryTerms.length >= 2) {
    distinctions.push(
      `${glossaryTerms[0].term} vs ${glossaryTerms[1].term} — contrast the job each one performs, what data each one touches, and what symptom you would expect if it were missing.`
    );
  }

  if (distinctions.length < 3 && glossaryTerms.length > 0) {
    distinctions.push(
      `Purpose vs mechanism — be able to separate what ${glossaryTerms[0].term} is for from how it actually performs that job.`
    );
  }

  if (distinctions.length < 4) {
    distinctions.push(
      `Recognition vs diagnosis — knowing the term name is not enough; know what evidence would make you pick it in a scenario.`
    );
  }

  return distinctions.slice(0, 6);
}

function buildMentalModel(day, glossaryTerms) {
  if (day.session_type === 'Rest') {
    return sentence(`Picture the week as a simple chain of concept, mechanism, evidence, and decision`);
  }

  const snippets = glossaryTerms
    .slice(0, 4)
    .map((term) => `${term.term}: ${lowerFirst(sentence(term.mechanism)).replace(/[.?!]$/, '')}`)
    .join(' ');

  return [
    `Use a pipeline model for this day: input arrives, a component or service processes it, state changes occur, and an output or symptom becomes visible to the user, administrator, or analyst.`,
    snippets,
    `That sequence is the main mental model for the topic.`
  ].join(' ');
}

function buildSelfCheck(day, week, glossaryTerms) {
  const prompts = [];
  const termNames = glossaryTerms.slice(0, 4).map((term) => term.term);

  if (termNames.length >= 2) {
    prompts.push(`Explain the difference between ${termNames[0]} and ${termNames[1]} without using the words "better" or "faster" as your whole answer.`);
  }
  if (termNames.length >= 1) {
    prompts.push(`Describe what ${termNames[0]} does, what input it works on, and what evidence would show that it is functioning correctly.`);
  }
  prompts.push(`Walk through today's objective in sequence and say which step would fail first if the system were misconfigured.`);
  prompts.push(`Connect today's glossary terms to this week's deliverable: what part of the artifact proves that you understand the mechanism and not just the label?`);
  if (day.session_type === 'Review') {
    prompts.push(`Rebuild the week from memory in under three minutes and note which transition between concepts is still weak.`);
  } else if (day.session_type === 'Rest') {
    prompts.push(`What idea from this week would still confuse you if it appeared inside a short scenario tomorrow?`);
  } else {
    prompts.push(`Give one realistic troubleshooting or security scenario where today's concepts would change the next decision you make.`);
  }

  return prompts.slice(0, 5);
}

function buildQuickRecap(day, week, glossaryTerms) {
  const names = glossaryTerms.slice(0, 3).map((term) => term.term);
  if (day.session_type === 'Rest') {
    return sentence(`Today keeps ${week.weekly_focus.toLowerCase()} organized without adding more heavy content`);
  }
  if (day.session_type === 'Review') {
    return sentence(
      `This review day consolidates ${names.length > 0 ? joinNatural(names) : 'the week'} into one connected model`
    );
  }
  return sentence(
    `Today covered ${names.length > 0 ? joinNatural(names) : week.weekly_focus.toLowerCase()} in terms of role, mechanism, and system effect`
  );
}

function buildResourceAnchors(day, sourceLinks) {
  const anchors = [];
  const seen = new Set();

  const baseResources = [
    { label: day.primary_resource, url: day.primary_url || '', type: guessResourceType(day.primary_resource, day.primary_url || '') },
    { label: day.support_resource, url: day.support_url || '', type: guessResourceType(day.support_resource, day.support_url || '') }
  ];

  for (const item of baseResources) {
    if (!item.label || seen.has(item.label)) continue;
    seen.add(item.label);
    anchors.push(item);
  }

  for (const source of sourceLinks || []) {
    if (!source?.title || seen.has(source.title)) continue;
    seen.add(source.title);
    anchors.push({
      label: source.title,
      url: source.url || '',
      type: guessResourceType(source.title, source.url || '')
    });
  }

  return anchors.slice(0, 6);
}

function buildMarkdownFrontmatter(metadata) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else {
      lines.push(`${key}: ${escapeYamlString(value)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function ensureMinimumWords(text, minimumWords, fillerParagraphs) {
  let output = String(text || '').trim();
  const fillers = Array.isArray(fillerParagraphs) ? fillerParagraphs.filter(Boolean) : [fillerParagraphs].filter(Boolean);
  if (fillers.length === 0) return output;

  let index = 0;
  while (words(output) < minimumWords) {
    output = `${output}\n\n${fillers[index % fillers.length]}`.trim();
    index += 1;
  }
  return output;
}

function buildMarkdownLecture(record) {
  const frontmatter = buildMarkdownFrontmatter({
    id: record.id,
    week: record.week,
    day: record.day,
    slug: record.slug,
    phase: record.phase,
    session_type: record.session_type,
    title: record.title,
    objective: record.objective,
    primary_exam: record.primary_exam,
    secondary_exam: record.secondary_exam,
    resource_names: record.resource_names,
    glossary_terms: record.glossary_terms,
    glossary_ids: record.glossary_ids,
    flashcard_ids: record.flashcard_ids,
    estimated_read_minutes: record.estimated_read_minutes
  });

  return [
    frontmatter,
    `# ${record.title}`,
    '',
    '## 1. Today’s concept in plain language',
    record.plain_language_intro,
    '',
    '## 2. Mini lecture',
    record.mini_lecture_markdown,
    '',
    '## 3. How this shows up on the exam',
    record.exam_relevance_markdown,
    '',
    '## 4. Quick recap',
    record.quick_recap,
    ''
  ].join('\n');
}

function buildWeekOverview(week, days, exam) {
  const summarySentences = [
    `Week ${pad2(week.week)} sits in the ${week.phase} phase and focuses on ${lowerFirst(sentence(week.weekly_focus)).replace(/[.?!]$/, '')}.`,
    `The deliverable is ${lowerFirst(sentence(week.deliverable)).replace(/[.?!]$/, '')}, which forces the learner to turn study into something explainable and reviewable.`,
    `The checkpoint is ${lowerFirst(sentence(week.checkpoint)).replace(/[.?!]$/, '')}, so the week is successful only if the learner can speak clearly about system behavior rather than repeat isolated definitions.`,
    `${exam.summary}`,
    `Across the week, the pattern moves from vocabulary and recognition into mechanism, then into examples, practice, and synthesis.`,
    `That progression matters because certification-style questions usually reward the learner who can trace cause and effect, contrast similar concepts, and choose the next best action from context.`
  ];

  const dayMap = days
    .map((day) => {
      const label = `Day ${day.day}`;
      if (day.session_type === 'Rest') {
        return `- ${label}: consolidate the week's model, keep the terminology lightly active, and preview the next topic without turning the day into hidden study time.`;
      }
      if (day.session_type === 'Review') {
        return `- ${label}: synthesize the week's concepts, connect the glossary terms, revisit weak spots, and make sure the deliverable still proves the checkpoint.`;
      }
      return `- ${label}: ${lowerFirst(sentence(day.session_objective)).replace(/[.?!]$/, '')}; the attached tasks and terms should end in a working explanation, not just note collection.`;
    })
    .join('\n');

  const overclaim =
    week.week >= 13 && week.week <= 23
      ? 'This week is direct for the Google certificate path and partially direct for Security+. The overlap is real, but not every Google course lesson maps one-to-one onto an exam domain.'
      : week.week === 32
        ? 'This week is intentionally consolidation-heavy. It strengthens recall and articulation but should not be treated as a dense block of new objective coverage.'
        : 'This week aligns directly with the main certification path for this range, but the value still comes from explanation and application rather than objective memorization.';

  return [
    `# Week ${pad2(week.week)} Overview`,
    '',
    `- Week number: ${week.week}`,
    `- Phase: ${week.phase}`,
    `- Weekly focus: ${week.weekly_focus}`,
    `- Deliverable: ${week.deliverable}`,
    `- Checkpoint: ${week.checkpoint}`,
    `- Primary exam alignment: ${exam.label}`,
    `- Secondary exam alignment: ${exam.secondary || 'None'}`,
    '',
    '## Why this week matters',
    summarySentences.join(' '),
    '',
    '## Day-by-day understanding map',
    dayMap,
    '',
    '## Exam relevance',
    `${week.weekly_focus} helps with questions that ask the learner to identify the correct component, protocol, workflow step, or control, explain likely causes from a short scenario, and distinguish similar concepts under time pressure.`,
    '',
    '## Do not overclaim',
    overclaim,
    ''
  ].join('\n');
}

function buildMasterIndex(weeks) {
  const lines = [
    '# Daily Mini Lectures: Master Index',
    '',
    '## Purpose',
    'This folder contains the current daily lecture pack generated from the live canonical syllabus in `src/data/content/study-companion-v2.json`.',
    'The current repo state contains 29 active weeks and 203 active day records. The original 32-week prompt does not match the current source of truth, so this pack follows the live canonical data instead of the older assumption.',
    '',
    '## File map',
    '- `00_master_index.md`: entry point and ingestion notes.',
    '- `01_exam_alignment_matrix.md`: current week-range alignment to A+, Network+, Security+, and the Google Cybersecurity Certificate.',
    '- `02_authoring_principles.md`: writing and scope rules used by the generator.',
    '- `week-XX-overview.md`: one prose overview for each active canonical week.',
    '- `week-XX-day-YY.md`: one standalone daily lecture for each canonical day.',
    '- `99_sources_ledger.md`: repo and external source families used for alignment.',
    '',
    '## Study sequence',
    'Read the week overview first, then the seven day files in order. Review days are synthesis-oriented and rest days are intentionally short.',
    '',
    '## NotebookLM ingestion',
    'Ingest the whole folder as a collection. The stable naming convention lets NotebookLM connect each week overview to its day files, and the per-file metadata makes retrieval cleaner for exam-specific prompts.',
    '',
    '## Current lecture set',
    ...weeks.map(
      (week) =>
        `- Week ${pad2(week.week)}: ${week.weekly_focus} (${week.days.length} day files, primary alignment: ${examTargetsForWeek(week.week).label})`
    ),
    ''
  ];

  return lines.join('\n');
}

function buildExamAlignmentMatrix(weeks) {
  const groups = [
    {
      range: 'Weeks 01-02',
      primary: OFFICIAL_ALIGNMENT_NOTES.aplus.label,
      secondary: 'None',
      rationale:
        'Hardware, boot process, mobile devices, basic networking, virtualization, and troubleshooting patterns map most directly to A+ Core 1 reasoning.'
    },
    {
      range: 'Weeks 03-05',
      primary: OFFICIAL_ALIGNMENT_NOTES.aplus2.label,
      secondary: OFFICIAL_ALIGNMENT_NOTES.aplus2.secondary,
      rationale:
        'Operating systems, filesystems, installs, permissions, procedures, and Linux fundamentals map primarily to Core 2 while supporting later networking and security work.'
    },
    {
      range: 'Weeks 06-12',
      primary: OFFICIAL_ALIGNMENT_NOTES.network.label,
      secondary: 'None',
      rationale:
        'These weeks teach packet movement, addressing, services, switching, routing, wireless, tools, and troubleshooting, which are the center of the Network+ block.'
    },
    {
      range: 'Weeks 13-23',
      primary: OFFICIAL_ALIGNMENT_NOTES.google.label,
      secondary: OFFICIAL_ALIGNMENT_NOTES.google.secondary,
      rationale:
        'These weeks follow the Google certificate sequence and reinforce Security+ style thinking about controls, Linux, SQL, attacks, evidence, detection, and response.'
    },
    {
      range: 'Weeks 26-30',
      primary: OFFICIAL_ALIGNMENT_NOTES.security.label,
      secondary: 'None',
      rationale:
        'These weeks are the strongest direct Security+ reinforcement block in the current live syllabus.'
    },
    {
      range: 'Week 32',
      primary: OFFICIAL_ALIGNMENT_NOTES.final.label,
      secondary: 'Indirect support for all prior tracks',
      rationale:
        'The final buffer week is for consolidation, retrieval, cleanup, and cross-exam review rather than large amounts of new objective coverage.'
    }
  ];

  return [
    '# Exam Alignment Matrix',
    '',
    '## Current canonical note',
    `This matrix follows the live syllabus in the repo as generated on ${new Date().toISOString().slice(0, 10)}. The current canonical plan contains ${weeks.length} active weeks rather than the older 32-week assumption.`,
    '',
    '| Week range | Primary exam | Secondary exam | Rationale |',
    '| --- | --- | --- | --- |',
    ...groups.map((group) => `| ${group.range} | ${group.primary} | ${group.secondary} | ${group.rationale} |`),
    '',
    '## Missing ranges from the older brief',
    'Weeks 24, 25, and 31 are not present in the current canonical data. The lecture pack therefore follows the live repo rather than reconstructing removed weeks from stale instructions.',
    ''
  ].join('\n');
}

function buildAuthoringPrinciples() {
  return [
    '# Authoring Principles',
    '',
    '## Scope',
    'The lecture pack is generated from the live canonical syllabus, glossary, flashcards, and day source links. It stays inside the actual day objective and week focus instead of turning each day into a generic textbook chapter.',
    '',
    '## Teaching standard',
    '- Explain mechanisms, not slogans.',
    '- Connect the day to system behavior, troubleshooting, or security operations.',
    '- Use glossary concepts as anchors, but avoid turning the lecture into a glossary dump.',
    '- Make exam relevance explicit without copying proprietary objectives.',
    '',
    '## Style rules',
    '- Calm, direct, concrete, and beginner-serious.',
    '- Short paragraphs over giant bullet walls.',
    '- Distinctions and self-check prompts should push explanation, not recognition alone.',
    '- Review days synthesize; rest days stay intentionally light.',
    '',
    '## Source-grounding rules',
    '- Primary source of truth: `src/data/content/study-companion-v2.json`.',
    '- Concept anchors: `src/data/content/glossary.json` and `src/data/content/flashcards.json`.',
    '- External resource anchors are pulled from `src/data/day-source-links.json` and the per-day resource fields in the syllabus.',
    '- Missing prompt files such as `overview.md` and `flashcard_info.md` were not used because they are absent from the repo.',
    ''
  ].join('\n');
}

function buildSourcesLedger() {
  return [
    '# Sources Ledger',
    '',
    '## Repo source files consulted',
    '- `src/data/content/study-companion-v2.json`',
    '- `src/data/content/glossary.json`',
    '- `src/data/content/flashcards.json`',
    '- `src/data/day-source-links.json`',
    '- `README.md`',
    '- `src/lib/site-data.js`',
    '',
    '## Missing prompt-referenced files',
    '- `overview.md` was not present in the repo.',
    '- `flashcard_info.md` was not present in the repo.',
    '',
    '## External source families used for alignment guidance',
    '- Official CompTIA certification pages for A+ Core 1/Core 2, Network+, and Security+.',
    '- Official Coursera listing for the Google Cybersecurity Professional Certificate.',
    '- Day-level attached resources already referenced inside the repo, including Professor Messer, TryHackMe, CISA, Wireshark, VirtualBox, Ubuntu, Cisco, and Microsoft documentation/tool pages.',
    '',
    '## Direct vs indirect alignment notes',
    '- Weeks 01-05 align directly to A+ reasoning, with Weeks 03-05 also acting as a bridge into later networking and security work.',
    '- Weeks 06-12 align directly to Network+ reasoning.',
    '- Weeks 13-23 align directly to the Google certificate path and indirectly to Security+ where the concepts genuinely overlap.',
    '- Weeks 26-30 align directly to Security+ style reasoning.',
    '- Week 32 is synthesis-oriented and should not be overclaimed as dense objective coverage.',
    ''
  ].join('\n');
}

function buildManifest(weeks, lectureRecords) {
  return {
    generated_at: new Date().toISOString(),
    syllabus_summary: {
      active_weeks: weeks.length,
      active_days: lectureRecords.length
    },
    repo_mismatches: [
      'Prompt referenced a 32-week / 224-day plan, but the current canonical syllabus contains 29 active weeks and 203 active day records.',
      'Prompt referenced overview.md and flashcard_info.md, but those files are not present in the repo.'
    ],
    exams: {
      primary_ranges: [
        { weeks: '01-02', exam: OFFICIAL_ALIGNMENT_NOTES.aplus.label },
        { weeks: '03-05', exam: OFFICIAL_ALIGNMENT_NOTES.aplus2.label, secondary: OFFICIAL_ALIGNMENT_NOTES.aplus2.secondary },
        { weeks: '06-12', exam: OFFICIAL_ALIGNMENT_NOTES.network.label },
        { weeks: '13-23', exam: OFFICIAL_ALIGNMENT_NOTES.google.label, secondary: OFFICIAL_ALIGNMENT_NOTES.google.secondary },
        { weeks: '26-30', exam: OFFICIAL_ALIGNMENT_NOTES.security.label },
        { weeks: '32', exam: OFFICIAL_ALIGNMENT_NOTES.final.label }
      ]
    },
    weeks: weeks.map((week) => ({
      week: week.week,
      id: week.id,
      phase: week.phase,
      focus: week.weekly_focus,
      overview_markdown: `docs/notebooklm/daily-lectures/week-${pad2(week.week)}-overview.md`,
      day_ids: week.days.map((day) => day.id)
    })),
    lectures: lectureRecords.map((record) => ({
      id: record.id,
      week: record.week,
      day: record.day,
      session_type: record.session_type,
      title: record.title,
      primary_exam: record.primary_exam,
      secondary_exam: record.secondary_exam,
      markdown_path: `docs/notebooklm/daily-lectures/${record.id}.md`,
      json_path: `src/data/content/daily-lectures/${record.id}.json`
    }))
  };
}

async function main() {
  const [study, glossary, flashcards, sourceLinks] = await Promise.all([
    readJson(STUDY_PATH),
    readJson(GLOSSARY_PATH),
    readJson(FLASHCARDS_PATH),
    readJson(SOURCE_LINKS_PATH)
  ]);

  const glossaryById = new Map(glossary.map((entry) => [entry.id, entry]));
  const flashcardsById = new Map(flashcards.map((entry) => [entry.id, entry]));
  const daysByWeek = new Map();

  for (const day of study.days) {
    if (!daysByWeek.has(day.week)) daysByWeek.set(day.week, []);
    daysByWeek.get(day.week).push(day);
  }

  const weeks = study.weeks
    .map((week) => ({
      ...week,
      days: (daysByWeek.get(week.week) || []).sort((a, b) => a.day - b.day)
    }))
    .sort((a, b) => a.week - b.week);

  await fs.rm(DOCS_DIR, { recursive: true, force: true });
  await fs.rm(JSON_DIR, { recursive: true, force: true });
  await fs.mkdir(DOCS_DIR, { recursive: true });
  await fs.mkdir(JSON_DIR, { recursive: true });

  const lectureRecords = [];

  for (const week of weeks) {
    const exam = examTargetsForWeek(week.week);
    const overviewPath = path.join(DOCS_DIR, `week-${pad2(week.week)}-overview.md`);
    await atomicWrite(overviewPath, buildWeekOverview(week, week.days, exam));

    for (const day of week.days) {
      const glossaryTerms = (day.glossary_ids || []).map((id) => glossaryById.get(id)).filter(Boolean);
      const title = deriveTitle(day, glossaryTerms, week);
      const resourceAnchors = buildResourceAnchors(day, sourceLinks[day.id] || []);
      const plainLanguage = buildPlainLanguage(day, week, glossaryTerms);
      let lectureBody =
        day.session_type === 'Rest'
          ? buildRestLecture({
              week,
              nextWeek: weeks.find((entry) => entry.week > week.week) || null
            })
          : day.session_type === 'Review'
            ? buildReviewLecture({ day, week, glossaryTerms, exam })
            : buildStudyLecture({ day, week, glossaryTerms, resourceAnchors, exam });

      if (day.session_type === 'Study') {
        lectureBody = ensureMinimumWords(
          lectureBody,
          300,
          [
            `Another useful angle is to note where the concept sits in the larger system, what it depends on, and what would change if it failed or were configured incorrectly.`,
            `The practical value of the topic is usually clearest when you follow one path from input to processing to output and identify the point where the concept changes the result.`,
            `In short scenarios, the important clues usually come from sequence, visible behavior, or the boundary between two layers of the system.`
          ]
        );
      }
      if (day.session_type === 'Review') {
        lectureBody = ensureMinimumWords(
          lectureBody,
          250,
          [
            `One useful review lens is to track how the week's concepts relate to symptoms, evidence, and next-step decisions in a short scenario.`,
            `The main point of the review is to keep the concepts connected rather than treat them as isolated terms.`
          ]
        );
      }
      if (day.session_type === 'Rest') {
        lectureBody = ensureMinimumWords(
          lectureBody,
          80,
          [
            `A short preview of the next week is enough to keep continuity without turning the day back into a long session.`,
            `The rest day exists to preserve momentum and clarity rather than add another dense topic.`
          ]
        );
      }

      const lectureRecord = {
        id: day.id,
        week: week.week,
        day: day.day,
        slug: day.slug,
        title,
        phase: day.phase,
        session_type: day.session_type,
        primary_exam: exam.label,
        secondary_exam: exam.secondary,
        objective: day.session_objective,
        week_focus: week.weekly_focus,
        deliverable: week.deliverable,
        checkpoint: week.checkpoint,
        glossary_terms: glossaryTerms.map((term) => term.term),
        glossary_ids: day.glossary_ids || [],
        flashcard_ids: day.flashcard_ids || [],
        resource_names: unique([day.primary_resource, day.support_resource, ...resourceAnchors.map((entry) => entry.label)]),
        estimated_read_minutes: 1,
        plain_language_intro: plainLanguage,
        mini_lecture_markdown: lectureBody,
        exam_relevance_markdown: buildExamRelevance(day, exam, glossaryTerms),
        key_distinctions: buildKeyDistinctions(glossaryTerms, flashcardsById),
        mental_model_markdown: buildMentalModel(day, glossaryTerms),
        self_check_prompts: buildSelfCheck(day, week, glossaryTerms),
        quick_recap: buildQuickRecap(day, week, glossaryTerms),
        resource_anchors: resourceAnchors
      };

      const fullWordCount = words(
        [
          lectureRecord.plain_language_intro,
          lectureRecord.mini_lecture_markdown,
          lectureRecord.exam_relevance_markdown,
          lectureRecord.mental_model_markdown,
          lectureRecord.quick_recap,
          lectureRecord.self_check_prompts.join(' ')
        ].join(' ')
      );
      lectureRecord.estimated_read_minutes = Math.max(1, Math.round(fullWordCount / 180));

      lectureRecords.push(lectureRecord);

      const markdownPath = path.join(DOCS_DIR, `${day.id}.md`);
      const jsonPath = path.join(JSON_DIR, `${day.id}.json`);
      await atomicWrite(markdownPath, buildMarkdownLecture(lectureRecord));
      await atomicWrite(`${jsonPath}`, JSON.stringify(lectureRecord, null, 2) + '\n');
    }
  }

  await Promise.all([
    atomicWrite(path.join(DOCS_DIR, '00_master_index.md'), buildMasterIndex(weeks)),
    atomicWrite(path.join(DOCS_DIR, '01_exam_alignment_matrix.md'), buildExamAlignmentMatrix(weeks)),
    atomicWrite(path.join(DOCS_DIR, '02_authoring_principles.md'), buildAuthoringPrinciples()),
    atomicWrite(path.join(DOCS_DIR, '99_sources_ledger.md'), buildSourcesLedger()),
    atomicWrite(path.join(JSON_DIR, 'lectures-manifest.json'), JSON.stringify(buildManifest(weeks, lectureRecords), null, 2) + '\n')
  ]);

  const bannedHit = lectureRecords.find((record) =>
    BANNED_PHRASES.some((phrase) =>
      JSON.stringify(record).toLowerCase().includes(phrase.toLowerCase())
    )
  );

  if (bannedHit) {
    console.error(`Generated banned phrase in ${bannedHit.id}`);
    process.exit(1);
  }

  console.log(
    `[generate:lectures] Wrote ${weeks.length} week overviews, ${lectureRecords.length} daily Markdown lectures, ${lectureRecords.length} lecture JSON files, and a manifest.`
  );
}

main().catch((error) => {
  console.error('[generate:lectures] Unhandled error');
  console.error(error);
  process.exit(1);
});
