import { RadioGroup } from '@headlessui/react';
import { BsCheckCircleFill } from 'react-icons/bs';

import classNames from 'classnames';

import { imageFormats } from '@/utils/image-format';

import { FormatProps } from './select-format.types';

const SelectFormat = ({ imageFormat, onSelect }: FormatProps) => (
  <div>
    <h5 className='font-medium mb-2'>Select type</h5>
    <RadioGroup value={imageFormat} onChange={onSelect}>
      <div className='grid gap-3 grid-cols-2 sm:grid-cols-5'>
        {imageFormats.map((format) => (
          <RadioGroup.Option
            key={format}
            value={format}
            className={({ active }) =>
              classNames(
                active && 'border-dark ring-1 ring-dark',
                'relative flex cursor-pointer rounded-xl border bg-white p-4 shadow-sm focus:outline-none active:scale-95 transition-transform duration-75'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <RadioGroup.Label as='span' className='block flex-1 text-sm font-medium text-slate-900'>
                  {format.toUpperCase()}
                </RadioGroup.Label>
                <BsCheckCircleFill
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-dark')}
                  aria-hidden='true'
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-dark' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-xl'
                  )}
                  aria-hidden='true'
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  </div>
);

export default SelectFormat;
