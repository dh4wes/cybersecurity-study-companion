# Implementation Notes

## Current implementation state

The repo currently represents a completed static-to-local-first upgrade of the study companion:
- static Astro app retained
- PWA installability added
- IndexedDB persistence added for progress and notes
- offline support added
- mobile UX improved
- optional Capacitor Android packaging added

## Assumptions and source handling

### Week 1 support correction
The repository snapshot did not include the `*_week1_support_fixed.*` source files named in the prompt set. The Week 1 support-resource correction was therefore applied directly from the written requirements and preserved in the generated content and UI.

### Workbook enrichment
Workbook-derived planning and enrichment data continues to flow through:
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

### Rest days
Day 7 remains intentionally light:
- no required new glossary
- no required new flashcards
- optional recovery/review only

## Content model decisions

### Canonical glossary
The glossary is global and canonical. Day pages render subsets by `glossary_ids`.

Current glossary shape:
- `id`
- `term`
- `category`
- `bullets`

Each entry uses exactly three bullets:
1. what the term is
2. how it functions
3. where it fits among related concepts

### Canonical flashcards
Flashcards are global and canonical. Day pages render subsets by `flashcard_ids`.

Current flashcard shape:
- `id`
- `type`
- `difficulty`
- `front`
- `back`

Each glossary term maps to exactly three flashcards:
- definition
- function
- relation

## Storage model

### Active backend
IndexedDB is now the primary persistence layer using:
- database: `cyber-study-db`
- object store: `kv`

### Keys
- progress: `cyber-study-progress-v1`
- notes: `cyber-study-notes-v2`
- notes export metadata: `cyber-study-note-export-meta-v1`

### Migration behavior
Legacy localStorage values are migrated into IndexedDB on first upgraded load. The original localStorage entries are retained as fallback backup data.

## Product split

### Layer A
Public routes remain curriculum and portfolio focused:
- roadmap
- weeks
- resources
- glossary
- flashcards
- security journal prompts
- progress
- about

### Layer B
`/notes/` remains separate in UX, storage usage, and framing:
- day notes
- week reflections
- journal notes
- Markdown export
- JSON import/export

## PWA and packaging notes

### PWA
The app includes:
- manifest
- service worker
- offline fallback route
- install prompt support in compatible browsers

### Capacitor
The Android project is scaffolded and synced. Local opening depends on Android Studio being installed and discoverable on the host machine.

## Quality notes

### Glossary and flashcards
Relation bullets and relation flashcards were revised to remove generic category filler. They now aim to provide specific contextual placement among neighboring concepts used in the curriculum.

### Client-side rendering
Client rendering paths were refactored away from string-based HTML insertion and toward DOM API construction for safety and maintainability.

## Mismatches and limitations

### JSON/workbook mismatches
- no blocking structural mismatch for the 32-week roadmap
- workbook enrichment contains planning/support metadata not present in the original roadmap JSON
- the Week 1 support correction required a prompt-level override

### Remaining dependency audit issues
The repo still carries transitive high-severity audit findings in build tooling:
- PWA toolchain chain ending in `serialize-javascript`
- Astro toolchain dependency on `svgo`

These are being treated as monitored build-time issues rather than blindly force-fixed.

## Recommended next enhancements
1. Add content integrity validation scripts.
2. Add linting and lightweight automated tests.
3. Replace placeholder PWA icons with final branded assets.
4. Add CI checks for build, preview smoke tests, and audit visibility.
