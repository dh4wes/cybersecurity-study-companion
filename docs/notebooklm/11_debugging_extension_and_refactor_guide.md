# 11 Debugging, Extension, and Refactor Guide

## Purpose of this document

Provide safe workflows for tracing features, debugging failures, extending the app, and refactoring without breaking route contracts.

## What to inspect in the repo first

- `src/pages/`
- `src/lib/site-data.js`
- `src/scripts/runtime/client-utils.js`
- relevant page script
- relevant storage module

## How to trace a feature from UI to data to storage

1. Start at the route file in `src/pages/`.
2. Identify the component tree used by that route.
3. Search for `.js-` classes or `data-*` attributes used as script hooks.
4. Find the route script imported at the bottom of the page.
5. Check whether the script reads embedded JSON with `parseJsonScript()`.
6. If state is persisted, follow calls into `progress-storage.js` or `notes-storage.js`.

## How to add a new route

### Safe workflow

1. Create the Astro file in `src/pages/`.
2. Pull normalized data from `src/lib/site-data.js`.
3. Decide whether the page is static or needs a route script.
4. If interactive, create a small page-specific script in `src/scripts/`.
5. If you serialize data to the browser, keep the JSON payload minimal.
6. Add navigation only if the route is truly part of the main app flow.

## How to add a new content field safely

### Safe workflow

1. Add the field to the canonical JSON file.
2. Normalize it in `src/lib/site-data.js`.
3. Update only the components/routes that need it.
4. If it affects glossary structure, rerun `npm run validate:glossary`.
5. If it affects flashcards, rerun `npm run audit:flashcards`.

### Common breakage

Adding a field to JSON without adding it to normalization often makes the route code look “randomly missing data” even though the raw JSON changed correctly.

## How to add a new client-side interaction module

### Safe workflow

1. Put the script in `src/scripts/`.
2. Use `initOnReady()` from `src/scripts/runtime/client-utils.js`.
3. Use stable `.js-*` selectors and `data-*` attributes.
4. Keep persistence outside the script unless it is truly page-owned state.
5. Prefer one route script per page unless two pages obviously share behavior.

## How to debug a broken filter

### Observed implementation

Glossary and flashcard filtering both rely on:

- DOM `data-*` attributes emitted by Astro
- selector values from inputs/selects
- token matching helpers from `runtime/client-utils.js`

### Debug checklist

1. Verify the right script is imported by the route.
2. Verify the route emitted the expected `data-*` attributes.
3. Verify selectors such as `.js-glossary-search` or `.js-flashcards-week` still exist.
4. Verify `includesToken()` is receiving values in the expected pipe-separated format.

## How to debug storage issues

### Debug checklist

1. Confirm `loadProgress()` or `loadNotes()` is awaited before reads.
2. Check whether IndexedDB is available in the environment.
3. Check `storage-migrate.js` for legacy data copy expectations.
4. Inspect whether reset/import/export logic is mutating the right logical keys.
5. Confirm that the UI is listening for `PROGRESS_EVENT` when progress should rerender globally.

## How to refactor without breaking page contracts

### Observed implementation

The main contracts that can break are:

- normalized exports from `src/lib/site-data.js`
- embedded JSON payload ids and shapes
- `.js-*` selectors used by scripts
- `data-*` attributes used for filtering or state lookup

### Refactor rules

- Change one contract at a time.
- If a selector or payload shape changes, update the page and script in the same commit.
- Keep normalization changes close to the data schema change.
- Run route smoke checks after refactors, not just lint/build.

## Small code excerpt: route contract via dataset

From `src/pages/flashcards/index.astro`:

```astro
<div
  class="js-flashcard-item"
  data-card-id={card.id}
  data-front={card.front}
  data-back={card.back}
  data-phase-refs={(card.phase_refs || []).join('|')}
  data-week-refs={(card.week_refs || []).join('|')}
  data-day-refs={(card.day_refs || []).join('|')}
  data-card-type={card.type}
  data-difficulty={card.difficulty}
>
```

What this proves:

- the Astro page and the script share a hidden contract
- “markup refactors” can be behavior refactors even when no JS file changes

## Common pitfalls or failure modes

- Renaming classes that look cosmetic but are actually script hooks.
- Refactoring normalized data fields without tracing all route consumers.
- Moving logic from one page script into a shared helper before the shared abstraction is actually stable.

## How to extend it safely

- Prefer additive changes first.
- Prove the feature through one route before generalizing.
- Keep new persistence keys explicit.
- Document new route/module/data ownership in the same PR.

## Skill takeaway

In this codebase, safe work depends on recognizing contracts that are not enforced by TypeScript: DOM hooks, JSON payload shapes, normalized object fields, and storage key names.

## Mini exercises / code reading prompts

1. Pick a `.js-*` selector and find every file that depends on it.
2. Explain what would break if `clientWeeksLite` stopped including `href`.
3. Draft a safe refactor plan for splitting `week-page.js` into smaller modules.

