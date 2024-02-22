'use client';

import { Tab } from '@headlessui/react';
import { useState } from 'react';

import classNames from 'classnames';

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
      <div className='mx-auto max-w-5xl px-6 lg:px-8 py-10'>
        <div className='space-y-10'>
          <Tab.Group>
            <Tab.List className='flex space-x-1 border border-gray-400 p-1 rounded-2xl'>
              {['Generate from image', 'Create your own'].map((label) => (
                <Tab
                  key={label.toLowerCase().split(' ').join('-')}
                  className={({ selected }) =>
                    classNames(
                      'flex-1 active:scale-95 transition-transform duration-75 rounded-xl py-2.5 text-sm font-medium leading-5 focus:outline-none',
                      selected ? 'bg-dark text-white' : 'text-gray-400 hover:text-dark hover:bg-gray-100'
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
