import { AcceptedFile } from '@/components/files/accepted-files.types';

import makeImage from './make-image';

const donwload = (file: AcceptedFile) => {
  const dataURI = makeImage(file);
  const a = document.createElement('a');
  a.href = dataURI;
  a.download = file.fileName;
  a.click();
};

export default donwload;
