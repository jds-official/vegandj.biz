import Image from 'next/image';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { site } from '@/content/site';

export default function Home() {
  return (
    <>
      <main>
        {/* First screen: the heading band plus a photo that always fills the
            rest of the window. Same photo at every size; object-position keeps
            the DJ in frame as the crop changes. */}
        <div className="flex min-h-svh flex-col">
          {/* Heading on a solid band, not on the photo, so its contrast never
              depends on the picture (black on rose-50 is ~19:1). */}
          <h1 className="shrink-0 bg-rose-50 px-4 py-5 text-center font-display text-display font-normal [font-synthesis:none]">
            {site.name}
          </h1>
          <section className="relative min-h-80 flex-1">
            <Image
              src="/images/hero-dj-turntables.webp"
              alt={site.hero.photoAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[55%_40%]"
            />
            <a href="#contact" className="hero-cta font-display">
              {site.hero.cta}
            </a>
          </section>
        </div>

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
