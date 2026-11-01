import Image from 'next/image';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { site } from '@/content/site';

export default function Home() {
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
          <a href="#contact" className="hero-cta font-display">
            {site.hero.cta}
          </a>
          <a
            href={site.photoCredit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="photo-credit wipe-link"
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

        <section className="bg-rose-50 px-4 py-16 text-center">
          <h2 className="mx-auto max-w-3xl text-headline">
            {site.reel.heading}
          </h2>
          <div className="mx-auto mt-8 max-w-4xl">
            <YouTubeEmbed
              videoId={site.reelVideoId}
              title={`${site.name} wedding DJ reel`}
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-16 md:grid-cols-2">
          <Image
            src="/images/grand-format-djing.webp"
            alt="Portrait of Grand Format DJing."
            width={800}
            height={800}
            className="h-auto w-full rounded-lg"
          />
          <p className="text-lead">{site.intro}</p>
        </section>

        <section className="bg-rose-50 px-4 py-16">
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-lead">{site.experience}</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {site.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <p className="mt-4 italic">References available on request</p>
            </div>
            <Image
              src="/images/grand-format-boombox.webp"
              alt="Picture of an '80s era boombox."
              width={800}
              height={800}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-6 text-center text-headline">
            Let&apos;s talk about your event
          </h2>
          <iframe
            src={site.contactFormUrl}
            title={`Contact ${site.name}`}
            loading="lazy"
            className="h-[900px] w-full border-0"
          >
            Loading…
          </iframe>
        </section>
      </main>
      <Footer />
    </>
  );
}
