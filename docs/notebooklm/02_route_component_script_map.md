# 02 Route, Component, and Script Map

## Purpose of this document

Map each route to its Astro entrypoint, major components, client script, data dependencies, and storage touchpoints.

## What to inspect in the repo first

- `src/pages/`
- `src/components/`
- `src/scripts/`
- `src/lib/site-data.js`

## Observed implementation

Most routes render static HTML from `src/lib/site-data.js`. Only some routes attach client scripts. Static routes still share the common `Layout.astro` shell, which loads the boot intro, storage migration, and PWA registration.

## Route table

| Route | Page entry file | Main components | Script(s) | Data dependencies | Storage dependencies |
| --- | --- | --- | --- | --- | --- |
| `/` | `src/pages/index.astro` | `Layout`, `PageHero`, `ProgressSummary` | `src/scripts/home-page.js` | `canonicalData`, `weeks`, `clientWeeksLite` | reads progress |
| `/roadmap/` | `src/pages/roadmap/index.astro` | `Layout`, `PageHero`, `PhaseTimeline`, `WeekCard` | `src/scripts/roadmap-page.js` | `groupedWeeksByPhase`, `clientWeeksLite` | reads/writes progress |
| `/weeks/<slug>/` | `src/pages/weeks/[...slug].astro` | `Layout`, `DayCard`, `WeeklyReflectionForm`, `ArtifactLinkForm`, `NotesCtaPanel` | `src/scripts/week-page.js` | `weeks`, `glossaryById`, `flashcardById` | reads/writes progress; exports TSV |
| `/glossary/` | `src/pages/glossary/index.astro` | `Layout`, `PageHero`, `GlossaryTermCard` | `src/scripts/glossary-page.js` | `glossaryEntries`, phase/week/category options | none |
| `/flashcards/` | `src/pages/flashcards/index.astro` | `Layout`, `PageHero`, `FlashcardItem` | `src/scripts/flashcards-page.js` | `flashcardEntries`, filter options, phase mappings | none; downloads TSV |
| `/flashcards/export/` | `src/pages/flashcards/export/index.astro` | `Layout`, `PageHero` | none | `canonicalData`, `withBase` | none |
| `/progress/` | `src/pages/progress/index.astro` | `Layout`, `PageHero`, `ProgressSummary`, `ExportImportControls` | `src/scripts/progress-page.js` | `clientWeeksProgress`, totals | reads/writes/imports/resets progress |
| `/resources/` | `src/pages/resources/index.astro` | `Layout`, `PageHero` | none | `canonicalData.resources` | none |
| `/security-journal/` | `src/pages/security-journal/index.astro` | `Layout`, `PageHero`, `NotesCtaPanel` | none | `securityJournalPrompts` | none directly; links to notes route |
| `/notes/` | `src/pages/notes/index.astro` | `Layout`, `PageHero` | `src/scripts/notes-page.js` | minimal week/day metadata serialized from `weeks` | reads/writes/imports/exports/resets notes |
| `/about/` | `src/pages/about/index.astro` | `Layout` | none | `canonicalData`, `workloadRows`, `withBase` | none |
| `/offline/` | `src/pages/offline.astro` | `Layout`, `PageHero` | none | `withBase` | none |

## How it works step by step

1. Each Astro page imports the data it needs from `src/lib/site-data.js`.
2. If client logic is needed, the page embeds a JSON payload with a stable DOM id.
3. The matching script imports `parseJsonScript()` from `src/scripts/runtime/client-utils.js`.
4. The script reads the DOM, attaches listeners, computes derived state, and updates the page in place.

## Route-by-route notes

### `/`

### Observed implementation

`src/pages/index.astro` serializes `clientWeeksLite` into `home-data-json`. `src/scripts/home-page.js` reads progress, computes the next task via `computeProgressMetrics()`, then updates summary text and the “current week” CTA.

### Likely rationale / trade-off

The home route avoids shipping the full content graph. It only serializes the week summary slice needed for the dashboard.

### Skill takeaway

Learn to distinguish “full canonical data” from “small client payload tailored to one page.”

### `/roadmap/`

### Observed implementation

`src/components/PhaseTimeline.astro` renders grouped week cards. `src/scripts/roadmap-page.js` reads progress, computes sequential unlocks, and toggles `.is-complete` and `.is-locked` classes on each `WeekCard`.

### Likely rationale / trade-off

The UI contract lives in `data-week-id` attributes and CSS classes, not in component-local state. That keeps runtime simple, but DOM conventions become part of the public interface between Astro markup and JS.

### Skill takeaway

When using vanilla JS enhancement, your DOM attributes are part of the module API.

### `/weeks/<slug>/`

### Observed implementation

`src/pages/weeks/[...slug].astro` generates both canonical and legacy slug paths with `getStaticPaths()`. It precomputes:

- `weekFlashcards`
- `dayFlashcards`
- previous-week unlock metadata

`src/scripts/week-page.js` owns:

- day complete / blocked toggles
- week complete toggle
- reflection and artifact saves
- week/day Anki export
- week lock gating

### `/glossary/`

### Observed implementation

`src/pages/glossary/index.astro` groups entries by category after sorting them by earliest day/week usage. `src/scripts/glossary-page.js` filters by search, category, phase, and week using DOM `data-*` attributes.

### `/flashcards/`

### Observed implementation

`src/pages/flashcards/index.astro` emits every card as a DOM node with filter metadata in `data-*` attributes. `src/scripts/flashcards-page.js` filters the visible set and can export either all cards or the current filtered subset using `src/lib/anki-export.js`.

### `/progress/`

### Observed implementation

`src/scripts/progress-page.js` is a renderer-style module. It recomputes metrics from `clientWeeksProgress` plus the persisted progress state and then redraws:

- total completion
- next task
- next deliverable
- per-phase progress
- per-week progress
- blocked item list

### `/notes/`

### Observed implementation

`src/pages/notes/index.astro` is intentionally data-light. It only serializes enough week/day metadata to populate selectors. The actual note content lives entirely in `src/scripts/notes-storage.js`.

`src/scripts/notes-page.js` owns:

- tab switching
- week/day selector sync
- form population
- day note saves
- week reflection saves
- journal create/delete
- Markdown export
- JSON export/import
- reset

## Small code excerpt: route embeds a page-specific payload

From `src/pages/weeks/[...slug].astro`:

```astro
<script
  id="week-data-json"
  type="application/json"
  set:html={JSON.stringify({
    weekId,
    weekNumber: week.week,
    previousWeekId: previousWeek?.id || null,
    previousWeekActionableDayIds: previousWeek
      ? previousWeek.days.filter((day) => day.session_type !== 'Rest').map((day) => day.id)
      : [],
    phaseNumber,
    weekFlashcards,
    dayFlashcards
  })}
></script>
```

What this proves:

- Astro pages feed scripts through embedded JSON, not through a SPA store
- each page decides the minimum client payload it needs

## Module/file responsibility map

- Route ownership is in `src/pages/`.
- Shared display atoms are in `src/components/`.
- Behavior ownership is in `src/scripts/`.
- Shared data derivation is in `src/lib/site-data.js`.
- Shared shell behavior is in `src/layouts/Layout.astro`.

## Common pitfalls or failure modes

- Renaming classes like `.js-week-complete` or `.js-glossary-search` without updating scripts.
- Forgetting that some routes are intentionally static and do not need a page script.
- Over-serializing route data into JSON scripts when only a narrow slice is needed.

## How to extend it safely

- Add a route in `src/pages/`.
- Decide whether it can remain purely static or needs client enhancement.
- If it needs JS, create a route-specific script and a minimal JSON payload.
- Reuse shared components only when the markup contract is truly shared.

## Skill takeaway

The route model is explicit, shallow, and readable. A learner should be able to answer “which file owns this screen?” quickly.

