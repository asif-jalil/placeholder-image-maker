import React from 'react';

import Image from 'next/image';

import classNames from 'classnames';

import warningIcon from '@/assets/images/warning.png';
import getTypeBadge from '@/utils/get-type-badge';

import Badge from '../badge/badge.comp';
import Truncate from '../truncate/truncate.comp';
import { RejectedFilesProps } from './rejected-files.types';

const RejectedFiles = ({ rejectedFiles = [] }: RejectedFilesProps) => {
  if (!rejectedFiles.length) return null;

  return (
    <div className='relative w-full border border-red-200 bg-white rounded-t-2xl rounded-b-3xl overflow-y-auto no-scrollbar max-h-96'>
      {rejectedFiles.map((file, index) => (
        <div
          key={file.previewSrc}
          className={classNames({
            'border-b border-red-200': index !== rejectedFiles.length - 1,
            'flex items-center justify-between p-3': true
          })}
        >
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
          <div className='flex items-center'>
            <div className='me-3 text-end'>
              <p className='text-sm font-semibold'>Error</p>
              <p className='text-xs'>{file.error}</p>
            </div>
            <div className=' bg-red-100 p-2 w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-xl flex justify-center items-center'>
              <Image src={warningIcon} alt='warning' width={30} height={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RejectedFiles;
