# 10 Code Reading Paths and Skill Building

## Purpose of this document

Give a learner concrete study paths through the repo with starting files, questions to answer, and exercises that build software skill rather than passive familiarity.

## Learn the app in 45 minutes

### Starting files

- `astro.config.mjs`
- `src/layouts/Layout.astro`
- `src/lib/site-data.js`
- `src/pages/index.astro`
- `src/pages/weeks/[...slug].astro`

### What to read next

- `src/scripts/home-page.js`
- `src/scripts/week-page.js`
- `src/scripts/progress-storage.js`

### Question to answer while reading

How does static content become an interactive study page without a client framework?

### Mini exercises

- Write down the exact path from `study-companion-v2.json` to one rendered day card.
- Find where a week becomes locked or unlocked.

### Expected skill outcome

You should be able to describe the app as “static Astro pages plus route-scoped enhancement modules plus local persistence.”

## Understand routing plus enhancement

### Starting files

- `src/pages/roadmap/index.astro`
- `src/pages/weeks/[...slug].astro`
- `src/scripts/roadmap-page.js`
- `src/scripts/week-page.js`

### What to read next

- `src/components/WeekCard.astro`
- `src/components/DayCard.astro`
- `src/scripts/runtime/client-utils.js`

### Question to answer while reading

What parts of these routes are decided at build time, and what parts are decided only after the browser loads?

### Mini exercises

- Find every `type="application/json"` script payload and explain who consumes it.
- Compare `/roadmap/` and `/weeks/<slug>/` in terms of how much client state each needs.

### Expected skill outcome

You should understand progressive enhancement as it appears in a real Astro project.

## Understand local persistence

### Starting files

- `src/scripts/idb-kv.js`
- `src/scripts/storage-migrate.js`
- `src/scripts/progress-storage.js`
- `src/scripts/notes-storage.js`

### What to read next

- `src/scripts/progress-page.js`
- `src/scripts/notes-page.js`

### Question to answer while reading

How does state move from browser storage into UI without a backend?

### Mini exercises

- Trace one progress export and one notes Markdown export.
- Explain why the migration script runs before route scripts.

### Expected skill outcome

You should be able to design a small local-first persistence layer yourself.

## Understand content normalization

### Starting files

- `src/lib/site-data.js`
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

### What to read next

- `tools/upgrade-glossary-to-concept-model.mjs`
- `scripts/validate_glossary_model.mjs`

### Question to answer while reading

Which data is authored directly, and which data is derived centrally for route use?

### Mini exercises

- Explain how glossary usage refs are calculated.
- Explain why `glossaryById` and `flashcardById` are useful.

### Expected skill outcome

You should understand how to build a normalization layer that shields routes from raw content shape.

## Understand feature modularity

### Starting files

- `src/scripts/glossary-page.js`
- `src/scripts/flashcards-page.js`
- `src/scripts/progress-page.js`

### What to read next

- `src/components/GlossaryTermCard.astro`
- `src/components/FlashcardItem.astro`
- `src/components/ExportImportControls.astro`

### Question to answer while reading

Where does each feature draw the line between markup, client logic, and persistence?

### Mini exercises

- For one feature, list every class name used as a JS hook.
- Identify one boundary that is well isolated and one that is brittle.

### Expected skill outcome

You should get better at reading modularity as a practical property of code, not as a buzzword.

## Understand how to add a new page or feature

### Starting files

- `src/pages/resources/index.astro`
- `src/pages/progress/index.astro`
- `src/layouts/Layout.astro`

### What to read next

- `src/lib/site-data.js`
- one relevant client script if the new page needs interaction

### Question to answer while reading

What is the smallest amount of data and behavior a new route actually needs?

### Mini exercises

- Sketch a new `/labs/` route that lists future hands-on labs from canonical JSON.
- Decide whether it needs a script or can stay static.

### Expected skill outcome

You should be able to add a route without introducing unnecessary client complexity.

## Skill takeaway

The best way to learn this repo is to trace one question end to end:

- where does this data come from?
- who normalizes it?
- who renders it?
- who mutates it?
- where is it persisted?

