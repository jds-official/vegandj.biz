import { site } from '@/content/site';
import { excerpt, type Reviews } from '@/lib/reviews';

/** Five stars, filled up to the rounded rating. Decorative: the text beside
 *  them carries the meaning. */
function Stars({ rating, className }: { rating: number; className?: string }) {
  const filled = Math.round(rating);
  return (
    <span
      aria-hidden="true"
      className={`inline-flex gap-0.5 ${className ?? ''}`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className="h-[1em] w-[1em]">
          <path
            d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z"
            fill={n <= filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

/** Rating pill in the hero. Smooth-scrolls to the quotes (`#reviews`); the
 *  link above the quotes is the one that goes out to Google. With no quotes to
 *  scroll to, it links out instead. */
export function ReviewChip({ data }: { data: Reviews }) {
  const label = `${data.rating.toFixed(1)} · ${data.count} Google ${
    data.count === 1 ? 'review' : 'reviews'
  }`;
  const toQuotes = data.reviews.length > 0;
  return (
    <a
      href={toQuotes ? '#reviews' : data.reviewsUrl}
      {...(toQuotes ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className="review-chip wipe-link"
      data-hero-link
    >
      <Stars rating={data.rating} />
      <span className="wipe-line">{label}</span>
      {!toQuotes && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Quotes from the reviews, a swipeable row (CSS scroll-snap, no script, no
 *  autoplay). Long reviews are cut short and link to the full text on Google. */
export function ReviewQuotes({ data }: { data: Reviews }) {
  if (data.reviews.length === 0) return null;
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mx-auto max-w-3xl px-4 pt-16"
    >
      <h2 id="reviews-heading" className="mb-2 text-center text-headline">
        {site.reviews.heading}
      </h2>
      <p className="mx-auto mb-6 text-center">
        <Stars rating={data.rating} className="mr-2 align-middle" />
        <a
          href={data.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline underline-offset-4"
        >
          {data.rating.toFixed(1)} from {data.count} Google{' '}
          {data.count === 1 ? 'review' : 'reviews'}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
      <ul
        role="list"
        tabIndex={0}
        aria-label="Google reviews, scroll sideways for more"
        className="review-row relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4"
      >
        {data.reviews.map((review) => {
          const { text, truncated } = excerpt(
            review.text,
            site.reviews.excerptChars
          );
          return (
            <li
              key={review.url ?? review.author}
              className="w-[85%] max-w-sm flex-none snap-start"
            >
              <figure className="contact-frame flex h-full flex-col p-5">
                <Stars rating={review.rating} className="mb-2" />
                <blockquote className="flex-1">
                  <p>&ldquo;{text}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-bold">{review.author}</span>
                  {truncated && (
                    <>
                      {' · '}
                      <a
                        href={review.url ?? data.reviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline underline-offset-4"
                      >
                        Read more on Google
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </>
                  )}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
