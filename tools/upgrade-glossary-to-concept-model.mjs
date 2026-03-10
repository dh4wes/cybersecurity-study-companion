#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const GLOSSARY_PATH = path.join(process.cwd(), 'src', 'data', 'content', 'glossary.json');

const REQUIRED_MODEL_KEYS = [
  'components',
  'process',
  'contrasts_with',
  'common_confusions',
  'exam_traps'
];

const MECHANISM_VERBS = [
  'advertise',
  'advertises',
  'aggregate',
  'aggregates',
  'accumulate',
  'accumulates',
  'allocate',
  'allocates',
  'analyze',
  'analyzes',
  'add',
  'adds',
  'apply',
  'applies',
  'appear',
  'appears',
  'abstract',
  'abstracts',
  'assign',
  'assigns',
  'authenticate',
  'authenticates',
  'authorize',
  'authorizes',
  'abuse',
  'abuses',
  'block',
  'blocks',
  'boot',
  'boots',
  'break',
  'breaks',
  'broadcast',
  'broadcasts',
  'build',
  'builds',
  'cache',
  'caches',
  'capture',
  'captures',
  'check',
  'checks',
  'choose',
  'chooses',
  'chain',
  'chains',
  'collect',
  'collects',
  'combine',
  'combines',
  'compare',
  'compares',
  'compress',
  'compresses',
  'connect',
  'connects',
  'condense',
  'condenses',
  'convert',
  'converts',
  'count',
  'counts',
  'create',
  'creates',
  'decode',
  'decodes',
  'decapsulate',
  'decapsulates',
  'define',
  'defines',
  'derive',
  'derives',
  'detect',
  'detects',
  'depend',
  'depends',
  'direct',
  'directs',
  'distill',
  'distills',
  'document',
  'documents',
  'divide',
  'divides',
  'enumerate',
  'enumerates',
  'encrypt',
  'encrypts',
  'estimate',
  'estimates',
  'establish',
  'establishes',
  'evaluate',
  'evaluates',
  'execute',
  'executes',
  'expose',
  'exposes',
  'fetch',
  'fetches',
  'filter',
  'filters',
  'forward',
  'forwards',
  'follow',
  'follows',
  'generate',
  'generates',
  'grant',
  'grants',
  'group',
  'groups',
  'handle',
  'handles',
  'hash',
  'hashes',
  'hold',
  'holds',
  'identify',
  'identifies',
  'initialize',
  'initializes',
  'inspect',
  'inspects',
  'isolate',
  'isolates',
  'join',
  'joins',
  'launch',
  'launches',
  'limit',
  'limits',
  'link',
  'links',
  'listen',
  'listens',
  'learn',
  'learns',
  'load',
  'loads',
  'log',
  'logs',
  'map',
  'maps',
  'mark',
  'marks',
  'match',
  'matches',
  'monitor',
  'monitors',
  'move',
  'moves',
  'manipulate',
  'manipulates',
  'negotiate',
  'negotiates',
  'order',
  'orders',
  'organize',
  'organizes',
  'pair',
  'pairs',
  'parse',
  'parses',
  'package',
  'packages',
  'preserve',
  'preserves',
  'present',
  'presents',
  'process',
  'processes',
  'protect',
  'protects',
  'provide',
  'provides',
  'pipeline',
  'pipelines',
  'rank',
  'ranks',
  'read',
  'reads',
  'receive',
  'receives',
  'record',
  'records',
  'repeat',
  'repeats',
  'represent',
  'represents',
  'request',
  'requests',
  'resolve',
  'resolves',
  'respond',
  'responds',
  'restore',
  'restores',
  'reflect',
  'reflects',
  'reverse',
  'reverses',
  'rewrite',
  'rewrites',
  'retransmit',
  'retransmits',
  'route',
  'routes',
  'schedule',
  'schedules',
  'score',
  'scores',
  'secure',
  'secures',
  'separate',
  'separates',
  'segment',
  'segments',
  'select',
  'selects',
  'send',
  'sends',
  'sort',
  'sorts',
  'start',
  'starts',
  'store',
  'stores',
  'trace',
  'traces',
  'synchronize',
  'synchronizes',
  'tag',
  'tags',
  'track',
  'tracks',
  'transfer',
  'transfers',
  'translate',
  'translates',
  'transmit',
  'transmits',
  'run',
  'runs',
  'update',
  'updates',
  'use',
  'uses',
  'validate',
  'validates',
  'wrap',
  'wraps',
  'encode',
  'encodes',
  'measure',
  'measures',
  'query',
  'queries',
  'rebuild',
  'rebuilds',
  'become',
  'becomes',
  'write',
  'writes'
];

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringifyStable(value) {
  return JSON.stringify(value, null, 2) + '\n';
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function atomicWriteFile(targetPath, content) {
  const dir = path.dirname(targetPath);
  const base = path.basename(targetPath);
  const tempPath = path.join(dir, `.${base}.tmp-${Date.now()}`);
  await fs.writeFile(tempPath, content, 'utf8');
  await fs.rename(tempPath, targetPath);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function ensureSentence(text) {
  const value = String(text || '').trim();
  if (!value) return '';
  return /[.?!]$/.test(value) ? value : `${value}.`;
}

function normalizeStringArray(values) {
  return values.filter((value) => typeof value === 'string').map((value) => value.trim()).filter(Boolean);
}

function inferComponentsFromMentionedTerms({ entryId, text, allTerms }) {
  const components = [];
  for (const termInfo of allTerms) {
    if (termInfo.id === entryId) continue;
    const safeTerm = termInfo.term.trim();
    if (safeTerm.length < 3) continue;
    const looksMatchable = /^[a-z0-9][a-z0-9 \-\/+()]*[a-z0-9)]$/i.test(safeTerm);
    const matched = looksMatchable
      ? new RegExp(`\\b${escapeRegExp(safeTerm)}\\b`, 'i').test(text)
      : text.toLowerCase().includes(safeTerm.toLowerCase());
    if (matched) components.push(safeTerm);
    if (components.length >= 8) break;
  }
  return components;
}

function inferProcessFromMechanism(mechanism) {
  const source = String(mechanism || '').trim();
  if (!source) return [];

  const hasMechanismVerb = MECHANISM_VERBS.some((verb) =>
    new RegExp(`\\b${escapeRegExp(verb)}\\b`, 'i').test(source)
  );
  if (!hasMechanismVerb) return [];

  const roughClauses = source
    .replace(/\s+/g, ' ')
    .split(/[,;]+/g)
    .map((clause) => clause.trim())
    .filter(Boolean);

  const steps = [];
  for (const clause of roughClauses) {
    const containsVerb = MECHANISM_VERBS.some((verb) =>
      new RegExp(`\\b${escapeRegExp(verb)}\\b`, 'i').test(clause)
    );
    if (!containsVerb) continue;

    const excerpt = clause
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 8)
      .join(' ')
      .replace(/[.?!]+$/, '');

    if (excerpt.length >= 8 && !steps.includes(excerpt)) steps.push(excerpt);
    if (steps.length >= 4) break;
  }

  if (steps.length === 0) {
    const fallback = source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 10)
      .join(' ')
      .replace(/[.?!]+$/, '');
    if (fallback) steps.push(fallback);
  }

  return steps;
}

function ensureModelShape(modelMaybe) {
  const model = isPlainObject(modelMaybe) ? { ...modelMaybe } : {};
  for (const key of REQUIRED_MODEL_KEYS) {
    if (!Array.isArray(model[key])) model[key] = [];
    model[key] = normalizeStringArray(model[key]);
  }
  return model;
}

function upgradeEntry(entry, allTerms) {
  if (!isPlainObject(entry)) return entry;

  const id = typeof entry.id === 'string' ? entry.id : '';
  const term = typeof entry.term === 'string' ? entry.term : '';
  const category = typeof entry.category === 'string' ? entry.category : '';

  const bullets = Array.isArray(entry.bullets) ? entry.bullets.slice() : null;

  let definition = typeof entry.definition === 'string' ? entry.definition.trim() : '';
  let purpose = typeof entry.purpose === 'string' ? entry.purpose.trim() : '';
  let mechanism = typeof entry.mechanism === 'string' ? entry.mechanism.trim() : '';

  if (bullets && bullets.length === 3 && bullets.every((bullet) => typeof bullet === 'string')) {
    definition = bullets[0];
    purpose = bullets[1];
    mechanism = bullets[2];
  }

  definition = ensureSentence(definition);
  purpose = ensureSentence(purpose);
  mechanism = ensureSentence(mechanism);

  const finalBullets = [definition, purpose, mechanism];
  const model = ensureModelShape(entry.model);
  const combinedText = [definition, purpose, mechanism].filter(Boolean).join(' ');

  if (model.components.length === 0 && combinedText) {
    model.components = inferComponentsFromMentionedTerms({
      entryId: id,
      text: combinedText,
      allTerms
    });
  }

  if (model.process.length === 0 && mechanism) {
    model.process = inferProcessFromMechanism(mechanism);
  }

  const { definition: _definition, purpose: _purpose, mechanism: _mechanism, model: _model, bullets: _bullets, ...rest } =
    entry;

  return {
    ...rest,
    id,
    term,
    category,
    definition,
    purpose,
    mechanism,
    model,
    bullets: finalBullets
  };
}

async function main() {
  if (!(await fileExists(GLOSSARY_PATH))) {
    console.error(`[migrate:glossary] ERROR: Missing glossary file at: ${GLOSSARY_PATH}`);
    console.error('[migrate:glossary] If your repo uses a different path, mark it UNSPECIFIED and update this script.');
    process.exit(1);
  }

  const raw = await fs.readFile(GLOSSARY_PATH, 'utf8');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error('[migrate:glossary] ERROR: glossary.json is not valid JSON.');
    console.error(error);
    process.exit(1);
  }

  if (!Array.isArray(parsed)) {
    console.error('[migrate:glossary] ERROR: glossary.json must be a JSON array of entries.');
    process.exit(1);
  }

  const allTerms = parsed
    .filter(isPlainObject)
    .map((entry) => ({
      id: typeof entry.id === 'string' ? entry.id : '',
      term: typeof entry.term === 'string' ? entry.term : ''
    }))
    .filter((entry) => entry.id && entry.term)
    .sort((a, b) => b.term.length - a.term.length);

  const upgraded = parsed.map((entry) => upgradeEntry(entry, allTerms));
  const upgradedString = stringifyStable(upgraded);
  const normalizedRaw = raw.endsWith('\n') ? raw : `${raw}\n`;

  if (upgradedString === normalizedRaw) {
    console.log('[migrate:glossary] No changes needed (already upgraded / idempotent).');
    return;
  }

  const backupPath = `${GLOSSARY_PATH}.bak-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  await fs.copyFile(GLOSSARY_PATH, backupPath);
  console.log(`[migrate:glossary] Backup created: ${backupPath}`);

  await atomicWriteFile(GLOSSARY_PATH, upgradedString);
  console.log(`[migrate:glossary] Updated glossary written atomically: ${GLOSSARY_PATH}`);
  console.log("[migrate:glossary] Next: run 'npm run validate:glossary' and fix any violations before committing.");
}

main().catch((error) => {
  console.error('[migrate:glossary] Unhandled error:');
  console.error(error);
  process.exit(1);
});
