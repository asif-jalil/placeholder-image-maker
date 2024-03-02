import React from 'react';

import classNames from 'classnames';

import { ButtonProps } from './button.types';

const Button = ({ children, bg = 'green', className, onClick, ...rest }: ButtonProps) => (
  <button
    {...rest}
    onClick={onClick}
    className={classNames(
      'rounded px-3.5 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center transition-all',
      className,
      {
        'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600': bg === 'blue',
        'bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-emerald-600': bg === 'green',
        'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600': bg === 'red',
        'bg-slate-600 text-white hover:bg-slate-500 focus-visible:outline-slate-600': bg === 'slate',
        'bg-amber-600 text-white hover:bg-amber-500 focus-visible:outline-amber-600': bg === 'yellow',
        'bg-slate-200 text-black  hover:bg-slate-300 focus-visible:outline-slate-400': bg === 'light'
      }
    )}
  >
    {children}
  </button>
);

export default Button;
