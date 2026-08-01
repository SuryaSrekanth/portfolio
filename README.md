# Surya Srekanth - portfolio

A single-page portfolio positioning Surya as a full-stack, mobile and AI
developer. Next.js 16, React 19, Tailwind v4, statically prerendered.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npx eslint .     # lint
npx tsc --noEmit # typecheck
```

## Where the content lives

**Everything you will want to change is in `src/content/site.ts`.** No copy is
hardcoded in components. Edit that one file and the whole site updates.

| What | Key |
| --- | --- |
| Name, headline, location, email, phone | `profile` |
| GitHub / LinkedIn / resume links | `profile.links` |
| Project cards | `projects` |
| Skill groups and their chips | `skillGroups` |
| Jobs and bullet points | `experience` |
| Degrees | `education` |
| The two About paragraphs | `about.paragraphs` |

### Still to fill in

1. **Four placeholder projects.** Any project with `draft: true` renders a
   small dashed "Draft" chip so unfinished cards are obvious at a glance.
   Replace `title`, `summary`, `detail`, `stack`, `year` and `context`, then
   delete the `draft` key.
2. **The resume PDF.** Drop it in `public/` and make
   `profile.links.resume` match the filename.

### Adding screenshots

Set `image` on a project to a path under `public/`. The existing two point at
`public/projects/`. A project with no `image` falls back to a composed
abstract panel, so cards never look broken while you gather assets.

Capture new ones at **1200x750** (16:10, matching the browser frame) or
**9:19** for the phone frame.

## Design system

Tokens are CSS custom properties in `src/app/globals.css`, exposed to Tailwind
via `@theme inline`. Change a value once there and it propagates.

- **Colour.** `--indigo` → `--violet` accent gradient, `--signal` coral for
  live states and fault markers. `--on-accent` is the text colour used over
  the gradient; it flips to near-black in dark mode, where white would fall
  to about 2.6:1 contrast.
- **Type.** Bricolage Grotesque (display), Instrument Sans (body),
  JetBrains Mono (labels and data).
- **Dark mode.** Class-based, toggled on `<html>`, persisted to
  `localStorage`, applied by a blocking inline script in `layout.tsx` so
  there is no light flash on load.

### The evenness trace

`src/components/EvennessTrace.tsx` draws the site's signature element: a yarn
evenness readout, the wavering line a Uster tester prints, with coral markers
at thick and thin places. It appears in the hero and inside every empty
project frame.

The geometry is computed once at module load from fixed sine terms, so server
and client always render identical markup. `FAULTS` controls the marker
positions. It uses no `Math.random()` deliberately: random geometry would
produce a hydration mismatch.

## Accessibility

Verified: no horizontal overflow at 375px, WCAG AA contrast on the gradient
buttons in both themes (6.2:1 and 7:1 in dark), visible focus rings, and all
animation disabled under `prefers-reduced-motion`.
