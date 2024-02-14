'use client';

import CopyToClipboard from 'react-copy-to-clipboard';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Image from 'next/image';

import copyIcon from '@/assets/images/copy.svg';
import Footer from '@/components/footer/footer.comp';
import Header from '@/components/header/header.comp';

const ApiDocs = () => (
  <>
    <div className='bg-slate-100'>
      <Header />
    </div>
    <section className='py-6'>
      <div className='container'>
        <div className='grid grid-cols-2'>
          <div className='col-span-1'>
            <div className='bg-slate-50 border text-nowrap rounded-t-md relative w-full'>
              <PerfectScrollbar className='px-4 py-5'>
                <p className='text-slate-700 font-medium'>
                  https://pimage.varcel.com/image/300x300.png?background=11cc12
                </p>
              </PerfectScrollbar>

              <div
                className='absolute end-3 top-6 cursor-pointer'
                data-tooltip-id='tooltip'
                data-tooltip-content='Copy'
              >
                <CopyToClipboard text='https://pimage.vercel.app/image/600x400.jpeg?background=112c45&text=Congratulations&weight=400&font=Lato'>
                  <Image src={copyIcon as string} width={15} height={15} alt='copy value' />
                </CopyToClipboard>
              </div>
            </div>
            <div className='rounded-b-md overflow-auto border border-t-0 p-2 bg-slate-50 h-[22.25rem] flex items-center justify-center'>
              <Image
                src='https://pimage.vercel.app/image/1900x500.jpeg?background=cbd5e1&text=800x500'
                width={1900}
                height={500}
                className='max-h-full'
                alt='placeholder image with url'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default ApiDocs;
