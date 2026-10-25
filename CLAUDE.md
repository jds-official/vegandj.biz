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
src/components/       Header, Footer, YouTubeEmbed (click-to-load facade)
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
- Fonts: Roboto (`font-sans`) and Bad Script (`font-script`, headings and brand), via `next/font`.
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

- Make a plan for non-trivial work; keep changes small and reviewable.
- Run `npm run check` and `npm run build` before declaring work done, and say plainly if you couldn't.
- Never commit or push without being asked. PRs go from a feature branch into `main`; `main` is what Vercel deploys.
- Keep dependencies current: run `npm audit` and `npm outdated` periodically. Stay on `next@latest`; majors of TypeScript/ESLint wait until `eslint-config-next` supports them.
- Don't add dependencies lightly. This site should stay tiny and fast; justify any new package in the PR.
- Record meaningful technical choices as a short ADR in `docs/adr/`. Track work in `docs/ROADMAP.md`.
- Don't delete the owner's content or assets without asking; prefer moving to `public/` or noting it in the roadmap.
