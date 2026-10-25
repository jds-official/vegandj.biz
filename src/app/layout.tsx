import type { Metadata } from 'next';
import { Audiowide, Atkinson_Hyperlegible_Next } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

// Brand face: wide, rounded, techno-retro display. Header wordmark only. Single weight (400).
const audiowide = Audiowide({
  variable: '--font-audiowide',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

// Text face for body AND headings: designed by the Braille Institute for maximum
// character distinction and legibility. Variable weight (200-800).
const atkinson = Atkinson_Hyperlegible_Next({
  variable: '--font-atkinson',
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
    images: '/images/grand-format-djing.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${audiowide.variable} ${atkinson.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
