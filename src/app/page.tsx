import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { site } from '@/content/site';

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="font-sans text-black">
        <section className="bg-rose-50 px-4 pb-12 pt-28 text-center">
          <h1 className="font-script text-4xl font-bold xs:text-6xl">
            Hi, I&apos;m {site.name}!
          </h1>
          <p className="mt-2 text-lg xs:text-xl">
            {site.tagline} · {site.region}
          </p>
          <div className="mx-auto mt-8 max-w-4xl">
            <YouTubeEmbed
              videoId={site.reelVideoId}
              title={`${site.name} wedding DJ reel`}
            />
          </div>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-black px-8 py-3 text-lg text-rose-50"
          >
            Check my availability
          </a>
        </section>

        <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-16 md:grid-cols-2">
          <Image
            src="/images/grand-format-djing.webp"
            alt="Portrait of Grand Format DJing."
            width={800}
            height={800}
            className="h-auto w-full rounded-lg"
          />
          <p className="text-lg leading-relaxed md:text-xl">{site.intro}</p>
        </section>

        <section className="bg-rose-50 px-4 py-16">
          <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-lg">{site.experience}</p>
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
          <h2 className="mb-6 text-center font-script text-3xl font-bold">
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
