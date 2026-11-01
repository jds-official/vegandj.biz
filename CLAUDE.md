# CLAUDE.md

Guidance for Claude Code (and any human) working in this repo. Keep it short and
true; if something here goes stale, fix it in the same change that made it stale.

## What this is

Portfolio/landing site for **Grand Format**, a vegan vinyl wedding DJ in the
Hudson Valley, NY (vegandj.biz). Owner: James David Saul. Goal of the site: a
prospective client lands, watches a short creative reel, and fills in the
contact form. Everything else is secondary.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
deployed on Vercel's free tier. No database, no API routes, no server runtime:
every page is statically prerendered. Keep it that way unless an ADR says otherwise.

## Commands

```bash
npm run dev          # local dev server on :3000
npm run check        # lint + typecheck + prettier check (run before every commit)
npm run build        # production build; must pass before opening a PR
npm run format       # prettier --write
```

CI (`.github/workflows/ci.yml`) runs `check` and `build` on every PR.

## Layout

```text
src/app/              layout.tsx (fonts, metadata), page.tsx (the landing page), globals.css
src/components/       Footer, YouTubeEmbed (click-to-load facade); the hero lives in page.tsx
src/content/site.ts   ALL copy, links, and the reel video ID. Edit content here, not in JSX.
public/images/        Optimised photos (webp). Add new images here.
docs/                 Roadmap, deployment, video brief, and decision records (docs/adr/)
```

## Conventions

- ESLint uses the native flat config (`eslint.config.mjs`, `eslint-config-next` 16); no `FlatCompat`.
- Prettier is the formatter (`.prettierrc`: single quotes, semicolons, 2 spaces). Don't hand-format.
- Content lives in `src/content/site.ts`; components take props and stay presentational.
- Server Components by default. Add `'use client'` only when state/effects/events require it.
- Styling is Tailwind utilities only. Single light theme (rose-50 / white); no dark mode yet.
- Fonts: Atkinson Hyperlegible Next (`font-sans`; body and all headings, including the hero h1, chosen for legibility) and Audiowide (`font-display`; the "Grand Format" sign and the "Let's Party!" button, opt in explicitly). Loaded via `next/font` in `layout.tsx`. A fluid, rem-based type scale (`text-display`, `-headline`, `-title`, `-lead`, `-body`) lives in `globals.css` with its derivation formula; use those tokens instead of ad-hoc sizes, and recompute rather than hand-nudge values.
- Hero: one photo (`public/images/hero-dj-turntables.webp`) that always fills the window. `.hero-stage` (in `globals.css`) is the photo's own 3:2 box, placed exactly as `object-fit: cover; object-position: 50% 10%` would place it; re-tune the 0.5/0.1 position pair if the photo changes. The "Grand Format" sign (`.mirror-sign`: page h1 in Audiowide plus the tagline in Atkinson, brown on soft pink at 9.43:1) is NOT inside the stage: it is a child of `.hero`, centered on the window and always `3cqh` (3% of the window height) from the top however the window is resized, so the photo's crop never moves it. It still scales with the photo through `--u` (1% of the photo's width, `max(100cqw, 150cqh) / 100`): every size in the sign is `calc(var(--u) * N)`. It is an upright box that hugs its content (`width: max-content`), name on one line over a one-line tagline; never rotate or skew the text. "Let's Party!" (`.hero-cta`) is a fixed 1.5rem, not fluid, with no hover underline (the owner tried one and dropped it), and rises to 4.25rem from the bottom below 1024px. The photo credit ("Photo by Yaz Tulça", link in `site.ts`, opens in a new tab) is `.photo-credit`: bottom right at 1024px and up (0.875rem text, 2rem tall with an invisible extension to a 44px hit area), bottom center below 1024px, pink on brown (9.43:1). It is a `.wipe-link` with a `.wipe-line` span: the underline is a drawn background gradient, not `text-decoration`, because the browser's underline skips ink around the cedilla in "Tulça"; it wipes in left to right on hover and keyboard focus and out the right side on leave (no motion under `prefers-reduced-motion`). Keyboard focus on the credit and the button shows a brown/pink/brown ring, and an always-visible arrow icon cues the new-tab credit link for touch users who never hover. Hero colors are tokens (`brown` #381c09, `party` pink #f7b7ce) with the AAA ratio beside them; re-check the pair whenever either changes. There is no header.
- There is no sticky header (removed on purpose). Don't add fixed/sticky chrome without checking it never covers content.
- Hero image pipeline: keep originals out of the repo. The hero source is a 3840px-wide webp (q85, sRGB, no metadata, ~1.4 MB) made from the full-size original; `next.config.ts` serves AVIF with a WebP fallback, and the hero asks for `quality={85}` and `sizes="max(100vw, 150vh)"` (the photo is drawn at that width, so tall phone windows need a wide file). Typical served sizes: about 100 KB (AVIF at 1920px wide), about 455 KB (AVIF at 3840px). Any new `quality` value must also be added to `images.qualities`.
- Images: use `next/image` for local files. Keep the free-tier image-optimisation
  quota in mind; don't add many large images.
- Accessibility is a baseline, not a nice-to-have: meaningful `alt`, labelled buttons/iframes, keyboard-operable controls.

## Decisions that shouldn't be re-litigated without a new ADR

- **Video is hosted on YouTube**, embedded via a click-to-load facade on
  `youtube-nocookie.com`. See [ADR 0001](docs/adr/0001-youtube-for-video-hosting.md).
- **Next.js on Vercel** replaced the old static HTML/SCSS/Gulp site. See [ADR 0002](docs/adr/0002-nextjs-on-vercel.md).

## Gotchas

- `reelVideoId` in `src/content/site.ts` is empty until the reel is chosen; the
  page then shows a "Reel coming soon" placeholder. Setting it is the whole job of going live with the video.
- The contact form is an embedded Google Form (public URL in `site.ts`), not our own backend.
- `.next/`, `node_modules/` and `next-env.d.ts` are generated and gitignored. Never commit them.
- The earlier custom YouTube player prototype was deleted from the tree; recover it with
  `git show 921e6d1:src/components/YouTubePlayer.tsx` when the player work starts (see roadmap).
- This repo began life as a copy of the owner's other site (jamesdavidsaul.net). If you find
  photographer/birder copy or `/images/catskills.webp`-style references, they are leftovers; remove them.

## Working agreements (how Claude should operate here)

- The owner tunes values by hand (positions, angles, sizes, copy). Before editing a file, check `git diff` for local changes, treat them as current, and update CLAUDE.md and any code comments that describe them in the same change.
- Make a plan for non-trivial work; keep changes small and reviewable.
- Run `npm run check` and `npm run build` before declaring work done, and say plainly if you couldn't.
- Never commit or push without being asked.
- **Branching: all work targets `the-new-world`, not `main`, until launch.** Feature branches (e.g. `global-styling`) branch off `the-new-world`, and PRs go into `the-new-world`. `main` is the LIVE static GitHub Pages site (served from `main` at `/`, with `CNAME` for vegandj.biz). Never merge into, push to, or open PRs against `main` until the owner says it is launch time.
- Launch note: `the-new-world` was built on `main` by reverting the revert of PR #3 (commit `Reapply "Rebuild landing page..."`). A plain merge of `the-new-world` into `main` therefore works; do not recreate the branch from older commits, or the merge will say "Already up to date" and change nothing.
- Keep dependencies current: run `npm audit` and `npm outdated` periodically. Stay on `next@latest`; majors of TypeScript/ESLint wait until `eslint-config-next` supports them.
- Don't add dependencies lightly. This site should stay tiny and fast; justify any new package in the PR.
- Record meaningful technical choices as a short ADR in `docs/adr/`. Track work in `docs/ROADMAP.md`.
- Don't delete the owner's content or assets without asking; prefer moving to `public/` or noting it in the roadmap.
