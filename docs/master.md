# Master Report

## Purpose

This document is the primary technical and product reference for the app. It replaces the older split docs and is intended to stay synchronized with the shipped implementation.

The application is a static Astro study companion for a 32-week cybersecurity roadmap. It combines:

- a public curriculum and portfolio surface
- a private local-first notes workspace
- precomputed glossary and flashcard data
- browser-only persistence
- offline-capable static delivery

## Product Boundaries

### What the app is

- a static study companion
- a portfolio-facing roadmap
- a glossary and flashcard reference built from canonical content
- a progress tracker stored locally in the browser
- a private notes tool with export/import

### What the app is not

- not a SaaS product
- not a multi-user app
- not server-backed
- not authenticated
- not AI-generated at runtime

## Current Live Scope

Canonical dataset totals:

- 32 weeks
- 224 day records
- 252 glossary entries
- 756 unique flashcards
- 32 review decks

Phase structure:

- Foundation
- Networking
- Security
- GRC / Application
- Buffer / Final Review

## Architecture

### Stack

- Astro
- vanilla JavaScript
- IndexedDB
- `@vite-pwa/astro`
- optional Capacitor Android packaging

### Static-first design

The app is designed to work as fully static output:

- route HTML is generated at build time
- canonical content is loaded from local JSON files
- user state is stored only in the browser
- no runtime API is required for core study functionality

### Data flow

1. Canonical content is stored in `src/data/content/`.
2. `src/lib/site-data.js` normalizes weeks, days, glossary, flashcards, review decks, and route metadata.
3. Astro pages consume normalized data and render static pages.
4. Page-specific scripts attach filtering, export, progress, and note behaviors.
5. IndexedDB persists progress, notes, export metadata, and UX preferences.

## Canonical Content Model

Primary data files:

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting data files:

- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

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

### Glossary

The glossary is the source of truth for study terminology.

Schema:

- `id`
- `term`
- `category`
- `bullets`

Bullet contract:

1. what it is
2. what it does
3. how it works

### Flashcards

Flashcards are glossary-derived canonical records.

Schema:

- `id`
- `type`
- `difficulty`
- `front`
- `back`

Supported card types:

- `definition`
- `understanding`
- `application`

Primary card ID convention:

- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

### Week and day decks

Each instructional day references:

- `glossary_ids`
- `flashcard_ids`

Current behavior:

- Days 1-5 contain only that day’s newly introduced terms and flashcards
- Day 6 contains the full weekly review deck
- Day 7 is intentionally empty for new glossary and flashcards

This is a deliberate anti-repetition rule because spaced review is handled by the user’s study flow and review decks, not by re-listing prior cards every day.

## Route Inventory

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

## Page Behavior

### Home

- current phase and week summary
- direct links into roadmap, glossary, flashcards, progress, resources, and notes
- progress snapshot driven by local browser state

### Roadmap

- single overview surface for all 32 weeks
- grouped by phase
- week cards include focus, deliverable, checkpoint, primary resource, progress, and completion toggle
- replaces the removed standalone week-archive route

### Week detail pages

- focus, deliverable, and checkpoint summary
- seven daily sessions
- daily sessions render as small collapsed cards and expand on click
- day-level glossary and flashcards reflect only that day’s assigned deck
- progress controls and day-level Anki export remain on the page

### Glossary

- canonical glossary explorer
- search plus category, phase, and week filtering

### Flashcards

- canonical flashcard explorer
- filters for search, phase, week, day, type, and difficulty
- answer reveal UI
- TSV export for full or filtered sets

### Progress

- total completion
- phase and week completion
- blocked-item tracking
- next unfinished task
- next deliverable
- import/export/reset of progress

### Notes

- day notes
- week reflections
- security journal notes
- Markdown export
- JSON import/export

### Resources

- grouped resource catalog
- best-week mapping
- use case and notes for each source

### About

- product framing
- study-roadmap explanation
- workbook workload model summary table

## Persistence Model

Primary backend:

- IndexedDB

Database:

- `cyber-study-db`

Object store:

- `kv`

Primary keys:

- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

UX preference keys:

- `cyber-study-color-theme-v1`
- `cyber-study-typography-theme-v1`

Legacy localStorage values are migrated forward on upgraded load.

## UX System

### Theme system

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

### Motion and entry behavior

- boot intro runs once per browser session
- boot intro is skippable
- reduced-motion users do not get the animated intro
- week-detail day cards do not auto-open on page load

## Quality Controls

Primary regression audit:

- `scripts/audit_flashcards.mjs`

Current checks:

- Days 1-5 are not identical
- Days 1-5 do not repeat flashcards before review day
- the union of Days 1-5 covers the full week deck
- glossary references resolve
- each glossary term has exactly three primary cards
- banned flashcard stems are blocked
- scenario cards do not contain the answer term
- front/back echo issues are caught

## Build and Deployment

Daily development:

```bash
npm install
npm run dev
```

Verification:

```bash
npm run audit:flashcards
npm run build
```

Preview:

```bash
npm run preview
```

Android packaging:

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Repo Layout

- `src/pages/`: route entrypoints
- `src/components/`: reusable UI
- `src/layouts/`: shell and document structure
- `src/styles/global.css`: tokens and theme styles
- `src/scripts/`: route-specific browser logic
- `src/scripts/runtime/client-utils.js`: shared client helpers
- `src/lib/site-data.js`: normalized content access layer
- `src/lib/anki-export.js`: TSV export logic
- `src/data/content/`: canonical study data
- `docs/master.md`: this document
- `docs/content.md`: curriculum and source-basis review

## Maintenance Rules

- update this doc when app behavior, route inventory, storage keys, or architecture changes
- update `docs/content.md` when the study basis, source mix, or coverage strategy changes
- keep README concise and use these two docs as the durable deep references
