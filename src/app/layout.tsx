import type { Metadata } from 'next';
import { Roboto, Bad_Script } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

const badScript = Bad_Script({
  variable: '--font-bad-script',
  subsets: ['latin'],
  weight: '400', // Bad Script only supports 400
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
      <body className={`${roboto.variable} ${badScript.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
