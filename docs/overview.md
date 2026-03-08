# Cybersecurity Study Companion Overview

## Product Summary

This repository contains a static Astro app that presents a 32-week cybersecurity roadmap as:

- a public proof-of-work study companion
- a private local-first notes workspace

The app is intentionally split into two layers:

- Layer A: public curriculum, progress, glossary, flashcards, and portfolio context
- Layer B: local-only notes at `/notes/`

Current content totals:

- 32 weeks
- 224 day records
- 252 canonical glossary entries
- 756 unique flashcards
- 32 weekly review decks

## Architecture

Key constraints:

- static output only
- GitHub Pages compatible
- no backend
- no authentication
- local-only persistence
- canonical content is precomputed in JSON

High-level flow:

1. Canonical content is read from `src/data/content/`.
2. `src/lib/site-data.js` normalizes weeks, days, glossary, flashcards, and review decks.
3. Astro pages render server-side static HTML from that normalized data.
4. Route-specific browser scripts add filters, persistence, export, and progress behavior.
5. IndexedDB stores local progress, notes, export metadata, and theme preferences.

## Route Behavior

### Home

- current phase and current week summary
- quick links into the roadmap
- progress snapshot
- next-study navigation powered by client-side progress state

### Weeks Archive

- filterable week list
- filters for phase, week, session type, laptop requirement, and task tags
- progress-aware week cards

### Week Detail Pages

- week hero with focus, deliverable, and checkpoint
- seven daily session cards
- cards are collapsed by default and expand on click
- study days show only new glossary terms and new flashcards for that day
- Day 6 shows the full weekly review deck
- Day 7 remains a rest/recovery session with no required new study deck
- progress toggles, notes CTAs, and day-level Anki export

### Glossary

- canonical glossary explorer
- search plus category, phase, and week filtering
- entries display the three-bullet teaching structure directly

### Flashcards

- canonical flashcard explorer
- filters for search, phase, week, day, card type, and difficulty
- answer-reveal UI
- TSV export for all cards or the filtered view

### Progress

- total completion metrics
- phase progress
- week progress
- blocked-item tracking
- next unfinished task and next deliverable
- local export/import/reset controls

### Notes

- day notes
- week reflections and artifact links
- security journal notes
- Markdown export
- JSON backup import/export

### Resources

- category-grouped resource hub
- use case, best weeks, link, and notes for each resource

### Security Journal

- prompt-oriented public reference page
- separate from the private notes capture workflow

### About

- product framing
- roadmap scope summary
- workbook workload model reference table

### Offline

- offline fallback route for uncached navigation

## Data Model

Canonical datasets:

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting datasets:

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

### Glossary Model

Glossary is canonical and global. Days and weeks reference glossary IDs instead of embedding glossary text.

Shape:

- `id`
- `term`
- `category`
- `bullets`

Bullet roles:

1. what it is
2. what it does
3. how it works

### Flashcard Model

Flashcards are derived from glossary entries.

Shape:

- `id`
- `type`
- `difficulty`
- `front`
- `back`

Types:

- `definition`
- `understanding`
- `application`

Each glossary term maps to exactly three primary flashcards:

- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

### Day Mapping

Each day references:

- `glossary_ids`
- `flashcard_ids`

Behavior:

- Days 1-5 contain only that day’s new terms and cards
- Day 6 aggregates the full weekly review deck
- Day 7 keeps empty study decks by design

## Persistence

The app uses IndexedDB with:

- database: `cyber-study-db`
- object store: `kv`

Primary keys:

- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Theme preferences are also persisted locally through:

- `cyber-study-color-theme-v1`
- `cyber-study-typography-theme-v1`

Legacy localStorage values are migrated forward into IndexedDB on upgraded load.

## Theme And Motion System

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

- runs once per app session
- is skippable
- does not replay on normal internal navigation
- is disabled for reduced-motion users

## PWA And Native Packaging

The app uses `@vite-pwa/astro` for:

- manifest generation
- service worker generation
- offline support

Offline behavior:

- visited routes remain available after first successful load
- uncached navigation falls back to `/offline/`

Capacitor behavior:

- Android packaging remains optional
- service worker registration is skipped inside the native shell

Typical Android workflow:

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Maintenance Workflow

After changing glossary, flashcards, or syllabus data:

```bash
npm run audit:flashcards
npm run build
```

Reference docs:

- `README.md` for repo-level orientation
- `docs/code-audit.md` for current quality posture
- `docs/flashcard_info.md` for flashcard inventory and generation summary
- `IMPLEMENTATION_NOTES.md` for durable product decisions
