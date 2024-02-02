'use client';

import { useState } from 'react';

import AcceptedAction from '@/components/accepted-files/accepted-action.comp';
import AcceptedFiles from '@/components/accepted-files/accepted-files.comp';
import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';
import FileUploader from '@/components/file-uploader/file-uploader.comp';
import Footer from '@/components/footer/footer.comp';
import RejectedAction from '@/components/rejected-files/rejected-action.comp';
import RejectedFiles from '@/components/rejected-files/rejected-files.comp';
import { RejectedFile } from '@/components/rejected-files/rejected-files.types';

const Home = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([]);

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

  return (
    <div className='container mx-auto'>
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
  );
};

export default Home;
