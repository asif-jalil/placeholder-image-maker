import React from 'react';

import { CaptionProps } from './caption.types';

const Caption = ({ text, onChange }: CaptionProps) => (
  <div className='shadow p-3 rounded-md bg-white mb-3'>
    <h5 className='font-medium mb-3'>Caption</h5>
    <input
      type='text'
      value={text}
      onChange={(e) => onChange(e.target.value.slice(0, 50))}
      className='input rounded-md mb-1'
      placeholder='Hello world!'
    />
    <small className='flex justify-end'>{text.length}/50</small>
  </div>
);

export default Caption;
