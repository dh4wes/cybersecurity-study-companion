# Cybersecurity Study Companion (Static Astro)

Static 32-week cybersecurity study system split into two layers:
- Layer A: public study companion + portfolio site
- Layer B: private local notes tool (`/notes/`)

## Source-of-truth and precedence
1. Prompt requirements in this implementation pass
2. `cybersecurity_study_companion_codex_ready.md`
3. `cybersecurity_study_companion_data.json`
4. `cybersecurity_daily_study_plan_2026_portfolio_ready.xlsx` (via `src/data/workbook-enrichment.json`)

Note:
- `*_week1_support_fixed.*` and `week1_support_revision_notes.md` were not present in this repo; Week 1 support-resource correction is applied directly from prompt requirements and documented in `IMPLEMENTATION_NOTES.md`.

## Content model (v2)
Canonical content is precomputed (no runtime AI dependency) in:
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

Glossary entries are category-structured and include:
- `category`
- `what_it_is`
- `how_it_functions`
- `where_it_fits`

Top-level model includes:
- `site`
- `core_pages`
- `resources`
- `weeks`
- `days`
- `security_journal_prompts`
- `portfolio_outputs`
- `review_decks`

### Day-level mapping
Each day references:
- `glossary_ids`
- `flashcard_ids`

Review day (Day 6) aggregates the weekly review deck.
Rest day (Day 7) has no required new glossary/flashcards.

## Week 1 support-resource correction
Week 1 day support resources are corrected to:
- Day 1: LearnFree Computers 101
- Day 2: Professor Messer BIOS Settings
- Day 3: Professor Messer Copper Connectors
- Day 4: Microsoft `msinfo32.exe`
- Day 5: Professor Messer Pop Quizzes Archive
- Day 6: CompTIA A+ Core 1 objectives overview
- Day 7: none

Ubuntu Desktop remains associated with later VM work (not repeated across Week 1).

## Routes
Layer A:
- `/`
- `/roadmap/`
- `/weeks/`
- `/weeks/<week-slug>/` (32 static week pages)
- `/resources/`
- `/glossary/`
- `/flashcards/`
- `/security-journal/` (prompt/template archive)
- `/progress/`
- `/about/`

Layer B:
- `/notes/` (isolated local notes tool)

## Anki export (Layer A)
Flashcards can be exported as Anki-importable TSV without any backend:
- `/flashcards/`
  - Export all cards (`.tsv`)
  - Export current filtered view (`.tsv`)
  - Deck controls: `One deck`, `By phase`, `By week` (default)
  - Deck base input (default `CyberStudy`)
  - Optional day-tag toggle
- `/weeks/<week-slug>/`
  - Export this week's flashcards to Anki (`.tsv`)
  - Optional day-level export buttons on day cards
- Import help page: `/flashcards/export/`

TSV output includes Anki file headers:
- `#separator:Tab`
- `#html:true`
- `#columns:Front<TAB>Back<TAB>Tags<TAB>Deck`
- `#tags column:3`
- `#deck column:4`

### Anki import quick steps
1. Export a TSV from the site.
2. In Anki Desktop: `File -> Import`.
3. Select the TSV and confirm tab separator.
4. Keep HTML enabled so `<br>` line breaks render.
5. Confirm column mapping (Front, Back, Tags, Deck), then import.

### Tag/deck mapping assumptions
- Phase numbers are derived from canonical week ordering (`weeks` in `site-data`) and mapped as `phase:<n>`.
- Week tags are zero-padded (`week:01`, `week:02`, ...).
- Day tags are numeric (`day:1`, `day:2`, ...), optionally included.
- Exam tag is generated from dataset `exam_relevance` as `exam:<value>` (for this dataset, values are currently high/medium/low).
- Existing flashcard tags are preserved and sanitized for Anki (`space -> _`, lowercase).

## Storage boundaries
Layer A (progress only):
- `cyber-study-progress-v1`

Supports:
- mark day complete/incomplete
- mark day blocked/unblocked
- mark week complete
- save weekly reflection + artifact link
- import/export progress JSON
- reset progress

Layer B (notes only):
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

Supports:
- per-day notes (status, tags, notes, questions, reflection)
- per-week reflection + artifact link
- security journal notes
- export all notes to one Markdown file
- JSON export/import
- reset notes

## Markdown export format
Notes export produces one `.md` file with:
- overview header
- week/day note blocks
- status and tags
- notes/questions/reflection sections
- week reflection blocks
- security journal entries

Compatible with GitHub, Obsidian, and plain text editors.

## Project structure
- `src/lib/site-data.js` normalized data access
- `src/lib/anki-export.js` shared Anki TSV export logic
- `src/pages/` routes for Layer A + Layer B
- `src/components/` reusable UI components
- `src/scripts/runtime/client-utils.js` shared client helpers (JSON parsing, token filters, date token, progress events)
- `src/scripts/progress-*` progress logic
- `src/scripts/notes-*` notes logic
- `src/data/content/` canonical static content collections
- `tools/generate-v2-content.mjs` migration/generation script
- `docs/overview.md` implementation overview
- `docs/code-audit.md` latest audit + refactor notes

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## PWA
Preview the installable build with:
```bash
npm run build
npm run preview
```

To test installability, open the preview URL in Chrome, then confirm the manifest and service worker in DevTools -> Application.

The current manifest uses SVG placeholder icons (`public/pwa-192x192.svg` and `public/pwa-512x512.svg`) to avoid adding binary assets during this pass.

## LocalStorage To IndexedDB
Progress and notes now persist in IndexedDB under the `cyber-study-db` database with a single `kv` object store.

On first load after the upgrade, the app copies existing browser data from:
- `cyber-study-progress-v1`
- `cyber-study-notes-v2`
- `cyber-study-note-export-meta-v1`

The legacy localStorage entries are kept as a fallback backup for now. Use the existing reset controls in `/progress/` and `/notes/` to clear the active IndexedDB records.

## Mobile UX
Phone layouts now use a fixed bottom navigation bar for the main routes, collapsible filter panels on weeks/glossary/flashcards, and accordion-style day cards on week pages.

Flashcard reveal panels and controls were expanded for touch targets while keeping the existing terminal theme and desktop layout intact.

## Regenerate migrated v2 content
```bash
node tools/generate-v2-content.mjs
```

## GitHub Pages
Static output is Astro-compatible for GitHub Pages deployment.
Existing workflow in `.github/workflows/deploy.yml` can be used with correct `SITE_URL` and `SITE_BASE`.
