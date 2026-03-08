# Cybersecurity Study Companion

Static Astro application for a 32-week cybersecurity roadmap.

The product is intentionally split into two layers:
- Layer A: public study companion and portfolio routes
- Layer B: private local notes tool at `/notes/`

The current build is:
- static
- GitHub Pages compatible
- installable as a PWA
- local-first through IndexedDB
- offline-capable after first load
- optionally packageable for Android with Capacitor

## Core principles
- no backend
- no authentication
- no runtime AI dependency for glossary or flashcards
- public curriculum UX stays separate from private notes UX
- canonical content lives in data files, not page components

## Routes

### Public study companion
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

### Private tool
- `/notes/`

## Tech stack
- Astro
- vanilla JavaScript
- IndexedDB
- `@vite-pwa/astro`
- Capacitor

## Content model

Canonical content lives in:
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting extracted data lives in:
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

Current content totals:
- 32 weeks
- 224 day records
- 252 glossary terms
- 756 unique flashcards
- 32 weekly review decks

### Top-level collections
- `site`
- `core_pages`
- `resources`
- `weeks`
- `days`
- `security_journal_prompts`
- `portfolio_outputs`
- `review_decks`

### Glossary schema
Glossary entries are canonical global records:

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

Each entry has exactly three bullets:
1. definition
2. function
3. mechanism / mental model

### Flashcard schema
Flashcards are generated deterministically from the glossary:

```json
{
  "id": "tcp-scenario",
  "type": "application",
  "difficulty": "medium",
  "front": "Scenario: An application needs reliable, ordered delivery and retransmission instead of the lowest possible overhead. Which component or concept best fits?",
  "back": "TCP — Establishes sessions, tracks sequence numbers, acknowledges delivery, and retransmits lost segments when needed."
}
```

Each glossary term maps to exactly three cards:
- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

Card purposes are:
- `definition`: direct recall
- `understanding`: mechanism / mental model
- `application`: CompTIA-style scenario prompt

### Day-level mapping
Each day references:
- `glossary_ids`
- `flashcard_ids`

Day 1-5 each list only the new glossary terms and new flashcards introduced that day instead of repeating prior entries.
Day 6 aggregates the full weekly review material.
Day 7 intentionally avoids heavy new study content.

## Storage model

The active storage backend is IndexedDB using:
- database: `cyber-study-db`
- object store: `kv`

### Keys
- progress: `cyber-study-progress-v1`
- notes: `cyber-study-notes-v2`
- note export metadata: `cyber-study-note-export-meta-v1`

### Migration
Legacy localStorage values are migrated into IndexedDB on first upgraded load and retained as fallback backup data.

## Theme system

The UI keeps the repo's cyber-terminal structure while allowing palette swaps through a persisted color theme selector.

Available themes:
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

Theme selection is stored in:
- `cyber-study-color-theme-v1`

## Typography themes

Typography is switchable independently from color and uses only offline-safe system font stacks.

Available typography themes:
- `Default`
- `Ops Console`
- `Editor Clean`
- `Mono Range`

How to switch:
- use the `Type` selector in the header
- the choice persists across reloads
- the saved theme is applied before the app renders to reduce FOUC

Typography selection is stored in:
- `cyber-study-typography-theme-v1`

Implementation notes:
- `Default` preserves the current repo typography unchanged
- `Ops Console` keeps the cyber feel while improving body readability
- `Editor Clean` favors long-form reading and slightly increases mobile body size
- `Mono Range` uses a full monospace presentation with readable leading

## Boot intro

The boot intro is shown once per app session:
- appears when the app is opened in a fresh tab or session
- does not replay on normal in-app navigation
- can be skipped immediately
- is disabled for reduced-motion users

## PWA and offline

The app includes:
- web app manifest
- generated service worker
- offline fallback route at `/offline/`

After first successful load, curriculum pages and assets are cached for offline reuse.

Inside the Capacitor shell, service worker registration is skipped.

## Android packaging

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

The Android project lives in `android/`.

## Repo structure
- `src/pages/` route entrypoints
- `src/components/` reusable UI
- `src/layouts/` app shell
- `src/styles/global.css` design tokens and theme system
- `src/scripts/` browser modules
- `src/lib/site-data.js` normalized content access
- `src/lib/anki-export.js` TSV export builder
- `src/data/content/` canonical content datasets
- `scripts/audit_flashcards.mjs` regression audit for glossary and flashcard integrity
- `docs/overview.md` architecture reference
- `docs/code-audit.md` audit and hardening notes
- `docs/flashcard_info.md` executive summary and full flashcard inventory by week
- `docs/glossary_flashcard_overhaul_report.md` pre-change coverage and quality audit
- `IMPLEMENTATION_NOTES.md` assumptions and implementation notes

## Documentation
- `README.md`: repo summary, routes, data model, and deployment notes
- `docs/overview.md`: architecture, route behavior, storage model, and content structure
- `docs/flashcard_info.md`: how flashcards are created, how they map to each study week, and the complete card listing
- `docs/glossary_flashcard_overhaul_report.md`: coverage audit, quality audit, and exam-alignment rationale for the glossary overhaul
- `docs/code-audit.md`: audit findings, current security posture, and documentation maintenance notes
- `IMPLEMENTATION_NOTES.md`: assumptions, constraints, and product decisions that still matter

## Audits

Run the regression audit after changing syllabus, glossary, or flashcard data:

```bash
npm run audit:flashcards
```

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Verification checklist
- load `/`, `/weeks/`, `/weeks/week-01/`, `/glossary/`, `/flashcards/`, `/progress/`, `/notes/`
- confirm notes and progress persist after reload
- confirm `cyber-study-db` exists in IndexedDB
- confirm service worker and manifest exist in preview
- confirm cached pages still load offline after first visit

## Week 1 support correction
- Day 1: LearnFree Computers 101
- Day 2: Professor Messer BIOS Settings
- Day 3: Professor Messer Copper Connectors
- Day 4: Microsoft `msinfo32.exe`
- Day 5: Professor Messer Pop Quizzes Archive
- Day 6: CompTIA A+ Core 1 overview/objectives
- Day 7: none

Ubuntu Desktop remains associated with later VM work.

## Documentation map
- [overview](/Users/danyel-ii/DACS_/docs/overview.md)
- [code-audit](/Users/danyel-ii/DACS_/docs/code-audit.md)
- [implementation-notes](/Users/danyel-ii/DACS_/IMPLEMENTATION_NOTES.md)

## Known limitations
- notes and progress remain local-only by design
- Android packaging requires Android Studio locally
- `npm audit` still reports transitive high-severity build-tool issues; see `docs/code-audit.md`
