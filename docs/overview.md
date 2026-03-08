# Cybersecurity Study Companion Overview

## Product summary

This repository contains a static Astro application that presents a 32-week cybersecurity roadmap as:
- a public proof-of-work portfolio
- a private local-first study tool

The application is split into two layers:
- Layer A: public study companion and portfolio routes
- Layer B: private notes workspace at `/notes/`

The current app supports:
- static deployment
- PWA installability
- IndexedDB persistence
- offline curriculum access after first load
- optional Capacitor Android packaging

Current content totals:
- 32 weeks
- 224 day records
- 233 canonical glossary entries
- 699 unique flashcards
- 32 weekly review decks

## Architectural constraints
- static output only
- GitHub Pages compatible
- no backend
- no authentication
- local-only persistence
- canonical precomputed glossary and flashcards

## Route map

### Layer A
- `/`
- `/roadmap/`
- `/weeks/`
- `/weeks/<slug>/`
- `/resources/`
- `/glossary/`
- `/flashcards/`
- `/flashcards/export/`
- `/security-journal/`
- `/progress/`
- `/about/`
- `/offline/`

### Layer B
- `/notes/`

## Data architecture

Canonical datasets:
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting datasets:
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

### Top-level structure
- `site`
- `core_pages`
- `resources`
- `weeks`
- `days`
- `security_journal_prompts`
- `portfolio_outputs`
- `review_decks`

### Glossary model
Glossary is canonical and global. Days reference glossary IDs rather than embedding glossary content directly.

Shape:
- `id`
- `term`
- `category`
- `bullets`

Bullet roles:
1. what it is
2. what it does
3. how it works at a high level

### Flashcard model
Flashcards are generated from glossary bullets.

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

Each glossary term maps to exactly three cards.
Card IDs use:
- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

The current repository contains 699 unique flashcards derived from 233 glossary entries.

### Day mapping
Each instructional day references:
- `glossary_ids`
- `flashcard_ids`

Day 1-5 decks progressively accumulate the week's vocabulary instead of reusing one identical daily deck.
Day 6 is the full weekly review deck.
Day 7 is an empty rest-day deck.

## Storage model

The app uses IndexedDB with:
- database: `cyber-study-db`
- object store: `kv`

Keys:
- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Legacy localStorage values are migrated into IndexedDB on first upgraded load.

## Page behavior

### Home
- current phase and week
- quick links
- progress summary
- next unfinished task

### Weeks archive
- filters for phase, week, session type, laptop requirement, and task tags
- progress-aware week cards

### Week detail pages
- week hero with focus, deliverable, checkpoint
- seven day cards
- day objectives, tasks, resources, glossary, flashcards, checkpoint
- progress controls
- notes CTA without embedded note editor

### Glossary
- canonical glossary explorer
- search plus category, phase, week, tag, and exam-relevance filtering

### Flashcards
- canonical flashcard explorer
- phase, week, day, type, and difficulty filtering
- reveal-answer UI
- Anki TSV export

### Progress
- overall completion
- phase and week progress
- blocked items
- next deliverable
- import/export/reset

### Notes
- day notes
- week reflections
- structured journal notes
- Markdown export
- JSON import/export

## Theme system

The visual system keeps the cyber-terminal layout and token structure while allowing color-palette swaps through a persisted selector.

Available color themes:
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

Theme state is stored in `cyber-study-color-theme-v1`.

## Boot intro behavior

The boot intro runs once per app session:
- it appears when the app is opened in a fresh browser tab or session
- it does not replay on normal internal navigation
- it can be skipped immediately
- it is disabled for reduced-motion users

## PWA and offline model

The app uses `@vite-pwa/astro` to generate:
- manifest
- service worker
- offline support

Offline behavior:
- visited curriculum routes remain available after first successful online load
- uncached navigation falls back to `/offline/`

Capacitor behavior:
- service worker registration is skipped inside the native shell

## Android packaging

Key files:
- `capacitor.config.ts`
- `android/`

Typical workflow:

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Repo structure
- `src/pages/`
- `src/components/`
- `src/layouts/`
- `src/styles/global.css`
- `src/scripts/`
- `src/scripts/runtime/client-utils.js`
- `src/lib/site-data.js`
- `src/lib/anki-export.js`
- `src/data/content/`
- `docs/`

## Documentation map
- `README.md`: quick orientation and operating assumptions
- `docs/overview.md`: architecture and product behavior reference
- `docs/flashcard_info.md`: executive summary of flashcard generation plus the full week-by-week flashcard inventory
- `docs/glossary_flashcard_overhaul_report.md`: pre-change coverage and quality audit for the glossary and flashcard overhaul
- `docs/code-audit.md`: audit findings and maintenance posture
- `IMPLEMENTATION_NOTES.md`: migration assumptions and persistent implementation choices

## Content corrections

### Week 1 support correction
- Day 1: LearnFree Computers 101
- Day 2: Professor Messer BIOS Settings
- Day 3: Professor Messer Copper Connectors
- Day 4: Microsoft `msinfo32.exe`
- Day 5: Professor Messer Pop Quizzes Archive
- Day 6: CompTIA A+ Core 1 overview/objectives
- Day 7: none

### Glossary and flashcards
- glossary Bullet 3 now explains mechanism / mental model
- flashcards now use `definition`, `understanding`, and `application` types
- card IDs now use `-definition`, `-mechanism`, and `-scenario`
- each flashcard back is copied from the corresponding glossary bullet or `TERM — purpose` pair

## Build and verification

Development:

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

Verification focus:
- static build passes
- core routes render
- IndexedDB migration works
- PWA manifest and service worker register
- offline fallback works
