# Master Report

## Purpose

This is the canonical technical reference for the app. It should track the shipped implementation, not historical planning states.

## Product Summary

The app is a static Astro study companion for a 32-week cybersecurity roadmap. It combines:

- public roadmap, glossary, flashcards, resources, and progress views
- a private local-first notes workspace
- canonical JSON-driven study content
- browser-only persistence
- offline-capable delivery

It is intentionally:

- static
- single-user
- unauthenticated
- serverless for core use

## Current Scope

Live content totals:

- 32 weeks
- 224 day records
- 252 glossary entries
- 756 unique flashcards
- 32 weekly review decks

Phase structure:

- Foundation
- Networking
- Security
- GRC / Application
- Buffer / Final Review

## Architecture

Stack:

- Astro
- vanilla JavaScript
- IndexedDB
- `@vite-pwa/astro`
- optional Capacitor Android packaging

Flow:

1. Canonical content lives in `src/data/content/`.
2. `src/lib/site-data.js` normalizes weeks, days, glossary, flashcards, review decks, and route metadata.
3. Astro routes render static HTML from normalized content.
4. Page-specific client scripts add filtering, export, progress, theme, and notes behavior.
5. IndexedDB stores user state and preference data.

## Canonical Data Model

Primary files:

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting files:

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

Glossary entries are the terminology source of truth.

Shape:

- `id`
- `term`
- `category`
- `bullets`

Bullet contract:

1. what it is
2. what it does
3. how it works

### Flashcards

Flashcards are canonical records derived from glossary content.

Main card IDs:

- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

Card types:

- `definition`
- `understanding`
- `application`

### Day deck rules

- Days 1-5 contain only the newly introduced glossary terms and flashcards for that day
- Day 6 is the full weekly review deck
- Day 7 is intentionally empty for new glossary and flashcards

This prevents forced repetition inside the app while preserving weekly review.

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

Local-only route:

- `/notes/`

There is no standalone `/weeks/` archive route. `/roadmap/` is the single overview surface.

## Current UX Behavior

### Header and navigation

- desktop uses a compact header plus top navigation
- desktop does not show the large banner in the header
- mobile shows the banner as a scrollable top section
- mobile navigation sits below the banner on load, then becomes sticky at the top once reached
- mobile theme controls live in the footer
- the shared banner art is served from `public/images/site-banner-optimized.jpg`

### Home

- shows current phase/week
- summarizes the current week
- shows a progress snapshot

### Roadmap

- grouped by phase
- week cards show focus, deliverable, checkpoint, resource, and completion state

### Week pages

- daily sessions render as collapsed cards
- cards expand on click
- day cards contain only that day’s assigned glossary and flashcards
- progress controls are local-state driven

### About

- top card uses the banner artwork
- supporting cards explain site purpose and roadmap coverage
- workload model table is pulled from workbook enrichment data

### Theme system

Typography themes:

- `Default`
- `Ops Console`
- `Editor Clean`
- `Mono Range`

Color themes:

- `Shield Blue` (default)
- `Banner`
- `Charcoal`
- `Red Acrylic`
- `Ochre`
- `Parchment`
- `Bone`

Theme metadata is centralized in `src/lib/theme-options.js`.

## Persistence

Primary content-state backend:

- IndexedDB

Database:

- `cyber-study-db`

Store:

- `kv`

Content-state keys:

- `progress`
- `notes`
- `noteExportMeta`

Legacy localStorage keys still recognized for migration and fallback:

- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Preference keys:

- `cyber-study-color-theme-v1`
- `cyber-study-typography-theme-v1`

Behavior:

- progress and notes load from IndexedDB when available
- progress and notes fall back to localStorage when IndexedDB is unavailable
- theme preferences are stored in localStorage
- a storage migration script copies legacy progress and notes data into IndexedDB on load

## Quality Controls

Primary audit:

- `scripts/audit_flashcards.mjs`

Current checks include:

- Days 1-5 are not identical
- Days 1-5 do not repeat flashcards before review day
- Day 1-5 unions cover the week deck
- glossary references resolve
- each glossary term has exactly three primary cards
- banned flashcard stems are blocked
- scenario fronts do not contain the answer term
- front/back echo issues are caught

## Build and Deployment

Development:

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
- `src/styles/global.css`: shared tokens, layout rules, and theme system
- `src/scripts/`: client-side route logic and persistence
- `src/lib/site-data.js`: normalized content access layer
- `src/lib/theme-options.js`: shared theme metadata
- `src/lib/anki-export.js`: TSV export builder
- `src/data/content/`: canonical study data
- `public/images/`: shared banner and background artwork
- `docs/master.md`: this document
- `docs/content.md`: curriculum/source review

## Maintenance Rules

- update this document when routes, storage keys, theme systems, or major UX behavior change
- keep `README.md` operational and short
- keep `docs/content.md` focused on curriculum/source truth, not implementation detail
