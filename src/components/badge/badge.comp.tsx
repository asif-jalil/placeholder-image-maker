import classNames from 'classnames';

import { BadgeProps } from './badge.types';

const Badge = ({ children, bg = 'blue', className }: BadgeProps) => (
  <span
    className={classNames(
      'inline-flex items-center rounded px-2 py-[0.125rem] text-[10px] font-medium ring-1 ring-inset uppercase',
      className,
      {
        'bg-blue-50 text-blue-700 ring-blue-700/10': bg === 'blue',
        'bg-emerald-50 text-emerald-700 ring-emerald-700/10': bg === 'green',
        'bg-red-50 text-red-700 ring-red-700/10': bg === 'red',
        'bg-slate-50 text-slate-700 ring-slate-700/10': bg === 'gray',
        'bg-amber-50 text-amber-700 ring-amber-700/10': bg === 'yellow'
      }
    )}
  >
    {children}
  </span>
);

export default Badge;
