import { useMemo } from 'react';

import byteToMb from '@/utils/byte-to-mb';
import donwload from '@/utils/download';

import Badge from '../badge/badge.comp';
import Button from '../button/button.comp';
import { AcceptedActionProps } from './accepted-action.types';

const AcceptedAction = ({ acceptedFiles = [] }: AcceptedActionProps) => {
  const totalSize = useMemo(() => acceptedFiles.reduce((prev, curr) => prev + curr.size, 0), [acceptedFiles]);

  if (!acceptedFiles.length) return null;

  const handleDownloadAll = () => {
    acceptedFiles.forEach((file) => {
      donwload(file);
    });
  };

  return (
    <div className='flex justify-between gap-3 p-3 bg-slate-700 rounded-t-lg'>
      <div className='flex items-center'>
        <Badge className='me-3 px-3 text-base'>{byteToMb(totalSize)}MB</Badge>
        <p className='text-lg font-semibold text-white'>Total processing</p>
      </div>
      <Button onClick={handleDownloadAll}>Download all</Button>
    </div>
  );
};

export default AcceptedAction;
