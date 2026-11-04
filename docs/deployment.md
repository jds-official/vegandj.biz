# Deployment

Hosting: **Vercel Hobby (free)**, deploying from `main`.

## How it works

Vercel builds the `main` branch and serves it at vegandj.biz. Every PR gets a preview URL, so check changes there (on a phone, for layout work) before merging. GitHub Pages is fully deactivated; the site no longer depends on it.

No environment variables are required today. If one is ever added, document it in `.env.example` (committed) and here; never commit real values.

## Staying on the free tier

- The site is fully static, so there are no function invocations to meter.
- Bandwidth: video is served by YouTube, not Vercel, which is the main reason ADR 0001 matters for cost.
- Image optimisation has a monthly quota on Hobby; keep local images few and appropriately sized (current: two webp photos).
- Hobby is for non-commercial use per Vercel's terms. This site promotes a paid DJ business, so
  **re-read Vercel's current Fair Use / Hobby terms**; if they exclude it, the
  alternatives are Cloudflare Pages or Netlify free tiers (both work with a static Next export) or Vercel Pro.

## Troubleshooting

- Build passes locally but fails on Vercel: run `npm ci && npm run build` to reproduce with a clean install.
- Reel not showing: `reelVideoId` empty, or the video is Private on YouTube (use Public or Unlisted).
