# Authoring Principles

## Scope
The lecture pack is generated from the live canonical syllabus, glossary, flashcards, and day source links. It stays inside the actual day objective and week focus instead of turning each day into a generic textbook chapter.

## Teaching standard
- Explain mechanisms, not slogans.
- Connect the day to system behavior, troubleshooting, or security operations.
- Use glossary concepts as anchors, but avoid turning the lecture into a glossary dump.
- Make exam relevance explicit without copying proprietary objectives.

## Style rules
- Calm, direct, concrete, and beginner-serious.
- Short paragraphs over giant bullet walls.
- Distinctions and self-check prompts should push explanation, not recognition alone.
- Review days synthesize; rest days stay intentionally light.

## Source-grounding rules
- Primary source of truth: `src/data/content/study-companion-v2.json`.
- Concept anchors: `src/data/content/glossary.json` and `src/data/content/flashcards.json`.
- External resource anchors are pulled from `src/data/day-source-links.json` and the per-day resource fields in the syllabus.
- Missing prompt files such as `overview.md` and `flashcard_info.md` were not used because they are absent from the repo.
