'use client';

import { useState } from 'react';

import AcceptedAction from '@/components/action/accepted-action.comp';
import RejectedAction from '@/components/action/rejected-action.comp';
import FileUploader from '@/components/file-uploader/file-uploader.comp';
import AcceptedFiles from '@/components/files/accepted-files.comp';
import { AcceptedFile } from '@/components/files/accepted-files.types';
import RejectedFiles from '@/components/files/rejected-files.comp';
import { RejectedFile } from '@/components/files/rejected-files.types';
import Footer from '@/components/footer/footer.comp';

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
