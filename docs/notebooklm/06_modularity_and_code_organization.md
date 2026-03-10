# 06 Modularity and Code Organization

## Purpose of this document

Focus specifically on the code organization strategy: what is separated, what is intentionally simple, what is coupled, and what is worth imitating.

## What to inspect in the repo first

- `src/layouts/Layout.astro`
- `src/pages/`
- `src/components/`
- `src/scripts/`
- `src/lib/site-data.js`
- `src/styles/global.css`

## Observed implementation

The repo uses a clear separation of concerns:

- pages own route assembly
- components own reusable markup fragments
- scripts own client behavior
- `src/lib/` owns shared data and utility logic
- JSON files own canonical content
- global CSS owns shared visual primitives

## Page vs component vs layout responsibilities

### Layout responsibilities

`src/layouts/Layout.astro` owns:

- global `<head>`
- shell structure
- global boot intro
- global nav/footer
- early theme restoration
- storage migration script
- PWA registration

### Page responsibilities

Pages such as `src/pages/weeks/[...slug].astro` and `src/pages/flashcards/index.astro` own:

- route-level data selection
- route-specific JSON payload serialization
- component composition
- route-specific client script import

### Component responsibilities

Components such as `DayCard.astro`, `WeekCard.astro`, `GlossaryTermCard.astro`, and `FlashcardItem.astro` own:

- reusable HTML structure
- local styling
- stable class names and `data-*` hooks for scripts

They do not usually own client state themselves.

## Script-module boundaries

### Observed implementation

The script layer is mostly split by feature/page:

- `home-page.js`
- `roadmap-page.js`
- `week-page.js`
- `glossary-page.js`
- `flashcards-page.js`
- `progress-page.js`
- `notes-page.js`

Shared behavior is extracted only when reuse is obvious:

- `progress-storage.js`
- `progress-metrics.js`
- `notes-storage.js`
- `runtime/client-utils.js`
- `idb-kv.js`

### Likely rationale / trade-off

This avoids premature abstraction. The cost is that scripts are coupled to route markup, but that coupling is very visible and easy to trace.

### Skill takeaway

Do not over-abstract event wiring. Extract only what earns reuse or clarity.

## Data layer boundaries

### Observed implementation

The strongest central boundary is `src/lib/site-data.js`. Route files generally trust it to provide already-normalized arrays, maps, and option lists.

### Coupling that still exists

- Routes still know which normalized export to use.
- Some route scripts depend on JSON payload shapes derived from the page, not directly from `site-data.js`.

### What you might refactor later

- Add smaller selector/serializer helpers if JSON payload construction becomes repetitive across routes.
- Split `site-data.js` if normalization logic grows significantly further.

## Style-system boundaries

### Observed implementation

`src/styles/global.css` defines:

- tokens
- theme variables
- card/button/badge/input primitives
- shell layout behavior
- responsive rules

Component files add only local style patches when needed.

### Likely rationale / trade-off

Centralizing the visual system in one CSS file reduces duplication. The trade-off is a large shared stylesheet that many components depend on implicitly.

## What “good modularity” looks like here

- storage logic is not mixed into Astro files
- metrics logic is not mixed into DOM rendering
- route pages do not directly manipulate IndexedDB
- components stay mostly declarative
- content normalization is centralized

## Where the code is intentionally simple rather than abstract

- direct DOM queries instead of a client framework
- `parseJsonScript()` instead of a hydration protocol
- one-key-value object store instead of a more elaborate IDB schema
- page-specific scripts instead of a generic controller system

## Small code excerpt: utility extraction without overengineering

From `src/scripts/runtime/client-utils.js`:

```js
export const parseJsonScript = (id, fallback = {}) => {
  const node = document.getElementById(id);
  if (!node) return fallback;

  try {
    return JSON.parse(node.textContent || '{}');
  } catch {
    return fallback;
  }
};
```

What this proves:

- one tiny utility removes repetitive parsing code
- the repo does not build a bigger abstraction than needed

## What to imitate in your own projects

- Keep one obvious file per route behavior.
- Keep one obvious normalization layer.
- Keep storage helpers free of DOM logic.
- Use data attributes as explicit DOM contracts.
- Prefer plain, narrow helpers over framework-like utility piles.

## What you might refactor later

- Split `week-page.js` if export/reflection/locking logic grows further.
- Introduce selector constants if page scripts become more brittle.
- Break `site-data.js` into smaller normalization modules if content pipelines continue to expand.

## Common pitfalls or failure modes

- Hiding coupling by spreading logic across too many tiny files.
- Moving shared logic into components when it really belongs in scripts or `lib/`.
- Letting `site-data.js` become a silent dumping ground without documenting its exports.

## How to extend it safely

- Ask which layer owns the change before editing:
  route, component, script, storage, data, or style.
- Prefer adding a new module over bloating an unrelated one.
- Keep data normalization separate from DOM concerns.

## Skill takeaway

This codebase is a good example of “explicit modularity”: not highly abstract, but easy to reason about because responsibilities are visible.

## Mini exercises / code reading prompts

1. Pick one feature and list which concerns live in page, component, script, and storage.
2. Explain why `notes-storage.js` is a stronger module boundary than `notes-page.js`.
3. Identify one place where modularity is strong and one place where coupling still leaks through selectors.

