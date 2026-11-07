import { site } from '@/content/site';

export type Review = {
  author: string;
  authorUrl: string | null;
  rating: number;
  text: string;
  /** This review's own page on Google Maps. */
  url: string | null;
};

export type Reviews = {
  rating: number;
  count: number;
  /** The reviews list on Google (the "Read more" and chip target). */
  reviewsUrl: string;
  reviews: Review[];
};

// Only what we render. Review photos are not in the API response at all, and
// we skip the reviewers' avatars on purpose so nothing competes with the hero.
const FIELDS = [
  'rating',
  'userRatingCount',
  'googleMapsLinks.reviewsUri',
  'reviews.rating',
  'reviews.text',
  'reviews.googleMapsUri',
  'reviews.authorAttribution.displayName',
  'reviews.authorAttribution.uri',
].join(',');

type ApiReview = {
  rating?: number;
  text?: { text?: string };
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string };
};

type ApiPlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsLinks?: { reviewsUri?: string };
  reviews?: ApiReview[];
};

/**
 * Fetches rating, count and reviews from the Places API (New), server-side.
 * The fetch is cached for a day (ISR), so the page stays static and costs
 * about one API call a day. Returns null when the widget should simply not
 * show: no key (local dev without .env.local), or the build could not reach
 * Google. At runtime a failed refresh throws instead, so Next keeps serving
 * the last good page rather than replacing it with one that has no reviews.
 */
export async function getReviews(): Promise<Reviews | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${site.reviews.placeId}`,
      {
        headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELDS },
        next: { revalidate: 60 * 60 * 24 },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) throw new Error(`Places API responded ${res.status}`);
    const place = (await res.json()) as ApiPlace;

    const reviewsUrl = place.googleMapsLinks?.reviewsUri;
    if (
      typeof place.rating !== 'number' ||
      typeof place.userRatingCount !== 'number' ||
      !reviewsUrl
    ) {
      throw new Error('Places API response is missing rating, count or link');
    }

    const reviews = (place.reviews ?? []).flatMap((r): Review[] => {
      const text = r.text?.text?.replace(/\s+/g, ' ').trim();
      if (!text || (r.rating ?? 0) < site.reviews.minRating) return [];
      return [
        {
          author: r.authorAttribution?.displayName ?? 'Google reviewer',
          authorUrl: r.authorAttribution?.uri ?? null,
          rating: r.rating ?? 0,
          text,
          url: r.googleMapsUri ?? null,
        },
      ];
    });

    return {
      rating: place.rating,
      count: place.userRatingCount,
      reviewsUrl,
      reviews,
    };
  } catch (error) {
    console.error('Google reviews unavailable:', error);
    const refreshing =
      process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PHASE !== 'phase-production-build';
    if (refreshing) throw error;
    return null;
  }
}

/** Cuts `text` at a word boundary near `max` characters. */
export function excerpt(text: string, max: number) {
  if (text.length <= max) return { text, truncated: false };
  const cut = text.slice(0, max).replace(/\s+\S*$/, '');
  return { text: `${cut.replace(/[\s,.;:!?-]+$/, '')}…`, truncated: true };
}
