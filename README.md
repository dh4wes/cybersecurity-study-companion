# Cybersecurity Study Companion (Static Astro Site)

Production-ready static site for a 32-week cybersecurity roadmap that works as both:
- a study companion
- a proof-of-work portfolio

## Data sources and precedence
- Product behavior and acceptance: `cybersecurity_study_companion_codex_ready.md`
- Canonical structured content: `cybersecurity_study_companion_data.json`
- Validation + enrichment: `cybersecurity_daily_study_plan_2026_portfolio_ready.xlsx`
  - Extracted into `src/data/workbook-enrichment.json` for dependency-free static builds.

## Routes
- `/`
- `/roadmap/`
- `/weeks/`
- `/resources/`
- `/security-journal/`
- `/progress/`
- `/about/`
- `/weeks/<week-slug>/` for all 32 week slugs from dataset

## Stack
- Astro (static output)
- JSON content + workbook-enrichment JSON
- Vanilla JS for filters, progress tracking, journal drafts, and dashboard widgets
- GitHub Pages workflow included: `.github/workflows/deploy.yml`

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## GitHub Pages deployment
- Workflow deploys from `main` automatically.
- Build uses:
  - `SITE_URL=https://<owner>.github.io`
  - `SITE_BASE=/<repo>/`
- For user/organization pages (root domain), set `SITE_BASE=/`.

## Progress persistence (v1 localStorage)
- `cyber-study-progress-v1`
- `cyber-study-notes-v1`
- `cyber-study-journal-drafts-v1`

Supported interactions:
- mark day complete/incomplete
- mark day blocked/unblocked
- save per-day notes
- mark week complete
- save weekly reflection
- save weekly artifact URL
- save week-level local notes
- export/import progress JSON
- reset progress with confirmation

## Project structure
- `src/layouts/Layout.astro`
- `src/components/` reusable UI components
- `src/pages/` all required routes + dynamic week route
- `src/scripts/` localStorage, filters, week controls, journal, progress dashboard
- `src/lib/site-data.js` normalized data access
- `src/data/workbook-enrichment.json` workbook-derived enrichment

## Notes
- See `IMPLEMENTATION_NOTES.md` for assumptions, JSON/workbook mismatch findings, and recommended v2 enhancements.
