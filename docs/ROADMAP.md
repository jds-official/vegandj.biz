# Roadmap

Status as of 2026-10-25. Update this file when work lands or priorities change.

## Now: get the landing page live

- [x] Migrate from static HTML/SCSS/Gulp to Next.js ([ADR 0002](adr/0002-nextjs-on-vercel.md))
- [x] Clean repo: remove build output, stray scaffold folder, Drupal config, unused deps
- [x] Landing page: hero with reel, intro, services, contact form, footer
- [x] Click-to-load YouTube embed component ([ADR 0001](adr/0001-youtube-for-video-hosting.md))
- [x] CI (lint, types, format, build), CLAUDE.md, README, ADRs
- [ ] **Shoot/edit the sizzler reel** ([brief](video-reel-brief.md)), upload to YouTube, set `reelVideoId` in `src/content/site.ts`
- [ ] Open PR `the-new-world` → `main`
- [ ] Connect repo to Vercel, deploy, point `vegandj.biz` DNS ([deployment](deployment.md))
- [ ] Replace placeholder OG image with a purpose-made 1200×630 share image

## Next

- [ ] Real-device check at phone widths (most wedding clients will arrive from a phone)
- [ ] Lighthouse pass (target 95+ performance/accessibility/SEO)
- [ ] `sitemap.xml` / `robots.txt` via the App Router metadata files (replaces the old Drupal sitemap config)
- [ ] Basic privacy-friendly analytics (Vercel Web Analytics free tier, or none) to see if the reel gets plays
- [ ] Testimonials / "references available" section with real quotes

## Later

- [ ] **Media player for long-form videos (up to ~1 hour DJ sets).** Future-leaning requirements:
  - Plays full-length sets with chapters/timestamps (tracklist jump links) and resumes where you left off
  - Multiple videos with a gallery/list view; works on mobile; keyboard and screen-reader accessible
  - Stays on YouTube hosting (free) via the IFrame Player API unless an ADR changes that
  - The earlier custom-controls prototype is recoverable: `git show 921e6d1:src/components/YouTubePlayer.tsx`.
    Known problems with it: progress bar used a placeholder instead of `getCurrentTime()`, controls hidden until hover (bad on touch)
  - Decide whether audio-only sets belong on YouTube or a podcast/audio host
- [ ] Dark mode (currently a single light theme)
- [ ] Host-your-own-video re-evaluation if YouTube branding/suggestions become a problem (see ADR 0001 for the options and costs)
