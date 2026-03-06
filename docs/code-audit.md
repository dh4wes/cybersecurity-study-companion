# Code Audit and Refactor Notes

Date: 2026-03-06

## Scope

This audit focused on:
- client-side safety
- readability and modularity
- documentation accuracy
- consistency between canonical content and rendered UI

The audit preserved:
- static Astro output
- GitHub Pages compatibility
- local-only persistence
- Layer A / Layer B product boundaries

## Findings

### 1. DOM injection risk from string-based rendering
Several page scripts previously used `innerHTML` for UI rendering. That was not necessary for the current feature set and increased the risk surface for future unsafe content handling.

Status:
- addressed

Changes:
- refactored page rendering to build DOM nodes directly
- removed the remaining raw HTML helper path from `src/scripts/runtime/client-utils.js`

Affected areas:
- `src/scripts/progress-page.js`
- `src/scripts/notes-page.js`
- `src/scripts/runtime/client-utils.js`

### 2. Repeated boot/init and repeated JSON parsing
Multiple page scripts repeated `DOMContentLoaded` bootstrap code and reparsed embedded JSON payloads on rerender.

Status:
- addressed

Changes:
- added shared `initOnReady()` helper
- cached parsed page data where appropriate

Affected areas:
- `src/scripts/home-page.js`
- `src/scripts/weeks-page.js`
- `src/scripts/week-page.js`
- `src/scripts/glossary-page.js`
- `src/scripts/flashcards-page.js`
- `src/scripts/progress-page.js`
- `src/scripts/notes-page.js`

### 3. IndexedDB lifecycle hardening gaps
The IndexedDB helper was functional but lacked some lifecycle handling expected in a more defensive implementation.

Status:
- addressed

Changes:
- added `onversionchange` handling to close connections cleanly
- added `onblocked` handling during open

Affected area:
- `src/scripts/idb-kv.js`

### 4. Runtime environment detection
Capacitor runtime detection in PWA registration was permissive and could be clearer.

Status:
- addressed

Changes:
- tightened the Capacitor detection check before service worker registration

Affected area:
- `src/scripts/pwa-register.ts`

### 5. Content quality regression in relation bullets/cards
The glossary relation bullet and the third flashcard in each set had drifted into generic, repetitive category-level filler.

Status:
- addressed

Changes:
- rewrote glossary relation bullets to provide term-specific placement among actual neighboring concepts
- synchronized relation flashcards to the revised glossary content

Affected areas:
- `src/data/content/glossary.json`
- `src/data/content/flashcards.json`

### 6. Documentation drift
Repo docs no longer matched the current storage backend, PWA status, Android packaging support, or simplified glossary/flashcard schemas.

Status:
- addressed

Changes:
- refreshed `README.md`
- refreshed `docs/overview.md`
- refreshed this audit document
- refreshed in-app About copy separately with shorter public-facing messaging

## Remaining security posture

### Dependency audit
`npm audit` still reports 6 high-severity issues.

Current chains:
- `@vite-pwa/astro -> vite-plugin-pwa -> workbox-build -> @rollup/plugin-terser -> serialize-javascript`
- `astro -> svgo`

Assessment:
- these are currently transitive build-time/tooling vulnerabilities
- they are not evidence of a direct runtime exploit path in the shipped static app
- they should still be monitored and upgraded deliberately rather than force-fixed blindly

Why not auto-fix:
- npm's suggested forced remediation path is not trustworthy for this repo and may downgrade or destabilize core packages
- this project depends on the current Astro/PWA/Capacitor integration remaining stable

Recommended follow-up:
1. track patched upstream releases for `astro` and `@vite-pwa/astro`
2. upgrade deliberately and retest the full build/preview/PWA flow
3. add CI audit visibility, but do not auto-apply `npm audit fix --force`

## Refactors applied

### Shared utility improvements
- added `initOnReady()`
- added `clearNode()`
- added `createElement()`
- added `appendChildren()`
- added `getErrorMessage()`

Location:
- `src/scripts/runtime/client-utils.js`

### Page-level refactors
- cached embedded JSON where appropriate
- moved rendering toward smaller helper functions
- standardized initialization flow
- standardized error message handling

### Content hardening
- glossary relation bullets now add specific contextual information
- relation flashcards now mirror those revised bullets exactly

## Verification

Commands run:

```bash
npm run build
npm run preview
```

Preview smoke-tested routes:
- `/`
- `/weeks/`
- `/weeks/week-01/`
- `/glossary/`
- `/flashcards/`
- `/progress/`
- `/notes/`

Result:
- build passed
- preview routes returned `200 OK`

## Recommended next improvements

### Tooling
1. Add ESLint and Prettier or Biome with a minimal non-invasive config.
2. Add lightweight test coverage for:
   - `src/lib/anki-export.js`
   - storage migration behavior
   - glossary/flashcard mapping integrity

### Content quality
1. Continue enriching late-stage GRC and governance terminology.
2. Add validation scripts that enforce:
   - three flashcards per glossary term
   - glossary/flashcard reference integrity
   - no generic relation bullet templates

### Delivery
1. Add CI checks for build, content integrity, and preview smoke tests.
2. Add a dependency review cadence for the PWA/Capacitor toolchain.
