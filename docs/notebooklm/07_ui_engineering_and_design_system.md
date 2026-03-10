# 07 UI Engineering and Design System

## Purpose of this document

Explain the UI system as engineering: tokens, shared primitives, theme switching, responsive behavior, and which parts of the UI are static markup versus script-enhanced.

## What to inspect in the repo first

- `src/styles/global.css`
- `src/styles/boot-intro.css`
- `src/layouts/Layout.astro`
- `src/components/Navbar.astro`
- `src/components/Footer.astro`
- `src/lib/theme-options.js`
- `src/scripts/color-theme.js`
- `src/scripts/font-theme.js`

## Observed implementation

The design system is centralized in `src/styles/global.css`. It uses CSS custom properties for:

- core colors
- accent variants
- surface treatments
- typography settings
- shared spacing/layout measurements
- themeable backgrounds

The visual language is terminal-inspired, but technically the important point is that most UI primitives are standardized:

- `.card`
- `.badge`
- `.hero`
- `.grid`
- `.track`
- button variants
- shared form fields

## Token system

From `src/styles/global.css`:

```css
:root {
  --bg: var(--c-void);
  --surface: rgba(22, 18, 15, 0.82);
  --surface-soft: rgba(22, 18, 15, 0.9);
  --border: var(--c-line);
  --ink: var(--c-white);
  --accent: var(--c-acid);
  --accent-dark: var(--c-acid-dim);
  --accent-soft: var(--c-acid-wash);
  --max: 1160px;
}
```

What this proves:

- components can share a visual vocabulary without duplicating color constants
- themes work by variable substitution rather than rewriting component CSS

## Theme switching

### Observed implementation

Typography themes and color themes are defined in `src/lib/theme-options.js`. `src/scripts/font-theme.js` and `src/scripts/color-theme.js` read localStorage, apply `data-*` attributes to `document.documentElement`, and sync all matching selects in Navbar and Footer.

Relevant attributes:

- `html[data-font-theme='ops-console']`
- `html[data-font-theme='editor-clean']`
- `html[data-font-theme='mono-range']`
- `html[data-color-theme='banner']`
- `html[data-color-theme='inked']`
- `html[data-color-theme='woodland']`
- `html[data-color-theme='cocoa-topaz-noonday']`
- `html[data-color-theme='pearl']`
- `html[data-color-theme='graphite']`

### Likely rationale / trade-off

This is a lightweight theming system. The trade-off is that themes are global and CSS-driven; there is no per-component theming abstraction.

### Skill takeaway

Dataset-driven theming is often enough for static sites with small client behavior.

## Shared primitives

### Cards

`.card` defines a textured surface, border, corner accents, padding, and box shadow. Many route components rely on it as the baseline container.

### Badges

`.badge`, `.badge.neutral`, `.badge.accent`, `.badge.success`, and `.badge.warn` provide standardized metadata pills.

### Buttons

The repo uses:

- default filled button
- `.secondary`
- `.danger`
- `.ghost`

These variants are defined once in global CSS and then reused in Astro components and page markup.

### Hero sections

`.hero` establishes the banner-like page header block with a built-in overlay marker (`ACTIVE_VIEW`) and radial accent glow.

## Responsive behavior

### Observed implementation

Global CSS has main breakpoints around `900px`, `720px`, and `480px`. Navigation behavior is split between:

- desktop header/nav in `Navbar.astro`
- mobile nav plus banner treatment
- mobile theme controls in `Footer.astro`

`src/styles/boot-intro.css` also adapts the intro animation for smaller screens and reduced-motion preference.

### Likely rationale / trade-off

The system favors a small number of coarse breakpoints over highly componentized responsive logic. That keeps CSS readable, but some behaviors are globally coordinated rather than locally isolated.

## Static markup vs JS-driven state

### Mostly static

- resources page
- about page
- flashcard export guide
- offline page
- security journal prompt archive

### JS-enhanced

- home dashboard counters
- roadmap unlock/progress cards
- week completion/blocking/export interactions
- glossary filters
- flashcard filters/export
- progress dashboard rendering
- notes forms/tabs/import/export/reset
- theme switching
- boot intro

## Small code excerpt: theme restoration before paint

From `src/layouts/Layout.astro`:

```astro
<script is:inline>
  (() => {
    try {
      const fontValue = localStorage.getItem(fontKey);
      if (fontAllowed.has(fontValue) && fontValue !== 'default') {
        document.documentElement.dataset.fontTheme = fontValue;
      }
      const colorValue = localStorage.getItem(colorKey);
      if (colorAllowed.has(colorValue) && colorValue !== 'default') {
        document.documentElement.dataset.colorTheme = colorValue;
      }
    } catch {
      // Ignore localStorage errors.
    }
  })();
</script>
```

What this proves:

- theme state is restored early to reduce flash-of-unstyled-theme
- layout-level inline script is used because the timing matters before the rest of the page paints

## Common pitfalls or failure modes

- Adding component CSS that duplicates global primitives instead of reusing them.
- Renaming theme option values without updating CSS selectors and localStorage normalization.
- Forgetting that Navbar and Footer both contain synchronized theme controls.

## How to extend it safely

- Add new tokens to `:root`.
- Add a new theme option in `src/lib/theme-options.js`.
- Add matching CSS variable overrides in `src/styles/global.css`.
- Reuse `.card`, `.badge`, `.hero`, and `.grid` before inventing new structural patterns.

## Skill takeaway

This repo demonstrates a disciplined CSS-variable-driven system: one big shared stylesheet, route-local polish where needed, and tiny JS modules to persist visual preferences.

## Mini exercises / code reading prompts

1. Add a new color theme on paper: which files would need edits?
2. Identify which parts of the navbar behavior are CSS-only versus script-assisted.
3. Explain why the boot intro lives in its own CSS file instead of being merged into `global.css`.

