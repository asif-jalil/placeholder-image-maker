import React, { useState } from 'react';
import { BiRevision } from 'react-icons/bi';
import { BsCloudArrowDown } from 'react-icons/bs';

import Image from 'next/image';

import classNames from 'classnames';
import fontColorContrast from 'font-color-contrast';

import { donwloadFile } from '@/utils/download';
import generateRandomColor from '@/utils/generate-random-color';
import { Format } from '@/utils/image-format';

import Button from '../button/button.comp';
import BackgroundColor from './background-color.comp';
import Caption from './caption.comp';
import { CustomizeDrawerProps } from './customize-drawer.types';
import Dimention from './dimention.comp';
import SelectFormat from './select-format.comp';
import TextColor from './text-color.comp';

const CustomizeDrawer = ({ isCustomize, onClose }: CustomizeDrawerProps) => {
  const [imageFormat, setImageFormat] = useState(Format.PNG);
  const [dimentions, setDimentions] = useState({ width: 400, height: 300 });
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [caption, setCaption] = useState('');

  const handleDownload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    donwloadFile({
      type: imageFormat,
      extension: imageFormat,
      height: dimentions.height,
      width: dimentions.width,
      name: 'placeholder',
      bgColor,
      textColor,
      caption
    });
  };

  const handleReset = () => {
    setImageFormat(Format.PNG);
    setDimentions({ width: 400, height: 300 });
    setBgColor('');
    setTextColor('');
    setCaption('');
  };

  const handleChangeDimention = (key: 'width' | 'height', value: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(value))) return;

    setDimentions((prev) => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <div>
      <form onSubmit={handleDownload} onReset={handleReset} className='px-2 space-y-14'>
        <div className='space-y-5'>
          <div className='bg-dark px-5 pb-5 rounded-2xl max-w-2xl mx-auto'>
            <div className='py-3 text-white flex justify-between items-center'>
              <h5>Preview</h5>
              <div className='flex gap-2'>
                <button
                  type='submit'
                  className='flex items-center gap-2 active:scale-95 transition-transform duration-75 bg-white hover:bg-gray-100 text-dark font-semibold text-xs px-3 md:px-5 py-2.5 rounded-xl'
                >
                  <BsCloudArrowDown className='text-lg' />
                  <span className='sr-only md:not-sr-only'>Download</span>
                </button>
                <button
                  type='reset'
                  className='flex items-center gap-1 hover:underline text-xs active:scale-95 transition-transform duration-75 px-2 py-2.5 rounded-xl'
                >
                  <BiRevision className='text-lg -translate-y-0.5' />
                  <span className='sr-only md:not-sr-only'>Reset to default</span>
                </button>
              </div>
            </div>
            <div
              className='w-full h-60 flex justify-center items-center text-center text-xl border border-white/20 rounded-xl overflow-hidden'
              style={{
                backgroundColor: bgColor || '#e2e8f0',
                color: textColor || '#000000',
                fontFamily: 'poppins, sans-serif'
              }}
            >
              {caption || [dimentions.width, dimentions.height].join(' x ') || 'Width x Height'}
            </div>
          </div>

          <SelectFormat imageFormat={imageFormat} onSelect={setImageFormat} />
          <Dimention dimentions={dimentions} onChange={handleChangeDimention} />
          <Caption text={caption} onChange={setCaption} />
          <div className='grid grid-cols-2 gap-5'>
            <BackgroundColor color={bgColor} onChange={setBgColor} />
            <TextColor color={textColor} onChange={setTextColor} />
          </div>
        </div>

        <div className='flex justify-between gap-3 mt-10'>
          <button
            type='submit'
            className='w-full flex justify-center items-center gap-2 active:scale-95 transition-transform duration-75 bg-dark hover:bg-dark/90 text-white font-semibold text-xs px-3 md:px-5 py-2 rounded-xl'
          >
            <BsCloudArrowDown className='text-lg' />
            <span className='sr-only md:not-sr-only'>Download</span>
          </button>
          <button
            type='reset'
            className='w-full flex justify-center items-center gap-2 active:scale-95 transition-transform duration-75 bg-white border border-dark hover:bg-gray-100 font-semibold text-xs px-3 md:px-5 py-3 rounded-xl'
          >
            <BiRevision className='text-lg' />
            <span className='sr-only md:not-sr-only'>Reset to default</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomizeDrawer;
