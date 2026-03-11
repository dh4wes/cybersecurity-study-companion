#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const STUDY_PATH = path.join(ROOT, 'src', 'data', 'content', 'study-companion-v2.json');
const GLOSSARY_PATH = path.join(ROOT, 'src', 'data', 'content', 'glossary.json');
const FLASHCARDS_PATH = path.join(ROOT, 'src', 'data', 'content', 'flashcards.json');
const DOCS_DIR = path.join(ROOT, 'docs', 'notebooklm', 'daily-lectures');
const JSON_DIR = path.join(ROOT, 'src', 'data', 'content', 'daily-lectures');
const MANIFEST_PATH = path.join(JSON_DIR, 'lectures-manifest.json');

const REQUIRED_JSON_FIELDS = [
  'id',
  'week',
  'day',
  'slug',
  'title',
  'phase',
  'session_type',
  'primary_exam',
  'objective',
  'glossary_ids',
  'flashcard_ids',
  'resource_names',
  'estimated_read_minutes',
  'plain_language_intro',
  'mini_lecture_markdown',
  'exam_relevance_markdown',
  'key_distinctions',
  'mental_model_markdown',
  'self_check_prompts',
  'quick_recap',
  'resource_anchors'
];

const REQUIRED_METADATA_KEYS = [
  'id',
  'week',
  'day',
  'slug',
  'phase',
  'session_type',
  'title',
  'objective',
  'primary_exam',
  'secondary_exam',
  'resource_names',
  'glossary_terms',
  'glossary_ids',
  'flashcard_ids',
  'estimated_read_minutes'
];

const BANNED_PHRASES = [
  'In today’s rapidly evolving digital landscape',
  'It is important to note that',
  'This plays a crucial role',
  'As we can see'
];

function wordCount(value) {
  return String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split('\n')) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const raw = line.slice(separatorIndex + 1).trim();
    if (!key) continue;
    try {
      if (raw === 'null') {
        data[key] = null;
      } else if (raw.startsWith('[') || raw.startsWith('{') || raw.startsWith('"')) {
        data[key] = JSON.parse(raw);
      } else if (/^-?\d+(\.\d+)?$/.test(raw)) {
        data[key] = Number(raw);
      } else {
        data[key] = raw;
      }
    } catch {
      data[key] = raw;
    }
  }
  return data;
}

function includesBannedPhrase(text) {
  const lower = String(text || '').toLowerCase();
  return BANNED_PHRASES.find((phrase) => lower.includes(phrase.toLowerCase())) || null;
}

async function main() {
  const [study, glossary, flashcards, manifest] = await Promise.all([
    readJson(STUDY_PATH),
    readJson(GLOSSARY_PATH),
    readJson(FLASHCARDS_PATH),
    readJson(MANIFEST_PATH)
  ]);

  const glossaryIds = new Set(glossary.map((entry) => entry.id));
  const flashcardIds = new Set(flashcards.map((entry) => entry.id));
  const errors = [];

  for (const week of study.weeks) {
    const overviewPath = path.join(DOCS_DIR, `week-${String(week.week).padStart(2, '0')}-overview.md`);
    if (!(await fileExists(overviewPath))) {
      errors.push(`Missing week overview: ${overviewPath}`);
    }
  }

  const manifestLectureIds = new Set((manifest.lectures || []).map((entry) => entry.id));

  for (const day of study.days) {
    const markdownPath = path.join(DOCS_DIR, `${day.id}.md`);
    const jsonPath = path.join(JSON_DIR, `${day.id}.json`);

    if (!(await fileExists(markdownPath))) errors.push(`Missing Markdown lecture for ${day.id}`);
    if (!(await fileExists(jsonPath))) errors.push(`Missing JSON lecture for ${day.id}`);
    if (!manifestLectureIds.has(day.id)) errors.push(`Manifest missing day lecture ${day.id}`);

    if (!(await fileExists(markdownPath)) || !(await fileExists(jsonPath))) continue;

    const markdown = await fs.readFile(markdownPath, 'utf8');
    const data = await readJson(jsonPath);
    const metadata = parseFrontmatter(markdown);

    if (!metadata) {
      errors.push(`Markdown frontmatter missing in ${day.id}`);
      continue;
    }

    for (const key of REQUIRED_METADATA_KEYS) {
      if (!(key in metadata)) errors.push(`${day.id}: missing metadata field ${key}`);
    }

    for (const key of REQUIRED_JSON_FIELDS) {
      if (!(key in data)) errors.push(`${day.id}: missing JSON field ${key}`);
    }

    if (day.session_type !== 'Rest' && !String(data.primary_exam || '').trim()) {
      errors.push(`${day.id}: primary_exam must be set for non-rest days`);
    }

    const bodyWords = wordCount(data.mini_lecture_markdown);
    if (day.session_type === 'Study' && (bodyWords < 300 || bodyWords > 750)) {
      errors.push(`${day.id}: study-day mini lecture out of range (${bodyWords} words)`);
    }
    if (day.session_type === 'Review' && (bodyWords < 250 || bodyWords > 600)) {
      errors.push(`${day.id}: review-day mini lecture out of range (${bodyWords} words)`);
    }
    if (day.session_type === 'Rest' && (bodyWords < 80 || bodyWords > 180)) {
      errors.push(`${day.id}: rest-day mini lecture out of range (${bodyWords} words)`);
    }

    if (day.session_type === 'Review') {
      const lower = String(data.mini_lecture_markdown || '').toLowerCase();
      if (!lower.includes('synthesis') && !lower.includes('retrieve') && !lower.includes('review')) {
        errors.push(`${day.id}: review-day lecture does not read as synthesis-focused`);
      }
    }

    const allText = `${markdown}\n${JSON.stringify(data)}`;
    const banned = includesBannedPhrase(allText);
    if (banned) errors.push(`${day.id}: banned filler phrase found: ${banned}`);

    for (const glossaryId of data.glossary_ids || []) {
      if (!glossaryIds.has(glossaryId)) errors.push(`${day.id}: unknown glossary id ${glossaryId}`);
    }

    for (const flashcardId of data.flashcard_ids || []) {
      if (!flashcardIds.has(flashcardId)) errors.push(`${day.id}: unknown flashcard id ${flashcardId}`);
    }
  }

  const expectedDays = study.days.length;
  const actualManifestDays = (manifest.lectures || []).length;
  if (expectedDays !== actualManifestDays) {
    errors.push(`Manifest lecture count mismatch: expected ${expectedDays}, found ${actualManifestDays}`);
  }

  if (errors.length > 0) {
    console.error(`[validate:lectures] FAILED with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`[validate:lectures] OK: ${study.weeks.length} week overviews and ${study.days.length} day lectures validated.`);
}

main().catch((error) => {
  console.error('[validate:lectures] Unhandled error');
  console.error(error);
  process.exit(1);
});
