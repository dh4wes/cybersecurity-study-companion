# Cybersecurity Study Companion

Static Astro app for a 29-week cybersecurity roadmap with:

- a public study companion and portfolio surface
- a private local-first notes workspace
- canonical glossary and flashcard data
- browser-only progress tracking
- offline-capable static delivery

## Quickstart

```bash
npm install
npm run dev
```

Core checks:

```bash
npm run audit:flashcards
npm run validate:glossary
npm run build
```

Other useful commands:

```bash
npm run preview
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Current App Shape

Public routes:

- `/`
- `/roadmap/`
- `/weeks/<slug>/`
- `/resources/`
- `/glossary/`
- `/flashcards/`
- `/flashcards/export/`
- `/security-journal/`
- `/progress/`
- `/about/`
- `/offline/`

Local-only route:

- `/notes/`

Current data totals:

- 29 weeks
- 203 day records
- 252 glossary entries
- 1008 flashcards
- 29 review decks

## Canonical Data

Primary files:

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting files:

- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

Key deck rules:

- Days 1-5 list only newly introduced glossary terms and flashcards
- Day 6 is the weekly review deck
- Day 7 has no new glossary or flashcards

## Persistence

User state is local only.

Progress and notes:

- primary backend: IndexedDB
- database: `cyber-study-db`
- store: `kv`
- fallback: localStorage when IndexedDB is unavailable

Content-state keys:

- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Preference-state keys:

- `cyber-study-color-theme-v1`
- `cyber-study-typography-theme-v1`

Legacy progress and notes values are migrated forward into IndexedDB. Theme preferences remain localStorage-backed.

## Theme System

Color themes:

- `Shield Blue` (default)
- `Banner`
- `Charcoal`
- `Red Acrylic`
- `Ochre`
- `Parchment`
- `Bone`

Typography themes:

- `Default`
- `Ops Console`
- `Editor Clean`
- `Mono Range`

Layout behavior:

- desktop uses a compact top header plus roadmap-style nav
- mobile shows the banner first, then pins the nav to the top once it reaches it
- mobile theme controls live in the footer
- current shared banner asset: `public/images/site-banner.png`
- first-load session shows a non-skippable boot intro, then a binary curtain transition

## Repo Layout

- `src/pages/`: route entrypoints
- `src/components/`: reusable UI
- `src/layouts/`: document shell
- `src/styles/global.css`: tokens, glass treatment, layout rules, theme styles
- `src/styles/boot-intro.css`: boot intro and binary-curtain transition styles
- `src/scripts/`: browser-side page logic and persistence
- `src/scripts/boot-intro.js`: timed boot-sequence and curtain animation controller
- `src/lib/site-data.js`: normalized study-content access layer
- `src/lib/theme-options.js`: shared theme metadata
- `src/lib/anki-export.js`: flashcard TSV export logic
- `src/data/content/`: canonical study datasets
- `public/images/`: banner and background artwork used by the shell themes
- `scripts/audit_flashcards.mjs`: content regression audit

## Docs

- `docs/master.md`: full technical and product reference
- `docs/content.md`: curriculum basis, source mix, and coverage-depth review

The older split docs were retired. These two files are the maintained references.

## Glossary concept model

Glossary entries now support a richer concept-model structure:

- `definition`, `purpose`, `mechanism`
- `model` arrays for `components`, `process`, `contrasts_with`, `common_confusions`, and `exam_traps`
- `bullets` remains for UI compatibility and must match the three strings above

Migration and validation:

- `npm run migrate:glossary` upgrades `src/data/content/glossary.json` in place and creates a timestamped backup
- `npm run validate:glossary` enforces required fields, banned boilerplate, bullets alignment, and mechanism-verb presence

## Daily mini lectures

The repo now includes a generated daily lecture pack grounded in the live canonical syllabus.

- Markdown files for NotebookLM live in `docs/notebooklm/daily-lectures/`
- Matching app-ingestable JSON files live in `src/data/content/daily-lectures/`
- The lectures align by week range to A+ Core 1, A+ Core 2, Network+, the Google Cybersecurity Certificate, and Security+ where the current syllabus genuinely overlaps
- The current lecture pack follows the live canonical data set, which is 29 active weeks rather than the older 32-week prompt assumption

Generation and validation:

- `npm run generate:lectures` rebuilds the lecture Markdown, JSON files, and manifest from canonical content
- `npm run validate:lectures` checks coverage, metadata, content-length targets, banned filler phrases, canonical glossary/flashcard references, and manifest completeness

NotebookLM workflow:

- Ingest `docs/notebooklm/daily-lectures/` as a folder so NotebookLM can connect week overviews to individual day lectures through the stable naming scheme and metadata blocks

## Today's Lecture

The app includes a single-current-lecture reading route at `/todays-lecture/`.

- It chooses the next lecture target from local completion state, using the first unfinished day in chronological order
- Blocked days are still shown and are not skipped automatically
- Marking the current lecture complete immediately advances the view to the next unfinished lecture
