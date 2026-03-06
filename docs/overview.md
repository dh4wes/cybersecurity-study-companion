# Cybersecurity Study Companion Overview

## Product summary

This repository contains a static Astro application that presents a 32-week cybersecurity learning roadmap as both:
- a public proof-of-work portfolio
- a private local-first study tool

The application is deliberately split into two layers:
- Layer A: public study companion and portfolio routes
- Layer B: local notes workspace at `/notes/`

The app is now installable as a PWA, uses IndexedDB for persistence, supports offline study after first load, and can be packaged for Android with Capacitor.

## Architectural constraints
- Static output only
- GitHub Pages compatible
- No backend
- No authentication
- Browser-local persistence only
- Terminal/cyber visual system retained
- Curriculum content stays canonical and precomputed

## Information architecture

### Layer A: public study companion
- `/` home dashboard
- `/roadmap/` full timeline by phase
- `/weeks/` week archive and filters
- `/weeks/<slug>/` week detail pages
- `/resources/` curated resource catalog
- `/glossary/` canonical glossary explorer
- `/flashcards/` canonical flashcard study interface
- `/flashcards/export/` Anki import help
- `/security-journal/` prompt and template archive
- `/progress/` progress dashboard
- `/about/` concise portfolio framing
- `/offline/` offline fallback

### Layer B: private local notes tool
- `/notes/` day notes, week reflections, structured journal notes, import/export, reset

## Data architecture

The app uses static JSON collections and derives runtime view models through `src/lib/site-data.js`.

### Canonical datasets
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

### Enrichment/support datasets
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

### Top-level content structure
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

Current glossary entry shape:

```json
{
  "id": "tcp",
  "term": "TCP",
  "category": "Networking",
  "bullets": [
    "Transport-layer protocol providing reliable ordered delivery of network data.",
    "Uses sequence numbers acknowledgments and retransmissions to ensure packets arrive correctly.",
    "Works with IP addressing ports and application protocols to deliver stateful client-server sessions."
  ]
}
```

The third bullet is expected to provide specific placement among related technologies, not a generic category sentence.

### Flashcard model
Flashcards are generated from glossary bullets.

Current flashcard shape:

```json
{
  "id": "tcp-relation",
  "type": "relation",
  "difficulty": "hard",
  "front": "Where does TCP fit within the Networking system?",
  "back": "Works with IP addressing ports and application protocols to deliver stateful client-server sessions."
}
```

Every glossary term maps to exactly three cards:
- definition
- function
- relation

### Day mapping
Each instructional day references:
- `glossary_ids`
- `flashcard_ids`

This allows the UI to render a day-specific subset while keeping the glossary and flashcards canonical.

## Key route behavior

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
- notes CTA rather than embedded notes editor

### Glossary
- search and filterable canonical glossary
- category, phase, week, tag, and exam relevance filtering

### Flashcards
- search and filterable canonical flashcards
- phase, week, day, type, and difficulty filtering
- answer reveal UI
- Anki TSV export support

### Progress
- completion totals
- phase and week progress
- blocked items
- next deliverable
- import/export/reset

### Notes
- isolated local note-taking workflow
- Markdown export
- JSON backup/restore
- structured security journal entries

## Client-side modules

### Shared
- `src/scripts/runtime/client-utils.js`
- `src/lib/site-data.js`
- `src/lib/anki-export.js`

### Page scripts
- `src/scripts/home-page.js`
- `src/scripts/weeks-page.js`
- `src/scripts/week-page.js`
- `src/scripts/glossary-page.js`
- `src/scripts/flashcards-page.js`
- `src/scripts/progress-page.js`
- `src/scripts/notes-page.js`

### Persistence and migration
- `src/scripts/idb-kv.js`
- `src/scripts/progress-storage.js`
- `src/scripts/notes-storage.js`
- `src/scripts/storage-migrate.js`

### PWA/runtime
- `src/scripts/pwa-register.ts`

## Persistence model

The active storage backend is IndexedDB using the `cyber-study-db` database.

### Progress keys
- `cyber-study-progress-v1`

### Notes keys
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

### Migration behavior
On first upgraded load, the app copies any existing localStorage values into IndexedDB. Legacy localStorage values are preserved as fallback backup data.

## PWA and offline model

The app uses `@vite-pwa/astro` to generate:
- manifest
- service worker
- offline cache integration

### Offline behavior
- after initial online load, the main curriculum shell and assets are cached
- visited routes remain available offline
- uncached navigation falls back to `/offline/`

### Native shell behavior
When running inside Capacitor, service worker registration is skipped.

## Android packaging

Capacitor configuration is included in:
- `capacitor.config.ts`
- `android/`

Typical workflow:

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Design system

The UI keeps the repo's terminal/cyber identity:
- dark background
- acid accent
- monospace-first presentation
- bordered panels and dense tactical cards
- mobile bottom navigation and touch-safe controls

Theme tokens remain centralized in `src/styles/global.css`.

## Content corrections and migration notes

### Week 1 support correction
The Week 1 support-resource override is preserved in the data and UI:
- Day 1: LearnFree Computers 101
- Day 2: Professor Messer BIOS Settings
- Day 3: Professor Messer Copper Connectors
- Day 4: Microsoft `msinfo32.exe`
- Day 5: Professor Messer Pop Quizzes Archive
- Day 6: CompTIA A+ Core 1 overview/objectives
- Day 7: none

### Glossary/flashcard quality
Relation bullets and relation flashcards were revised to use term-specific contextual placement rather than repeating a generic category sentence.

## Build and deployment

### Development
```bash
npm install
npm run dev
```

### Production build
```bash
npm run build
npm run preview
```

### Capacitor build
```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

## Current quality posture
- static build passes
- core routes smoke-tested in preview
- client code uses DOM APIs rather than `innerHTML` for current rendering paths
- persistence boundaries between progress and notes are preserved
- remaining dependency audit issues are transitive build-tool issues, tracked separately in `docs/code-audit.md`
