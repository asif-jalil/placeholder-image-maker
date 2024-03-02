import { Analytics } from '@vercel/analytics/react';
import 'react-perfect-scrollbar/dist/css/styles.css';

import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';

import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import icon from '@/assets/images/file-upload.png';
import ogImage from '@/assets/images/ogimage.png';
import Tooptip from '@/components/tooltip/tooltip.comp';
import { isProduction } from '@/utils/check-environment';

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
  icons: icon.src,
  openGraph: {
    emails: 'asifjalil0@gmail.com',
    phoneNumbers: '8801719836117',
    title: 'Placeholder Maker - Generate your placeholder image',
    description:
      'Generate a temporary image placeholder to use when submitting it to Themeforest or any other online marketplace.',
    images: ogImage.src
  },
  twitter: {
    title: 'Placeholder Maker - Generate your placeholder image',
    description:
      'Generate a temporary image placeholder to use when submitting it to Themeforest or any other online marketplace.',
    images: ogImage.src
  },
  creator: 'Asif Jalil',
  keywords: [
    'placeholder image',
    'placeholder image maker',
    'placeholder generator',
    'image generator',
    'placeholder maker'
  ],
  category: 'online tool',
  authors: [
    { name: 'Asif Jalil', url: 'https://www.linkedin.com/in/asifjalil0/' },
    { name: 'Mostofa Nobi', url: 'https://www.linkedin.com/in/mostofanobi/' }
  ],
  metadataBase: new URL('https://picitify.vercel.app')
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='en'>
    <body>
      <main className={`${kumbhSans.variable} font-kumbh-sans`}>{children}</main>
      <Tooptip />
      <Analytics />
      <SpeedInsights />
      {isProduction && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID as string} />}
    </body>
  </html>
);

export default RootLayout;
