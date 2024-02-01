import React from 'react';

import Image from 'next/image';

import warningIcon from '@/assets/images/warning.png';

import { RejectedFilesProps } from './rejected-files.types';

const RejectedFiles = ({ rejectedFiles = [] }: RejectedFilesProps) => {
  if (!rejectedFiles.length) return null;

  return (
    <div className='mb-6 shadow-lg p-3 rounded'>
      {rejectedFiles.map((file) => (
        <div key={file.previewSrc} className='flex justify-between p-2'>
          <div className='flex'>
            <div className='w-[50px] h-[50px] me-3'>
              <Image
                src={file.previewSrc}
                alt={file.fileName}
                width={50}
                height={50}
                className='object-cover rounded inline-block h-full w-full'
              />
            </div>
            <div>
              <h4 className='text-sm font-semibold mb-1'>{file.fileName}</h4>
              <span className='inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 uppercase'>
                {file.type || 'invalid'}
              </span>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='me-3 text-end'>
              <p className='text-sm font-semibold'>Error</p>
              <p className='text-xs'>{file.error}</p>
            </div>
            <div className=' bg-red-100 p-2 w-[50px] h-[50px] rounded flex justify-center items-center'>
              <Image src={warningIcon} alt='warning' width={30} height={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RejectedFiles;
