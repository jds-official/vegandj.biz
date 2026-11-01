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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Vegan Vinyl Wedding DJ | ${site.region}`,
  description: `${site.name} is a vegan vinyl DJ for weddings, bar mitzvahs, reunions and venues in the ${site.region}. Fifteen years of professional experience, two turntables and a microphone.`,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: `Vinyl DJ in the ${site.region}.`,
    url: site.url,
    images: '/images/hero-dj-turntables.webp',
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
