import React from 'react';

import classNames from 'classnames';

import { ButtonProps } from './button.types';

const Button = ({ children, bg = 'green', onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={classNames(
      'rounded px-3.5 py-2.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      {
        'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600': bg === 'blue',
        'bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-emerald-600': bg === 'green',
        'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600': bg === 'red',
        'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600': bg === 'gray',
        'bg-amber-600 text-white hover:bg-amber-500 focus-visible:outline-amber-600': bg === 'yellow'
      }
    )}
  >
    {children}
  </button>
);

export default Button;
