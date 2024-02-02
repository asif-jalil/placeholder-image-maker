import { useMemo } from 'react';

import JSZip from 'jszip';

import byteToMb from '@/utils/byte-to-mb';
import { donwloadFile, download } from '@/utils/download';
import makeImage from '@/utils/make-image';

import Badge from '../badge/badge.comp';
import Button from '../button/button.comp';
import { AcceptedActionProps } from './accepted-action.types';

const AcceptedAction = ({ acceptedFiles = [] }: AcceptedActionProps) => {
  const totalSize = useMemo(() => acceptedFiles.reduce((prev, curr) => prev + curr.size, 0), [acceptedFiles]);

  if (!acceptedFiles.length) return null;

  const handleDownloadAll = () => {
    acceptedFiles.forEach((file) => {
      donwloadFile(file);
    });
  };

  const handleDownloadAsZip = () => {
    const zip = new JSZip();

    acceptedFiles.forEach((file) => {
      const dataUrl = makeImage(file);
      const byteCharacters = atob(dataUrl.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      zip.file(file.fileName, byteArray);
    });

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      download(URL.createObjectURL(blob), 'placeholder-images.zip');
    });
  };

  return (
    <div className='flex justify-between gap-3 p-3 bg-slate-700 rounded-t-lg'>
      <div className='flex items-center'>
        <Badge className='me-3 px-3 text-base'>{byteToMb(totalSize)}MB</Badge>
        <p className='text-lg font-semibold text-white'>Total processing</p>
      </div>
      <div className='flex gap-2'>
        <Button onClick={handleDownloadAll}>Download all</Button>
        <Button onClick={handleDownloadAsZip} bg='yellow'>
          Download as ZIP
        </Button>
      </div>
    </div>
  );
};

export default AcceptedAction;
