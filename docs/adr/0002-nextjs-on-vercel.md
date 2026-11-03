# ADR 0002: Next.js on Vercel, replacing the static HTML/SCSS/Gulp site

- Status: Accepted
- Date: 2026-10-25

## Context

`main` was a hand-written `index.html` with SCSS compiled by Gulp, plus leftover Drupal sitemap
config from an earlier incarnation of the site. It worked, but adding a video experience, a player, and
more pages would mean rebuilding a framework by hand.

## Decision

Rebuild on Next.js (App Router) with React, TypeScript and Tailwind, deployed on Vercel's free tier.
Generate pages statically; avoid server runtime features so the site costs nothing and has nothing to patch.

## Consequences

- Component model, typed content (`src/content/site.ts`), image optimisation and easy preview deployments.
- A build step and Node toolchain replace Gulp; CI checks lint/types/format/build.
- Heavier than plain HTML for a one-page site (roughly 120 kB first-load JS), accepted for the growth path (player, more pages).
- The old static site remains in git history on `main` before the merge.
- Vercel Hobby terms should be rechecked for commercial use before launch (see deployment doc).

## Update 2026-10-25

Initially scaffolded on Next 15.5.6, which `npm audit` flagged as critical. Upgraded to Next 16.4.3 (current `latest`) alongside React 19.3 and Tailwind 4.3; `npm audit` is clean. ESLint moved to the native flat config.
