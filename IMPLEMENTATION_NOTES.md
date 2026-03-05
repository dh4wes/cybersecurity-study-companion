# Migration Notes

## Assumptions made
- `*_week1_support_fixed.*` and `week1_support_revision_notes.md` were not present in this repository snapshot.
- Week 1 support-resource correction was implemented directly from the provided prompt requirements.
- Existing workbook enrichment (`src/data/workbook-enrichment.json`) remains the validation/enrichment source for checkpoints and workload/journal tables.
- Rest days (Day 7) intentionally avoid required new glossary/flashcards.

## Schema changes introduced
- Migrated from legacy model:
  - `site`, `core_pages`, `resources`, `week_pages`, `weeks`
- To v2 model:
  - `site`
  - `core_pages`
  - `resources`
  - `weeks`
  - `days`
  - `glossary` (canonical global dataset)
  - `flashcards` (canonical global dataset)
  - `security_journal_prompts`
  - `portfolio_outputs`
  - `review_decks`

Generated files:
- `src/data/content/study-companion-v2.json`
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

## Storage model split
- Progress storage (Layer A only):
  - `cyber-study-progress-v1`
- Notes storage (Layer B only):
  - `cyber-study-notes-v2`
  - `cyber-study-note-export-meta-v1`

Notes are no longer embedded in week/day cards on the public routes.

## JSON/workbook mismatches observed
- No blocking structural mismatch for roadmap sequencing (32 weeks, 7 days/week).
- Workbook enrichment includes tables not fully represented in original JSON (`checkpoint`, workload model, journal template metadata).
- Prompt-level Week 1 support correction conflicts with legacy JSON Week 1 repeated support item and has been applied as an override in migrated content.

## Content areas still worth enriching later
- Increase glossary depth for late-stage GRC/application topics with more compliance and legal terminology.
- Add more scenario-specific flashcards for Week 28-31 (management communication + governance tradeoffs).
- Expand resource references per glossary entry to include direct lesson links where available.

## Recommended v2+ enhancements
- Optional notes entry editing history/versioning.
- Optional flashcard spaced-repetition scheduling in browser.
- Optional CSV/Markdown import for bulk seed notes.
- Optional automated workbook parser in-repo (instead of pre-extracted workbook JSON).
