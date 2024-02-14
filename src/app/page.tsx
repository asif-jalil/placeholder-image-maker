'use client';

import { useState } from 'react';

import Image from 'next/image';

import classNames from 'classnames';

import editIcon from '@/assets/images/edit.svg';
import AcceptedAction from '@/components/accepted-files/accepted-action.comp';
import AcceptedFiles from '@/components/accepted-files/accepted-files.comp';
import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';
import Button from '@/components/button/button.comp';
import CustomizeDrawer from '@/components/customize-drawer/customize-drawer.comp';
import FileUploader from '@/components/file-uploader/file-uploader.comp';
import Footer from '@/components/footer/footer.comp';
import RejectedAction from '@/components/rejected-files/rejected-action.comp';
import RejectedFiles from '@/components/rejected-files/rejected-files.comp';
import { RejectedFile } from '@/components/rejected-files/rejected-files.types';

const Home = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([]);
  const [isCustomize, setIsCustomize] = useState(false);

  const onReject = (list: RejectedFile[]) => {
    setRejectedFiles((prev) => [...prev, ...list]);
  };

  const onSelect = (file: AcceptedFile) => {
    setAcceptedFiles((prev) => [...prev, file]);
  };

  const onDelete = (id: string | number) => {
    const files = acceptedFiles.filter((file) => file.id !== id);
    setAcceptedFiles(files);
  };

  const onClearRejectedFiles = () => {
    setRejectedFiles([]);
  };

  const handleCutomizeToggle = () => {
    setIsCustomize((prev) => !prev);
  };

  return (
    <>
      <div
        className={classNames('transition-[margin] duration-300 border-t border-e border-b min-h-screen', {
          'lg:me-[350px] lg:rounded-e-xl': isCustomize
        })}
      >
        <div className='container md:max-w-3xl lg:max-w-4xl mx-auto pt-16 pb-8'>
          <FileUploader
            onSelect={onSelect}
            onReject={onReject}
            accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.bmp', '.webp'] }}
          />
          <div className='mb-6'>
            <RejectedAction rejectedFiles={rejectedFiles} onClear={onClearRejectedFiles} />
            <RejectedFiles rejectedFiles={rejectedFiles} />
          </div>
          <div className='mb-6'>
            <AcceptedAction acceptedFiles={acceptedFiles} />
            <AcceptedFiles acceptedFiles={acceptedFiles} onDelete={onDelete} />
          </div>
          <Footer />
        </div>
        <div className='fixed right-5 bottom-5'>
          <Button
            bg='light'
            className={classNames('sm:transition-[margin] duration-300 !font-normal rounded-full shadow-lg', {
              'sm:me-[350px]': isCustomize
            })}
            onClick={handleCutomizeToggle}
          >
            <Image src={editIcon as string} width={13} height={13} className='me-2' alt='customize placeholder' />
            Customize placeholder
          </Button>
        </div>
      </div>

      <CustomizeDrawer isCustomize={isCustomize} onClose={() => setIsCustomize(false)} />
    </>
  );
};

export default Home;
