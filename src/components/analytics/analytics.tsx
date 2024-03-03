'use client';

import React from 'react';

import { GoogleAnalytics } from 'nextjs-google-analytics';

import { isProduction } from '@/utils/check-environment';

const GAnalytics = () => {
  if (!isProduction) {
    return <span />;
  }

  return <GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string} trackPageViews />;
};

export default GAnalytics;
