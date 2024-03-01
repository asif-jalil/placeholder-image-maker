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
    <div>
      <h5 className='font-medium mb-2'>Background color</h5>
      <div className='flex'>
        <div className='flex-1 rounded-l-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-dark'>
          <label htmlFor='bg-color' className='block justify-between text-xs font-medium text-slate-900'>
            Hex value
            <input
              type='text'
              value={color}
              onChange={(e) => onChange(e.target.value)}
              placeholder='#e2e8f0'
              name='bg-color'
              id='bg-color'
              className='block w-full border-0 p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </label>
        </div>
        <span className='group hover:bg-slate-50 inline-flex items-center border border-l-0 border-gray-300 px-3 text-slate-500 sm:text-sm'>
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
          className='group inline-flex items-center border border-l-0 rounded-none rounded-r-xl border-gray-300 hover:bg-slate-50 px-4 sm:text-sm'
        >
          <Image
            src={magicIcon as string}
            alt='surprise me'
            className='text-current group-active:scale-75 group-active:transition-transform'
            width={22}
            height={22}
          />
        </button>
      </div>
    </div>
  );
};

export default BackgroundColor;
