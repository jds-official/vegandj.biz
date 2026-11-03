import type { Metadata } from 'next';
import { Audiowide, Lexend } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

// Brand face: wide, rounded, techno-retro display. Header wordmark only. Single weight (400).
const audiowide = Audiowide({
  variable: '--font-audiowide',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

// Text face for body and the other headings. Lexend is designed around reading
// proficiency research, has clearly distinct letterforms, and (unlike Atkinson
// Hyperlegible) a plain, un-slashed zero. Variable weight (100-900).
const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  display: 'swap',
});

const ogImage = {
  // 1200x630 card built by scripts/make-og-image.mjs. The photo is credited
  // in the alt text (the card image itself carries no text).
  url: '/images/og-card.jpg',
  width: 1200,
  height: 630,
  alt: `${site.hero.photoAlt} Photo by ${site.photoCredit.name}.`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.title} | ${site.region}`,
  description: `${site.name} is a vegan vinyl DJ for weddings, bar mitzvahs, reunions and venues in the ${site.region}. Fifteen years of professional experience, two turntables and a microphone.`,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: site.url,
    title: `${site.name} | ${site.title}`,
    description: site.ogDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.title}`,
    description: site.ogDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.variable} ${lexend.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
