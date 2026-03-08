# Implementation Notes

## Current State

The repository is a static Astro study companion with:

- public curriculum routes
- a separate local notes tool
- IndexedDB-backed progress and note persistence
- offline support after first load
- optional Capacitor Android packaging

## Durable Product Decisions

### Product Split

Layer A remains public and portfolio-facing:

- roadmap
- weeks
- resources
- glossary
- flashcards
- security journal
- progress
- about

Layer B remains private and local-only:

- `/notes/`
- day notes
- week reflections
- security journal notes
- Markdown export
- JSON import/export

### Static-Only Constraint

- no backend
- no authentication
- no server-side user state
- app logic must keep working as static output

### Canonical Content Boundary

Canonical curriculum content lives in:

- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Supporting enrichment lives in:

- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

Page components should consume normalized data through `src/lib/site-data.js` rather than re-embedding content assumptions locally.

## Data Decisions

### Glossary

Glossary is the source of truth.

Current schema:

- `id`
- `term`
- `category`
- `bullets`

Bullet roles:

1. what it is
2. what it does
3. how it works

### Flashcards

Flashcards are global, canonical, and glossary-derived.

Current schema:

- `id`
- `type`
- `difficulty`
- `front`
- `back`

Current card set:

- `definition`
- `understanding`
- `application`

ID convention:

- `<term-id>-definition`
- `<term-id>-mechanism`
- `<term-id>-scenario`

Current dataset totals:

- 252 glossary terms
- 756 unique flashcards

### Day Deck Behavior

Study days no longer reuse a cumulative deck.

Current rules:

- Days 1-5 list only the newly introduced glossary terms for that day
- Days 1-5 list only the newly introduced flashcards for that day
- Day 6 uses the full weekly review deck
- Day 7 keeps empty `glossary_ids` and `flashcard_ids`

### Week Detail Interaction

Daily sessions on week detail pages are rendered as collapsed cards by default and expand only when the user opens them.

Completed sessions may auto-close when toggled complete, but incomplete sessions are not forced open on load.

## Persistence Decisions

Primary persistence backend:

- IndexedDB

Database:

- `cyber-study-db`

Object store:

- `kv`

Primary keys:

- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Theme keys:

- `cyber-study-color-theme-v1`
- `cyber-study-typography-theme-v1`

Legacy localStorage values are migrated into IndexedDB on upgraded load and retained as fallback backup data.

## UX Decisions

### Notes Separation

Notes stay outside the public curriculum pages. Week and day pages link into the notes tool rather than embedding a private editor directly into public study routes.

### Theme System

Color themes remain token-driven and locally persisted.

Current color-theme set:

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

Current typography-theme set:

- `Default`
- `Ops Console`
- `Editor Clean`
- `Mono Range`

### Boot Intro

The boot intro runs once per browser session, is skippable, and is disabled for reduced-motion users.

## Audit Coverage

`scripts/audit_flashcards.mjs` currently checks:

- Days 1-5 are not identical within a week
- Days 1-5 do not repeat flashcards before Day 6
- the union of Days 1-5 covers the week deck
- glossary references resolve correctly
- each glossary term has exactly three primary cards
- banned stems do not appear in flashcard fronts
- scenario fronts do not leak the answer term
- front/back six-word echo issues are caught

## Documentation Expectations

When app behavior or canonical data changes, update these docs in the same pass:

- `README.md`
- `docs/overview.md`
- `docs/code-audit.md`
- `docs/flashcard_info.md` when counts, deck rules, or card-generation behavior change
- `IMPLEMENTATION_NOTES.md`

`docs/glossary_flashcard_overhaul_report.md` is historical justification for the glossary overhaul, not the live product spec.

## Remaining Limits

### Dependency Audit Noise

Transitive build-tool audit findings may still appear in the Astro/PWA toolchain. Those should be upgraded deliberately and then retested rather than force-fixed blindly.

### Native Packaging

Android packaging still depends on Android Studio being available locally.
