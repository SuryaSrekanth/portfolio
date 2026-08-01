# How this portfolio was built

A step-by-step account of everything we did, why we did it, and how to explain
it to someone else. Read it top to bottom once, then use it as a reference.

Jargon is defined the first time it appears. Every concept has a concrete
example from this actual project.

---

## Table of contents

1. [What exists now](#1-what-exists-now)
2. [Moving the old project into a subfolder](#2-moving-the-old-project-into-a-subfolder)
3. [Deciding the theme before writing code](#3-deciding-the-theme-before-writing-code)
4. [Setting up Next.js and Tailwind](#4-setting-up-nextjs-and-tailwind)
5. [The design system](#5-the-design-system)
6. [Dark mode without a flash](#6-dark-mode-without-a-flash)
7. [Keeping all content in one file](#7-keeping-all-content-in-one-file)
8. [The signature element: the evenness trace](#8-the-signature-element-the-evenness-trace)
9. [Five real bugs and what caused them](#9-five-real-bugs-and-what-caused-them)
10. [Capturing real screenshots](#10-capturing-real-screenshots)
11. [Showing images properly with next/image](#11-showing-images-properly-with-nextimage)
12. [Making the project card clickable](#12-making-the-project-card-clickable)
13. [The downloadable resume](#13-the-downloadable-resume)
14. [The WhatsApp link](#14-the-whatsapp-link)
15. [Favicon and social share image](#15-favicon-and-social-share-image)
16. [How we verified everything](#16-how-we-verified-everything)
17. [Glossary](#17-glossary)
18. [Working on it from here](#18-working-on-it-from-here)

---

## 1. What exists now

Two folders live under `~/ps/ss`:

```
ss/
├── textile-defect-assistant/   the original Streamlit app
└── portfolio/                  the new Next.js portfolio site
```

The portfolio is a **single page** with six sections: navigation bar, hero,
work, skills, about, contact, footer. It is **statically prerendered**, meaning
Next.js builds the finished HTML at build time rather than generating it fresh
on every visit. That makes it fast and free to host.

**How to explain it:** "It's a one-page portfolio built with Next.js. All the
HTML is generated once when you build it, so there's no server doing work when
someone visits."

---

## 2. Moving the old project into a subfolder

### What we did

Moved every file from `~/ps/ss/` into `~/ps/ss/textile-defect-assistant/`,
then deleted the old virtual environment and built a fresh one.

### The lesson: a virtualenv cannot be moved

A **virtual environment** (venv) is a private folder of Python packages for one
project, so different projects can use different versions of the same library
without conflicting.

The catch is that a venv is **not self-contained**. It hardcodes absolute file
paths inside itself. Two examples from the real folder:

- `.venv/bin/activate` contains the literal line
  `VIRTUAL_ENV=/home/kanish/ps/ss/.venv`
- `.venv/bin/streamlit` starts with a **shebang** (the `#!` line that tells the
  operating system which program should run this file), pointing at
  `/home/kanish/ps/ss/.venv/bin/python`

Move the folder and those paths point at nothing, so running `streamlit` fails
with `bad interpreter: No such file or directory`.

### Why recreating it is cheap

`requirements.txt` is the real source of truth. The venv is a **build
artifact**, something generated from source rather than written by hand. You
can always throw it away and rebuild:

```bash
uv venv
uv pip install -r requirements.txt
```

**How to explain it:** "A virtualenv writes its own location inside itself, so
moving the folder breaks it. But it's rebuilt from `requirements.txt` in
seconds, so you just delete it and make a new one."

### A second lesson: `uv pip` does not need activation

Plain `pip install` acts on whichever `python` is first on your **PATH** (the
list of folders your shell searches for commands). If you forget to activate
the venv first, you silently install into the system Python instead.

`uv pip install` looks for a `.venv/` folder in the current directory and
targets it directly. You only need to activate afterwards, so that typing
`streamlit` works instead of `.venv/bin/streamlit`.

---

## 3. Deciding the theme before writing code

Before any code, we settled **positioning**: who the site is for and what claim
it makes. This matters because a portfolio is a positioning document first and
a design second.

We looked at three directions:

| Theme | What it claims | Verdict |
| --- | --- | --- |
| Precision Instrument | Rigorous, comes from a real engineering discipline | Most distinctive |
| **Modern Product** | Product-minded, ships things people use | **Chosen** |
| Terminal Native | I live in a terminal | Overused in junior portfolios |

You chose Modern Product: light, airy, big friendly headings, soft-shadowed
cards with device mockups, an indigo-to-violet accent, and a dark mode toggle.

### The tradeoff that came with it

Modern Product is **built out of project screenshots**. With too few projects
the grid looks empty and the whitespace reads as "nothing to show" rather than
confidence. Four to six cards is the comfortable range.

**How to explain it:** "We picked the look based on what we wanted the site to
say about Surya, not on what looked nice. Then everything else followed from
that decision."

---

## 4. Setting up Next.js and Tailwind

### The command

```bash
npx create-next-app@latest portfolio \
  --ts --tailwind --app --eslint --src-dir \
  --import-alias "@/*" --no-turbopack --use-npm --disable-git
```

What the flags mean:

- `--ts` TypeScript, which is JavaScript with type checking added
- `--tailwind` install Tailwind CSS
- `--app` use the App Router (the modern Next.js routing system, where folders
  under `src/app/` become URLs)
- `--src-dir` put source code in `src/` instead of the project root
- `--import-alias "@/*"` lets you write `@/components/Nav` instead of
  `../../components/Nav`

### What we got

Next.js **16.2.12**, React **19.2.4**, Tailwind **v4**.

### A real environment problem

`pnpm` (an alternative package manager) was broken on this machine because it
requires Node 22 and we have Node 20. We used `npm` instead. Nothing was lost.
This is worth knowing because "just use pnpm" advice online assumes a newer
Node than you have.

### Next.js 16 has breaking changes

The project contains an `AGENTS.md` file warning that this version differs from
older tutorials. We read the bundled docs in `node_modules/next/dist/docs/`
before writing code. One change actually affected us:

> Next.js 16 no longer overrides `scroll-behavior` during navigation unless you
> add `data-scroll-behavior="smooth"` to the `<html>` element.

So `src/app/layout.tsx` has that attribute. Without it, smooth scrolling to
`#work` and `#contact` would be unreliable.

**How to explain it:** "Before writing code we checked the docs shipped inside
`node_modules` for this exact version, instead of trusting older tutorials."

---

## 5. The design system

Everything visual is controlled by **design tokens**: named values used
everywhere instead of hardcoded colours and fonts. They live in
`src/app/globals.css`.

### Colour

```css
:root {
  --paper:  #faf9ff;   /* page background       */
  --surface:#ffffff;   /* cards                 */
  --ink:    #141221;   /* main text             */
  --muted:  #6e6a85;   /* secondary text        */
  --line:   #e7e3f4;   /* borders               */
  --indigo: #4338ca;   /* accent gradient start */
  --violet: #9333ea;   /* accent gradient end   */
  --signal: #ff6a4d;   /* live states, faults   */
  --on-accent: #ffffff;/* text on the gradient  */
}
```

Two deliberate choices worth defending:

1. **The coral `--signal`.** Everything else is cool purple. An all-purple site
   is the current AI-generated house style. One warm colour, used only for
   "live" badges and fault markers, breaks that and earns its place by meaning
   something.
2. **`--on-accent` exists as its own token.** More on why in the bugs section.

### Connecting tokens to Tailwind

Tailwind v4 configures itself in CSS rather than a JavaScript config file:

```css
@theme inline {
  --color-paper: var(--paper);
  --color-ink:   var(--ink);
}
```

That single block is what makes `bg-paper` and `text-ink` valid Tailwind
classes. Change the hex once and the whole site follows.

### Typography

Three fonts, each with a job:

| Font | Role | Why |
| --- | --- | --- |
| Bricolage Grotesque | Headings | Characterful and friendly at large sizes |
| Instrument Sans | Body text | Clean and highly readable |
| JetBrains Mono | Labels, tech chips, data | Signals "technical" without shouting |

They load through `next/font/google`, which **downloads the fonts at build time
and serves them from your own domain**. Two benefits: no request ever goes to
Google when someone visits (better privacy), and no layout shift while the font
loads.

**How to explain it:** "Colours and fonts are defined once as variables. Nothing
in a component hardcodes a hex code, so rebranding is a one-file change."

---

## 6. Dark mode without a flash

### The problem

The user's theme choice lives in `localStorage` (a small store of key-value
data inside the browser). The **server** builds the HTML and has no access to
that, so the server cannot know whether to render light or dark. The result is
the page loads white, then snaps to dark. That is the "flash of wrong theme".

### The fix

A tiny **blocking script** in `<head>`, inside `layout.tsx`. Blocking means the
browser stops and runs it before painting anything:

```js
var saved = localStorage.getItem('theme');
var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) {
  document.documentElement.classList.add('dark');
}
```

It reads the saved choice, falls back to the operating system preference, and
adds the `dark` class to `<html>` before the first paint. No flash.

### The toggle has no React state at all

This surprises people, so it is worth understanding.

The theme already lives in exactly one place: the `dark` class on `<html>`.
Copying it into React state would mean reading the DOM in an effect, which
causes a second render and cannot run on the server anyway. So the button just
flips the class, and CSS picks which icon to show:

```tsx
function toggle() {
  const nowDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", nowDark ? "dark" : "light");
}
```

**How to explain it:** "The `dark` class on the HTML tag is the single source of
truth. An inline script sets it before the page paints so there's no flash, and
the toggle just flips it. React never needs to know."

---

## 7. Keeping all content in one file

Every word, link, and image path lives in `src/content/site.ts`. No copy is
hardcoded inside a component.

```ts
export const profile = { name: "Surya Srekanth", email: "...", links: {...} };
export const projects: Project[] = [ ... ];
export const skillGroups: SkillGroup[] = [ ... ];
export const experience: Role[] = [ ... ];
export const contact = { heading: "...", body: "..." };
```

### Why this matters, proven in practice

When you asked to remove four placeholder projects, that was **deleting four
objects from an array**. Four cards disappeared and the grid reflowed on its
own. No component was touched, so there was no chance of breaking the layout
while changing words.

### Optional fields degrade gracefully

```ts
context?: string;   // hidden entirely when unset
image?: string;     // falls back to an abstract panel
draft?: boolean;    // shows a dashed "Draft" chip
```

`draft` is still in the type even though nothing uses it right now. It costs
nothing and means the next placeholder you add is visibly marked instead of
quietly shipping as though finished.

**How to explain it:** "All the text is data in one file. Editing the site is
editing that file, and you can't break the layout by changing words."

---

## 8. The signature element: the evenness trace

### What it is

A yarn evenness tester prints a wavering line showing the thickness of the
strand as it passes a sensor. Spikes are thick places, dips are thin places,
and an inspector marks the ones outside tolerance.

That readout became the site's signature: it appears in the hero and on the
social share card. It is the one element no other developer portfolio can have,
because it comes from eight years of Surya's actual work.

### How the curve is drawn

Three sine waves of different frequencies stacked together give natural-looking
variation:

```ts
function baseline(x) {
  return BASELINE
    + 9   * Math.sin(x / 37)
    + 5.5 * Math.sin(x / 13.7 + 1.2)
    + 3   * Math.sin(x / 6.1  + 0.4);
}
```

Each fault is a **Gaussian bump**, a spike that is tallest at its centre and
fades out quickly on both sides:

```ts
offset += direction * magnitude * Math.exp(-(distance ** 2) / (2 * spread ** 2));
```

### The critical rule: no randomness

It would be tempting to use `Math.random()` for a natural wobble. **That would
break the site.**

Next.js renders the SVG twice: once on the server to produce the HTML, and
again in the browser when React takes over. This second step is called
**hydration**. If the two renders produce different `<path>` values, React
reports a **hydration mismatch** and the page can visibly glitch.

Fixed sine terms produce byte-identical output every time. The same rule is why
`Date.now()` inside a render body is a bug rather than a quirk.

**How to explain it:** "The line is drawn from fixed maths, not random numbers,
because the server and the browser both render it and they have to agree
exactly."

### The animation

The line draws itself on load using an SVG trick:

```css
.trace-path {
  stroke-dasharray:  var(--trace-length);
  stroke-dashoffset: var(--trace-length);
  animation: trace-draw 2.6s forwards;
}
```

`stroke-dasharray` turns the line into dashes. Setting the dash length to the
line's full length makes one dash exactly as long as the whole path.
`stroke-dashoffset` then slides that dash along, so animating it to zero looks
like the line being drawn. The length is measured in JavaScript by summing the
distance between sample points.

All animation is disabled under `prefers-reduced-motion`, an accessibility
setting for people who get motion sickness from movement on screen.

---

## 9. Five real bugs and what caused them

These were found by looking at the running site, not by the build. **A green
build does not mean the page is correct.**

### Bug 1: dark mode failed colour contrast

**What broke.** White text on the gradient buttons measured about **2.6:1**
contrast in dark mode. The accessibility standard (WCAG AA) requires **4.5:1**.

**Why.** In dark mode the gradient lightens, from `#4338CA` to `#818CF8`. White
text on a light purple is close to unreadable.

**The fix.** A dedicated token that flips with the theme:

```css
:root { --on-accent: #ffffff; }   /* dark text on a dark gradient */
.dark { --on-accent: #14121f; }   /* dark text on a light gradient */
```

Result: **6.2:1 and 7:1**, both passing.

### Bug 2: 32 pixels of horizontal scroll on mobile

**What broke.** At 375px wide the whole page could be scrolled sideways.

**Why.** A CSS Grid item will not shrink below the width of its widest
unbreakable child. The card contained
`ai-yarn-defect-assistant.streamlit.app`, one long string with no spaces, so
the card demanded 387px inside a 350px column.

**The fix.** `min-w-0` on the grid item, which overrides that default and lets
`truncate` finally do its job.

This is the single most common cause of unexpected horizontal scroll in
Tailwind layouts, and it only appears on narrow screens.

### Bug 3: lint error in the theme toggle

**What broke.** `eslint` rejected `setState` inside a `useEffect`.

**Why.** Calling `setState` in an effect causes a cascading second render.
React's newer compiler rules flag it.

**The fix.** Removed React state entirely, as described in section 6.

### Bug 4: card footers did not line up

**What broke.** The two project cards had different text lengths, so their
links sat at different heights.

**Why.** Grid stretches cards to equal height, but their **contents** stacked
from the top, leaving slack at the bottom of the shorter one.

**The fix.** `mt-auto` on the last child. In a flex column, `margin-top: auto`
absorbs all remaining free space above the element, pushing it to the bottom.
Verified: both footers landed at exactly 831px.

### Bug 5: an uneven wash under the trace

**What broke.** The soft gradient under the line looked heavier in some places.

**Why.** The gradient was anchored to the top of the SVG viewBox. Wherever the
line peaked, more of the strong part of the gradient showed through.

**The fix.** Start the gradient below the band the line travels in
(`y1="0.42"`), so the fill is even regardless of where the line sits.

---

## 10. Capturing real screenshots

Rather than invent artwork for the project cards, we captured Surya's two live
apps using a headless browser (a real browser running with no visible window).
Three problems had to be solved.

### Problem 1: Streamlit's own chrome was in the shot

Streamlit Cloud overlays a hosting badge and profile avatar. We hid them by
injecting CSS before the screenshot. The class names are **build-hashed**
(randomised each build, like `_viewerBadge_aycw8_23`), so we matched on a
substring:

```css
[class*="viewerBadge"], [class*="profileContainer"] { display: none !important; }
```

### Problem 2: emoji rendered as empty boxes

The app's title is "🧵 Yarn Inspection Desk". It captured as a **tofu box**, the
empty rectangle a browser shows when it has no glyph for a character.

The cause was that this Linux environment had **no emoji font installed at
all**. `fc-list | grep -c emoji` returned `0`.

Installing system-wide needs `sudo`, which needs a password. So we installed it
at user level instead, no admin rights required:

```bash
curl -L -o ~/.local/share/fonts/NotoColorEmoji.ttf \
  https://github.com/googlefonts/noto-emoji/raw/main/fonts/NotoColorEmoji.ttf
fc-cache -f
```

Fonts are read when a process starts, so the browser had to be restarted before
it picked the new font up.

### Problem 3: the app is inside an iframe

Streamlit Cloud serves your app inside an `<iframe>` (a page embedded within a
page). The sidebar links were not in the top-level document, so a normal
`document.querySelectorAll` found nothing.

Reaching them meant going through `iframe.contentDocument`, which only worked
because the iframe is **same-origin** (same domain). Had it been another domain,
the browser would have blocked the read entirely for security.

That is how we recovered Surya's real GitHub and LinkedIn URLs, which were not
on the resume.

### A lesson about verification

`curl` reported HTTP 303 and then a redirect loop for both apps, which looks
broken. Streamlit does that to any client without a cookie jar. Only loading
the pages in a real browser showed both apps were perfectly healthy.

**When a status code and a screenshot disagree, trust the screenshot.**

---

## 11. Showing images properly with next/image

```tsx
<Image
  src={image}
  alt={`Screenshot of ${label}`}
  fill
  sizes="(min-width: 768px) 36rem, 100vw"
  className="object-cover object-top"
/>
```

Three things are doing work here:

- **`fill`** makes the image expand to fill its positioned parent. The parent
  has `aspect-16/10`, so the shape is fixed and nothing jumps around while the
  image loads.
- **`sizes`** tells the browser how wide the image will actually render, so it
  downloads a matching file. Our cards requested **576x360** rather than the
  full 1200x750. Omitting `sizes` is the common mistake: the browser then
  assumes full viewport width and fetches the largest version available.
- **`object-cover`** crops rather than squashes if the aspect ratios differ.

**How to explain it:** "`next/image` serves a correctly sized version for each
screen, but only if you tell it how big the image will be with `sizes`."

---

## 12. Making the project card clickable

Three techniques combine here.

### Named groups, so one card has two hover zones

Plain `group-hover:` fires for anything inside the card, so hovering the
description would also zoom the image. Naming the media wrapper scopes it:

```tsx
<a className="group/media ...">      {/* the named group */}
  <Image className="group-hover/media:scale-[1.03]" />
</a>
```

The title arrow still responds to the card-wide `group`. Two independent hover
behaviours, one card, no interference.

### `pointer-events-none` on the overlay

The dark scrim covers the whole image. By default it would intercept every
click and the link underneath would never fire. `pointer-events-none` makes the
browser treat it as visually present but invisible to the mouse.

### Handling two links to the same place

The image and the title both link to the live app. Left alone, a screen reader
announces the same link twice and a keyboard user tabs through it twice for
nothing.

The convention is to keep the text link fully accessible and neutralise the
visual one:

```tsx
tabIndex={-1}          // remove from the tab order FIRST
aria-hidden="true"     // then hide it from screen readers
```

**Order matters.** `aria-hidden` on something still focusable is a genuine bug,
because focus lands on an element assistive technology has been told does not
exist.

---

## 13. The downloadable resume

The PDF sits at `public/surya-srekanth-resume.pdf`. Anything in `public/` is
served from the URL root exactly as-is, with no build step.

```tsx
<a href={profile.links.resume} download={profile.resumeFilename}>
```

The `download` attribute changes what the browser does with the response.
Without it, a PDF opens in the browser's viewer. With it, the file is written
straight to disk, and the attribute's value **renames the saved file**, which is
why it saves as `Surya-Srekanth-Resume.pdf`.

One important limit: `download` is **ignored for cross-origin URLs**, a
deliberate rule so a site cannot silently push files from another domain onto
your machine. It works here only because the PDF is on the same origin.

---

## 14. The WhatsApp link

```ts
const whatsappNumber = profile.phone.replace(/\D/g, "");
// "+91 93626 51864"  ->  "919362651864"
href: `https://wa.me/${whatsappNumber}`
```

`\D` means "any non-digit", so this strips the plus, the spaces, and any dashes
a future number might have.

Two rules about `wa.me`:

- **Digits only, no plus sign.** The number sits in the URL path, and `+` has
  its own meaning in URLs (historically an encoded space).
- **Country code required.** `wa.me/9362651864` would be read as some other
  country's number or fail outright.

The link is **derived from the displayed number** rather than typed twice. Hard
coding it would mean changing the phone number in `site.ts` silently leaves the
chat link pointing at the old one, with no error, because both are valid
strings.

---

## 15. Favicon and social share image

### Next.js generates the tags for you

Put files with reserved names in `src/app/` and Next.js writes the HTML tags
automatically:

| File | Tag produced |
| --- | --- |
| `icon.svg` | `<link rel="icon">` |
| `apple-icon.png` | `<link rel="apple-touch-icon" sizes="180x180">` |
| `opengraph-image.png` | `og:image` plus width, height, and type |

You can see this in the build output: routes went from 4 to 6 once the icons
were added.

### Designing for 16 pixels

A favicon at 16 CSS pixels has about **256 pixels total**. We tested three
options and the trace design failed: it has seven direction changes, each
needing at least two pixels to register, so it collapsed into a squiggle.

The rule is to **design at the smallest size first**, then scale up.

### Losing the tile changed the safe colours

The boxed version could use the deep `#4338CA → #9333EA` because the tile
guaranteed a controlled background. Once the box was removed, the mark had to
survive both a white tab strip and a near-black one, so the gradient shifted to
mid-range `#6366F1 → #A855F7`.

**That is the real cost of a transparent favicon: you lose control of the
backdrop, so the colour has to work against both extremes.**

### Why the Apple icon keeps a background

iOS composites `apple-touch-icon` onto the home screen with **no transparency
support**. Transparent pixels render as flat black with hard edges. Giving it
the site's own `#0C0A13` makes that deliberate rather than accidental. Note it
has square corners: iOS applies its own rounded mask, so building the radius in
would double it.

### Why we screenshotted the share card instead of generating it

Next.js offers `ImageResponse` for Open Graph cards, but it renders through a
library called Satori that supports only a subset of CSS and handles SVG paths
unevenly. Rendering real HTML in a real browser and capturing it gave exact
control over gradients and `background-clip: text`.

The tradeoff is that the PNG is static and cannot vary per page. For a
single-page portfolio, that costs nothing.

---

## 16. How we verified everything

This is the habit worth copying. Every change was checked three ways.

```bash
npx tsc --noEmit   # types are consistent
npx eslint .       # no code-quality violations
npm run build      # it actually compiles
```

And then, crucially, **looked at in a real browser**. All five bugs in section 9
passed the build. None would have been found without opening the page.

Specific checks we ran in the browser:

| Check | Method | Result |
| --- | --- | --- |
| Horizontal overflow | `scrollWidth - clientWidth` at 375px | 0 |
| Contrast ratio | Computed relative luminance in JS | 6.2:1 and 7:1 |
| Footer alignment | Compared `getBoundingClientRect().top` | Both 831 |
| Theme toggle | Clicked twice, read the class and localStorage | Both directions work |
| Resume download | `HEAD` request for status and content-type | 200, application/pdf |
| Images loading | `naturalWidth > 0` | 576x360 served |

### The principle

Verify the **rendered result**, not the source. Re-reading a file after editing
only proves the file changed. Querying the live DOM proves the user sees the
right thing, and catches stale builds and caching.

---

## 17. Glossary

| Term | Plain meaning |
| --- | --- |
| **App Router** | The Next.js system where folders under `src/app/` become URLs |
| **Build artifact** | A file generated from source, safe to delete and rebuild |
| **Design token** | A named value like `--ink` used instead of a raw hex code |
| **Headless browser** | A real browser running with no visible window |
| **Hydration** | The browser taking over server-rendered HTML and making it interactive |
| **iframe** | A web page embedded inside another web page |
| **localStorage** | A small key-value store that persists in the browser |
| **PATH** | The list of folders your shell searches for commands |
| **Prerendered** | HTML generated at build time rather than per request |
| **Same-origin** | Same protocol, domain, and port. Browsers restrict access across origins |
| **Shebang** | The `#!` first line naming which program should run a file |
| **Tofu box** | The empty rectangle shown when a font lacks a character |
| **Virtualenv** | A private folder of Python packages for one project |
| **WCAG AA** | Accessibility standard. Normal text needs 4.5:1 contrast |

---

## 18. Working on it from here

### Running it

```bash
cd ~/ps/ss/portfolio
npm run dev          # http://localhost:3000
npm run build        # production build
npx tsc --noEmit     # typecheck
npx eslint .         # lint
```

### Where to change things

| To change | Edit |
| --- | --- |
| Any text, link, or project | `src/content/site.ts` |
| Colours, fonts, spacing | `src/app/globals.css` |
| Section layout | `src/components/*.tsx` |
| Which sections appear and in what order | `src/app/page.tsx` |
| Favicon or share image | `src/app/icon.svg`, `opengraph-image.png` |

### Adding a project

Add an object to the `projects` array. Set `kind: "web"` for a browser frame or
`kind: "mobile"` for a phone frame. Capture screenshots at **1200x750** for web
or **9:19** for mobile, put them in `public/projects/`, and point `image` at
them.

### Still outstanding

1. **`metadataBase` is not set.** `og:image` currently resolves to
   `http://localhost:3000/...`, which social platforms cannot fetch. Once you
   have a domain, add this to the metadata export in `layout.tsx`:
   ```ts
   metadataBase: new URL("https://yourdomain.com"),
   ```
2. **Surya's real full-stack and mobile projects.** The site currently shows the
   two AI apps only, which is a single row.
3. **The resume PDF still has the `assaitant` typo** in the yarn-defect URL. The
   website links correctly, but the paper copy points at a dead page.
4. **The name is inconsistent.** The Resume AI Bot renders "Surya Srekanth A"
   with a trailing initial. The site says "Surya Srekanth".
