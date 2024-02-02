import { useMemo } from 'react';

import Image from 'next/image';

import JSZip from 'jszip';

import downloadIcon from '@/assets/images/download-white.png';
import zipIcon from '@/assets/images/zip.png';
import byteToMb from '@/utils/byte-to-mb';
import { donwloadFile, download, getFileName } from '@/utils/download';
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

      const fileName = getFileName(file.name, file.extension);
      zip.file(fileName, byteArray);
    });

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      download(URL.createObjectURL(blob), 'placeholder-images.zip');
    });
  };

  return (
    <div className='flex justify-between gap-3 p-3 bg-slate-700 rounded-t-lg'>
      <div className='flex items-center'>
        <Badge className='me-2 sm:me-3 px-2 sm:px-3 text-[12px] sm:text-base'>{byteToMb(totalSize)}MB</Badge>
        <p className='text-sm sm:text-lg font-semibold text-white'>Total processing</p>
      </div>
      <div className='flex gap-2 justify-between items-center'>
        <Button onClick={handleDownloadAll}>
          <Image
            src={downloadIcon}
            alt='Download all'
            width={18}
            height={18}
            className='inline sm:hidden md:inline md:me-2'
          />{' '}
          <span className='hidden sm:inline'>Download all</span>
        </Button>
        <Button onClick={handleDownloadAsZip} bg='yellow'>
          <Image
            src={zipIcon}
            alt='Download as ZIP'
            width={18}
            height={18}
            className='inline sm:hidden md:inline md:me-2'
          />{' '}
          <span className='hidden sm:inline'>Download as ZIP</span>
        </Button>
      </div>
    </div>
  );
};

export default AcceptedAction;
