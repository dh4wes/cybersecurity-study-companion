# Code Audit and Refactor Notes

Date: 2026-03-08

## Scope

This audit baseline covers:

- static-app safety constraints
- data and documentation consistency
- glossary/flashcard integrity
- client-side rendering behavior
- persistence and offline behavior

The pass preserves:

- static Astro output
- GitHub Pages compatibility
- local-only persistence
- Layer A / Layer B separation

## Current Status

### 1. Client Rendering Safety

Status:

- addressed

Current posture:

- primary client rendering paths use DOM APIs rather than string-based HTML injection
- route-specific scripts stay scoped to their own pages

### 2. Shared Runtime Behavior

Status:

- addressed

Current posture:

- shared browser helpers handle common initialization, JSON-script parsing, and utility behavior
- page scripts no longer duplicate basic boot logic unnecessarily

### 3. IndexedDB Lifecycle Hardening

Status:

- addressed

Current posture:

- browser persistence is centered on IndexedDB
- migration from legacy localStorage is preserved
- storage lifecycle handling is more defensive than the earlier implementation

### 4. PWA / Native Environment Separation

Status:

- addressed

Current posture:

- service worker registration is skipped inside the Capacitor shell
- the static web app still supports offline use after first successful load

### 5. Glossary And Flashcard Quality

Status:

- addressed

Current posture:

- glossary Bullet 3 is mechanism-oriented rather than category filler
- flashcards use `definition`, `understanding`, and `application`
- glossary-to-flashcard generation rules are documented and audited

### 6. Day-Deck Regression Risk

Status:

- addressed

Current posture:

- Days 1-5 use new-term-only decks rather than cumulative repetition
- Day 6 remains the full weekly review deck
- audit coverage now checks for repeated flashcards across Days 1-5 before review day

### 7. Week-Page Interaction Drift

Status:

- addressed

Current posture:

- daily sessions on week pages remain collapsed by default
- incomplete sessions are not forced open on load
- completed sessions can still collapse after the user marks them complete

## Remaining Security Posture

`npm audit` may still report transitive issues in build tooling.

Current assessment:

- these findings sit in the build chain rather than the shipped static runtime
- they should be monitored and upgraded deliberately
- `npm audit fix --force` should not be used blindly

Recommended follow-up:

1. Track patched releases for `astro` and `@vite-pwa/astro`.
2. Retest build, preview, offline behavior, and Capacitor sync after upgrades.
3. Keep audit visibility in CI once CI is added.

## Current Repo Quality Posture

### Documentation

The maintained documentation set is:

- `README.md`
- `docs/overview.md`
- `docs/code-audit.md`
- `docs/flashcard_info.md`
- `docs/glossary_flashcard_overhaul_report.md`
- `IMPLEMENTATION_NOTES.md`

The historical glossary-overhaul report is retained for traceability, but the live product spec is carried by the other docs.

### Content Integrity

Current canonical counts:

- 32 weeks
- 224 day records
- 252 glossary terms
- 756 unique flashcards
- 32 weekly review decks

Regression coverage includes:

- glossary reference integrity
- exactly three primary cards per glossary entry
- banned prompt-stem checks
- scenario-answer leakage checks
- front/back echo checks
- day-deck coverage and duplication checks

### Organization

- canonical data remains in `src/data/content/`
- normalization stays in `src/lib/site-data.js`
- page-specific behavior remains in `src/scripts/`
- reusable UI remains in `src/components/`

## Verification

Recommended verification commands:

```bash
npm run audit:flashcards
npm run build
npm run preview
```

Suggested smoke-test routes:

- `/`
- `/weeks/`
- `/weeks/week-01/`
- `/glossary/`
- `/flashcards/`
- `/progress/`
- `/notes/`

## Next Improvements

1. Add linting and formatting enforcement.
2. Add lightweight route-level smoke tests.
3. Add CI for `build` and `audit:flashcards`.
4. Replace placeholder PWA assets if branded assets become available.
