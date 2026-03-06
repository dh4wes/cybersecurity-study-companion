# Cybersecurity Study Companion

Static Astro study system for a 32-week cybersecurity roadmap.

The product is intentionally split into two layers:
- Layer A: a public study companion and portfolio site
- Layer B: a private local notes tool at `/notes/`

The current app is also installable as a PWA, works offline after first load, and can be packaged for Android with Capacitor.

## What the app does
- Publishes the full 32-week roadmap with week pages and day-level study execution
- Renders canonical glossary and flashcard datasets with per-day mappings
- Tracks progress locally without a backend
- Stores notes locally in IndexedDB with import/export support
- Exports flashcards as Anki-compatible TSV
- Supports offline curriculum access after the initial cached load

## Core principles
- Static output only: Astro `output: 'static'`
- GitHub Pages compatible
- No backend
- No authentication
- No runtime AI dependency for glossary or flashcards
- Strict separation between public curriculum UX and private notes UX

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

### Private notes tool
- `/notes/`

## Tech stack
- Astro
- Vanilla JavaScript for client interactivity
- IndexedDB for local persistence
- `@vite-pwa/astro` for manifest + service worker generation
- Capacitor for optional Android packaging

## Data model

Canonical content lives in:
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Workbook enrichment and supporting extracted data live in:
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

### Top-level content collections
- `site`
- `core_pages`
- `resources`
- `weeks`
- `days`
- `security_journal_prompts`
- `portfolio_outputs`
- `review_decks`

### Glossary schema
Glossary entries are canonical global records and currently use this shape:

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

The third bullet is intended to explain the term's specific place among neighboring concepts, not repeat a generic category statement.

### Flashcard schema
Flashcards are derived from the glossary and use this shape:

```json
{
  "id": "tcp-definition",
  "type": "definition",
  "difficulty": "easy",
  "front": "What is TCP?",
  "back": "Transport-layer protocol providing reliable ordered delivery of network data."
}
```

Each glossary term maps to exactly three flashcards:
- `<term-id>-definition`
- `<term-id>-function`
- `<term-id>-relation`

### Day-level content mapping
Each day in `study-companion-v2.json` references:
- `glossary_ids`
- `flashcard_ids`

Review days aggregate weekly review material. Rest days avoid heavy new content.

## Storage model

The app persists locally in IndexedDB under the `cyber-study-db` database.

### Active IndexedDB records
- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

### Safe migration from localStorage
On first load after the storage upgrade, the app migrates any existing values from the legacy localStorage keys into IndexedDB. The old localStorage values are preserved as fallback backup data.

### Storage separation
- Progress data is used only by Layer A
- Notes data is used only by Layer B

The public routes do not embed the notes editor.

## PWA and offline behavior

The app includes:
- a web app manifest
- generated service worker
- install prompt support in Chromium browsers
- offline fallback page at `/offline/`

After the first successful online load, the curriculum routes and assets are cached for offline reuse.

Inside the Capacitor native shell, service worker registration is skipped to avoid layering browser caching over bundled assets.

## Android packaging

The repo includes Capacitor Android scaffolding in `android/`.

Typical flow:

```bash
npm run build:cap
npm run cap:sync
npm run cap:open
```

This opens the native Android project in Android Studio when available.

## Repository structure
- `src/pages/` route entrypoints
- `src/components/` reusable UI components
- `src/layouts/` global page shell
- `src/styles/global.css` design tokens and terminal/cyber theme
- `src/scripts/` browser modules for filtering, storage, exports, and UI behavior
- `src/scripts/runtime/client-utils.js` shared browser helpers
- `src/lib/site-data.js` normalized content access layer
- `src/lib/anki-export.js` TSV export builder
- `src/data/content/` canonical study datasets
- `tools/generate-v2-content.mjs` content generation/migration script
- `docs/overview.md` detailed architecture and behavior reference
- `docs/code-audit.md` latest security/style audit notes
- `IMPLEMENTATION_NOTES.md` migration assumptions and follow-up notes
- `APP/` upgrade prompt set used for the app modernization pass

## Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

## Production build

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing checklist

### Core route smoke test
Verify:
- `/`
- `/weeks/`
- `/weeks/week-01/`
- `/glossary/`
- `/flashcards/`
- `/progress/`
- `/notes/`

### Persistence
In `/progress/` and `/notes/`:
- create sample data
- reload the page
- confirm the data persists

### PWA
In Chrome DevTools:
- confirm `Manifest` is present
- confirm `Service Worker` is registered
- confirm `IndexedDB` contains `cyber-study-db`
- confirm `Cache Storage` contains generated caches

### Offline
1. Load the production preview once while online
2. Visit the main curriculum routes
3. Switch DevTools network to offline
4. Confirm cached routes still render

## Week 1 support correction

Week 1 support resources intentionally override the older repeated Ubuntu support item:
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
- Notes and progress are local-only by design
- The native Android shell requires Android Studio for local packaging workflows
- `npm audit` still reports high-severity issues in transitive build tooling; see `docs/code-audit.md` for the current status and rationale
