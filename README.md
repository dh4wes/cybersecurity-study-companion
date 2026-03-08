# Cybersecurity Study Companion

Static Astro app for a 32-week cybersecurity roadmap with:

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

- 32 weeks
- 224 day records
- 252 glossary entries
- 756 unique flashcards
- 32 review decks

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

## Repo Layout

- `src/pages/`: route entrypoints
- `src/components/`: reusable UI
- `src/layouts/`: document shell
- `src/styles/global.css`: tokens, glass treatment, layout rules, theme styles
- `src/scripts/`: browser-side page logic and persistence
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
