import fs from 'fs';
import path from 'path';

const root = '/Users/danyel-ii/DACS_';
const study = JSON.parse(fs.readFileSync(path.join(root, 'src/data/content/study-companion-v2.json'), 'utf8'));
const glossary = JSON.parse(fs.readFileSync(path.join(root, 'src/data/content/glossary.json'), 'utf8'));
const flashcards = JSON.parse(fs.readFileSync(path.join(root, 'src/data/content/flashcards.json'), 'utf8'));

const glossaryById = new Map(glossary.map((entry) => [entry.id, entry]));
const cardsById = new Map(flashcards.map((card) => [card.id, card]));
const errors = [];

const bannedFrontStems = [
  'what mechanism lets'
];

const bannedGlossaryPhrases = [
  'within endpoint hardware and platform operations',
  'within host administration and operating system workflows',
  'within routed and switched network environments',
  'within monitoring, investigation, and response workflows',
  'within governance, risk, and compliance workflows',
  'plays a key role',
  'is important',
  'sits within',
  'operates within'
];

function slugifyTerm(term) {
  return String(term || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function termAppearsInScenario(front, term) {
  const frontTokens = slugifyTerm(front).split(/\s+/).filter(Boolean);
  const termTokens = slugifyTerm(term).split(/\s+/).filter(Boolean);
  if (!termTokens.length || frontTokens.length < termTokens.length) return false;
  for (let i = 0; i <= frontTokens.length - termTokens.length; i += 1) {
    const slice = frontTokens.slice(i, i + termTokens.length);
    if (slice.join(' ') === termTokens.join(' ')) return true;
  }
  return false;
}

function sixWordEcho(front, back) {
  const frontWords = String(front || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const backWords = String(back || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (backWords.length < 6 || frontWords.length < 6) return false;

  const frontText = ` ${frontWords.join(' ')} `;
  for (let i = 0; i <= backWords.length - 6; i += 1) {
    const phrase = backWords.slice(i, i + 6).join(' ');
    if (frontText.includes(` ${phrase} `)) return phrase;
  }
  return false;
}

for (const entry of glossary) {
  if (!Array.isArray(entry.bullets) || entry.bullets.length !== 3) {
    errors.push(`Glossary entry ${entry.id} must have exactly 3 bullets.`);
    continue;
  }
  entry.bullets.forEach((bullet, index) => {
    const lowered = String(bullet || '').toLowerCase();
    for (const phrase of bannedGlossaryPhrases) {
      if (lowered.includes(phrase)) {
        errors.push(`Glossary entry ${entry.id} bullet ${index + 1} contains banned phrase: ${phrase}`);
      }
    }
  });
}

for (const week of study.weeks) {
  const dayRecords = week.day_ids
    .map((id) => study.days.find((day) => day.id === id))
    .filter(Boolean)
    .sort((a, b) => a.day - b.day);
  const studyDays = dayRecords.filter((day) => day.day >= 1 && day.day <= 5);
  const priorCards = new Set();

  const seenDecks = new Set(studyDays.map((day) => JSON.stringify(day.flashcard_ids || [])));
  if (seenDecks.size !== studyDays.length) {
    errors.push(`Week ${week.week} has identical day decks across Days 1-5.`);
  }

  for (const day of studyDays) {
    for (const cardId of day.flashcard_ids || []) {
      if (priorCards.has(cardId)) {
        errors.push(`Week ${week.week} repeats flashcard ${cardId} before Day 6 (found again on Day ${day.day}).`);
      }
    }
    for (const cardId of day.flashcard_ids || []) {
      priorCards.add(cardId);
    }
  }

  const union = new Set(studyDays.flatMap((day) => day.flashcard_ids || []));
  for (const cardId of week.flashcard_ids || []) {
    if (!union.has(cardId)) {
      errors.push(`Week ${week.week} week deck card ${cardId} is missing from the union of Days 1-5.`);
    }
  }

  const day7 = dayRecords.find((day) => day.day === 7);
  if (day7 && (day7.flashcard_ids?.length || 0) !== 0) {
    errors.push(`Week ${week.week} Day 7 must have an empty flashcard deck.`);
  }
}

const referencedGlossaryIds = new Set();
for (const week of study.weeks) (week.glossary_ids || []).forEach((id) => referencedGlossaryIds.add(id));
for (const day of study.days) (day.glossary_ids || []).forEach((id) => referencedGlossaryIds.add(id));
for (const deck of study.review_decks) (deck.glossary_ids || []).forEach((id) => referencedGlossaryIds.add(id));

for (const glossaryId of referencedGlossaryIds) {
  if (!glossaryById.has(glossaryId)) {
    errors.push(`Referenced glossary id ${glossaryId} does not exist in glossary.json.`);
  }
}

for (const entry of glossary) {
  const expected = new Set([
    `${entry.id}-definition`,
    `${entry.id}-mechanism`,
    `${entry.id}-scenario`
  ]);
  const actual = [...expected]
    .map((cardId) => cardsById.get(cardId))
    .filter(Boolean);
  if (actual.length !== 3) {
    errors.push(`Glossary entry ${entry.id} must have exactly 3 primary cards.`);
    continue;
  }
  for (const card of actual) {
    if (!expected.has(card.id)) {
      errors.push(`Glossary entry ${entry.id} has unexpected card id ${card.id}.`);
    }
  }
}

for (const card of flashcards) {
  const front = String(card.front || '');
  const back = String(card.back || '');
  const loweredFront = front.toLowerCase();

  for (const stem of bannedFrontStems) {
    if (loweredFront.includes(stem)) {
      errors.push(`Flashcard ${card.id} contains banned front stem: ${stem}`);
    }
  }

  if (card.id.endsWith('-scenario')) {
    const glossaryId = card.id.replace(/-scenario$/, '');
    const entry = glossaryById.get(glossaryId);
    if (!entry) {
      errors.push(`Scenario card ${card.id} does not map to a glossary entry.`);
    } else if (termAppearsInScenario(front, entry.term)) {
      errors.push(`Scenario front for ${card.id} contains the term "${entry.term}".`);
    }
  }

  const echo = sixWordEcho(front, back);
  if (echo) {
    errors.push(`Flashcard ${card.id} echoes a 6-word phrase from its back in the front: "${echo}"`);
  }
}

for (const week of study.weeks) {
  for (const cardId of week.flashcard_ids || []) {
    if (!cardsById.has(cardId)) {
      errors.push(`Week ${week.week} references missing flashcard ${cardId}.`);
    }
  }
}

for (const day of study.days) {
  for (const cardId of day.flashcard_ids || []) {
    if (!cardsById.has(cardId)) {
      errors.push(`Day ${day.id} references missing flashcard ${cardId}.`);
    }
  }
}

if (errors.length) {
  console.error(`audit:flashcards failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('audit:flashcards passed');
