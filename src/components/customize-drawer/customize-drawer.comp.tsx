import React, { useState } from 'react';

import Image from 'next/image';

import classNames from 'classnames';
import fontColorContrast from 'font-color-contrast';

import timesIcon from '@/assets/images/times.svg';
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

    const randomBgColor = generateRandomColor();
    setBgColor(randomBgColor);
    const cotrastTextColor = fontColorContrast(['#', randomBgColor].join('')); // '#00000
    setTextColor(cotrastTextColor);
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
    <div
      className={classNames(
        'transition-[left] sm:transition-[right] duration-300 w-full sm:w-[350px] fixed top-0 p-5 h-screen overflow-y-auto bg-slate-50',
        {
          'left-0 sm:left-auto sm:right-0 sm:shadow-left lg:shadow-none': isCustomize,
          'left-full sm:left-auto sm:right-[-350px]': !isCustomize
        }
      )}
    >
      <form onSubmit={handleDownload} onReset={handleReset}>
        <div className='flex items-center justify-between mb-4'>
          <SelectFormat imageFormat={imageFormat} onSelect={setImageFormat} />
          <Button type='button' onClick={onClose} className='bg-transparent !px-2 !py-2 hover:bg-slate-200'>
            <Image src={timesIcon as string} alt='close customization' width={20} height={20} />
          </Button>
        </div>

        <div className='shadow p-3 rounded-md bg-white mb-3'>
          <h5 className='font-medium mb-3'>Preview</h5>
          <div
            className='w-full h-32 flex justify-center items-center text-center text-xl rounded-md overflow-hidden'
            style={{
              backgroundColor: bgColor || '#e2e8f0',
              color: textColor || '#000000',
              fontFamily: 'poppins, sans-serif'
            }}
          >
            {caption || [dimentions.width, dimentions.height].join(' x ') || 'Width x Height'}
          </div>
        </div>

        <Dimention dimentions={dimentions} onChange={handleChangeDimention} />
        <BackgroundColor color={bgColor} onChange={setBgColor} />
        <TextColor color={textColor} onChange={setTextColor} />
        <Caption text={caption} onChange={setCaption} />

        <div className='flex justify-between gap-3'>
          <Button type='submit' className='w-full'>
            Download
          </Button>
          <Button type='reset' bg='light' className='w-full'>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomizeDrawer;
