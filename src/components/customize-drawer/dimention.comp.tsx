import React from 'react';
import { BsXLg } from 'react-icons/bs';

import { DimentionProps } from './dimention.types';

const Dimention = ({ dimentions, onChange }: DimentionProps) => (
  <div>
    <h5 className='font-medium mb-2'>Dimention</h5>
    <div className='flex gap-5 items-center'>
      <div className='flex-1 rounded-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-dark'>
        <label htmlFor='width' className='block text-xs font-medium text-gray-900'>
          Width
          <input
            type='text'
            value={dimentions.width}
            onChange={(e) => onChange('width', e.target.value)}
            placeholder='400'
            name='width'
            id='width'
            className='block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
          />
        </label>
      </div>
      <BsXLg className='text-xl' />
      <div className='flex-1 rounded-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-dark'>
        <label htmlFor='height' className='block text-xs font-medium text-gray-900'>
          Height
          <input
            type='text'
            name='height'
            id='height'
            className='block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            value={dimentions.height}
            onChange={(e) => onChange('height', e.target.value)}
            placeholder='Height'
          />
        </label>
      </div>
    </div>
  </div>
);

export default Dimention;
