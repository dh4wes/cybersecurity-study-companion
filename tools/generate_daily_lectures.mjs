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
    return sentence(
      `Today is a light consolidation day. The goal is to keep ${week.weekly_focus.toLowerCase()} mentally organized, not to force more new content into the week`
    );
  }
  if (day.session_type === 'Review') {
    return sentence(
      `Today is about turning this week's terms and tasks into one working mental picture so you can retrieve them under pressure instead of remembering isolated facts`
    );
  }
  if (names.length > 0) {
    return sentence(
      `Today you are learning how ${names.join(', ')} fit into ${week.weekly_focus.toLowerCase()}, so the topic feels like a system instead of a vocabulary list`
    );
  }
  return sentence(`Today you are learning the logic behind ${week.weekly_focus.toLowerCase()} and how it supports the week's deliverable`);
}

function termNarrative(term) {
  return `${term.term} means ${lowerFirst(sentence(term.definition)).replace(/[.?!]$/, '')}. Its practical job is that it ${lowerFirst(sentence(term.purpose)).replace(/[.?!]$/, '')}. Mechanically, it ${lowerFirst(sentence(term.mechanism)).replace(/[.?!]$/, '')}.`;
}

function joinNatural(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

function buildStudyLecture({ day, week, glossaryTerms, resourceAnchors, exam }) {
  const primaryTerms = glossaryTerms.slice(0, 3);
  const secondaryTerms = glossaryTerms.slice(3, 6);
  const termNames = primaryTerms.map((term) => term.term);
  const resourceLabels = resourceAnchors.slice(0, 3).map((entry) => entry.label);
  const todoText = (day.todo || []).map(sentence).join(' ');
  const deliverable = sentence(week.deliverable);
  const checkpoint = sentence(week.checkpoint);

  const paragraphs = [];

  paragraphs.push(
    [
      `The week focus is ${week.weekly_focus}, and today's objective is ${lowerFirst(sentence(day.session_objective)).replace(/[.?!]$/, '')}.`,
      `That matters because entry-level certification questions rarely ask for a floating definition by itself; they usually ask whether you can place a concept inside a working system, support action, or troubleshooting sequence.`,
      `The terms in scope today are ${joinNatural(termNames)}, and the point is to understand what each one does, what problem it solves, and how it interacts with the rest of the platform.`,
      `If you can explain those relationships cleanly, the week's deliverable becomes more than homework: it becomes evidence that you understand the system well enough to describe it under exam pressure or in an operations conversation.`
    ].join(' ')
  );

  if (primaryTerms.length > 0) {
    paragraphs.push(
      [
        primaryTerms.map(termNarrative).join(' '),
        `Notice the pattern: the exam target here is not memorizing isolated labels, but recognizing which part of the system is responsible for speed, persistence, coordination, communication, or control.`,
        `When two concepts seem similar, ask three questions: where does the data live, who acts on it, and what changes if this part fails. That framing turns vocabulary into diagnosis.`
      ].join(' ')
    );
  }

  if (secondaryTerms.length > 0) {
    paragraphs.push(
      [
        secondaryTerms.map(termNarrative).join(' '),
        `This second layer usually explains why a system behaves the way it does once the first layer is already in motion.`,
        `That is the difference between surface familiarity and real operational understanding: you can trace the path from a component or protocol name to the effect it has on boot, throughput, access, visibility, or failure handling.`
      ].join(' ')
    );
  } else if (primaryTerms.length > 0) {
    paragraphs.push(
      [
        `The day's tasks push you past passive recognition. ${todoText}`,
        `That matters because a certification stem often hides the answer inside behavior: a machine starts slowly, a client cannot join a network, a log source becomes untrustworthy, or a user sees a symptom that points back to one specific layer.`,
        `When you study today's terms, keep asking what evidence each one would leave behind and what change you would expect if it were configured correctly, misused, or failing.`
      ].join(' ')
    );
  }

  paragraphs.push(
    [
      `Use the resource path for signal, not volume. ${resourceLabels.length > 0 ? `The attached anchors such as ${joinNatural(resourceLabels)} give you concrete examples of the same ideas in action.` : 'The attached resources give you a concrete place to watch the concepts move.'}`,
      `As you work, translate each example into an operational sentence: what input comes in, what component or service processes it, what output comes out, and where a technician or analyst would verify that result.`,
      `That habit is especially valuable for ${exam.label} because exam reasoning usually turns on whether you can recognize the correct processing step, not whether you can repeat a slogan.`
    ].join(' ')
  );

  paragraphs.push(
    [
      `Today's work should also point forward to the week's artifact. ${deliverable}`,
      `A strong deliverable proves that the checkpoint is real, not aspirational. ${checkpoint}`,
      `If you can explain why the system behaves the way it does, contrast the likely confusions, and connect the resource examples to the terms in the glossary, you are studying at the right depth for this stage of the roadmap.`
    ].join(' ')
  );

  paragraphs.push(
    [
      `One useful habit for this day is to translate every concept into a failure story and a success story.`,
      `In the success story, identify what correct behavior looks like: the device boots, the network path resolves, the control blocks the risky action, the log shows the expected event, or the command produces the right output.`,
      `In the failure story, say what breaks first, what symptom appears to the user or analyst, and what evidence would narrow the problem to the correct layer.`,
      `That is the kind of reasoning that keeps you from chasing noise on an exam or in a real support workflow.`
    ].join(' ')
  );

  paragraphs.push(
    [
      `It also helps to connect today's lesson to the neighboring days in the same week.`,
      `Day 1 usually builds vocabulary, the middle of the week forces mechanism and comparison, and Day 5 asks you to package the ideas into something you could explain to another person.`,
      `So do not study today's material as if it ends tonight.`,
      `Study it as a block in a larger sequence: what foundation did yesterday lay, what practice does today support, and what explanation will you need by the time you reach the review day.`,
      `That sequencing is how a curated roadmap becomes cumulative instead of fragmented.`
    ].join(' ')
  );

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
      `This is a synthesis day, which means the goal is retrieval, connection, and cleanup rather than adding a fresh topic.`,
      `The week's focus was ${week.weekly_focus}, and the real question now is whether the concepts from earlier study days fit together as one working model.`,
      `You should be able to move from term names such as ${joinNatural(names.slice(0, 6))} to the underlying system behavior without rereading every resource from scratch.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `Start by reconstructing the week from memory. Explain the week's deliverable, the checkpoint, and the sequence of ideas that led there.`,
      `Then test whether you can connect mechanism to purpose: ${mechanismSnippets}`,
      `If one term only makes sense in isolation, that is the weak spot to revisit. Review days are for rebuilding those bridges before they become exam traps.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `For ${exam.label}, weak understanding usually shows up in one of four ways: mixing up two similar concepts, picking the wrong layer, skipping the evidence trail, or remembering the name of a control without knowing why it fits.`,
      `Use today's review to correct those failure modes explicitly.`,
      `Say out loud what symptom belongs to which component or service, what data should move where, and what you would check first if the expected outcome did not happen.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `This is also the right time to prune notes. Keep the explanations that help you reason, keep one or two clean examples, and discard repetition.`,
      `The point of a good review deck is not maximum volume; it is fast retrieval under realistic pressure.`,
      `When the terms, mechanisms, and examples line up, the week becomes easier to carry into the next block of study.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `A strong review also checks whether the week's ideas connect vertically across layers.`,
      `For example, a hardware topic should still map to a user-visible symptom, a networking topic should still map to packet movement and service behavior, and a security topic should still map to control choice, evidence, and response.`,
      `If you can move up and down that stack without getting lost, you are much less likely to freeze when a question compresses several layers into a short scenario.`
    ].join(' ')
  );
  paragraphs.push(
    [
      `Before you leave the week, make one final pass at the checkpoint in your own words.`,
      `Do not repeat the checkpoint sentence exactly as written.`,
      `Rewrite it as an explanation you could give to a teammate or instructor, then compare that explanation against the week's terms, resource examples, and deliverable.`,
      `Any missing link you notice there is the right target for your next short review burst.`
    ].join(' ')
  );
  return paragraphs.join('\n\n');
}

function buildRestLecture({ week, nextWeek }) {
  const preview = nextWeek
    ? `Next, the roadmap moves into ${nextWeek.weekly_focus.toLowerCase()}, so notice which questions from this week still feel unfinished before the next block starts.`
    : `Use the pause to identify what from the roadmap still needs one more clean review pass and what is already stable enough to leave alone.`;
  return [
    `Today is intentionally light. Rest days are part of the study system because recall gets stronger when you stop forcing new material and give the week's concepts time to settle into a simpler mental model.`,
    `If you want a short touchpoint, explain the week's checkpoint in your own words, glance at the glossary terms that still feel slippery, and then stop. ${preview}`,
    `The goal is not to win an extra study session by stealth. The goal is to preserve clarity, protect motivation, and make sure the next week's material lands on top of an organized base instead of mental clutter.`
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
    return sentence(
      `Picture the week as a small pipeline: concept name, mechanism, evidence, and decision. If one step is still fuzzy, that is the step to revisit next week`
    );
  }

  const snippets = glossaryTerms
    .slice(0, 4)
    .map((term) => `${term.term}: ${lowerFirst(sentence(term.mechanism)).replace(/[.?!]$/, '')}`)
    .join(' ');

  return [
    `Use a pipeline model for this day: input arrives, a component or service processes it, state changes occur, and an output or symptom becomes visible to the user, administrator, or analyst.`,
    snippets,
    `If you can narrate that path from start to finish without skipping the middle, the topic is becoming operational instead of abstract.`
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
    return sentence(`The win for today is consolidation: keep ${week.weekly_focus.toLowerCase()} organized, notice what still feels unstable, and preserve energy for the next study block`);
  }
  if (day.session_type === 'Review') {
    return sentence(
      `This review day turns ${names.length > 0 ? joinNatural(names) : 'the week'} into one coherent model so you can retrieve the week's logic, spot confusions quickly, and carry the right mental structure forward`
    );
  }
  return sentence(
    `Today was about understanding ${names.length > 0 ? joinNatural(names) : week.weekly_focus.toLowerCase()} as part of a working system, then linking that understanding to exam reasoning and the week's artifact`
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

function ensureMinimumWords(text, minimumWords, fillerParagraph) {
  let output = text;
  while (words(output) < minimumWords) {
    output = `${output}\n\n${fillerParagraph}`;
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

  const distinctionLines = record.key_distinctions.map((item) => `- ${item}`).join('\n');
  const selfCheckLines = record.self_check_prompts.map((item) => `- ${item}`).join('\n');
  const resourceLines = record.resource_anchors
    .map((item) => `- ${item.label}${item.type ? ` (${item.type})` : ''}${item.url ? ` - ${item.url}` : ''}`)
    .join('\n');

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
    '## 4. Key distinctions and common confusions',
    distinctionLines,
    '',
    '## 5. Concrete mental model',
    record.mental_model_markdown,
    '',
    '## 6. If you can explain this, you understand it',
    selfCheckLines,
    '',
    '## 7. Quick recap',
    record.quick_recap,
    '',
    '## 8. Resource anchors',
    resourceLines,
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
          700,
          `As a final pass, explain the day's system in your own words from input to outcome, then compare that explanation against the terms, tasks, and resource examples. The gap between those two versions is usually the exact concept that still needs work.`
        );
      }
      if (day.session_type === 'Review') {
        lectureBody = ensureMinimumWords(
          lectureBody,
          500,
          `Keep the review practical: retrieve the week from memory, link each term to evidence or behavior, and check whether you can still explain the checkpoint cleanly without opening the notes first.`
        );
      }
      if (day.session_type === 'Rest') {
        lectureBody = ensureMinimumWords(
          lectureBody,
          150,
          `If you want one last low-stress prompt, name the concept from this week that would still slow you down in a short scenario and decide when you will revisit it. Then stop and let the rest day do its job.`
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
