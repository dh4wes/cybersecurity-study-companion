# Cybersecurity Study Companion

Static Astro application for a 32-week cybersecurity roadmap with a public study companion and a separate private notes workspace.

## What This Repo Ships

- Layer A: public study companion and portfolio routes
- Layer B: local-only notes tool at `/notes/`
- static Astro output
- GitHub Pages compatibility
- PWA installability
- offline-first browser persistence through IndexedDB
- optional Android packaging through Capacitor

## Quickstart

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run audit:flashcards
```

Android packaging:

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Core Constraints

- no backend
- no authentication
- no runtime AI dependency
- canonical curriculum content lives in JSON, not in page components
- public study UX stays separate from private notes UX

## Routes

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

Private local route:

- `/notes/`

## Canonical Content

Primary datasets:

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting datasets:

- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

Current totals:

- 32 weeks
- 224 day records
- 252 glossary terms
- 756 unique flashcards
- 32 weekly review decks

Top-level collections in `study-companion-v2.json`:

- `site`
- `core_pages`
- `resources`
- `weeks`
- `days`
- `security_journal_prompts`
- `portfolio_outputs`
- `review_decks`
- `metadata`

## Glossary And Flashcards

Glossary entries are canonical and use this shape:

```json
{
  "id": "tcp",
  "term": "TCP",
  "category": "Networking & Infrastructure",
  "bullets": [
    "Transport-layer protocol providing reliable ordered delivery of network data.",
    "Provides reliable in-order delivery between applications across an IP network.",
    "Establishes a session, tracks sequence numbers, and retransmits missing data to deliver ordered reliable streams."
  ]
}
```

Each glossary entry has exactly three bullets:

1. what it is
2. what it does
3. how it works

Flashcards are glossary-derived and use predictable IDs:

- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

Flashcard types:

- `definition`
- `understanding`
- `application`

## Day Deck Rules

- Days 1-5 contain only the new glossary terms and flashcards introduced that day
- Day 6 contains the full weekly review deck
- Day 7 contains no required new glossary or flashcards
- week detail pages render daily sessions as collapsed cards that expand on click

## Persistence

The app stores local state in IndexedDB:

- database: `cyber-study-db`
- object store: `kv`

Primary keys:

- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`
- `cyber-study-color-theme-v1`
- `cyber-study-typography-theme-v1`

Legacy localStorage values are migrated into IndexedDB on upgraded load.

## UX Systems

Color themes:

- `Current`
- `Inked`
- `Amethyst Mint`
- `Woodland`
- `Jade Pebble`
- `Cocoa Topaz`
- `Sorbet`
- `Pearl`
- `Driftwood Pearl`
- `Graphite`

Typography themes:

- `Default`
- `Ops Console`
- `Editor Clean`
- `Mono Range`

Boot intro behavior:

- shown once per browser session
- skippable immediately
- disabled for reduced-motion users

## Repo Structure

- `src/pages/`: route entrypoints
- `src/components/`: reusable UI
- `src/layouts/`: shared shell
- `src/styles/global.css`: design tokens and themes
- `src/scripts/`: page-specific browser modules
- `src/scripts/runtime/client-utils.js`: shared browser helpers
- `src/lib/site-data.js`: normalized content access layer
- `src/lib/anki-export.js`: TSV export builder
- `src/data/content/`: canonical content datasets
- `scripts/audit_flashcards.mjs`: glossary/flashcard regression audit

## Documentation Map

- `README.md`: repo orientation and operating guide
- `docs/master.md`: full app architecture, behavior, UX, data, persistence, and verification reference
- `docs/content.md`: in-depth review of the curriculum basis, source mix, coverage, and study level

## Current Navigation Model

- `/roadmap/` is the single overview surface for all weeks
- `/weeks/<slug>/` remains the detailed per-week route
- there is no separate `/weeks/` archive route

## Verification

Run these after changing app logic or content:

```bash
npm run audit:flashcards
npm run build
```
