# Implementation Notes

## Current state

The repository currently represents a completed static-to-local-first study companion:
- static Astro app
- PWA installability
- IndexedDB persistence for notes and progress
- offline support
- mobile-oriented UI adjustments
- optional Capacitor Android packaging

## Key assumptions that still matter

### Week 1 support correction
The repository snapshot used during the migration did not include the named `*_week1_support_fixed.*` files, so the Week 1 support-resource correction was applied directly from the written requirements and preserved in the data/UI.

### Workbook enrichment
Workbook-derived supporting data continues to flow through:
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

### Rest days
Day 7 remains intentionally light:
- no required new glossary
- no required new flashcards
- optional review or recovery only

## Content model decisions

### Glossary
The glossary is global and canonical.

Current shape:
- `id`
- `term`
- `category`
- `bullets`

Bullet roles:
1. what it is
2. what it does
3. how it works / mental model

### Flashcards
Flashcards are global, canonical, and glossary-derived.

Current shape:
- `id`
- `type`
- `difficulty`
- `front`
- `back`

Types:
- `definition`
- `understanding`
- `application`

Each glossary term maps to exactly three flashcards.
Card IDs use:
- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

The current dataset contains 233 glossary terms and 699 unique flashcards.

### Progressive day decks
Study days no longer reuse one identical weekly flashcard set.

Current rule set:
- Day 1-5 progressively introduce the week's ordered glossary terms
- Day 6 uses the full weekly review deck
- Day 7 keeps empty `glossary_ids` and `flashcard_ids`

### Flashcard documentation
`docs/flashcard_info.md` is the maintained reference for:
- the executive summary of how cards are created from glossary entries
- the relationship between weekly topics and their assigned card sets
- the full flashcard inventory grouped by study week

If canonical content changes in `src/data/content/`, the flashcard documentation must be regenerated so wording and counts stay synchronized.

### Audit coverage
`scripts/audit_flashcards.mjs` now checks:
- day-deck progression across Days 1-5
- week deck coverage by the union of Days 1-5
- glossary reference integrity
- exactly three primary cards per glossary term
- banned prompt stems
- scenario fronts that leak the answer term
- front/back echo issues

## Storage model

Primary backend:
- IndexedDB

Database:
- `cyber-study-db`

Object store:
- `kv`

Keys:
- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Legacy localStorage values are migrated into IndexedDB on first upgraded load and retained as fallback backup data.

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
`/notes/` remains separate in framing, storage usage, and workflow:
- day notes
- week reflections
- structured journal notes
- Markdown export
- JSON import/export

## Boot intro decision

The boot intro now runs once per app session:
- it appears when the app is opened in a fresh tab/session
- it does not replay on normal route navigation in that session
- it remains skippable
- it remains disabled for reduced-motion users

## Theme decision

The app now uses one persisted color-theme selector with token-based palette swaps.

Current theme set:
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

## Quality notes

### Glossary and flashcards
- glossary Bullet 3 now explains mechanism rather than category placement
- flashcards now mirror the glossary with deterministic `definition/function/mechanism` cards

### Client rendering
Current client rendering paths use DOM APIs instead of string-based HTML insertion.

## Remaining limitations

### Dependency audit
Transitive high-severity build-tool audit findings remain in the PWA/Astro toolchain and are being monitored rather than blindly force-fixed.

### Native packaging
Android packaging still depends on Android Studio being installed locally.

## Recommended next enhancements
1. Add integrity checks for glossary/flashcard consistency.
2. Add linting and lightweight automated tests.
3. Replace placeholder PWA icons with final branded assets.
