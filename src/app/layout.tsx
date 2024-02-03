import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';

import icon from '@/assets/images/icon.png';
import Tooptip from '@/components/tooltip/tooltip.comp';

import '../assets/styles/globals.css';

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kumbh-sans'
});

export const metadata: Metadata = {
  title: 'Placeholder Maker - Generate your placeholder image',
  description:
    'Generate a temporary image placeholder to use when submitting it to Themeforest or any other online marketplace.',
  icons: icon.src
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='en'>
    <body>
      <main className={`${kumbhSans.variable} font-kumbh-sans pt-16 pb-8`}>{children}</main>
      <Tooptip />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
