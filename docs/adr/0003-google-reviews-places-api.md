# ADR 0003: Google reviews from the Places API, refreshed daily

- Status: Accepted
- Date: 2026-11-05

## Context

A prospective client trusts a wedding DJ more after seeing other couples' words. The reviews live on the owner's Google Business Profile, a service-area business with no public address. New reviews arrive only every few months, but the page should pick them up without a code change.

## Decision

Fetch the rating, review count and reviews from the Places API (New), server-side, from `src/lib/reviews.ts`, and render them with our own components (`src/components/Reviews.tsx`): a rating pill in the hero and a swipeable row of quotes in the contact panel.

- The fetch uses `next: { revalidate: 86400 }`, so the page stays statically served and Vercel regenerates it at most once a day (about 30 API calls a month).
- The key is `GOOGLE_PLACES_API_KEY`, server-side only (never `NEXT_PUBLIC_`), restricted to Places API (New) in Google Cloud.
- If the key is missing, or Google is unreachable during the build, the widget hides and the build still passes. If a daily refresh fails at runtime the code throws, so Next keeps serving the last good page.
- Review photos are not in the API response, and we omit reviewers' avatars, so nothing competes with the hero photo.
- Long reviews are cut at `excerptChars` and link to the review on Google; the chip and heading link to the full list. This also satisfies Google's attribution requirement.
- Reviews below `minRating` (4) are hidden.

This is a deliberate exception to "no server runtime: every page is statically prerendered": the page is still prerendered, but now regenerates on a schedule.

## Consequences

- The page shows new reviews within a day, with no deploy.
- The Places API returns at most 5 reviews, chosen by Google ("most relevant"); we cannot pick them.
- The reviews fields are a paid SKU with a free monthly allowance; one call a day stays well inside it. The per-method quotas for this API can't be lowered in the Cloud console, so the safeguards are a budget alert, a usage alert, the key restriction, and the one-call-a-day pattern.
- Google's terms limit how long review content may be stored; a day-long cache is well within them.
- Place ID: `ChIJdebg4l_eHwERW3jz82mvy4s` (`site.reviews.placeId`). `scripts/find-place.mjs` finds it and prints a real response. A pure service-area business is only found with `includePureServiceAreaBusinesses: true`.
