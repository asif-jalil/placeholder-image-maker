import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import Image from 'next/image';

import checkIcon from '@/assets/images/check.svg';
import chevronUpDownIcon from '@/assets/images/chevron-up-down.svg';
import editIcon from '@/assets/images/edit.svg';
import { imageFormats } from '@/utils/image-format';

import { FormatProps } from './select-format.types';

const SelectFormat = ({ imageFormat, onSelect }: FormatProps) => (
  <div className='w-[180px]'>
    <Listbox value={imageFormat} onChange={onSelect}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative w-full cursor-pointer rounded-md bg-slate-200 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
          <div className='flex items-center'>
            <Image src={editIcon as string} width={13} height={13} className='me-2' alt='customize placeholder' />
            <span className='uppercase font-medium'>{imageFormat}</span>
          </div>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <Image
              src={chevronUpDownIcon as string}
              alt='change image format'
              width={20}
              height={20}
              className='stroke-slate-300'
            />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
            {imageFormats.map((format) => (
              <Listbox.Option
                key={format}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 uppercase ${
                    active ? 'bg-emerald-50 text-emerald-900' : 'text-gray-900'
                  }`
                }
                value={format}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{format}</span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                        <Image
                          src={checkIcon as string}
                          alt='change image format'
                          width={20}
                          height={20}
                          className='stroke-slate-300'
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);

export default SelectFormat;
