import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2';

import classNames from 'classnames';

import { SelectInputProps, SingleSelectedInput } from './select-input.types';

const SelectInput = <T extends string>({ data, value, onChange, label, placeholder }: SelectInputProps<T>) => {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(
    () => (query === '' ? data : data.filter((item) => item.value.toLowerCase().includes(query.toLowerCase()))),
    [data, query]
  );

  return (
    <div className='w-full'>
      <Combobox value={value} onChange={onChange}>
        <div className='relative mt-1'>
          <div className='flex-1 rounded-xl mb-1 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-dark'>
            <span className='block text-xs font-medium text-slate-900'>
              <span className='flex justify-between'>{label}</span>
              <Combobox.Input
                placeholder={placeholder}
                className='block w-full border-0 p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6'
                displayValue={(item: SingleSelectedInput<string>) => item.displayName}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <HiChevronUpDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </Combobox.Button>
            </span>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {filteredData.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>Nothing found.</div>
              ) : (
                filteredData.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames('relative select-none py-2 pl-10 pr-4 text-gray-900 cursor-pointer', {
                        'bg-slate-200': active
                      })
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span className='block truncate'>{item.displayName}</span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-slate-900'>
                            <HiCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SelectInput;
