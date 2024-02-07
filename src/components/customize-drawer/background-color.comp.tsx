import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Color from 'color';
import validateColor from 'validate-color';

import magicIcon from '@/assets/images/magic.svg';
import generateRandomColor from '@/utils/generate-random-color';

import { BackgroundColorProps } from './background-color.types';

const BackgroundColor = ({ color, onChange }: BackgroundColorProps) => {
  const [pickerColor, setPickerColor] = useState(color);

  useEffect(() => {
    if (validateColor(color)) {
      try {
        const hexColor = Color(color);
        setPickerColor(hexColor.hex());
      } catch {
        setPickerColor('#e2e8f0');
      }
    } else {
      setPickerColor('#e2e8f0');
    }
  }, [color]);

  const handleSurprise = () => {
    const randomColor = generateRandomColor();
    onChange(randomColor);
  };

  return (
    <div className='shadow p-3 rounded-md bg-white mb-3'>
      <h5 className='font-medium mb-3'>Background color</h5>
      <div className='flex rounded-md w-full'>
        <input
          type='text'
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className='input rounded-none rounded-l-md'
          placeholder='#e2e8f0'
        />
        <span className='inline-flex items-center border border-l-0 border-slate-300 px-3 text-gray-500 sm:text-sm'>
          <input
            type='color'
            value={pickerColor}
            onChange={(e) => onChange(e.target.value)}
            className='w-7 h-8 color-input'
          />
        </span>
        <button
          type='button'
          data-tooltip-id='tooltip'
          data-tooltip-content='Surpirse me'
          onClick={handleSurprise}
          className='inline-flex items-center border border-l-0 rounded-none rounded-r-md border-slate-300 hover:bg-slate-100 px-3 sm:text-sm'
        >
          <Image src={magicIcon as string} alt='surprise me' className='text-current' width={22} height={22} />
        </button>
      </div>
    </div>
  );
};

export default BackgroundColor;
