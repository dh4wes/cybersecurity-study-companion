# Codex Build Brief: Cybersecurity Study Companion

## Goal

Build a **static website portfolio + study companion** for a **32-week cybersecurity roadmap**. The site should work as both:

1. a personal portfolio that shows weekly artifacts and reflections, and
2. a study dashboard that makes it easy to see what to do each day.

Use the companion dataset in **`cybersecurity_study_companion_data.json`** as the source of truth for the roadmap, week pages, and day cards.

## Preferred stack

Use this order of preference:

1. **Astro** for the site framework
2. **Markdown + JSON data**
3. **Vanilla JavaScript** for progress tracking
4. **GitHub Pages** deployment target

If Astro is unavailable, fall back to a plain **HTML/CSS/JavaScript static site** that still works on GitHub Pages.

## Non-negotiable requirements

- Static site only for v1. No required backend.
- Mobile-friendly but optimized for laptop use.
- Clean, calm, professional design.
- Fast load time.
- Accessible color contrast and semantic HTML.
- Every day card must clearly show:
  - whether it is **Video**
  - whether it is **Reading**
  - whether it is **Hands-on**
  - whether it is **Writing / portfolio**
  - whether a **Laptop** is required, recommended, or not needed
- Every day card must show the primary resource and link.
- Every week page must show the weekly deliverable and checkpoint.
- The site must support filtering by:
  - Phase
  - Week
  - Session type
  - Laptop needed
  - Task mode tags
- The site must include a minimal progress tracker that works without login.

## Information architecture

Build these core pages:

- `/` - Home
- `/roadmap/` - Full roadmap index
- `/weeks/` - Week archive
- `/resources/` - Resource hub
- `/security-journal/` - Security journal archive
- `/progress/` - Progress dashboard
- `/about/` - About this journey

Also create one page per week using the slug values from the JSON dataset.

## Core page behavior

### Home
Show:
- site title and short intro
- current phase
- current week card
- quick links to today's study block, roadmap, resources, security journal, and progress
- progress summary:
  - completed study days
  - completed review days
  - completed weeks
  - next unfinished task

### Roadmap page
Show:
- the 32-week timeline grouped by phase
- a compact card for each week
- week number
- focus
- deliverable
- checkpoint
- primary resource
- button linking to the individual week page

### Week page template
For every week page, include:

1. Hero section
   - Week number
   - Phase
   - Weekly focus
   - Deliverable
   - Checkpoint

2. Daily plan section
   - 7 cards, one for each day
   - clear badges for task type and laptop requirement
   - session objective
   - suggested split
   - to-do list
   - resource links
   - progress controls

3. Weekly output section
   - what to publish
   - suggested evidence / assets
   - reflection box
   - optional upload / link field for artifact URL

4. Notes section
   - free-text notes saved locally

### Resources page
Group resources by category and show:
- resource name
- use case
- best weeks
- URL
- notes

### Security Journal page
Support:
- list of journal entries
- tags like breach, IAM, incident response, governance, phishing, malware, cloud, vendor risk
- link out to source URLs
- simple form for storing local notes in the browser for draft journal entries

### Progress page
Show:
- total percent complete
- progress by phase
- progress by week
- list of blocked items
- next deliverable
- reset progress button
- export/import progress JSON

### About page
Show:
- short bio
- target roles
- what the roadmap covers
- what artifacts this site contains

## Visual system

Use a restrained portfolio style:
- light background
- dark navy or slate headings
- muted accent color for tags and progress bars
- generous spacing
- cards with subtle borders
- badges for:
  - Video
  - Reading
  - Hands-on
  - Writing
  - Laptop required
  - Laptop recommended
  - No laptop

Design should feel credible and professional rather than flashy.

## Minimal progress tracking for v1

Implement progress with **`localStorage`** only.

Use these storage keys:

```text
cyber-study-progress-v1
cyber-study-notes-v1
cyber-study-journal-drafts-v1
```

### Suggested localStorage structure

```json
{
  "completedDays": ["week-01-day-01", "week-01-day-02"],
  "completedWeeks": ["week-01"],
  "blockedDays": [],
  "artifactLinks": {
    "week-01": "https://example.com/artifact-link"
  },
  "weekReflections": {
    "week-01": "This week I finally understood the boot process."
  },
  "updatedAt": "2026-03-03T00:00:00Z"
}
```

### Required progress interactions

For each day card:
- checkbox or toggle for complete / incomplete
- optional blocked toggle
- note field

For each week page:
- mark week complete
- save weekly reflection
- save artifact link

For the progress dashboard:
- calculate percentages client-side
- export progress as JSON file
- import previously exported progress JSON file
- reset all progress after confirmation

## Interaction options

Implement v1, and leave room for v2 upgrades.

### Option A - simplest possible
Use:
- static files
- localStorage
- no authentication
- no sync across devices

Best for:
- fastest launch
- lowest maintenance
- private progress tracking on one browser

### Option B - best balance
Use:
- Astro
- JSON content
- localStorage
- deploy to GitHub Pages

Best for:
- clean portfolio
- maintainable content model
- still zero backend for v1

### Option C - future upgrade
Add:
- Supabase
- optional sign-in
- synced progress across devices
- stored journal drafts and artifact links

Best for:
- multi-device use
- long-term portfolio growth
- authenticated private notes

Do **not** build Option C in v1 unless explicitly requested.

## Suggested components

Build these reusable components:

- `Layout`
- `Navbar`
- `Footer`
- `PhaseTimeline`
- `WeekCard`
- `DayCard`
- `TaskBadges`
- `ResourceLinkList`
- `ProgressSummary`
- `ProgressBar`
- `WeeklyReflectionForm`
- `ArtifactLinkForm`
- `JournalEntryCard`
- `FilterBar`
- `ExportImportControls`

## Data handling rules

- Read all roadmap content from `cybersecurity_study_companion_data.json`.
- Do not hardcode week/day content in page files.
- Generate week pages from the JSON dataset.
- Use the `slug` field for routing.
- Use the `task_mode_tags`, `laptop_needed`, `video`, `reading`, `hands_on`, and `writing_portfolio` fields directly in badges and filters.

## Content strategy

The site should feel like a proof-of-work portfolio.

Each week page should help the learner publish:
- what they studied
- what they built or wrote
- what they now understand
- what still needs work

Each weekly artifact should be framed in employer-friendly language:
- diagram
- checklist
- playbook
- worksheet
- notes
- journal summary
- packet analysis
- risk register
- workflow summary
- portfolio reflection

## Portfolio framing copy

Use language like this across the site:

- “This site documents my 32-week cybersecurity learning roadmap.”
- “Each week includes a deliverable, reflection, and linked study resources.”
- “The goal is not only to study cyber topics, but to produce visible proof of learning.”
- “Progress tracking is browser-based in v1 so the site can stay fully static.”

## Build order

1. Create the site shell and global layout
2. Build the roadmap index and resource page
3. Generate all week pages from JSON
4. Add the progress tracker with localStorage
5. Add filters and progress dashboard
6. Add import/export controls
7. Add responsive polish
8. Confirm GitHub Pages compatibility

## Acceptance checklist

The build is done when all of the following are true:

- The site builds as a static site
- The site can be deployed to GitHub Pages
- Every week page exists
- Every day card shows the required metadata and links
- Progress is stored locally and persists after reload
- The user can export and import progress
- The roadmap can be filtered by laptop requirement and task type
- The site looks like a professional portfolio, not a toy app

## Source files to use

- `cybersecurity_study_companion_data.json`
- `cybersecurity_daily_study_plan_2026_portfolio_ready.xlsx`

## Final note for the implementation

Prefer **simple, durable, static-first architecture**. The site should be easy to maintain for months, even if the learner only updates it once per week on review day.
