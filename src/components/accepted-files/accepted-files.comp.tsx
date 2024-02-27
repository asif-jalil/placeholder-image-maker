import { BsCloudArrowDown, BsFillCaretRightFill, BsX } from 'react-icons/bs';

import Image from 'next/image';

import { donwloadFile } from '@/utils/download';
import getTypeBadge from '@/utils/get-type-badge';

import Badge from '../badge/badge.comp';
import Truncate from '../truncate/truncate.comp';
import { AcceptedFile, AcceptedFilesProps } from './accepted-files.types';

const AcceptedFiles = ({ acceptedFiles = [], onDelete }: AcceptedFilesProps) => {
  if (!acceptedFiles.length) return null;

  const handleDownload = (file: AcceptedFile) => {
    donwloadFile(file);
  };

  return (
    <div className='w-full border bg-white rounded-2xl overflow-y-auto no-scrollbar h-96'>
      {acceptedFiles.map((file) => (
        <div key={file.previewSrc} className='flex items-center justify-between p-3 border-b'>
          <div className='flex'>
            <div className='flex items-center me-4'>
              <div className='w-[40px] md:w-[50px] h-[40px] md:h-[50px]'>
                <Image
                  src={file.previewSrc}
                  alt={file.name}
                  width={50}
                  height={50}
                  className='object-cover border rounded-xl inline-block h-full w-full'
                />
              </div>

              <BsFillCaretRightFill className='text-xl pointer-events-none select-none mx-1 md:mx-3' />

              <div className='w-[40px] md:w-[50px] h-[40px] md:h-[50px] select-none'>
                <div className='w-full h-full bg-slate-200 rounded-xl border text-[7.5px] flex justify-center items-center text-center'>
                  {file.width} x {file.height}
                </div>
              </div>
            </div>
            <div className='me-4 hidden sm:block'>
              <h4 className='text-sm font-semibold md:mb-1'>
                <Truncate text={[file.name, file.extension].join('.')} />
              </h4>
              <Badge bg={getTypeBadge(file.type)}>{file.type}</Badge>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <button
              onClick={() => handleDownload(file)}
              className='border active:scale-95 transition-transform duration-75 hover:bg-slate-100 p-2 w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-xl flex justify-center items-center'
            >
              <span className='sr-only'>Download file</span>
              <BsCloudArrowDown className='text-xl' />
            </button>
            <button
              onClick={() => onDelete(file.id)}
              className='bg-dark hover:bg-dark/90 text-white active:scale-95 transition-transform duration-75 p-2 w-[40px] md:w-[50px] h-[40px] md:h-[50px] rounded-xl flex justify-center items-center'
            >
              <span className='sr-only'>Delete file</span>
              <BsX className='text-2xl' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcceptedFiles;
