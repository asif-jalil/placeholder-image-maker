import { useMemo } from 'react';

import Image from 'next/image';

import deleteIcon from '@/assets/images/delete-white.png';
import byteToMb from '@/utils/byte-to-mb';

import Badge from '../badge/badge.comp';
import Button from '../button/button.comp';
import { RejectedActionProps } from './rejected-action.types';

const RejectedAction = ({ rejectedFiles = [], onClear }: RejectedActionProps) => {
  const totalSize = useMemo(() => rejectedFiles.reduce((prev, curr) => prev + curr.size, 0), [rejectedFiles]);

  if (!rejectedFiles.length) return null;

  return (
    <div className='flex justify-between gap-3 p-3 bg-red-200 rounded-t-lg'>
      <div className='flex items-center'>
        <Badge className='me-3 px-3 text-[12px] sm:text-base' bg='red'>
          {byteToMb(totalSize)}MB
        </Badge>
        <p className='text-base sm:text-lg font-semibold text-red-700'>Total failed</p>
      </div>
      <Button onClick={onClear} bg='red'>
        <Image src={deleteIcon} alt='Clear all' width={18} height={18} className='inline sm:hidden md:inline md:me-2' />{' '}
        <span className='hidden sm:inline'>Clear all</span>
      </Button>
    </div>
  );
};

export default RejectedAction;
