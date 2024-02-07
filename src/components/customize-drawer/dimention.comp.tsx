import React from 'react';

import Image from 'next/image';

import timesIcon from '@/assets/images/times.svg';

import { DimentionProps } from './dimention.types';

const Dimention = ({ dimentions, onChange }: DimentionProps) => (
  <div className='shadow p-3 rounded-md bg-white mb-3'>
    <h5 className='font-medium mb-3'>Dimention</h5>
    <div className='flex rounded-md w-full'>
      <input
        type='text'
        value={dimentions.width}
        onChange={(e) => onChange('width', e.target.value)}
        className='input rounded-none rounded-l-md'
        placeholder='Width'
      />
      <span className='inline-flex items-center border border-x-0 border-gray-300 px-3 text-gray-500 sm:text-sm'>
        <Image src={timesIcon as string} alt='close customization' width={28} height={28} />
      </span>
      <input
        type='text'
        value={dimentions.height}
        onChange={(e) => onChange('height', e.target.value)}
        className='input rounded-none rounded-r-md'
        placeholder='Height'
      />
    </div>
  </div>
);

export default Dimention;
