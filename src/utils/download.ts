import { MakeImageType } from '@/types/image';

import ga from './GA';
import makeImage from './make-image';

export const getFileName = (name: string, extension: string) => [name, extension].join('.');

export const download = (dataURI: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = dataURI;
  a.download = fileName;
  a.click();
  ga.download();
};

export const downloadFile = (file: MakeImageType) => {
  const dataURI = makeImage(file);
  const fileName = getFileName(file.name, file.extension);
  download(dataURI, fileName);
};
