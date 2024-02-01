'use client';

import { useState } from 'react';

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

  return (
    <div className='container mx-auto'>
      <FileUploader onSelect={onSelect} onReject={onReject} accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }} />
      <RejectedFiles rejectedFiles={rejectedFiles} />
      <AcceptedFiles acceptedFiles={acceptedFiles} onDelete={() => console.log('deleted')} />
      <Footer />
    </div>
  );
};

export default Home;
