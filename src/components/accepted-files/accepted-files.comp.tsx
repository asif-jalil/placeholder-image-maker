import Image from 'next/image';

import deleteIcon from '@/assets/images/delete.png';
import downloadIcon from '@/assets/images/download.png';
import rightArrowIcon from '@/assets/images/right-arrow.png';
import { donwloadFile } from '@/utils/download';
import getTypeBadge from '@/utils/get-type-badge';

import Badge from '../badge/badge.comp';
import { AcceptedFile, AcceptedFilesProps } from './accepted-files.types';

const AcceptedFiles = ({ acceptedFiles = [], onDelete }: AcceptedFilesProps) => {
  if (!acceptedFiles.length) return null;

  const handleDownload = (file: AcceptedFile) => {
    donwloadFile(file);
  };

  return (
    <div className='bg-slate-100 pt-5 pb-3 px-3 rounded-b-lg'>
      {acceptedFiles.map((file) => (
        <div key={file.previewSrc} className='flex justify-between p-2 shadow mb-3 bg-white rounded-lg'>
          <div className='flex'>
            <div className='flex items-center me-4 w-[160px]'>
              <div className='w-[50px] h-[50px]'>
                <Image
                  src={file.previewSrc}
                  alt={file.fileName}
                  width={50}
                  height={50}
                  className='object-cover rounded inline-block h-full w-full'
                />
              </div>
              <div className='mx-3'>
                <Image
                  src={rightArrowIcon}
                  alt='convert'
                  width={30}
                  height={30}
                  className='pointer-events-none select-none'
                />
              </div>

              <div className='w-[50px] h-[50px] select-none'>
                <div className='w-full h-full bg-slate-200 rounded text-[7.5px] flex justify-center items-center text-center'>
                  {file.width} x {file.height}
                </div>
              </div>
            </div>
            <div className='me-4'>
              <h4 className='text-sm font-semibold mb-1'>{file.fileName}</h4>
              <Badge bg={getTypeBadge(file.type)}>{file.type}</Badge>
            </div>
          </div>

          <div className='flex items-start w-[120px]'>
            <button
              onClick={() => handleDownload(file)}
              className='me-3 bg-emerald-100 p-2 w-[50px] h-[50px] rounded flex justify-center items-center'
            >
              <Image src={downloadIcon} alt='download' width={24} height={24} />
            </button>
            <button
              onClick={() => onDelete(file.id)}
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
