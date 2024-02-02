import React from 'react';

import Image from 'next/image';

import warningIcon from '@/assets/images/warning.png';
import getTypeBadge from '@/utils/get-type-badge';

import Badge from '../badge/badge.comp';
import Truncate from '../truncate/truncate.comp';
import { RejectedFilesProps } from './rejected-files.types';

const RejectedFiles = ({ rejectedFiles = [] }: RejectedFilesProps) => {
  if (!rejectedFiles.length) return null;

  return (
    <div className='bg-red-50 pt-5 pb-3 px-3 rounded-b-lg'>
      {rejectedFiles.map((file) => (
        <div key={file.previewSrc} className='flex justify-between p-2 shadow mb-3 bg-white rounded-lg'>
          <div className='flex'>
            <div className='w-[40px] md:w-[50px] h-[40px] md:h-[50px] me-3'>
              <Image
                src={file.previewSrc}
                alt={file.name}
                width={50}
                height={50}
                className='object-cover rounded inline-block h-full w-full'
              />
            </div>
            <div className='hidden sm:block'>
              <h4 className='text-sm font-semibold md:mb-1'>
                <Truncate text={[file.name, file.extension].join('.')} />
              </h4>
              <Badge bg={getTypeBadge(file.type)}>{file.type}</Badge>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='me-3 text-end'>
              <p className='text-sm font-semibold'>Error</p>
              <p className='text-xs'>{file.error}</p>
            </div>
            <div className=' bg-red-100 p-2 w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded flex justify-center items-center'>
              <Image src={warningIcon} alt='warning' width={30} height={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RejectedFiles;
