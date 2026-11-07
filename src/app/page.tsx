import Image from 'next/image';
import Footer from '@/components/Footer';
import HeroLinkGuard from '@/components/HeroLinkGuard';
import { ReviewChip, ReviewQuotes } from '@/components/Reviews';
import { site } from '@/content/site';
import { getReviews } from '@/lib/reviews';

export default async function Home() {
  const reviews = await getReviews();
  return (
    <>
      <main>
        {/* First screen: the photo fills the whole window at every size. The
            sign sits 3% down from the top of the window and is sized with the
            photo; see `.hero-stage` and `.mirror-sign`. */}
        <section className="hero">
          <div className="hero-stage">
            <Image
              src="/images/hero-dj-turntables.webp"
              alt={site.hero.photoAlt}
              fill
              priority
              quality={85}
              // The photo is drawn at max(window width, 150% of window height)
              // (see .hero-stage), so a tall phone window needs a much wider
              // image than 100vw: ask for that, not just the window width.
              sizes="max(100vw, 150vh)"
            />
          </div>
          <div className="mirror-sign">
            <h1 className="mirror-sign-title">{site.name}</h1>
            <p className="mirror-sign-sub">{site.hero.tagline}</p>
          </div>
          <a href="#contact" className="hero-cta font-display" data-hero-link>
            {site.hero.cta}
          </a>
          {reviews && <ReviewChip data={reviews} />}
          <a
            href={site.photoCredit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="photo-credit wipe-link"
            data-hero-link
          >
            <span className="wipe-line">Photo by {site.photoCredit.name}</span>
            {/* Always-visible "opens elsewhere" cue, so touch users (who
                never see the hover line) can still tell this is a link. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="photo-credit-icon"
            >
              <path
                d="M7 17 17 7M8 7h9v9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        {/* The form panel slides up over the pinned hero (see `.hero` and
            `.contact-panel`). Pink with brown text (9.43:1). The Google form
            inside is Google's own page, so only the frame around it is ours. */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="contact-panel"
        >
          <div className="mx-auto max-w-3xl px-4 pt-16">
            <h2 id="contact-heading" className="mb-8 text-center text-headline">
              Let&apos;s talk about your event
            </h2>
            <div className="contact-frame">
              <iframe
                src={site.contactFormUrl}
                title={`Contact ${site.name}`}
                loading="lazy"
                className="h-[900px] w-full border-0"
              >
                Loading…
              </iframe>
            </div>
          </div>
          {reviews && <ReviewQuotes data={reviews} />}
          {/* Logo: 75% of the form's width at every size, centered, with 3rem
              above and below. */}
          <div className="mx-auto max-w-3xl px-4 py-12">
            <Image
              src="/images/grand-format-logo.webp"
              alt={site.logoAlt}
              width={1600}
              height={632}
              sizes="(min-width: 48rem) 552px, calc((100vw - 2rem) * 0.75)"
              className="mx-auto h-auto w-3/4"
            />
          </div>
        </section>
      </main>
      <Footer />
      <HeroLinkGuard />
    </>
  );
}
