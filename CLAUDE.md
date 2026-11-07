# CLAUDE.md

Guidance for Claude Code (and any human) working in this repo. Keep it short and
true; if something here goes stale, fix it in the same change that made it stale.

## What this is

Portfolio/landing site for **Grand Format**, a vegan vinyl wedding DJ in the
Hudson Valley, NY (vegandj.biz). Owner: James David Saul. Goal of the site: a
prospective client lands on the photo hero, scrolls (or taps "Let's Party!"),
and fills in the contact form. The page is only those two parts; the reel,
intro and services sections were removed (recover from git history if needed). Everything else is secondary.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
deployed on Vercel's free tier. No database, no API routes: every page is
prerendered. The one exception is the Google reviews fetch, which makes the page
regenerate at most once a day ([ADR 0003](docs/adr/0003-google-reviews-places-api.md)).
Keep it otherwise static unless an ADR says otherwise.

## Commands

```bash
npm run dev          # local dev server on :3000
npm run check        # lint + typecheck + prettier check (run before every commit)
npm run build        # production build; must pass before opening a PR
npm run format       # prettier --write
node scripts/make-og-image.mjs   # rebuild the social card (see below)
```

CI (`.github/workflows/ci.yml`) runs `check` and `build` on every PR.

## Layout

```text
src/app/              layout.tsx (fonts, metadata), page.tsx (the landing page), globals.css
src/components/       Footer, HeroLinkGuard, Reviews (hero rating pill + review quotes), YouTubeEmbed (parked, unused: the future reel's click-to-load facade); the hero and contact panel live in page.tsx
src/lib/reviews.ts    Server-side Google Places fetch (daily revalidate) and excerpting
src/content/site.ts   ALL copy and links (the reel video ID is parked there). Edit content here, not in JSX.
public/images/        Optimised photos (webp). Add new images here.
docs/                 Roadmap, deployment, video brief, and decision records (docs/adr/)
```

## Conventions

- ESLint uses the native flat config (`eslint.config.mjs`, `eslint-config-next` 16); no `FlatCompat`.
- Prettier is the formatter (`.prettierrc`: single quotes, semicolons, 2 spaces). Don't hand-format.
- Content lives in `src/content/site.ts`; components take props and stay presentational.
- Server Components by default. Add `'use client'` only when state/effects/events require it.
- Styling is Tailwind utilities only. Single light theme (rose-50 / white); no dark mode yet.
- Fonts: Lexend (`font-sans`; body and the other headings, chosen because it is designed around reading research, has clearly distinct letterforms and a plain un-slashed zero; it replaced Atkinson Hyperlegible, whose zero is slashed) and Audiowide (`font-display`; the "Grand Format" sign title and the "Let's Party!" button, opt in explicitly). Loaded via `next/font` in `layout.tsx`. Lexend is wide, so the mirror sign's width constant (30.7 u) was measured with it: re-measure if the font changes. A fluid, rem-based type scale (`text-display`, `-headline`, `-title`, `-lead`, `-body`) lives in `globals.css` with its derivation formula; use those tokens instead of ad-hoc sizes, and recompute rather than hand-nudge values.
- Hero: one photo (`public/images/hero-dj-turntables.webp`) that always fills the window. `.hero-stage` (in `globals.css`) is the photo's own 3:2 box, placed exactly as `object-fit: cover; object-position: 50% 10%` would place it; re-tune the 0.5/0.1 position pair if the photo changes. Below 500px the photo is nudged 80px left, and from 500px to 1023px wide 90px left (`--stage-shift`, capped at half the photo's overhang so it never exposes a gap) to bring the DJ, who stands right of the photo's center, closer to the window's center. The "Grand Format" sign (`.mirror-sign`: page h1 in Audiowide plus the tagline in Atkinson, brown on soft pink at 9.43:1) is NOT inside the stage: it is a child of `.hero`, centered on the window and always `3cqh` (3% of the window height) from the top however the window is resized, so the photo's crop never moves it. It still scales with the photo through `--u` (1% of the photo's width, `max(100cqw, 150cqh) / 100`): every size in the sign is `calc(var(--u) * N)`. `--u` has a ceiling (the sign is 30.7 u wide, so u is capped to leave 0.75rem free on each side of the window, which is what makes it shrink on narrow windows) and a floor of 0.6rem (so the tagline never drops below about 13px, even in a short window). It works down to 320px wide with the tagline on one line; re-check that if the sign's copy or padding changes. It is an upright box that hugs its content (`width: max-content`), name on one line over a one-line tagline; never rotate or skew the text. "Let's Party!" (`.hero-cta`) is a fixed 1.5rem, not fluid, with no hover underline (the owner tried one and dropped it) but its own hover/focus state: the pink brightens to `party-bright` (brown on it 11.62:1) with a brown inner ring (visible without any motion), and for people who have not asked for reduced motion it also pops up, tilts, wiggles once and throws confetti dots (`::before`); hover is gated by `(hover: hover)` so taps don't stick, focus-visible gets the same plus the brown/pink/brown ring, and rises to 4.75rem from the bottom below 1024px. The photo credit ("Photo by Yaz Tulça", link in `site.ts`, opens in a new tab) is `.photo-credit`: bottom right at 1024px and up (0.875rem text, 2rem tall with an invisible extension to a 44px hit area), bottom center below 1024px, pink on brown (9.43:1). It is a `.wipe-link` with a `.wipe-line` span: the underline is a drawn background gradient, not `text-decoration`, because the browser's underline skips ink around the cedilla in "Tulça"; it wipes in left to right on hover and keyboard focus and out the right side on leave (no motion under `prefers-reduced-motion`). Keyboard focus on the credit and the button shows a brown/pink/brown ring, and an always-visible arrow icon cues the new-tab credit link for touch users who never hover. Hero colors are tokens (`brown` #381c09, `party` pink #f7b7ce) with the AAA ratio beside them; re-check the pair whenever either changes. There is no header.
- Hero height on iPhone: `.hero` is `100lvh` tall (the large viewport, with the Safari bars collapsed), not `100svh`, so the photo fills the whole screen once the bars slide away and never resizes while they animate; the cost is a slightly tighter photo crop (about 10-15% zoom on a phone). `--bar` (`100lvh - 100svh`, 0 on desktop) pushes the button and credit up so they sit above the bars on first load. Real Safari bars can't be emulated in the desktop browser; to test, set `--bar` and the hero height by hand in the inspector. Keep any new bottom-anchored hero element offset by `var(--bar)`.
- Contact panel: `#contact` (`.contact-panel`) is a full-screen-tall pink panel with brown text (9.43:1), a rounded top edge and an upward shadow. The hero is `position: sticky; top: 0`, so the panel slides up over the pinned photo (only when motion is allowed; under `prefers-reduced-motion` the hero scrolls away normally). `position: sticky` is used because fixed backgrounds and a "reveal from underneath" layout are unreliable in iOS Safari (and the reveal would force Google's long form to scroll inside a pinned frame). While the panel covers the hero, `HeroLinkGuard` marks the hero's links (`data-hero-link`) `inert` so keyboard focus never lands on something hidden (WCAG 2.4.11/2.4.12). "Let's Party!" smooth-scrolls to the panel. The embedded Google Form is Google's own page: we can style only the frame around it, so the fields inside are outside our AAA control (a native form is on the roadmap). Below the form, the Peanut Chews logo (alt text `logoAlt` in `site.ts`) is a plain centered image at 75% of the form's width at every size, with 3rem above and below; there is no animation on it (one was tried and dropped). The footer is a dark-brown bar with pink text and icon (the panel's pair reversed, 9.43:1), one centered line: "© year Grand Format" (the year is current, not hard-coded) followed by an icon-only Instagram link (pink icon in a 44px round target with a faint hover tint; its name "Instagram (opens in a new tab)" is screen-reader-only). There is no TikTok link.
- Google reviews: `getReviews()` (`src/lib/reviews.ts`) calls the Places API (New) with `GOOGLE_PLACES_API_KEY` (server-side; see `.env.example`) and the Place ID in `site.reviews`; it revalidates daily and returns null (widget hidden) with no key or a failed build fetch. `ReviewChip` (`.review-chip`) is a quiet pill, pink on brown (9.43:1): centered above "Let's Party!" by default (9.5rem up; with the credit and the button below it, the three are 2rem apart, which also keeps the button's confetti clear), and top left, level with the sign, when a container query on the hero says there is room beside the sign (`min-aspect-ratio: 4/3` and `min-width: 56rem`; the sign is 30.7 u wide and u grows with the photo, so a tall tablet window has no room). Never in a bottom corner: the browser's URL-on-hover bar covers it. It is a `.wipe-link` with `data-hero-link` that smooth-scrolls to `#reviews` (the quotes); the link above the quotes is the one that opens Google. With no quotes to scroll to, it links out instead. Tried and dropped: hanging under the sign (touched the DJ's headphones) and bottom left (URL bar). `ReviewQuotes` sits in the contact panel between the form and the logo: a CSS scroll-snap row (no script, no autoplay; focusable, labelled), reviews cut at `site.reviews.excerptChars` with "Read more on Google". No review photos or avatars, on purpose. Reviews under `site.reviews.minRating` are hidden.
- Social sharing: page title is "Grand Format | Vegan Vinyl DJ for Weddings and Events | Hudson Valley, NY"; the title and the OG description live in `site.ts` (`title`, `ogDescription`) and feed `metadata` in `layout.tsx` (Open Graph plus a `summary_large_image` Twitter card). The card image is `public/images/og-card.jpg` (1200x630, ~98 KB): the hero photo cropped to 1.91:1 by `scripts/make-og-image.mjs`, with no text on it (the owner dropped an on-image credit). Yaz Tulça is credited in the image's alt text (`og:image:alt` / `twitter:image:alt`). Re-run the script and commit the JPG whenever the hero photo changes.
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
- **Branching: `main` is production.** The site is fully on Vercel, which builds and deploys `main` to vegandj.biz; GitHub Pages is deactivated. Work on a feature branch off `main` and open a PR into `main` (every PR gets a Vercel preview URL). Never push straight to `main`. The old `the-new-world` branch is merged and retired.
- Keep dependencies current: run `npm audit` and `npm outdated` periodically. Stay on `next@latest` and on a supported ESLint (now 10; ESLint 9 is deprecated and warns in CI). A TypeScript major waits until `eslint-config-next` and the other tooling support it. The `overrides` in `package.json` tell npm that `eslint-plugin-import`, `-jsx-a11y` and `-react` accept ESLint 10: their peer ranges stop at 9 but they work (checked: hooks, Next and a11y rules still fire); remove each override once the plugin declares 10 support. `npm audit` currently reports a moderate `minimatch` advisory deep inside the ESLint tooling (dev-only, nothing ships); its suggested `--force` fix installs ESLint 4, so don't run it, and re-check after the plugins update.
- Don't add dependencies lightly. This site should stay tiny and fast; justify any new package in the PR.
- Record meaningful technical choices as a short ADR in `docs/adr/`. Track work in `docs/ROADMAP.md`.
- Don't delete the owner's content or assets without asking; prefer moving to `public/` or noting it in the roadmap.
