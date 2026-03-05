# Cybersecurity Study Companion: Static Site Overview

## 1) Product Summary
This project is a static Astro-based cybersecurity study system built as a 32-week portfolio and companion.

It is intentionally split into two layers:
- Layer A: public-facing static study companion (roadmap, week/day study execution, resources, glossary, flashcards, security journal prompts, progress dashboard, portfolio framing).
- Layer B: private local notes tool (`/notes/`) with browser-only storage and full Markdown export.

The implementation prioritizes precomputed content (no runtime AI generation for glossary/flashcards), deterministic behavior, and GitHub Pages compatibility.

## 2) Core Architecture
- Framework: Astro (`output: 'static'`).
- Data approach: prebuilt JSON content collections in `src/data/content/`.
- Runtime model: mostly server-rendered static pages with small vanilla JS modules for client interactivity (filters, local persistence, exports, toggles).
- Deployment target: GitHub Pages via workflow (`.github/workflows/deploy.yml`).

## 3) Route and Information Architecture

### Layer A (Public Study Companion)
- `/` Home dashboard
- `/roadmap/` 32-week phase-grouped timeline
- `/weeks/` week archive with filters
- `/weeks/<slug>/` static detail page for each week (including legacy slug compatibility)
- `/resources/` categorized resource hub
- `/glossary/` canonical glossary explorer
- `/flashcards/` canonical flashcard study page
- `/security-journal/` prompt/template archive (not freeform editor)
- `/progress/` progress dashboard with import/export/reset
- `/about/` portfolio positioning and scope

### Layer B (Private Notes Tool)
- `/notes/` isolated local notes workspace (day notes, week reflections, journal notes, exports/imports, reset)

## 4) Page-by-Page Functional Behavior

### Home (`/`)
- Shows site identity, current phase/week, and quick navigation.
- Displays progress snapshot and next actionable task.
- Links directly to today’s next unfinished day anchor.

### Roadmap (`/roadmap/`)
- Displays full 32-week progression grouped by phase.
- Week cards expose focus, deliverable, checkpoint, and link to week detail.

### Weeks Archive (`/weeks/`)
- Filter controls: phase, week, session type, laptop requirement, task tags.
- Week cards include progress status tied to local progress state.

### Week Detail (`/weeks/<slug>/`)
For each week:
- Hero with week metadata (phase, focus, deliverable, checkpoint).
- Week-complete toggle.
- Seven day cards with:
  - objective and suggested split
  - task list and task badges
  - primary/support resources and source links
  - day-level glossary subset
  - day-level flashcard subset
  - checkpoint and weekly deliverable context
  - CTA to private notes tool
  - day complete / blocked controls
- Weekly output framing + artifact link + reflection controls.

### Resources (`/resources/`)
- Grouped by category.
- Each item presents use case, best weeks, URL, notes.

### Glossary (`/glossary/`)
- Canonical global glossary grouped by category.
- Term card structure is three bullets only (no explicit bullet headers in card body):
  - conceptual description
  - functional behavior
  - functional/procedural placement in the IT/security pipeline
- Filter controls: search, category, phase, week, tag, exam relevance.
- Default ordering is by earliest lesson-day reference (then term name).

### Flashcards (`/flashcards/`)
- Canonical global flashcard set.
- Filters: search, phase, week, day, card type, difficulty.
- Card UI supports answer reveal via `<details>`.

### Security Journal (`/security-journal/`)
- Prompt-driven page with purpose, template, and weekly prompt archive.
- Explicitly routes freeform writing to `/notes/`.

### Progress (`/progress/`)
- Overall completion percentage and progress bar.
- Next unfinished task and next deliverable.
- Progress by phase and by week.
- Blocked items list with links back to affected day cards.
- JSON export/import and reset actions.

### About (`/about/`)
- Portfolio narrative, target roles, roadmap scope, and proof-of-work framing.
- Includes workbook-derived workload planning table.

### Notes Tool (`/notes/`)
- Tabbed workflow:
  - Day Notes (status/tags/notes/questions/reflection)
  - Week Reflections (+ artifact link)
  - Security Journal Notes (structured entries)
- Exports:
  - consolidated Markdown (`.md`) covering all note types
  - JSON backup
- Imports:
  - JSON note bundle
- Reset:
  - full local note reset with confirmation

## 5) Design System and Visual Identity
The current UI is a restored terminal-inspired cyber theme (not generic default styling):
- Dark grid background with scanline overlay.
- Neon acid accent (`--c-acid`) and monochrome panel contrast.
- High-contrast badges, bordered cards, and dense dashboard framing.
- Sticky top navigation with active tab highlighting.
- Monospace-first typography for tactical readability.
- Optional custom font theme switch (`default` / `pinkend`) persisted in localStorage.

Primary style system is centralized in `src/styles/global.css` using CSS variables for:
- color tokens
- typography
- card/border treatments
- controls, badges, tracks, and layout primitives

## 6) Data and Content Model
Canonical content is normalized through `src/lib/site-data.js` and sourced from:
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`
- `src/data/workbook-enrichment.json`
- `src/data/day-source-links.json`

Top-level model includes:
- `site`
- `core_pages`
- `resources`
- `weeks`
- `days`
- `security_journal_prompts`
- `portfolio_outputs`
- `review_decks`

### Day-Level Mapping
Each day references:
- `glossary_ids` (subset from canonical glossary)
- `flashcard_ids` (subset from canonical flashcards)

This allows day-level rendering without duplicating full datasets per day.

### Week 1 Support-Resource Correction
Week 1 support resources are explicitly corrected in generated v2 content and reflected in UI rendering. The old repeated Ubuntu support item is not used across Week 1 days.

## 7) Client-Side Interaction Modules
Key script modules:
- `src/scripts/home-page.js`: home stats and “today” task link.
- `src/scripts/weeks-page.js`: week archive filters and progress labels.
- `src/scripts/week-page.js`: day/week completion + blocked state + reflections/artifacts.
- `src/scripts/glossary-page.js`: glossary search/filter visibility.
- `src/scripts/flashcards-page.js`: flashcard filtering.
- `src/scripts/progress-page.js`: metrics rendering + import/export/reset controls.
- `src/scripts/progress-metrics.js`: all computed progress aggregates.
- `src/scripts/progress-storage.js`: progress persistence model.
- `src/scripts/notes-page.js`: notes UI orchestration and export/import/reset.
- `src/scripts/notes-storage.js`: notes persistence + markdown generation.
- `src/scripts/font-theme.js`: font theme switching.

## 8) Storage Boundaries (Strict Split)

### Progress Storage (Layer A)
- Key: `cyber-study-progress-v1`
- Stores: completed days, completed weeks, blocked days, week reflections, artifact links, timestamps.

### Notes Storage (Layer B)
- Keys:
  - `cyber-study-notes-v2`
  - `cyber-study-note-export-meta-v1`
- Stores: day notes, week reflections, journal entries, export metadata.

No backend/auth is used. Persistence is browser-local only.

## 9) Static Build and Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### GitHub Pages
- Workflow builds static output to `dist/`.
- `SITE_URL` and `SITE_BASE` are set in CI for repo-based Pages paths.
- Astro config (`astro.config.mjs`) remains static-output compatible.

## 10) Repository Structure (High-Level)
- `src/pages/` route entrypoints.
- `src/components/` reusable UI and section components.
- `src/layouts/Layout.astro` global shell.
- `src/styles/global.css` theme and tokens.
- `src/scripts/` client interactivity modules.
- `src/lib/site-data.js` normalized data access layer.
- `src/data/content/` canonical generated datasets.
- `tools/generate-v2-content.mjs` content generation/migration script.

## 11) Current Product Positioning
This implementation behaves as:
- a serious roadmap portfolio
- a curated static study companion
- a private notes utility separated from public portfolio IA

It does not behave as:
- a chatbot shell
- a runtime AI content generator for glossary/flashcards
- a notes-first public curriculum interface
