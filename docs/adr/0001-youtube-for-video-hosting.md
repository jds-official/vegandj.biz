# ADR 0001: Host video on YouTube, embed with a click-to-load facade

- Status: Accepted
- Date: 2026-10-25

## Context

The landing page needs a creative reel; later the site needs a player for videos up to
about an hour. Requirements: as cheap as possible (free tier on Vercel), good mobile playback, and
no heavy impact on page speed. Open question was whether to avoid YouTube because of its social features
(related videos, comments, branding, tracking).

Options considered (prices are approximate as of writing; verify before relying on them):

| Option                       | Cost                                             | Notes                                                                                                              |
| ---------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **YouTube embed**            | Free                                             | Free hosting, adaptive streaming, long videos fine, searchable on Google/YouTube. Some branding and suggestion UI. |
| Vimeo (free/paid)            | Free tier is tiny; clean player costs monthly    | Cleaner player, but storage limits and a monthly fee for the good bits                                             |
| Cloudflare Stream / Mux      | Pay per minute stored + delivered                | Great clean player; cost is small but nonzero and scales with plays                                                |
| Self-host mp4 (R2/S3/Vercel) | Storage + bandwidth; Vercel Hobby caps bandwidth | You own encoding/adaptive bitrate; a one-hour set is expensive to serve                                            |

On audience: for a local wedding DJ, YouTube is not a major discovery channel; clients mostly arrive via
Google search, wedding directories, referrals and Instagram/TikTok. The embed's job is conversion on
the site, not audience growth. YouTube still helps a little: videos appear in Google results, and an
hour-long set can live there at zero cost.

## Decision

Use YouTube for hosting. Embed through a **click-to-load facade** (`src/components/YouTubeEmbed.tsx`):
show the thumbnail, load the iframe only on click, from `youtube-nocookie.com` with `rel=0`.

## Consequences

- Zero hosting cost, zero bandwidth on Vercel, and long-form sets are viable later.
- No YouTube JavaScript or cookies on first paint, so the landing page stays fast and privacy-friendly.
- After a click, YouTube's player UI and end-screen suggestions (restricted to the same channel via `rel=0`) appear; we accept that.
- A clean, brand-controlled player is not possible without moving hosts. If that becomes important,
  revisit with Cloudflare Stream or Mux and supersede this ADR; the facade component makes swapping the source easy.
- Content ID claims on copyrighted music may mute or block the reel; see the video brief.
