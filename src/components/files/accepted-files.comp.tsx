import React from 'react';

import Image from 'next/image';

import deleteIcon from '@/assets/images/delete.png';
import downloadIcon from '@/assets/images/download.png';
import rightArrowIcon from '@/assets/images/right-arrow.png';

import { AcceptedFile, AcceptedFilesProps } from './accepted-files.types';

const AcceptedFiles = ({ acceptedFiles = [], onDelete }: AcceptedFilesProps) => {
  if (!acceptedFiles.length) return null;

  const handleDownload = (file: AcceptedFile) => {
    console.log(file);
  };

  return (
    <div className='mb-6 shadow-lg p-3 rounded'>
      {acceptedFiles.map((file) => (
        <div key={file.oldPreviewSrc} className='flex justify-between p-2'>
          <div className='flex'>
            <div className='flex items-center me-4'>
              <div className='w-[50px] h-[50px]'>
                <Image
                  src={file.oldPreviewSrc}
                  alt={file.fileName}
                  width={50}
                  height={50}
                  className='object-cover rounded inline-block h-full w-full'
                />
              </div>
              <div className='mx-4'>
                <Image src={rightArrowIcon} alt='convert' width={24} height={24} />
              </div>
              <div className='w-[50px] h-[50px]'>
                <Image
                  src={file.oldPreviewSrc}
                  alt={file.fileName}
                  width={50}
                  height={50}
                  className='object-cover rounded inline-block h-full w-full'
                />
              </div>
            </div>
            <div className='hidden lg:block'>
              <h4 className='text-sm font-semibold mb-1'>{file.fileName}</h4>
              <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 uppercase'>
                {file.type || 'invalid'}
              </span>
            </div>
          </div>

          <div className='flex items-start'>
            <button
              onClick={() => handleDownload(file)}
              className='me-3 bg-emerald-100 p-2 w-[50px] h-[50px] rounded flex justify-center items-center'
            >
              <Image src={downloadIcon} alt='delete' width={24} height={24} />
            </button>
            <button
              onClick={() => onDelete(file.fileName)}
              className='bg-red-100 p-2 w-[50px] h-[50px] rounded flex justify-center items-center'
            >
              <Image src={deleteIcon} alt='delete' width={22} height={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcceptedFiles;
