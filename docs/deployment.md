# Deployment

Hosting target: **Vercel Hobby (free)**. Until launch, `main` is the live static site on GitHub Pages (served from `main` at `/`, `CNAME` = vegandj.biz) and must not change; development happens on `the-new-world`. After launch, `main` is production and every PR gets a preview URL.

## First-time setup (not yet done)

1. At launch only: merge `the-new-world` into `main` via PR (CI must be green). This replaces the GitHub Pages site, so switch DNS and Pages off in the same window.
2. In Vercel: **Add New → Project**, import `jds-tag/vegandj.biz`. Framework preset auto-detects Next.js; leave build settings default.
3. Add the domain `vegandj.biz` (and `www`) under **Settings → Domains** and set the DNS records Vercel shows at the registrar.
4. Check the preview deployment on a phone before promoting the domain.

No environment variables are required today. If one is ever added, document it in `.env.example` (committed) and here; never commit real values.

## Staying on the free tier

- The site is fully static, so there are no function invocations to meter.
- Bandwidth: video is served by YouTube, not Vercel, which is the main reason ADR 0001 matters for cost.
- Image optimisation has a monthly quota on Hobby; keep local images few and appropriately sized (current: two webp photos).
- Hobby is for non-commercial use per Vercel's terms. This site promotes a paid DJ business, so
  **re-read Vercel's current Fair Use / Hobby terms before launching**; if they exclude it, the
  alternatives are Cloudflare Pages or Netlify free tiers (both work with a static Next export) or Vercel Pro.

## Troubleshooting

- Build passes locally but fails on Vercel: run `npm ci && npm run build` to reproduce with a clean install.
- Reel not showing: `reelVideoId` empty, or the video is Private on YouTube (use Public or Unlisted).
