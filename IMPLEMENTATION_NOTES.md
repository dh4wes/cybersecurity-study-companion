# Implementation Notes

## Assumptions made
- Week-level `checkpoint` is enriched from workbook (`Weekly Roadmap`) and exposed in UI.
- Day-level `phase` is inferred from parent week (workbook has explicit per-day phase; JSON does not).
- "Current week" and "today's study block" are computed from first unfinished actionable day.
- Total completion percent is based on actionable days (`Study` + `Review`), excluding `Rest` days.
- For days missing primary resource (e.g., rest day), week-level primary resource is used as fallback so every day card still shows a primary link.

## JSON/workbook mismatch findings
- No conflicting roadmap/resource/week-page values found across JSON vs workbook in validated fields.
- Workbook includes additional fields/tables not present directly in JSON:
  - `Checkpoint` (week level)
  - `Daily Plan` phase column (derivable)
  - `Workload Model` table
  - `Security Journal` template rows/headers
- These workbook-only fields were used as enrichment (not as canonical overrides).

## Recommended v2 enhancements
- Optional Supabase sync for cross-device progress and private notes.
- Journal entry edit flow (not only add/delete drafts).
- Rich artifact gallery per week (multiple links/screenshots).
- Calendar/date-aware "today" scheduling tied to actual dates.
- Lightweight analytics (self-hosted privacy-preserving) for portfolio visits.
- Automated workbook->JSON enrichment script in Node for fully reproducible content pipeline.
