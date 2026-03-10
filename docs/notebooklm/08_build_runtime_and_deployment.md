# 08 Build, Runtime, and Deployment

## Purpose of this document

Explain how the app builds, what runs at build time versus in the browser, how deployment works for a static site, and what PWA/Capacitor support changes.

## What to inspect in the repo first

- `package.json`
- `astro.config.mjs`
- `src/layouts/Layout.astro`
- `src/scripts/pwa-register.ts`
- `README.md`

## Observed implementation

The build toolchain is Astro plus `@vite-pwa/astro`.

Relevant npm scripts in `package.json`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run build:cap`
- `npm run cap:sync`
- `npm run cap:open`
- `npm run migrate:glossary`
- `npm run validate:glossary`
- `npm run audit:flashcards`

`astro.config.mjs` confirms:

- `output: 'static'`
- configurable `site` from `SITE_URL`
- configurable `base` from `SITE_BASE`
- PWA integration with generated service worker

## Local development flow

1. `npm install`
2. `npm run dev`
3. Astro serves pages, imports JSON content directly, and hot reloads route/components/style changes.

Content tooling can be run independently:

- `npm run migrate:glossary`
- `npm run validate:glossary`
- `npm run audit:flashcards`

## Static build flow

1. Astro imports all content at build time.
2. `getStaticPaths()` in `src/pages/weeks/[...slug].astro` generates week routes.
3. Route HTML is written into `dist/`.
4. Vite builds client assets for the enhancement scripts.
5. PWA integration generates service worker assets and manifest.

## What goes into `dist/`

### Observed implementation

A successful build emits:

- static HTML for all routes
- bundled client JS assets under `dist/_astro/`
- PWA files such as `sw.js`, `registerSW.js`, and `manifest.webmanifest`

### Likely rationale / trade-off

This keeps the deployment output hostable on static platforms like GitHub Pages. The trade-off is that anything needing server computation must already be precomputed before build.

## `SITE_URL` and `SITE_BASE`

From `astro.config.mjs`:

```js
const site = process.env.SITE_URL || 'https://dh4wes.github.io';
const base = process.env.SITE_BASE || '/';
```

### Observed implementation

`site` affects absolute URL generation such as canonical URLs and social metadata in `Layout.astro`. `base` affects route prefixing and PWA path generation.

### Likely rationale / trade-off

This allows the same repo to build for root hosting or subpath hosting such as GitHub Pages. The cost is that every route/link helper must respect `base`.

### Skill takeaway

Static apps deployed to subpaths need consistent base-path handling everywhere, not just in the router.

## GitHub Pages deployment implications

### Observed implementation

The code is clearly built to be GitHub Pages compatible:

- static output
- no backend dependency
- `withBase()` helpers in both `src/lib/site-data.js` and `src/scripts/runtime/client-utils.js`
- configurable `SITE_BASE`

### What “static-output compatible” means here

- every route must be buildable without runtime server data
- all persistent state must live in the browser
- export/import must happen client-side
- content changes are deployed as new static assets

## PWA runtime

### Observed implementation

`src/scripts/pwa-register.ts` registers a service worker unless the app is running under Capacitor. `astro.config.mjs` configures runtime caching for:

- navigation requests
- scripts/styles
- images

There is also an offline fallback route at `src/pages/offline.astro`.

## Capacitor support

### Observed implementation

`package.json` includes:

- `build:cap`
- `cap:sync`
- `cap:open`

That means the project can also be packaged for Android via Capacitor.

### What changes conceptually

- service worker registration is skipped inside Capacitor runtime
- static web assets still matter, but they are embedded into a native shell
- deployment target becomes app packaging rather than only GitHub Pages hosting

## Small code excerpt: deployment-sensitive config

From `astro.config.mjs`:

```js
export default defineConfig({
  site,
  base,
  output: 'static'
});
```

What this proves:

- the entire deployment model depends on static generation
- site/base values are first-class deployment parameters

## Troubleshooting

### Common build errors

- Wrong `SITE_BASE` leads to broken asset links.
- Wrong `SITE_URL` leads to bad canonical/social URLs.
- Changing route slugs without respecting `withBase()` breaks navigation under subpath hosting.
- Introducing server-only code into a route or script breaks static deployment assumptions.

### Common offline/PWA errors

- Expecting a route to work offline before it has ever been cached.
- Forgetting that service worker registration is skipped in Capacitor runtime.

### Common content-pipeline errors

- Changing glossary schema without rerunning `npm run validate:glossary`.
- Changing flashcard generation assumptions without rerunning `npm run audit:flashcards`.

## How to extend it safely

- Keep new features static-compatible unless there is a strong reason not to.
- Use `withBase()` for route and asset links.
- If you add a new route, verify it works under a non-root base path.
- If you add new cached assets, ensure they fit the PWA caching strategy.

## Skill takeaway

This repo is a strong example of static deployment discipline: build-time content compilation, browser-only persistence, and careful base-path handling for GitHub Pages-style hosting.

## Mini exercises / code reading prompts

1. Explain why this repo can ship to GitHub Pages without a backend.
2. Trace where `base` influences both HTML and client-side links.
3. Explain why Capacitor runtime skips service worker registration.

