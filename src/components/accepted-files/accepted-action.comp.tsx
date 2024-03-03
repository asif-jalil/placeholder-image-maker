import { useMemo } from 'react';
import { BsCloudArrowDownFill, BsXLg } from 'react-icons/bs';

import JSZip from 'jszip';

import ga from '@/utils/GA';
import byteToMb from '@/utils/byte-to-mb';
import { download, getFileName } from '@/utils/download';
import makeImage from '@/utils/make-image';

import { AcceptedActionProps } from './accepted-action.types';

const AcceptedAction = ({ acceptedFiles = [], onClear }: AcceptedActionProps) => {
  const totalSize = useMemo(() => acceptedFiles.reduce((prev, curr) => prev + curr.size, 0), [acceptedFiles]);

  if (!acceptedFiles.length) return null;

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

    ga.downloadZip();
  };

  return (
    <div className='p-3 h-auto rounded-2xl space-y-3'>
      <div className='flex gap-5 flex-wrap justify-between items-center w-full'>
        <h4 className='ml-3 text-white'>
          <span className='font-semibold'>{byteToMb(totalSize)}MB </span>
          <span className='sr-only sm:not-sr-only'>— Total processing</span>
        </h4>
        <div className='flex gap-2'>
          <button
            onClick={handleDownloadAsZip}
            className='flex items-center gap-2 active:scale-95 transition-transform duration-75 bg-white hover:bg-slate-100 text-dark font-semibold text-xs px-3 md:px-5 py-2 rounded-xl'
          >
            <BsCloudArrowDownFill className='text-lg' />
            <span className='sr-only md:not-sr-only'>Download all</span>
          </button>
          <button
            onClick={onClear}
            className='flex items-center gap-1 text-white hover:underline text-xs active:scale-95 transition-transform duration-75 px-3 md:px-5 py-3 rounded-xl'
          >
            <BsXLg className='text-sm' />
            <span className='sr-only md:not-sr-only'>Clear all</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptedAction;
