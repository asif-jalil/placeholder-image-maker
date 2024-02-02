import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';

import makeImage from './make-image';

export const download = (dataURI: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = dataURI;
  a.download = fileName;
  a.click();
};

export const donwloadFile = (file: AcceptedFile) => {
  const dataURI = makeImage(file);
  download(dataURI, file.fileName);
};
