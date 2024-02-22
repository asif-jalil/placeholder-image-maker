import { useMemo, useState } from 'react';
import { BsChevronDown, BsCloudArrowDownFill, BsFileEarmarkZipFill } from 'react-icons/bs';

import classNames from 'classnames';
import JSZip from 'jszip';

import byteToMb from '@/utils/byte-to-mb';
import { donwloadFile, download, getFileName } from '@/utils/download';
import makeImage from '@/utils/make-image';

import Badge from '../badge/badge.comp';
import Button from '../button/button.comp';
import { AcceptedActionProps } from './accepted-action.types';

const AcceptedAction = ({ acceptedFiles = [] }: AcceptedActionProps) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
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
    <div className='p-3 h-auto rounded-2xl space-y-3'>
      <div className='flex gap-5 flex-wrap justify-between items-center w-full'>
        <h4 className='ml-3 text-white'>
          <span className='font-semibold'>{byteToMb(totalSize)}MB </span>
          <span className='sr-only sm:not-sr-only'>— Total processing</span>
        </h4>
        <div className='flex gap-2'>
          <button
            onClick={handleDownloadAll}
            className='flex items-center gap-2 border text-white hover:bg-white/5 active:scale-95 transition-transform duration-75 font-semibold text-xs px-3 md:px-5 py-2 rounded-xl'
          >
            <BsCloudArrowDownFill className='text-lg' />
            <span className='sr-only md:not-sr-only'>Download all</span>
          </button>
          <button
            onClick={handleDownloadAsZip}
            className='flex items-center gap-2 active:scale-95 transition-transform duration-75 bg-white hover:bg-gray-100 text-dark font-semibold text-xs px-3 md:px-5 py-2 rounded-xl'
          >
            <BsFileEarmarkZipFill className='text-lg' />
            <span className='sr-only md:not-sr-only'>Download as ZIP</span>
          </button>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className='flex items-center gap-2 text-white hover:underline text-xs active:scale-95 transition-transform duration-75 px-3 md:px-5 py-3 rounded-xl'
          >
            <span className='sr-only md:not-sr-only'>Customize</span>
            <BsChevronDown className='text-sm' />
          </button>
        </div>
      </div>
      {/* <div
        className={classNames({
          'w-full bg-red-400 transition-height': true,
          'h-0': !isCustomizing,
          'h-20': isCustomizing
        })}
      >
        Hello
      </div> */}
    </div>
  );
};

export default AcceptedAction;
