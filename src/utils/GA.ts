import { event } from 'nextjs-google-analytics';

import { isProduction } from './check-environment';

const ifEnabled =
  (fn: unknown) =>
  (...params: unknown[]) => {
    if (!isProduction) return;
    // @ts-expect-error any function is expected
    fn(...params);
  };

const upload = () => {
  event('upload');
};

const download = () => {
  event('download');
};

const downloadZip = () => {
  event('download_zip');
};

const customDownload = () => {
  event('customize');
};

const ga = {
  upload: ifEnabled(upload),
  download: ifEnabled(download),
  downloadZip: ifEnabled(downloadZip),
  customDownload: ifEnabled(customDownload)
};

export default ga;
