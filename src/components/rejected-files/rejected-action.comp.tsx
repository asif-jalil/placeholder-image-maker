import { useMemo } from 'react';
import { BsX } from 'react-icons/bs';

import byteToMb from '@/utils/byte-to-mb';

import { RejectedActionProps } from './rejected-action.types';

const RejectedAction = ({ rejectedFiles = [], onClear }: RejectedActionProps) => {
  const totalSize = useMemo(() => rejectedFiles.reduce((prev, curr) => prev + curr.size, 0), [rejectedFiles]);

  if (!rejectedFiles.length) return null;

  return (
    <div className='p-3 h-auto rounded-2xl space-y-3'>
      <div className='flex gap-5 flex-wrap justify-between items-center w-full'>
        <h4 className='ml-3 text-red-500'>
          <span className='font-semibold'>{byteToMb(totalSize)}MB </span>
          <span className='sr-only sm:not-sr-only'>— Total failed</span>
        </h4>
        <button
          onClick={onClear}
          className='flex items-center gap-1 active:scale-95 transition-transform duration-75 bg-red-500 hover:bg-red-600 text-white font-semibold text-xs px-3 md:px-5 py-2.5 rounded-xl'
        >
          <BsX className='text-lg' />
          <span className='sr-only md:not-sr-only'>Clear all</span>
        </button>
      </div>
    </div>
  );
};

export default RejectedAction;
