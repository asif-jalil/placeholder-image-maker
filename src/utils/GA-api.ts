import axios from 'axios';

import { isProduction } from './check-environment';
import { getReqIpAddress } from './getReqIpAddress';

export const ga4Event = async (eventName: string, eventParams: unknown = {}) => {
  if (!isProduction) {
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await axios({
      url: 'https://www.google-analytics.com/mp/collect',
      method: 'POST',
      params: {
        measurement_id: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        api_secret: process.env.GA4_API_SECRET
      },
      data: {
        client_id: getReqIpAddress(),
        events: [
          {
            name: eventName,
            params: eventParams
          }
        ]
      }
    });
  } catch (error: unknown) {
    console.error('GA4 event tracking error', {
      eventName,
      eventParams,
      // @ts-expect-error error type is unknown
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      response: error.response.data
    });
  }
};
