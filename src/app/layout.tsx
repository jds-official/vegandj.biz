import type { Metadata } from 'next';
import { Roboto, Bad_Script } from 'next/font/google';
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
  title: 'jamesdavidsaul.net',
  description:
    'James David Saul is a web developer, photographer, and birder living in the Hudson Valley, NY',
  openGraph: {
    images: 'images/jds.png',
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
