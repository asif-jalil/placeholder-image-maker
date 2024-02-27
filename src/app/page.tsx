'use client';

import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import Link from 'next/link';

import classNames from 'classnames';

import AcceptedAction from '@/components/accepted-files/accepted-action.comp';
import AcceptedFiles from '@/components/accepted-files/accepted-files.comp';
import { AcceptedFile } from '@/components/accepted-files/accepted-files.types';
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
      <header className='relative mx-5 mt-5 rounded-2xl border bg-slate-50 h-96'>
        <div className='relative flex items-center justify-center h-full'>
          <div className='max-w-5xl mx-auto text-center px-5 space-y-5'>
            <h1 className='lg:text-6xl text-5xl'>Placeholder maker</h1>
            <p className='max-w-lg text-slate-500 text-sm lg:text-base'>
              Generate a temporary image placeholder to use when submitting it to Themeforest or any other online
              marketplace.
            </p>
            <Link
              href='http://google.com'
              target='_blank'
              className='inline-flex gap-2 items-center px-5 py-1.5 border rounded-xl hover:bg-slate-100'
            >
              <FaGithub /> <span className='text-sm font-medium'>Github</span>
            </Link>
          </div>
        </div>
      </header>
      <div className='relative mx-auto max-w-5xl px-6 lg:px-8 pb-10 -mt-[3.4rem] lg:-mt-[1.65rem]'>
        <div className='space-y-10'>
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
              <Tab.Panel>
                <div className='space-y-10'>
                  <FileUploader
                    onSelect={onSelect}
                    onReject={onReject}
                    filesOnQueue={!!acceptedFiles.length || !!rejectedFiles.length}
                    accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.bmp', '.webp'] }}
                  />

                  {acceptedFiles.length || rejectedFiles.length ? (
                    <div className='bg-dark overflow-hidden rounded-3xl'>
                      <RejectedAction rejectedFiles={rejectedFiles} onClear={onClearRejectedFiles} />
                      <RejectedFiles rejectedFiles={rejectedFiles} />
                      <AcceptedAction acceptedFiles={acceptedFiles} />
                      <AcceptedFiles acceptedFiles={acceptedFiles} onDelete={onDelete} />
                    </div>
                  ) : null}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <CustomizeDrawer isCustomize={true} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

        <Footer />
        {/* <div className='fixed right-5 bottom-5'>
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
        </div> */}
      </div>

      {/* <CustomizeDrawer isCustomize={isCustomize} onClose={() => setIsCustomize(false)} /> */}
    </>
  );
};

export default Home;
