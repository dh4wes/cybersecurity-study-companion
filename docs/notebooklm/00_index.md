# NotebookLM Study Pack: Cybersecurity Study Companion

## Purpose of this document

This folder is a repo-specific study pack for learning how the app works as software, not how to use it as an end user.

It is grounded in the current implementation under `src/`, `docs/master.md`, `README.md`, `astro.config.mjs`, and the canonical JSON content files.

## What to inspect in the repo first

- `astro.config.mjs`
- `src/layouts/Layout.astro`
- `src/lib/site-data.js`
- `src/pages/`
- `src/scripts/`
- `src/data/content/`

## Verified repo mismatches from the prompt assumptions

### Observed implementation

- `overview.md` is not present in the repo.
- There is no standalone `/weeks/` archive route. The archive view is `/roadmap/`.
- `src/scripts/weeks-page.js` is not present. The actual archive script is `src/scripts/roadmap-page.js`.
- Progress and notes are no longer primarily stored in plain localStorage. The active storage path is IndexedDB via `src/scripts/idb-kv.js`, with migration from legacy localStorage keys in `src/scripts/storage-migrate.js`.
- `src/data/content/glossary.json` is no longer just `id/term/category/bullets`. It now includes `definition`, `purpose`, `mechanism`, and `model`.
- `src/data/content/flashcards.json` now uses the card types `definition`, `mechanism`, `comparison`, and `scenario`.

### Likely rationale / trade-off

The codebase has evolved faster than the prompt template. That is normal in static content-heavy apps. The cost is that old architecture summaries become partially wrong unless they are refreshed from code.

### Skill takeaway

Always verify architecture claims against the live repo. In small projects, the code is the source of truth long before docs catch up.

## Recommended reading order

1. `01_system_architecture.md`
2. `02_route_component_script_map.md`
3. `03_data_model_and_content_pipeline.md`
4. `04_client_state_and_persistence.md`
5. `05_feature_deep_dives.md`
6. `06_modularity_and_code_organization.md`
7. `07_ui_engineering_and_design_system.md`
8. `08_build_runtime_and_deployment.md`
9. `09_programming_tradeoffs_and_architecture_decisions.md`
10. `10_code_reading_paths_and_skill_building.md`
11. `11_debugging_extension_and_refactor_guide.md`
12. `12_repo_glossary_and_programming_terms.md`

## File-by-file map

- `01_system_architecture.md`
  What kind of app this is, how static generation and client enhancement fit together, and how Layer A and Layer B are separated.
- `02_route_component_script_map.md`
  Route-by-route ownership map: Astro page, components, scripts, data dependencies, storage touches.
- `03_data_model_and_content_pipeline.md`
  Canonical JSON structure, normalization in `src/lib/site-data.js`, ID linking, and migration/validation scripts.
- `04_client_state_and_persistence.md`
  Progress state, notes state, IndexedDB boundaries, export/import/reset flows, and failure modes.
- `05_feature_deep_dives.md`
  Concrete walkthroughs of the main interactive features and where the DOM/state logic lives.
- `06_modularity_and_code_organization.md`
  Why the code is split the way it is and where boundaries are strong versus leaky.
- `07_ui_engineering_and_design_system.md`
  How the CSS system, theme controls, shared primitives, and responsive behavior are implemented.
- `08_build_runtime_and_deployment.md`
  Astro static build, PWA layer, base/site config, and deployment implications.
- `09_programming_tradeoffs_and_architecture_decisions.md`
  Why this codebase chose static Astro, JSON content, vanilla JS modules, local persistence, and a separate notes layer.
- `10_code_reading_paths_and_skill_building.md`
  Guided study paths for building software-engineering skill from this repo.
- `11_debugging_extension_and_refactor_guide.md`
  Safe workflows for tracing bugs, adding features, changing schemas, and refactoring.
- `12_repo_glossary_and_programming_terms.md`
  Repo-specific programming vocabulary with examples from this codebase.

## Start here if you care most about...

- Architecture: `01_system_architecture.md`
- Routes and page ownership: `02_route_component_script_map.md`
- Data modeling and normalization: `03_data_model_and_content_pipeline.md`
- Persistence and local state: `04_client_state_and_persistence.md`
- UI implementation: `07_ui_engineering_and_design_system.md`
- Deployment and build mechanics: `08_build_runtime_and_deployment.md`
- Refactoring safely: `11_debugging_extension_and_refactor_guide.md`

## Study strategy

### Observed implementation

The app is small enough that one person can still hold the full architecture in working memory, but large enough that feature tracing matters. The critical path is:

`JSON content -> site-data normalization -> Astro route -> page-specific script -> browser persistence`

### Likely rationale / trade-off

This is a good learning codebase because it is not overabstracted. The code usually picks explicit data passing and page-specific scripts over a larger framework runtime.

### Skill takeaway

Use this repo to practice tracing:

- where data is born
- where it is normalized
- where it is rendered
- where user interaction mutates state
- where persistence happens

