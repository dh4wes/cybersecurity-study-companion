# Code Audit and Refactor Notes (2026-03-05)

## Scope
Audit focused on maintainability and behavior safety for the static Astro app:
- page scripts in `src/scripts/`
- shared helpers in `src/scripts/runtime/` and `src/lib/`
- recently added Anki export paths and docs

No backend/auth changes were introduced. Static output and GitHub Pages compatibility were preserved.

## Findings
1. Filter-token matching logic was duplicated across multiple scripts.
2. Date-token generation for download filenames was duplicated across scripts.
3. Anki export metadata parsing had an edge-case risk where nullish week/phase values could coerce to `0`, causing `week:00` / `phase:0`.
4. Docs needed alignment with current features (especially Anki export and shared utility model).

## Refactors Applied
1. Shared runtime utility improvements:
   - Added `includesToken()` to `src/scripts/runtime/client-utils.js`.
   - Added `getDateToken()` to `src/scripts/runtime/client-utils.js`.
   - Updated scripts to consume shared helpers:
     - `src/scripts/glossary-page.js`
     - `src/scripts/flashcards-page.js`
     - `src/scripts/weeks-page.js`
     - `src/scripts/week-page.js`

2. Anki export hardening:
   - Updated `src/lib/anki-export.js` to consistently validate numeric metadata using explicit null/undefined-safe checks.
   - Prevented invalid fallback week/phase tags/decks in edge cases.

3. Documentation refresh:
   - Updated `docs/overview.md` with Anki export behavior and refactor notes.
   - Added this audit report.

## Verification
Build verification executed:
```bash
npm run build
```
Result: successful static build with all routes generated.

## Recommended Next Cleanup (Optional)
1. Add lightweight unit tests for `src/lib/anki-export.js` (TSV headers, quoting, tag/deck mapping).
2. Add a small browser-test script for flashcard filtering + “export current view” behavior.
3. Introduce a minimal lint/format config to keep script style consistent as the project grows.

