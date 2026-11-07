# Deployment

Hosting: **Vercel Hobby (free)**, deploying from `main`.

## How it works

Vercel builds the `main` branch and serves it at vegandj.biz. Every PR gets a preview URL, so check changes there (on a phone, for layout work) before merging. GitHub Pages is fully deactivated; the site no longer depends on it.

One environment variable: `GOOGLE_PLACES_API_KEY` (Production and Preview; see `.env.example`). Without it the build still passes and the Google reviews widget just doesn't show. Never commit real values.

## Staying on the free tier

- Pages are prerendered. The Google reviews fetch makes the page regenerate at most once a day ([ADR 0003](adr/0003-google-reviews-places-api.md)), so function use is negligible.
- Bandwidth: video is served by YouTube, not Vercel, which is the main reason ADR 0001 matters for cost.
- Image optimisation has a monthly quota on Hobby; keep local images few and appropriately sized (current: two webp photos).
- Hobby is for non-commercial use per Vercel's terms. This site promotes a paid DJ business, so
  **re-read Vercel's current Fair Use / Hobby terms**; if they exclude it, the
  alternatives are Cloudflare Pages or Netlify free tiers (both work with a static Next export) or Vercel Pro.

## Troubleshooting

- Reviews not showing: `GOOGLE_PLACES_API_KEY` missing in that Vercel environment, or the Places API (New) request failing (check the build and function logs for "Google reviews unavailable").
- Build passes locally but fails on Vercel: run `npm ci && npm run build` to reproduce with a clean install.
- Reel not showing: `reelVideoId` empty, or the video is Private on YouTube (use Public or Unlisted).
