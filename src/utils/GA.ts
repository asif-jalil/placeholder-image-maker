import { sendGAEvent } from '@next/third-parties/google';

import { isProduction } from './check-environment';

const ifEnabled =
  (fn: unknown) =>
  (...params: unknown[]) => {
    if (!isProduction) return;
    // @ts-expect-error any function is expected
    fn(...params);
  };

const upload = () => {
  sendGAEvent('event', 'upload');
};

const download = () => {
  sendGAEvent('event', 'download');
};

const downloadZip = () => {
  sendGAEvent('event', 'downloadAll');
};

const customDownload = () => {
  sendGAEvent('event', 'customDownload');
};

const ga = {
  upload: ifEnabled(upload),
  download: ifEnabled(download),
  downloadZip: ifEnabled(downloadZip),
  customDownload: ifEnabled(customDownload)
};

export default ga;
