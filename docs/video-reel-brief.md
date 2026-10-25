# Homepage reel brief

The reel is the first thing a prospective client sees. Its only job is to make them think
"I want that at my wedding" and scroll to the contact form.

## Length

**60–90 seconds** is the target; never over 2 minutes. Couples are scanning several DJs in one
sitting. Under a minute can feel thin for a vinyl-focused act; over two, completion rates drop off sharply.
A 30–45 second cutdown for Instagram/TikTok is a free by-product (and useful for the existing TikTok).

## Structure

1. **0–5s, hook.** A striking image or sound: needle drop, a packed dance floor erupting. Don't open with a logo.
2. **5–50s, proof.** Fast cuts of: crowd reacting, hands on records, the two-turntable setup, mic moments, happy couples and relatives dancing. Multiple venues/events.
3. **50–75s, personality.** The vegan/Hudson Valley angle and some humour (the site copy already jokes about "killing it" on the dance floor).
4. **Last 5s, call to action.** "Grand Format · vegandj.biz" on screen. Nothing else.

## Production notes

- Must work **muted** (autoplay-adjacent and phone contexts); add captions or on-screen text for anything spoken.
- Landscape 16:9 for the site. Optionally also export a 9:16 vertical version for social.
- Use music you have the rights to (your own mixes of licensed vinyl may be flagged by YouTube Content ID; consider royalty-free or cleared tracks for the reel itself, or expect a claim).
- Get consent from featured clients/guests where faces are prominent.
- Export 1080p H.264. Upload to YouTube as **Public** (so it's searchable) or **Unlisted**.
- Pick a deliberate thumbnail; it is what visitors see before they click.

## Going live with it

1. Upload to YouTube; copy the ID from `youtube.com/watch?v=<ID>`.
2. Paste into `reelVideoId` in `src/content/site.ts`.
3. `npm run check`, open a PR, merge.
