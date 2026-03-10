# 09 Programming Trade-offs and Architecture Decisions

## Purpose of this document

Analyze the major architectural choices in the repo, why they were likely made, what they buy, and when they should be revisited.

## What to inspect in the repo first

- `astro.config.mjs`
- `src/lib/site-data.js`
- `src/scripts/idb-kv.js`
- `src/scripts/progress-storage.js`
- `src/scripts/notes-storage.js`
- `src/scripts/roadmap-page.js`
- `src/scripts/week-page.js`

## Static Astro vs SPA vs backend app

### Observed implementation

The repo chose static Astro with client enhancement.

### Likely reasons

- curriculum content is mostly known at build time
- GitHub Pages/static hosting is a good fit
- the app does not need authenticated multi-user server state

### Benefits

- simpler deployment
- low runtime complexity
- route HTML exists without client JS
- content can be diffed and reviewed in Git

### Costs

- no server-side personalization
- no shared account sync
- interactive behavior must be layered on manually

### When to revisit it

Revisit only if the product needs accounts, collaboration, or server-owned dynamic data.

## Precomputed JSON vs dynamic content source

### Observed implementation

The app uses JSON files under `src/data/content/` plus enrichment/supporting files.

### Likely reasons

- canonical study content changes less often than user state
- authored content benefits from version control
- no CMS dependency needed

### Benefits

- deterministic builds
- easy schema validation
- local development does not depend on a content service

### Costs

- non-technical content editing is less friendly
- build-time normalization becomes central and more complex

### When to revisit it

Revisit if content authorship expands to multiple non-developers or requires editorial workflows.

## Local browser persistence vs synced backend data

### Observed implementation

Progress and notes are stored locally in IndexedDB with fallback/migration from localStorage.

### Likely reasons

- keeps the app static
- avoids auth and privacy concerns
- matches the “personal study workspace” use case

### Benefits

- zero backend ops
- works offline
- user data stays local

### Costs

- no cross-device sync
- user must rely on export/import for backups
- storage debugging is browser-specific

### When to revisit it

Revisit when users need account sync, remote backup, or collaborative review.

## Vanilla JS modules vs larger client framework

### Observed implementation

Enhancement is implemented with vanilla modules like `src/scripts/glossary-page.js` and `src/scripts/notes-page.js`.

### Likely reasons

- the interactive surface is modest
- route-specific scripts are easier to reason about than a hydrated framework tree
- Astro already handles the static/rendering side

### Benefits

- low client bundle complexity
- direct DOM control
- no second application framework layered inside Astro

### Costs

- selector coupling
- less declarative state management
- repeated event wiring patterns

### When to revisit it

Revisit if interactions become deeply nested, cross-route state becomes common, or DOM orchestration starts to dominate maintenance time.

## Separate notes layer vs integrated notes inside public routes

### Observed implementation

Freeform notes live only in `/notes/`, while public routes link there via `NotesCtaPanel.astro`.

### Likely reasons

- keeps public routes cleaner
- maintains a clear boundary between portfolio/public content and private rough notes
- simplifies privacy expectations

### Benefits

- easier mental model
- less clutter on study/portfolio routes
- stronger separation of stable content and messy editing state

### Costs

- some context switching for the user
- route links must carry enough query context

### When to revisit it

Revisit if notes become central to every public route interaction and context switching becomes more harmful than boundary clarity.

## Current glossary/flashcard pipeline design

### Observed implementation

Glossary entries are source-of-truth concepts with a concept model. Flashcards are separate canonical records derived from glossary concepts and mapped into days by ID.

### Likely reasons

- keep term definitions canonical
- keep learning artifacts reusable across days/weeks
- support validation and generation tooling

### Benefits

- strong source-of-truth discipline
- easier auditing/migration
- flashcard coverage can be validated independently

### Costs

- multiple content files must stay in sync
- schema changes affect both runtime and tooling

### When to revisit it

Revisit if the content pipeline becomes too script-heavy or if flashcards need richer runtime generation.

## Other notable decisions

- One object store in IndexedDB instead of multiple stores
- DOM `data-*` contracts instead of framework props/state
- Central normalization file instead of per-route data transforms
- Shared global CSS instead of CSS-in-JS or utility framework

## Common pitfalls or failure modes

- Treating simplicity as lack of architecture. This repo is intentionally simple, not accidental.
- Adding abstractions because they feel modern rather than because they solve an actual scaling problem.
- Ignoring the cost of turning a static app into a synchronized backend app.

## Skill takeaway

This repo teaches a core engineering lesson: architecture is mostly about choosing what problems not to have yet.

## Mini exercises / code reading prompts

1. Pick one decision above and argue the opposite choice. What new complexity would it introduce here?
2. Explain why Astro plus vanilla JS is a coherent combination for this app.
3. Identify which current module would hurt the most if the app were converted into a multi-user synced system.

