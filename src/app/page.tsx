'use client';

import { Tab } from '@headlessui/react';
import { useState } from 'react';

import classNames from 'classnames';

import AcceptedAction from '@/components/accepted-files/accepted-action.comp';
import AcceptedFiles from '@/components/accepted-files/accepted-files.comp';
import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';
import CustomizePlaceholder from '@/components/customize-placeholder/customize-placeholder.comp';
import FileUploader from '@/components/file-uploader/file-uploader.comp';
import Footer from '@/components/footer/footer.comp';
import Header from '@/components/header/header.comp';
import RejectedAction from '@/components/rejected-files/rejected-action.comp';
import RejectedFiles from '@/components/rejected-files/rejected-files.comp';
import { RejectedFile } from '@/components/rejected-files/rejected-files.types';

const Home = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<AcceptedFile[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([]);
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

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

  const onClearAcceptedFiles = () => {
    setAcceptedFiles([]);
  };

  return (
    <>
      <Header bgColor={bgColor} textColor={textColor} />
      <div className='relative mx-auto max-w-5xl space-y-10 px-6 lg:px-8 -mt-[3.4rem] lg:-mt-[1.65rem]'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 bg-white border p-1 rounded-2xl'>
            {['Generate from image', 'Create your own'].map((label) => (
              <Tab
                key={label.toLowerCase().split(' ').join('-')}
                className={({ selected }) =>
                  classNames(
                    'flex-1 active:scale-95 transition-transform duration-75 rounded-xl py-2.5 text-sm font-medium leading-5 focus:outline-none',
                    selected ? 'bg-dark text-white' : 'text-slate-500 hover:text-dark hover:bg-slate-100'
                  )
                }
              >
                {label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className='focus-visible:outline-none'>
              <div className='space-y-10'>
                <FileUploader
                  onSelect={onSelect}
                  onReject={onReject}
                  filesOnQueue={!!acceptedFiles.length || !!rejectedFiles.length}
                  accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.webp'] }}
                />
                {rejectedFiles.length ? (
                  <div className='bg-red-200 overflow-hidden rounded-3xl'>
                    <RejectedAction rejectedFiles={rejectedFiles} onClear={onClearRejectedFiles} />
                    <RejectedFiles rejectedFiles={rejectedFiles} />
                  </div>
                ) : null}
                {acceptedFiles.length ? (
                  <div className='bg-dark overflow-hidden rounded-3xl'>
                    <AcceptedAction acceptedFiles={acceptedFiles} onClear={onClearAcceptedFiles} />
                    <AcceptedFiles acceptedFiles={acceptedFiles} onDelete={onDelete} />
                  </div>
                ) : null}
              </div>
            </Tab.Panel>
            <Tab.Panel className='focus-visible:outline-none'>
              <CustomizePlaceholder
                bgColor={bgColor}
                setBgColor={setBgColor}
                textColor={textColor}
                setTextColor={setTextColor}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer />
    </>
  );
};

export default Home;
