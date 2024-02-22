import { Listbox, RadioGroup, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

import Image from 'next/image';

import classNames from 'classnames';

import checkIcon from '@/assets/images/check.svg';
import chevronUpDownIcon from '@/assets/images/chevron-up-down.svg';
import editIcon from '@/assets/images/edit.svg';
import { imageFormats } from '@/utils/image-format';

import { FormatProps } from './select-format.types';

const mailingLists = [
  { id: 1, title: 'BMP' },
  { id: 2, title: 'JPEG' },
  { id: 3, title: 'PNG' },
  { id: 4, title: 'SVG' },
  { id: 5, title: 'WEBP' }
];

const SelectFormat = ({ imageFormat, onSelect }: FormatProps) => (
  <div>
    <h5 className='font-medium mb-2'>Select type</h5>
    <RadioGroup value={imageFormat} onChange={onSelect}>
      <div className='grid gap-3 grid-cols-2 sm:grid-cols-5'>
        {mailingLists.map((mailingList) => (
          <RadioGroup.Option
            key={mailingList.id}
            value={mailingList.title.toLowerCase()}
            className={({ active }) =>
              classNames(
                active ? 'border-dark ring-1 ring-dark' : 'border-gray-300',
                'relative flex cursor-pointer rounded-xl border bg-white p-4 shadow-sm focus:outline-none active:scale-95 transition-transform'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <RadioGroup.Label as='span' className='block flex-1 text-sm font-medium text-gray-900'>
                  {mailingList.title}
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
    {/* <Listbox value={imageFormat} onChange={onSelect}>
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
    </Listbox> */}
  </div>
);

export default SelectFormat;
