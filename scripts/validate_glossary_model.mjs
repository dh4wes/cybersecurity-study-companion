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

const BANNED_PHRASES = [
  'plays a key role',
  'is important in',
  'operates within',
  'sits within',
  'functions within',
  'within endpoint hardware and platform operations',
  'within host administration and operating system workflows',
  'within routed and switched network environments',
  'within monitoring, investigation, and response workflows',
  'within governance, risk, and compliance workflows'
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

function normalizeWhitespace(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function containsBannedPhrase(text) {
  const lower = normalizeWhitespace(text).toLowerCase();
  return BANNED_PHRASES.find((phrase) => lower.includes(phrase.toLowerCase())) || null;
}

function hasMechanismVerb(mechanism) {
  const value = normalizeWhitespace(mechanism).toLowerCase();
  if (!value) return false;
  return MECHANISM_VERBS.some((verb) => new RegExp(`\\b${verb}\\b`, 'i').test(value));
}

function validateArrayOfStrings(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

async function main() {
  let raw;
  try {
    raw = await fs.readFile(GLOSSARY_PATH, 'utf8');
  } catch {
    console.error(`[validate:glossary] ERROR: Missing glossary file at: ${GLOSSARY_PATH}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    console.error('[validate:glossary] ERROR: glossary.json is not valid JSON.');
    console.error(error);
    process.exit(1);
  }

  if (!Array.isArray(data)) {
    console.error('[validate:glossary] ERROR: glossary.json must be an array.');
    process.exit(1);
  }

  const errors = [];
  const seenIds = new Set();

  data.forEach((entry, index) => {
    const prefix = `Entry[${index}]`;

    if (!isPlainObject(entry)) {
      errors.push(`${prefix}: not an object`);
      return;
    }

    const { id, term, category, definition, purpose, mechanism, bullets, model } = entry;

    if (typeof id !== 'string' || !id.trim()) errors.push(`${prefix}: missing/invalid id`);
    if (typeof term !== 'string' || !term.trim()) errors.push(`${prefix}: missing/invalid term`);
    if (typeof category !== 'string' || !category.trim()) errors.push(`${prefix}: missing/invalid category`);

    if (typeof id === 'string' && id.trim()) {
      if (seenIds.has(id)) errors.push(`${prefix}: duplicate id "${id}"`);
      seenIds.add(id);
    }

    if (typeof definition !== 'string' || !normalizeWhitespace(definition)) {
      errors.push(`${prefix} (${id}): missing/invalid definition`);
    }
    if (typeof purpose !== 'string' || !normalizeWhitespace(purpose)) {
      errors.push(`${prefix} (${id}): missing/invalid purpose`);
    }
    if (typeof mechanism !== 'string' || !normalizeWhitespace(mechanism)) {
      errors.push(`${prefix} (${id}): missing/invalid mechanism`);
    }

    for (const [fieldName, value] of [
      ['definition', definition],
      ['purpose', purpose],
      ['mechanism', mechanism]
    ]) {
      if (typeof value !== 'string') continue;
      const banned = containsBannedPhrase(value);
      if (banned) errors.push(`${prefix} (${id}): banned phrase "${banned}" found in ${fieldName}`);
    }

    if (typeof mechanism === 'string' && normalizeWhitespace(mechanism) && !hasMechanismVerb(mechanism)) {
      errors.push(
        `${prefix} (${id}): mechanism does not contain a mechanism verb (e.g., uses/sends/assigns/routes/validates/...)`
      );
    }

    if (!Array.isArray(bullets)) {
      errors.push(`${prefix} (${id}): bullets missing or not an array`);
    } else {
      if (bullets.length !== 3) errors.push(`${prefix} (${id}): bullets must have length 3 (has ${bullets.length})`);
      if (!bullets.every((bullet) => typeof bullet === 'string')) {
        errors.push(`${prefix} (${id}): bullets must be strings`);
      }

      if (bullets.length === 3 && bullets.every((bullet) => typeof bullet === 'string')) {
        if (normalizeWhitespace(bullets[0]) !== normalizeWhitespace(definition)) {
          errors.push(`${prefix} (${id}): bullets[0] does not match definition`);
        }
        if (normalizeWhitespace(bullets[1]) !== normalizeWhitespace(purpose)) {
          errors.push(`${prefix} (${id}): bullets[1] does not match purpose`);
        }
        if (normalizeWhitespace(bullets[2]) !== normalizeWhitespace(mechanism)) {
          errors.push(`${prefix} (${id}): bullets[2] does not match mechanism`);
        }
      }
    }

    if (!isPlainObject(model)) {
      errors.push(`${prefix} (${id}): model missing or not an object`);
      return;
    }

    for (const key of REQUIRED_MODEL_KEYS) {
      if (!(key in model)) errors.push(`${prefix} (${id}): model.${key} missing`);
      if (!validateArrayOfStrings(model[key])) errors.push(`${prefix} (${id}): model.${key} must be an array of strings`);
    }
  });

  if (errors.length > 0) {
    console.error(`[validate:glossary] FAILED with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`[validate:glossary] OK: ${data.length} entries validated successfully.`);
}

main().catch((error) => {
  console.error('[validate:glossary] Unhandled error:');
  console.error(error);
  process.exit(1);
});
