# Code Audit and Refactor Notes

Date: 2026-03-06

## Scope

This audit pass covered:
- client-side safety
- documentation accuracy
- repository cleanliness
- content consistency between glossary and flashcards
- theme-system maintenance

The pass preserved:
- static Astro output
- GitHub Pages compatibility
- local-only persistence
- Layer A / Layer B boundaries

## Findings and status

### 1. String-based rendering risk
Several client rendering paths previously relied on `innerHTML`.

Status:
- addressed

Result:
- current rendering paths use DOM APIs rather than string HTML injection

### 2. Repeated initialization and repeated parsing
Multiple page scripts previously duplicated boot logic and reparsed JSON payloads.

Status:
- addressed

Result:
- shared runtime helpers handle initialization and common DOM tasks

### 3. IndexedDB lifecycle hardening
The IndexedDB wrapper needed more defensive lifecycle handling.

Status:
- addressed

Result:
- open requests now handle blocked/versionchange cases more safely

### 4. Runtime environment detection
Capacitor detection in the PWA registration path was previously too loose.

Status:
- addressed

Result:
- service worker registration is skipped more explicitly inside the native shell

### 5. Glossary relation-bullet quality
Glossary Bullet 3 had become repetitive and low-value.

Status:
- addressed

Result:
- Bullet 3 now explains mechanism or mental model

### 6. Flashcard type mismatch
Flashcards previously used `relation` cards and outdated question patterns.

Status:
- addressed

Result:
- flashcards now use `definition`, `function`, and `mechanism`
- backs are copied exactly from glossary bullets

### 7. Repository clutter from procedural prompt files
The repo still contained design and upgrade prompt artifacts that were useful during implementation but not part of the maintained product.

Status:
- addressed

Result:
- procedural prompt files were removed from the tracked/untracked repo surface
- documentation now describes the shipped app rather than the build prompts

## Remaining security posture

`npm audit` still reports transitive high-severity issues in build tooling.

Current chains:
- `@vite-pwa/astro -> vite-plugin-pwa -> workbox-build -> @rollup/plugin-terser -> serialize-javascript`
- `astro -> svgo`

Assessment:
- these are build-time dependency issues
- they are not evidence of a direct runtime exploit path in the static shipped app
- they should be upgraded deliberately rather than force-fixed blindly

Recommended follow-up:
1. track patched upstream releases for `astro` and `@vite-pwa/astro`
2. retest build, preview, PWA install, offline behavior, and Capacitor sync after upgrades
3. keep audit visibility in CI without auto-applying `npm audit fix --force`

## Current repo quality posture

### Documentation
- `README.md` matches the current app state
- `docs/overview.md` reflects the live architecture and route model
- `IMPLEMENTATION_NOTES.md` captures assumptions and constraints that still matter

### Organization
- canonical data is kept in `src/data/content/`
- runtime browser helpers remain centralized
- page-specific scripts remain scoped to their routes
- procedural prompt files are no longer part of the maintained repo surface

### Theme system
- color themes are token-based and persisted through one selector
- the theme list now includes the expanded palette set from the recent design snapshots

## Verification

Recommended verification commands for this state:

```bash
npm run build
npm run preview
```

Smoke-test routes:
- `/`
- `/weeks/`
- `/weeks/week-01/`
- `/glossary/`
- `/flashcards/`
- `/progress/`
- `/notes/`

## Recommended next improvements
1. Add lightweight automated checks for glossary/flashcard integrity.
2. Add linting or formatting enforcement.
3. Add CI checks for build, preview smoke tests, and dependency review visibility.
